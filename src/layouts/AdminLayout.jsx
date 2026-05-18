import React from "react";
import AdminSidebar from "../components/navigation/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import { Bell, Search } from "lucide-react";

const AdminLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex bg-slate-50 dark:bg-slate-900 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col w-full">
        {/* Top Admin Header */}
        <header className="h-16 sm:h-20 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 md:px-10 sticky top-0 z-30 shadow-sm">
          <div className="relative w-full sm:w-96 md:w-96 max-w-[32rem]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search properties, users or IDs..."
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-xl text-sm border border-slate-100 dark:border-slate-600 outline-none focus:ring-2 ring-brand-purple/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative p-2 text-slate-400 dark:text-slate-500 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-slate-100 dark:border-slate-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-brand-navy dark:text-white">
                  {user?.name}
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  Super Admin
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-navy text-white rounded-lg flex items-center justify-center font-bold shadow-md">
                {user?.name?.[0] || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
