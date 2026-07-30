import React from "react";
import { useEnquiries } from "../../context/EnquiryContext";
import { Phone, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS = ["New", "Contacted", "Closed"];

// Issue 16 fix: Status badge with dropdown select to allow reverting
const StatusCell = ({ item, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e) => {
    setIsUpdating(true);
    await onUpdate(item.id, e.target.value);
    setIsUpdating(false);
  };

  const colorMap = {
    New: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
    Contacted: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
    Closed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  };

  return (
    <div className="flex items-center gap-2">
      {isUpdating && <Loader2 size={14} className="animate-spin text-slate-400" />}
      <select
        value={item.status}
        onChange={handleChange}
        disabled={isUpdating}
        className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border cursor-pointer outline-none transition-all disabled:opacity-60 ${colorMap[item.status] || "bg-slate-100 text-slate-700 border-slate-200"}`}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white normal-case tracking-normal">
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

const Enquiries = () => {
  const { enquiries, updateStatus, deleteEnquiry, isLoading } = useEnquiries();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Lease Requests
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Track and manage student leads for your properties.{" "}
          <span className="font-black text-brand-navy dark:text-white">
            {enquiries.length} total
          </span>
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-900/30">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Student Details
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Property Interested
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Message
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {isLoading ? (
                // Skeleton rows
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-2 w-24 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-3 w-40 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-6 w-20 bg-slate-100 dark:bg-slate-700 rounded-full animate-pulse" />
                    </td>
                    <td className="px-8 py-6" />
                  </tr>
                ))
              ) : enquiries.length > 0 ? (
                enquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <p className="font-bold text-brand-navy dark:text-white text-sm">
                        {item.studentName}
                      </p>
                      <p className="text-xs text-slate-400 font-black flex items-center gap-1 mt-1">
                        <Phone size={12} /> {item.phone}
                      </p>
                      {item.email && (
                        <p className="text-xs text-slate-400 mt-0.5">{item.email}</p>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-600 dark:text-slate-300 text-sm">
                        {item.pgName}
                      </p>
                      <p className="text-xs text-slate-400 font-bold uppercase">
                        {item.date}
                      </p>
                    </td>
                    <td className="px-8 py-6 max-w-[200px]">
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.message || <span className="italic text-slate-300">No message</span>}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      {/* Issue 16 fix: dropdown allows New/Contacted/Closed in any direction */}
                      <StatusCell item={item} onUpdate={updateStatus} />
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this enquiry?")) {
                            deleteEnquiry(item.id);
                          }
                        }}
                        className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                        title="Remove Lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-8 py-20 text-center"
                  >
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-slate-400 font-medium">No lease enquiries yet.</p>
                    <p className="text-xs text-slate-300 mt-1">When students submit enquiries, they'll appear here.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
