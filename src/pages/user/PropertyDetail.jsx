import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProperties } from "../../context/PropertyContext";
import { useCompare } from "../../context/CompareContext";
import PricingCard from "../../components/listings/PricingCard";
import EnquiryFormModal from "../../components/listings/EnquiryFormModal";
import Badge from "../../components/common/Badge";
import {
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  Home,
  Wifi,
  Wind,
  Utensils,
  Video,
  Shirt,
  Car,
  Dumbbell,
  Zap,
  Map as MapIcon,
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties } = useProperties();
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const pg = properties.find((p) => p.id === parseInt(id));
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const isInCompare = compareList.some((p) => p.id === pg?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pg)
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        Loading...
      </div>
    );

  const amenityIcons = {
    WiFi: <Wifi size={18} />,
    AC: <Wind size={18} />,
    Food: <Utensils size={18} />,
    CCTV: <Video size={18} />,
    Laundry: <Shirt size={18} />,
    Parking: <Car size={18} />,
    Gym: <Dumbbell size={18} />,
    "Power Backup": <Zap size={18} />,
  };

  return (
    <div className="bg-[#F8F7F4] dark:bg-slate-900 min-h-screen pb-12 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-6"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image Placeholder */}
            <div className="aspect-video bg-blue-500 rounded-2xl sm:rounded-3xl relative flex items-center justify-center overflow-hidden">
              <div className="text-6xl sm:text-8xl">🏠</div>
              <div className="absolute bottom-2 sm:bottom-4 text-white/70 text-xs px-2">
                5 verified photos · 1 video walkthrough
              </div>
              <div className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-[#10B981] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-black flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>{" "}
                HOMLIOO VERIFIED
              </div>
            </div>

            {/* Main Info */}
            <div className="bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="amber"
                  className="bg-pink-100 text-pink-600 border-none text-xs"
                >
                  Women Safety
                </Badge>
                <Badge variant="amber" className="text-xs">Power Backup</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-white mb-2">
                {pg.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-slate-400 text-sm font-bold">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {pg.locality}
                </span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <Clock size={14} /> {pg.college}
                </span>
                <span className="flex items-center gap-1 text-brand-amber">
                  <Star size={14} fill="currentColor" /> {pg.rating} (34
                  reviews)
                </span>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-50">
                <h4 className="font-black text-sm mb-2">About this PG</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {pg.description}
                </p>
              </div>
            </div>

            {/* Amenities Grid - Restored Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pg.amenities.map((a) => (
                <div
                  key={a}
                  className="bg-white dark:bg-slate-800 p-5 rounded-2xl flex flex-col items-center gap-2 border border-slate-50"
                >
                  <div className="text-brand-purple">
                    {amenityIcons[a] || <Home size={18} />}
                  </div>
                  <span className="text-xs font-black uppercase text-slate-400">
                    {a}
                  </span>
                </div>
              ))}
            </div>

            {/* House Rules */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100">
              <h4 className="flex items-center gap-2 font-black text-sm mb-6">
                🏠 House Rules
              </h4>
              <div className="grid grid-cols-2 gap-y-4">
                {pg.rules?.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-3 text-xs font-bold text-slate-500"
                  >
                    <div className="w-1.5 h-1.5 bg-brand-amber rounded-full"></div>{" "}
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Distance Table */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100">
              <h4 className="flex items-center gap-2 font-black text-sm mb-6">
                📍 Distance from Colleges
              </h4>
              <div className="space-y-4">
                {[
                  ["NIET", "4 min walk", "350m"],
                  ["GL Bajaj", "12 min walk", "1.1km"],
                  ["Sharda Univ", "18 min auto", "3.2km"],
                ].map(([name, time, dist]) => (
                  <div
                    key={name}
                    className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-sm font-bold text-slate-700">
                      🎓 {name}
                    </span>
                    <div className="flex gap-4 text-xs font-black">
                      <span className="text-emerald-500">{time}</span>
                      <span className="text-slate-300">{dist}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP SECTION - Redirects to Google Maps */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 overflow-hidden">
              <h4 className="font-black text-sm mb-2">📍 Location Identity</h4>
              <p className="text-xs text-slate-400 mb-6 font-bold">
                {pg.locality} · 1.2km from Metro Station
              </p>
              <div
                onClick={() => window.open(pg.mapUrl, "_blank")}
                className="aspect-[21/9] bg-slate-100 rounded-2xl relative cursor-pointer group flex items-center justify-center border border-slate-200"
              >
                <div className="text-slate-300 group-hover:scale-110 transition-transform">
                  <MapIcon size={40} />
                </div>
                <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors"></div>
                <a href={pg.mapUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 bg-white px-6 py-2 rounded-full shadow-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-brand-purple group-hover:text-white transition-all inline-block">
                  View in Maps →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Pricing Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PricingCard
                pg={pg}
                onEnquiry={() => setIsEnquiryOpen(true)}
                isInCompare={isInCompare}
                onCompareToggle={() => {
                  if (isInCompare) {
                    removeFromCompare(pg.id);
                  } else {
                    addToCompare(pg);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Enquiry Modal */}
        <EnquiryFormModal
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          pgName={pg?.name}
          pgId={pg?.id}
        />
      </div>
    </div>
  );
};

export default PropertyDetail;
