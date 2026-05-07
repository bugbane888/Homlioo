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
} from "lucide-react";
import { LISTINGS_DATA } from "../../constants/data";
import Button from "../../components/common/Button";

/**
 * REUSABLE STAT CARD COMPONENT
 * Professionals build sub-components to keep the main page code clean.
 */
const StatCard = ({ title, value, icon, trend, color, bgColor }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} ${bgColor} text-white`}>
        {icon}
      </div>
      <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
        {trend} <ArrowUpRight size={12} />
      </span>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
      {title}
    </p>
    <h3 className="text-3xl font-black text-brand-navy">{value}</h3>
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight">
            System Overview
          </h1>
          <p className="text-slate-500 font-medium">
            Monitoring HOMLiOO performance and growth.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold"
              >
                U{i}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 font-medium self-center">
            3 Admins Online
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <StatCard
          title="Total Students"
          value="12,840"
          icon={<Users size={24} />}
          trend="+12.5%"
          color="text-brand-purple"
          bgColor="bg-brand-purple"
        />
        <StatCard
          title="Active Listings"
          value={totalProperties}
          icon={<Building size={24} />}
          trend="+4.2%"
          color="text-brand-navy"
          bgColor="bg-brand-navy"
        />
        <StatCard
          title="Lease Enquiries"
          value="1,204"
          icon={<FileText size={24} />}
          trend="+18.7%"
          color="text-brand-amber"
          bgColor="bg-brand-amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Listings Table - 2/3 Width */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-brand-navy">
                Recent Property Updates
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Latest PGs added to the directory
              </p>
            </div>
            <Button
              variant="outline"
              className="py-2 px-4 text-xs"
              onClick={() => navigate("/admin/properties")}
            >
              View All Listings
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Property
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Price
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentListings.map((pg) => (
                  <tr
                    key={pg.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">
                          🏠
                        </div>
                        <div>
                          <p className="font-bold text-brand-navy text-sm">
                            {pg.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            ID: #HG-{pg.id}00
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center font-black text-brand-navy text-sm">
                      ₹{pg.total.toLocaleString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          pg.verified
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {pg.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Notifications/Activity - 1/3 Width */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-brand-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <TrendingUp className="text-brand-amber mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">Growth Target</h4>
              <p className="text-slate-400 text-sm mb-6">
                You've reached 85% of your monthly goal for new student signups.
              </p>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-brand-amber h-full w-[85%] rounded-full"></div>
              </div>
              <p className="text-[10px] font-bold text-brand-amber uppercase tracking-widest">
                15% to go
              </p>
            </div>
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-brand-navy mb-6">
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
