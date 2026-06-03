import React, { createContext, useState, useContext, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container - Floating on the screen */}
      <div className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Internal Component for the individual Toast UI
const ToastItem = ({ toast, onClose }) => {
  const styles = {
    success: "bg-emerald-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-brand-navy text-white",
  };

  const icons = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div
      className={`${styles[toast.type]} px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-10 duration-300 min-w-[280px] sm:min-w-[300px] pointer-events-auto`}
    >
      {icons[toast.type]}
      <p className="text-xs sm:text-sm font-bold flex-1">{toast.message}</p>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 shrink-0">
        <X size={16} />
      </button>
    </div>
  );
};

export const useToast = () => useContext(ToastContext);
