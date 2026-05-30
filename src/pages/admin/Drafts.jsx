import React, { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { Trash2, Edit3, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("homlioo_drafts") || "[]");
    setDrafts(savedDrafts);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      const updatedDrafts = drafts.filter((d) => d.id !== id);
      setDrafts(updatedDrafts);
      localStorage.setItem("homlioo_drafts", JSON.stringify(updatedDrafts));
      showToast("Draft deleted successfully.", "info");
    }
  };

  const handleEdit = (draft) => {
    // Store the draft to be edited and navigate to properties page
    localStorage.setItem("editingDraft", JSON.stringify(draft));
    navigate("/admin/properties");
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white tracking-tight">
            Property Drafts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            You have {drafts.length} saved draft{drafts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/properties")}
          className="py-2.5 px-8 shadow-xl shadow-amber-500/20"
        >
          <Plus size={18} /> Create New PG
        </Button>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">
            No Drafts Yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
            Start creating a new property and save it as draft to see it here
          </p>
          <Button
            onClick={() => navigate("/admin/properties")}
            className="shadow-xl shadow-amber-500/20"
          >
            <Plus size={18} /> Add New PG
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-6">
                {/* Icon */}
                <div className="text-4xl mb-4">🏠</div>

                {/* Title */}
                <h3 className="text-lg font-bold text-brand-navy dark:text-white mb-2 line-clamp-2">
                  {draft.name || "Untitled Property"}
                </h3>

                {/* Details */}
                <div className="space-y-2 mb-6">
                  {draft.locality && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      📍 {draft.locality}
                    </p>
                  )}
                  {draft.city && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      🏙️ {draft.city}
                    </p>
                  )}
                  {draft.singleBedRent && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                      ₹{draft.singleBedRent}/month
                    </p>
                  )}
                </div>

                {/* Saved Info */}
                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Last saved: {draft.savedAt || "Unknown"}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Progress: {draft.name ? "50%" : "10%"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(draft)}
                    className="flex-1 py-2 text-xs flex items-center justify-center gap-2"
                    variant="primary"
                  >
                    <Edit3 size={14} /> Continue
                  </Button>
                  <Button
                    onClick={() => handleDelete(draft.id)}
                    className="flex-1 py-2 text-xs bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
                    variant="primary"
                  >
                    <Trash2 size={14} /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Drafts;
