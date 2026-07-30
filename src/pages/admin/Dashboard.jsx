import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building,
  ArrowUpRight,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { useProperties } from "../../context/PropertyContext";
import { useEnquiries } from "../../context/EnquiryContext";
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

  const { properties, isLoading } = useProperties();
  const { enquiries } = useEnquiries();

  // Logic: Get the 4 most recent listings
  const recentListings = properties.slice(0, 4);
  const totalProperties = properties.length;
  const totalEnquiries = enquiries.length;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <StatCard
          title="Active PGs"
          value={isLoading ? "—" : totalProperties}
          subtitle="Published properties"
          icon={<Building size={24} />}
          trend="Live"
          color="text-emerald-500"
          bgColor="bg-emerald-500"
        />
        <StatCard
          title="Enquiries"
          value={isLoading ? "—" : totalEnquiries}
          subtitle="All time"
          icon={<MessageSquare size={24} />}
          trend="Live"
          color="text-amber-500"
          bgColor="bg-amber-500"
        />
      </div>

      {/* Quick Actions & Recent Listings */}
      <div className="mb-12">
        {/* Recent Listings Table - Full Width */}
        <div className="w-full bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
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
                {isLoading ? (
                  // Skeleton rows while loading
                  [...Array(4)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 sm:px-8 py-4 sm:py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />
                          <div className="space-y-2">
                            <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                            <div className="h-2 w-20 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 sm:px-8 py-4 text-center">
                        <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded animate-pulse mx-auto" />
                      </td>
                      <td className="px-6 sm:px-8 py-4 text-right">
                        <div className="h-6 w-20 bg-slate-100 dark:bg-slate-700 rounded-full animate-pulse ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : recentListings.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-8 py-16 text-center text-slate-400 font-medium">
                      No properties yet. <button className="text-brand-purple font-bold hover:underline" onClick={() => navigate('/admin/properties')}>Add your first PG →</button>
                    </td>
                  </tr>
                ) : (
                recentListings.map((pg) => (
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
                      ₹{(pg.total ?? 0).toLocaleString()}
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
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
