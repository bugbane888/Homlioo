import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building,
  FileText,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ChevronRight,
  Eye,
  MessageSquare,
} from "lucide-react";
import { LISTINGS_DATA } from "../../constants/data";
import Button from "../../components/common/Button";

/**
 * REUSABLE STAT CARD COMPONENT
 * Professionals build sub-components to keep the main page code clean.
 */
const StatCard = ({ title, value, icon, trend, color, bgColor, subtitle }) => (
  <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 sm:p-4 rounded-2xl ${color} ${bgColor} text-white group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full">
        {trend} <ArrowUpRight size={12} />
      </span>
    </div>
    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
      {title}
    </p>
    <h3 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white mb-2">
      {value}
    </h3>
    {subtitle && (
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        {subtitle}
      </p>
    )}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  // Logic: Get the 4 most recent listings
  const recentListings = LISTINGS_DATA.slice(0, 4);
  const totalProperties = LISTINGS_DATA.length;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-[900] text-brand-navy dark:text-white tracking-tighter">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base mt-2">
            Monitor HOMLiOO performance, manage listings, and track growth metrics.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex -space-x-2">
            {[1].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 bg-gradient-to-br from-brand-purple to-brand-navy flex items-center justify-center text-sm font-bold text-white"
              >
                A{i}
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest">
              1 Admin
            </p>
            <p className="text-sm font-bold text-brand-navy dark:text-white">
              Online Now
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Students"
          value="12,840"
          subtitle="Registered users"
          icon={<Users size={24} />}
          trend="+12.5%"
          color="text-blue-500"
          bgColor="bg-blue-500"
        />
        <StatCard
          title="Active PGs"
          value={totalProperties}
          subtitle="Listed properties"
          icon={<Building size={24} />}
          trend="+4.2%"
          color="text-emerald-500"
          bgColor="bg-emerald-500"
        />
        <StatCard
          title="Enquiries"
          value="1,204"
          subtitle="This month"
          icon={<MessageSquare size={24} />}
          trend="+18.7%"
          color="text-amber-500"
          bgColor="bg-amber-500"
        />
        <StatCard
          title="Page Views"
          value="52.4K"
          subtitle="Weekly average"
          icon={<Eye size={24} />}
          trend="+8.3%"
          color="text-purple-500"
          bgColor="bg-purple-500"
        />
      </div>

      {/* Quick Actions & Recent Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Recent Listings Table - 2/3 Width */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-50 dark:border-slate-700 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-[900] text-brand-navy dark:text-white tracking-tight">
                Recent Property Updates
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
                Latest {recentListings.length} PGs added to the directory
              </p>
            </div>
            <Button
              variant="outline"
              className="py-2 px-6 text-xs font-bold whitespace-nowrap"
              onClick={() => navigate("/admin/properties")}
            >
              View All <ChevronRight size={14} />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Property Name
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
                    Price
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {recentListings.map((pg) => (
                  <tr
                    key={pg.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 sm:px-8 py-4 sm:py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-lg shrink-0">
                          🏠
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-brand-navy dark:text-white text-sm truncate">
                            {pg.name}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter">
                            {pg.locality}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-4 sm:py-5 text-center font-black text-brand-navy dark:text-white text-sm">
                      ₹{pg.total.toLocaleString()}
                    </td>
                    <td className="px-6 sm:px-8 py-4 sm:py-5 text-right">
                      <span
                        className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          pg.verified
                            ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {pg.verified ? "✓ Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Activity - 1/3 Width */}
        <div className="lg:col-span-1 space-y-6">
          {/* Growth Target Card */}
          <div className="bg-gradient-to-br from-brand-navy to-brand-purple dark:from-slate-800 dark:to-slate-700 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <TrendingUp className="text-brand-amber mb-4" size={28} />
              <h4 className="text-lg sm:text-xl font-[900] mb-2 tracking-tight">
                Growth Target
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm mb-6 leading-relaxed">
                85% of monthly student signup goal reached.
              </p>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-3">
                <div className="bg-brand-amber h-full w-[85%] rounded-full"></div>
              </div>
              <p className="text-[10px] font-bold text-brand-amber uppercase tracking-widest">
                15% remaining
              </p>
            </div>
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-[900] text-brand-navy dark:text-white mb-6 tracking-tight">
              Recent Activity
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: "New Enquiry",
                  time: "2 mins ago",
                  icon: <FileText size={14} />,
                  color: "text-amber-500",
                },
                {
                  title: "Property Approved",
                  time: "45 mins ago",
                  icon: <CheckCircleIcon />,
                  color: "text-emerald-500",
                },
                {
                  title: "Admin Login",
                  time: "3 hours ago",
                  icon: <Clock size={14} />,
                  color: "text-brand-purple",
                },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`mt-1 ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-navy leading-none mb-1">
                      {activity.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              View System Logs <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Icon
const CheckCircleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default Dashboard;
