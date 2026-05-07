import React, { createContext, useState, useContext, useCallback } from "react";
import { useToast } from "./ToastContext";

const EnquiryContext = createContext(null);

export const EnquiryProvider = ({ children }) => {
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      pgName: "Sunrise Girls PG",
      phone: "9876543210",
      status: "New",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      studentName: "Priya Singh",
      pgName: "Dev Residency",
      phone: "9988776655",
      status: "Contacted",
      date: new Date().toLocaleDateString(),
    },
  ]);

  const addEnquiry = useCallback(
    (data) => {
      const newEnquiry = {
        ...data,
        id: Date.now(),
        status: "New",
        date: new Date().toLocaleDateString(),
      };
      setEnquiries((prev) => [newEnquiry, ...prev]);
      showToast("Enquiry sent! The owner will contact you shortly.", "success");
    },
    [showToast],
  );

  const updateStatus = useCallback(
    (id, newStatus) => {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)),
      );
      showToast(`Lead status updated to ${newStatus}`, "info");
    },
    [showToast],
  );

  return (
    <EnquiryContext.Provider value={{ enquiries, addEnquiry, updateStatus }}>
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiries = () => useContext(EnquiryContext);
