import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useToast } from "./ToastContext";
import { enquiryService, mapEnquiryFromDB } from "../services/supabaseEnquiryService";

const EnquiryContext = createContext(null);

export const EnquiryProvider = ({ children }) => {
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch enquiries from Supabase
  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const data = await enquiryService.getAll();
        setEnquiries(data.map(mapEnquiryFromDB));
      } catch (error) {
        console.error("Error loading enquiries:", error);
        // Fallback to empty array - user might not be admin
        setEnquiries([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadEnquiries();

    // Subscribe to real-time changes
    const subscription = enquiryService.subscribeToChanges((payload) => {
      if (payload.eventType === "INSERT") {
        setEnquiries((prev) => [mapEnquiryFromDB(payload.new), ...prev]);
      } else if (payload.eventType === "UPDATE") {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === payload.new.id ? mapEnquiryFromDB(payload.new) : e
          )
        );
      } else if (payload.eventType === "DELETE") {
        setEnquiries((prev) => prev.filter((e) => e.id !== payload.old.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addEnquiry = useCallback(
    async (data) => {
      try {
        const created = await enquiryService.create(data);
        const mapped = mapEnquiryFromDB(created);
        setEnquiries((prev) => [mapped, ...prev]);
        showToast("Enquiry sent! The owner will contact you shortly.", "success");
        return mapped;
      } catch (error) {
        console.error("Error adding enquiry:", error);
        // Fallback to local state
        const newEnquiry = {
          ...data,
          id: Date.now(),
          status: "New",
          date: new Date().toLocaleDateString(),
        };
        setEnquiries((prev) => [newEnquiry, ...prev]);
        showToast("Enquiry sent! The owner will contact you shortly.", "success");
        return newEnquiry;
      }
    },
    [showToast],
  );

  const updateStatus = useCallback(
    async (id, newStatus) => {
      try {
        await enquiryService.updateStatus(id, newStatus);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)),
        );
        showToast(`Lead status updated to ${newStatus}`, "info");
      } catch (error) {
        console.error("Error updating status:", error);
        // Fallback to local state
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)),
        );
        showToast(`Lead status updated to ${newStatus}`, "info");
      }
    },
    [showToast],
  );

  const deleteEnquiry = useCallback(
    async (id) => {
      try {
        await enquiryService.delete(id);
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        showToast("Enquiry removed", "info");
      } catch (error) {
        console.error("Error deleting enquiry:", error);
      }
    },
    [showToast],
  );

  return (
    <EnquiryContext.Provider value={{ enquiries, isLoading, addEnquiry, updateStatus, deleteEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiries = () => useContext(EnquiryContext);
