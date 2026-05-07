import React from "react";
import {
  MapPin,
  Star,
  Clock,
  CheckCircle,
  BarChart3,
  Train,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import Badge from "../common/Badge";

const ListingCard = ({ pg }) => {
  const navigate = useNavigate();
  const { toggleCompare, compareList } = useCompare();
  const isCompared = compareList.some((i) => i.id === pg.id);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
      {/* Visual Header */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative flex items-center justify-center">
        <div className="text-6xl group-hover:scale-110 transition-transform">
          🏠
        </div>

        {pg.roomsLeft <= 2 && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
            🔥 {pg.roomsLeft} left
          </div>
        )}

        <button className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors">
          ❤️
        </button>

        <div className="absolute bottom-4 left-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <CheckCircle size={12} /> Verified
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <Badge variant={pg.gender.toLowerCase()}>{pg.gender}</Badge>
          <Badge variant="amber">{pg.tags?.[0]}</Badge>
        </div>
        <h3 className="text-lg font-black text-brand-navy dark:text-white mb-1">
          {pg.name}
        </h3>
        <p className="flex items-center gap-1 text-slate-400 text-xs font-bold mb-4">
          <MapPin size={12} /> {pg.locality}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-emerald-600 text-[11px] font-black uppercase">
            <Clock size={14} /> {pg.college}
          </div>
          <div className="flex items-center gap-2 text-blue-500 text-[11px] font-black uppercase">
            <Train size={14} /> {pg.metro}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-black uppercase">
            <Building2 size={14} /> {pg.hospital}
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-slate-50 pt-4">
          <div>
            <div className="text-2xl font-black">
              ₹{pg.total.toLocaleString()}
              <span className="text-xs text-slate-400 font-bold ml-1">/mo</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {pg.sharing}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-brand-amber font-black">
              <Star size={14} fill="currentColor" /> {pg.rating}
            </div>
            <p className="text-[10px] text-slate-400 font-bold">
              {pg.reviews} reviews
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => navigate(`/property/${pg.id}`)}
            className="flex-1 bg-[#F59E0B] text-slate-900 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(pg);
            }}
            className={`px-4 rounded-xl border-2 transition-all ${isCompared ? "bg-brand-purple border-brand-purple text-white" : "border-slate-100 text-slate-400"}`}
          >
            <BarChart3 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
