import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { enquiryService } from "../services/supabaseEnquiryService";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

  useEffect(() => {
    // Fetch initial unread enquiries for the admin
    if (user?.role === "admin") {
      enquiryService.getAll().then((data) => {
        const newEnquiries = data.filter((e) => e.status === "New");
        const initialNotifs = newEnquiries.map((eq) => ({
          id: eq.id,
          type: "enquiry",
          title: "New Lease Request",
          message: `${eq.student_name || eq.studentName} enquired about ${eq.pg_name || eq.pgName}`,
          pgName: eq.pg_name || eq.pgName,
          studentName: eq.student_name || eq.studentName,
          read: false,
          timestamp: new Date(eq.created_at || new Date()),
        }));
        setNotifications(initialNotifs);
      }).catch((err) => console.log("Silent error fetching initial notifications"));
    }

    const subscription = enquiryService.subscribeToChanges((payload) => {
      if (payload.eventType === "INSERT") {
        addNotification({
          type: "enquiry",
          title: "New Lease Request",
          message: `${payload.new.student_name} enquired about ${payload.new.pg_name}`,
          pgName: payload.new.pg_name,
          studentName: payload.new.student_name,
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [addNotification, user?.role]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const getUnreadCount = () => {
    return notifications.filter((notif) => !notif.read).length;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        getUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
