import React from "react";
import AdminSidebar from "../components/navigation/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import { Bell, Search } from "lucide-react";

const AdminLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Admin Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 md:px-10 sticky top-0 z-30">
          <div className="relative w-full sm:w-96 md:w-96 max-w-[32rem]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search properties, users or IDs..."
              className="w-full pl-12 pr-4 py-2 bg-slate-50 rounded-xl text-sm border-none outline-none focus:ring-2 ring-brand-purple/20"
            />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative p-2 text-slate-400 hover:text-brand-navy transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-brand-navy">
                  {user?.name}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Super Admin
                </p>
              </div>
              <div className="w-10 h-10 bg-brand-purple text-white rounded-xl flex items-center justify-center font-bold">
                {user?.name[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
