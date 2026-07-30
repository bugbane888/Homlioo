import React, { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { Trash2, Edit3, Plus, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import AdminPropertyForm from "../../components/admin/AdminPropertyForm";
import { useProperties } from "../../context/PropertyContext";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDraft, setEditingDraft] = useState(null);
  const { addProperty, updateProperty } = useProperties();
  const { showToast } = useToast();

  // Load drafts from localStorage
  const reloadDrafts = () => {
    const saved = JSON.parse(localStorage.getItem("homlioo_drafts") || "[]");
    setDrafts(saved);
  };

  useEffect(() => {
    reloadDrafts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      const updatedDrafts = drafts.filter((d) => d.id !== id);
      setDrafts(updatedDrafts);
      localStorage.setItem("homlioo_drafts", JSON.stringify(updatedDrafts));
      showToast("Draft deleted.", "info");
    }
  };

  const handleEdit = (draft) => {
    setEditingDraft(draft);
    setIsFormOpen(true);
  };

  // Bug 1 fix: publish is handled inside AdminPropertyForm.handleSubmit
  // This onSubmit callback is called ONLY after the backend responds successfully.
  const handleFormSubmit = async (formData) => {
    try {
      if (editingDraft?.id) {
        // If draft has a valid Supabase-issued ID (not a Date.now() fallback),
        // try updating; otherwise create new.
        const isSupabaseId = typeof editingDraft.id === "number" && editingDraft.id < 1e13;
        if (isSupabaseId) {
          await updateProperty(editingDraft.id, formData);
        } else {
          await addProperty(formData);
        }
      } else {
        await addProperty(formData);
      }
      // Success — AdminPropertyForm will remove the draft from localStorage
      // and show the success toast internally. We just close here.
      setIsFormOpen(false);
      setEditingDraft(null);
      reloadDrafts(); // Refresh the drafts list
    } catch (error) {
      console.error("[Drafts] Publish failed:", error);
      // Re-throw so AdminPropertyForm can show the error toast and keep the draft
      throw error;
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingDraft(null);
    reloadDrafts(); // Refresh in case a draft was saved or deleted
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
            You have {drafts.length} saved draft{drafts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={() => { setEditingDraft(null); setIsFormOpen(true); }}
          className="py-2.5 px-8 shadow-xl shadow-amber-500/20"
        >
          <Plus size={18} /> Create New PG
        </Button>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">No Drafts Yet</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
            Start creating a new property and save it as draft to see it here
          </p>
          <Button
            onClick={() => { setEditingDraft(null); setIsFormOpen(true); }}
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
              {/* Cover image or placeholder */}
              {draft.coverImage ? (
                <div className="h-32 overflow-hidden">
                  <img
                    src={draft.coverImage}
                    alt={draft.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                  <div className="text-4xl">🏠</div>
                </div>
              )}

              <div className="p-6">
                {/* Title */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white line-clamp-2">
                    {draft.name || "Untitled Property"}
                  </h3>
                  <span className="ml-2 flex-shrink-0 text-[10px] bg-amber-100 text-amber-600 font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Draft
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-5">
                  {draft.locality && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      📍 {draft.locality}
                      {draft.city && `, ${draft.city}`}
                    </p>
                  )}
                  {draft.rooms?.single?.rent && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                      From ₹{draft.rooms.single.rent}/month
                    </p>
                  )}
                  {draft.amenities?.length > 0 && (
                    <p className="text-xs text-slate-400">
                      {draft.amenities.slice(0, 3).join(" · ")}
                      {draft.amenities.length > 3 && ` +${draft.amenities.length - 3} more`}
                    </p>
                  )}
                </div>

                {/* Saved info */}
                <div className="mb-5 pb-5 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Last saved: {draft.savedAt || "Unknown"}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-purple rounded-full"
                        style={{
                          width: `${Math.min(100, [
                            draft.name, draft.locality, draft.college,
                            draft.coverImage, draft.description, draft.mapUrl,
                            Object.values(draft.rooms || {}).some(r => r.rent),
                          ].filter(Boolean).length / 7 * 100)}%`
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-bold ml-1">
                      {Math.round([
                        draft.name, draft.locality, draft.college,
                        draft.coverImage, draft.description, draft.mapUrl,
                        Object.values(draft.rooms || {}).some(r => r.rent),
                      ].filter(Boolean).length / 7 * 100)}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(draft)}
                    className="flex-1 py-2 text-xs flex items-center justify-center gap-1.5"
                    variant="outline"
                  >
                    <Edit3 size={13} /> Edit
                  </Button>
                  <Button
                    onClick={() => handleEdit(draft)}
                    className="flex-1 py-2 text-xs flex items-center justify-center gap-1.5"
                    variant="primary"
                  >
                    <Send size={13} /> Publish
                  </Button>
                  <button
                    onClick={() => handleDelete(draft.id)}
                    disabled={publishingDraftId === draft.id}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all disabled:opacity-50"
                    title="Delete draft"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AdminPropertyForm modal — handles publish with proper error handling */}
      <AdminPropertyForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingDraft}
      />
    </div>
  );
};

export default Drafts;
