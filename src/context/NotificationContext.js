import React, { createContext, useState, useContext, useCallback, useEffect } from "react";

import { enquiryService } from "../services/supabaseEnquiryService";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
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
  }, [addNotification]);

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
