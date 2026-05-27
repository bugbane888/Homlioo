import React, { createContext, useState, useContext, useCallback } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "enquiry",
      title: "New Enquiry",
      message: "Rahul Sharma enquired about Sunrise Girls PG",
      read: false,
      timestamp: new Date(Date.now() - 5 * 60000),
      pgName: "Sunrise Girls PG",
      studentName: "Rahul Sharma",
    },
    {
      id: 2,
      type: "issue_resolved",
      title: "Issue Resolved",
      message: "Your enquiry for Dev Residency has been approved",
      read: false,
      timestamp: new Date(Date.now() - 15 * 60000),
      pgName: "Dev Residency",
    },
  ]);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

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
