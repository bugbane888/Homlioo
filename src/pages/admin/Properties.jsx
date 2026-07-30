import React, { useState } from "react";
import { useProperties } from "../../context/PropertyContext";
import { useToast } from "../../context/ToastContext";
import {
  Plus, Search, Edit3, Trash2, ExternalLink, EyeOff
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import AdminPropertyForm from "../../components/admin/AdminPropertyForm";
import propertyService from "../../services/supabasePropertyService";

const Properties = () => {
  const { properties, deleteProperty, addProperty, updateProperty } =
    useProperties();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Component State
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [unpublishingId, setUnpublishingId] = useState(null);
  const location = useLocation();

  React.useEffect(() => {
    // 1. Check if we navigated here with intent to open Add PG modal
    if (location.state?.openAddModal) {
      setEditingProperty(null);
      setIsModalOpen(true);
      window.history.replaceState({}, document.title);
    }

    // 2. Check if there's a draft to continue editing
    const draft = localStorage.getItem("editingDraft");
    if (draft) {
      try {
        setEditingProperty(JSON.parse(draft));
        setIsModalOpen(true);
        localStorage.removeItem("editingDraft");
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, [location]);

  // Filter Logic
  const filteredProperties = properties.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.locality?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handlers
  const handleOpenAdd = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pg) => {
    setEditingProperty(pg);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProperty) {
        // Issue 3 fix: toast says "updated", not "published"
        await updateProperty(editingProperty.id, formData);
        showToast(`"${formData.name}" updated successfully.`, "success");
      } else {
        await addProperty(formData);
        showToast(`"${formData.name}" published to site!`, "success");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      throw error; // Re-throw so AdminPropertyForm shows error state
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${name}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteProperty(id);
      showToast(`"${name}" deleted successfully.`, "success");
    } catch (error) {
      console.error("Delete failed:", error);
      showToast(
        `Failed to delete "${name}". ${error?.message || "Please try again."}`,
        "error"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Issue 18: Unpublish — moves property back to draft status
  const handleUnpublish = async (id, name) => {
    const confirmed = window.confirm(
      `Unpublish "${name}"? It will no longer be visible to students.`
    );
    if (!confirmed) return;

    setUnpublishingId(id);
    try {
      await propertyService.update(id, { status: "draft" });
      // Remove from the published list in local context state
      // (PropertyContext getAll only fetches published, so we trigger a page reload
      // or remove it manually from state via updateProperty)
      await updateProperty(id, { status: "draft" });
      showToast(`"${name}" has been unpublished and moved to Drafts.`, "info");
    } catch (error) {
      console.error("Unpublish failed:", error);
      showToast(
        `Failed to unpublish "${name}". ${error?.message || "Please try again."}`,
        "error"
      );
    } finally {
      setUnpublishingId(null);
    }
  };

  const SpinnerIcon = () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">
            Property Manager
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {properties.length} published PG{properties.length !== 1 ? "s" : ""} live on site
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="py-2.5 px-8 shadow-xl shadow-amber-500/20"
        >
          <Plus size={18} /> Add New PG
        </Button>
      </div>

      {/* SEARCH & TABLE CONTAINER */}
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
        {/* Local Search */}
        <div className="p-6 border-b border-slate-50 dark:border-slate-700/50 bg-slate-50/30 dark:bg-slate-900/10">
          <div className="relative w-full md:w-80 group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors"
            />
            <input
              type="text"
              placeholder="Search name or locality..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-4 ring-brand-purple/5 dark:focus:ring-brand-purple/20 transition-all font-medium dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Property List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-900/30">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Sanctuary Details
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Category
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  From / Month
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {/* Issue 20: Empty state when no results */}
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-slate-400 dark:text-slate-500 font-medium">
                      {searchTerm
                        ? `No properties matching "${searchTerm}"`
                        : "No published properties yet. Add your first PG!"}
                    </p>
                    {!searchTerm && (
                      <button
                        onClick={handleOpenAdd}
                        className="mt-4 text-brand-purple font-bold hover:underline"
                      >
                        + Add New PG
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredProperties.map((pg) => (
                  <tr
                    key={pg.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        {/* Show thumbnail if coverImage exists */}
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                          {pg.coverImage ? (
                            <img
                              src={pg.coverImage}
                              alt={pg.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = "none"; }}
                            />
                          ) : (
                            "🏠"
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-brand-navy dark:text-white text-sm leading-tight">
                            {pg.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-black uppercase mt-0.5">
                            {pg.locality}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant={pg.gender?.toLowerCase().replace("-", "")}>
                        {pg.gender}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 font-black text-brand-navy dark:text-white text-sm tracking-tight">
                      {/* Issue 2 fix: null-safe */}
                      ₹{(pg.total ?? 0).toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEdit(pg)}
                          className="p-2.5 text-slate-300 hover:text-brand-purple hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all"
                          title="Edit Details"
                        >
                          <Edit3 size={16} />
                        </button>
                        {/* View Live */}
                        <button
                          onClick={() => navigate(`/property/${pg.id}`)}
                          className="p-2.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                          title="View Live Site"
                        >
                          <ExternalLink size={16} />
                        </button>
                        {/* Issue 18: Unpublish */}
                        <button
                          onClick={() => handleUnpublish(pg.id, pg.name)}
                          disabled={unpublishingId === pg.id}
                          className="p-2.5 text-slate-300 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Unpublish (Move to Draft)"
                        >
                          {unpublishingId === pg.id ? <SpinnerIcon /> : <EyeOff size={16} />}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(pg.id, pg.name)}
                          disabled={deletingId === pg.id}
                          className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Property"
                        >
                          {deletingId === pg.id ? <SpinnerIcon /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* REUSABLE FORM MODAL */}
      <AdminPropertyForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProperty(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingProperty}
      />
    </div>
  );
};

export default Properties;
