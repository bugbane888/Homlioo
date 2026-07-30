import React from "react";
import {
  MapPin,
  Star,
  Clock,
  CheckCircle,
  Train,
  Building2,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import { useSaved } from "../../context/SavedContext";
import Badge from "../common/Badge";

const ListingCard = ({ pg }) => {
  const navigate = useNavigate();
  const { toggleCompare, compareList } = useCompare();
  const { savedIds, toggleSave } = useSaved();

  const isCompared = compareList.some((i) => i.id === pg.id);
  const isSaved = savedIds.includes(pg.id);
  const genderVariant = pg.gender
    ? pg.gender.toLowerCase().replace("-", "")
    : "default";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-2xl transition-all relative flex flex-col h-full">
      {/* --- VISUAL HEADER --- */}
      <div className="h-48 relative flex items-center justify-center overflow-hidden shrink-0 bg-gradient-to-br from-blue-400 to-indigo-600">
        {/* Issue 11 fix: Show actual cover image if available */}
        {pg.coverImage ? (
          <img
            src={pg.coverImage}
            alt={pg.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="text-6xl group-hover:scale-110 transition-transform duration-500">🏠</div>
        )}

        {/* Dark overlay gradient for text legibility when image is shown */}
        {pg.coverImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        )}

        {/* Room Inventory Alert */}
        {pg.roomsLeft <= 2 && pg.roomsLeft > 0 && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg z-10">
            🔥 {pg.roomsLeft} left
          </div>
        )}

        {/* Save / Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(pg);
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10 border border-white/10 active:scale-75"
          aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={20}
            className={isSaved ? "fill-red-500 text-red-500" : "text-white"}
          />
        </button>

        {/* Verification Pill */}
        {pg.verified && (
          <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
            <CheckCircle size={14} className="text-emerald-500" /> Verified
          </div>
        )}
      </div>

      {/* --- CONTENT BODY --- */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category Badges */}
        <div className="flex gap-2 mb-4">
          <Badge variant={genderVariant}>{pg.gender}</Badge>
          {pg.tags?.[0] && <Badge variant="amber">{pg.tags[0]}</Badge>}
        </div>

        {/* Title & Area */}
        <h3 className="text-lg font-[900] text-brand-navy dark:text-white mb-1 tracking-tight leading-snug">
          {pg.name}
        </h3>
        <p className="flex items-center gap-1 text-slate-400 text-xs font-bold mb-5">
          <MapPin size={14} className="text-brand-purple" /> {pg.locality}
        </p>

        {/* Proximity Details */}
        <div className="space-y-3 mb-6">
          {pg.college && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wide">
              <Clock size={15} /> {pg.college}
            </div>
          )}
          {pg.metro && (
            <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 text-xs font-black uppercase tracking-wide">
              <Train size={15} /> {pg.metro}
            </div>
          )}
          {pg.hospital && (
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-wide opacity-80">
              <Building2 size={15} /> {pg.hospital}
            </div>
          )}
        </div>

        {/* Pricing and Rating Row */}
        <div className="flex justify-between items-end border-t border-slate-50 dark:border-slate-700/50 pt-5 mt-auto">
          <div>
            {/* Issue 23 fix: null-safe total */}
            <div className="text-2xl font-[900] text-brand-navy dark:text-white tracking-tighter">
              ₹{(pg.total ?? 0).toLocaleString()}
              <span className="text-xs text-slate-400 font-black ml-1 uppercase tracking-widest">
                /mo
              </span>
            </div>
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">
              {pg.sharing}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#F59E0B] font-black text-base">
              <Star size={16} fill="currentColor" /> {pg.rating ?? "—"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/property/${pg.id}`);
            }}
            className="flex-1 bg-[#F59E0B] hover:bg-amber-500 text-[#0F172A] py-3 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all"
          >
            View Details
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(pg);
            }}
            className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all active:scale-95 ${
              isCompared
                ? "bg-brand-purple border-brand-purple text-white shadow-sm"
                : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 hover:border-brand-purple hover:text-brand-purple"
            }`}
          >
            {isCompared ? "Compared" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
