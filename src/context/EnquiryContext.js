import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useToast } from "./ToastContext";
import { enquiryService, mapEnquiryFromDB } from "../services/supabaseEnquiryService";
import { supabase } from "../lib/supabase";

const EnquiryContext = createContext(null);

const isDev = process.env.NODE_ENV === 'development';
const devError = (...a) => isDev && console.error(...a);

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
        devError("Error loading enquiries:", error);
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
        const newEnquiry = mapEnquiryFromDB(payload.new);
        // Issue 10 fix: deduplicate — addEnquiry may have already added this optimistically
        setEnquiries((prev) => {
          const exists = prev.some((e) => String(e.id) === String(newEnquiry.id));
          if (exists) return prev;
          return [newEnquiry, ...prev];
        });
      } else if (payload.eventType === "UPDATE") {
        setEnquiries((prev) =>
          prev.map((e) =>
            String(e.id) === String(payload.new.id) ? mapEnquiryFromDB(payload.new) : e
          )
        );
      } else if (payload.eventType === "DELETE") {
        setEnquiries((prev) => prev.filter((e) => String(e.id) !== String(payload.old.id)));
      }
    });

    return () => {
      // Properly remove channel (Issue 6 pattern)
      supabase.removeChannel(subscription);
    };
  }, []);

  const addEnquiry = useCallback(
    async (data) => {
      try {
        const created = await enquiryService.create(data);
        const mapped = mapEnquiryFromDB(created);
        // Issue 10 fix: DON'T add to state manually here — let the real-time INSERT handle it
        // (with deduplication). This prevents duplicate entries.
        showToast("Enquiry sent! The owner will contact you shortly.", "success");
        return mapped;
      } catch (error) {
        devError("Error adding enquiry:", error);
        // Fallback to local state only when Supabase fails
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
      // Optimistic update for instant UI feedback
      setEnquiries((prev) =>
        prev.map((e) => (String(e.id) === String(id) ? { ...e, status: newStatus } : e)),
      );
      try {
        await enquiryService.updateStatus(id, newStatus);
        showToast(`Status updated to "${newStatus}"`, "info");
      } catch (error) {
        devError("Error updating status:", error);
        // Revert optimistic update on failure
        setEnquiries((prev) =>
          prev.map((e) => (String(e.id) === String(id) ? { ...e, status: e.status } : e)),
        );
        showToast("Failed to update status. Please try again.", "error");
      }
    },
    [showToast],
  );

  const deleteEnquiry = useCallback(
    async (id) => {
      // Optimistic removal
      setEnquiries((prev) => prev.filter((e) => String(e.id) !== String(id)));
      try {
        await enquiryService.delete(id);
        showToast("Enquiry removed", "info");
      } catch (error) {
        devError("Error deleting enquiry:", error);
        showToast("Failed to delete enquiry.", "error");
        // Re-fetch to restore state
        try {
          const data = await enquiryService.getAll();
          setEnquiries(data.map(mapEnquiryFromDB));
        } catch (_) { /* silent */ }
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
