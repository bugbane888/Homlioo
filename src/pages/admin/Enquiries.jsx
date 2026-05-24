import React from "react";
import { useEnquiries } from "../../context/EnquiryContext";
import { Phone, CheckCircle, Clock, Trash2 } from "lucide-react";
import Badge from "../../components/common/Badge";

const Enquiries = () => {
  const { enquiries, updateStatus, deleteEnquiry, isLoading } = useEnquiries();

  // Helper for status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Contacted":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Closed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Lease Requests
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Track and manage student leads for your properties.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-900/30">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Student Details
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Property Interested
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {enquiries.length > 0 ? (
                enquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <p className="font-bold text-brand-navy dark:text-white text-sm">
                        {item.studentName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black flex items-center gap-1 mt-1">
                        <Phone size={10} /> {item.phone}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-600 dark:text-slate-300 text-sm">
                        {item.pgName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {item.date}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusStyle(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Action: Mark as Contacted */}
                        <button
                          onClick={() => updateStatus(item.id, "Contacted")}
                          className="p-2.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-all"
                          title="Mark as Contacted"
                        >
                          <Clock size={16} />
                        </button>
                        {/* Action: Mark as Closed (Successful) */}
                        <button
                          onClick={() => updateStatus(item.id, "Closed")}
                          className="p-2.5 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all"
                          title="Mark as Successful"
                        >
                          <CheckCircle size={16} />
                        </button>
                        {/* Action: Delete Lead */}
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-20 text-center text-slate-400 font-medium italic"
                  >
                    No lease enquiries found.
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
