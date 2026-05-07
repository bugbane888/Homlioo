import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

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
    <aside className="w-64 bg-brand-navy h-screen sticky top-0 flex flex-col text-white">
      {/* Logo Area */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="bg-brand-amber text-brand-navy w-8 h-8 rounded-lg flex items-center justify-center font-black">
            H
          </div>
          <span className="font-bold text-xl tracking-tight">HOMLiOO</span>
        </div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">
          Admin Console
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-brand-purple text-white shadow-lg shadow-purple-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-semibold">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 p-3 text-slate-400 hover:text-white text-sm font-medium mb-2"
        >
          <Settings size={20} /> Settings
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-bold w-full transition-all"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
