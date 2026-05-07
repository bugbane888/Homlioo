import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    {
      name: "Properties",
      icon: <Building size={20} />,
      path: "/admin/properties",
    },
    {
      name: "Lease Requests",
      icon: <FileText size={20} />,
      path: "/admin/enquiries",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-4 z-[60] p-2 bg-brand-navy text-white rounded-lg hover:bg-slate-800"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-brand-navy h-screen sticky top-0 flex flex-col text-white transition-all ${
          isOpen
            ? "fixed left-0 top-0 z-50"
            : "hidden lg:flex lg:sticky lg:top-0"
        }`}
      >
        {/* Logo Area */}
        <div className="p-6 sm:p-8 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-brand-amber text-brand-navy w-8 h-8 rounded-lg flex items-center justify-center font-black shrink-0">
                H
              </div>
              <div className="min-w-0">
                <span className="font-bold text-lg sm:text-xl tracking-tight block">
                  HOMLiOO
                </span>
                <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Admin
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-brand-purple text-white shadow-lg shadow-purple-900/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.icon}
                  <span className="text-sm font-semibold truncate">
                    {item.name}
                  </span>
                </div>
                {isActive && <ChevronRight size={14} className="shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 sm:p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/admin/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 text-slate-400 hover:text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all"
          >
            <Settings size={20} className="shrink-0" />
            <span className="truncate">Settings</span>
          </Link>
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-bold w-full transition-all"
          >
            <LogOut size={20} className="shrink-0" /> <span className="truncate">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
