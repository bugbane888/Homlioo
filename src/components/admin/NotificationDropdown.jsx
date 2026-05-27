import React, { useState } from "react";
import { Bell, X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount } = useNotifications();

  const unreadCount = getUnreadCount();

  const getIcon = (type) => {
    switch (type) {
      case "enquiry":
        return <AlertCircle size={16} className="text-amber-500" />;
      case "issue_resolved":
        return <CheckCircle size={16} className="text-emerald-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 dark:text-slate-500 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        title="Notifications"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-40 overflow-hidden max-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between sticky top-0">
              <h3 className="font-bold text-brand-navy dark:text-white">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Notifications List */}
            {notifications.length === 0 ? (
              <div className="p-8 text-center flex-1 flex items-center justify-center">
                <p className="text-slate-400 text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer transition-colors ${
                      !notif.read
                        ? "bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700/30"
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 shrink-0">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-brand-navy dark:text-white">
                          {notif.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                          {formatTime(notif.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                        className="text-slate-300 hover:text-slate-600 dark:hover:text-slate-400 shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex gap-2">
                <button
                  onClick={markAllAsRead}
                  className="flex-1 text-xs font-bold text-brand-purple hover:text-brand-purple/80 py-2 transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
