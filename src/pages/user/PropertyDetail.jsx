import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProperties } from "../../context/PropertyContext";
import { useCompare } from "../../context/CompareContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import PricingCard from "../../components/listings/PricingCard";
import EnquiryFormModal from "../../components/listings/EnquiryFormModal";
import Badge from "../../components/common/Badge";
import {
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
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
  X,
  Images,
} from "lucide-react";

// ─── Image Gallery Carousel ────────────────────────────────────────────────
// Bug 4 fix: displays all gallery images in a proper navigable gallery
const ImageGallery = ({ coverImage, galleryImages, propertyName }) => {
  const allImages = [
    ...(coverImage ? [coverImage] : []),
    ...(Array.isArray(galleryImages) ? galleryImages.filter(Boolean) : []),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const goTo = (index) => {
    setCurrentIndex((index + allImages.length) % allImages.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (allImages.length === 0) {
    return (
      <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl relative flex items-center justify-center overflow-hidden">
        <div className="text-6xl sm:text-8xl">🏠</div>
        <div className="absolute bottom-4 text-white/70 text-xs">No images available</div>
      </div>
    );
  }

  return (
    <>
      {/* Main image viewer */}
      <div className="space-y-3">
        {/* Primary large image */}
        <div className="aspect-video bg-slate-100 rounded-2xl sm:rounded-3xl relative overflow-hidden group cursor-pointer"
          onClick={() => openLightbox(currentIndex)}>
          <img
            src={allImages[currentIndex]}
            alt={`${propertyName} view ${currentIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Navigation arrows (only show when multiple images) */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(currentIndex - 1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(currentIndex + 1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image counter badge */}
          {allImages.length > 1 && (
            <div
              className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 cursor-pointer hover:bg-black/80 transition-colors"
              onClick={(e) => { e.stopPropagation(); openLightbox(currentIndex); }}
            >
              <Images size={12} />
              {currentIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Verified badge */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-[#10B981] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-black flex items-center gap-2 shadow-lg shadow-emerald-500/30">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            HOMLIOO VERIFIED
          </div>

          {/* Tap to view hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/40 text-white text-xs px-3 py-1 rounded-full font-bold backdrop-blur">
              Click to view full size
            </span>
          </div>
        </div>

        {/* Thumbnail strip — Bug 4 fix: show ALL gallery images as thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  currentIndex === i
                    ? "border-brand-purple ring-2 ring-brand-purple/30 scale-95"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Dot indicators for mobile */}
        {allImages.length > 1 && (
          <div className="flex justify-center gap-1.5 sm:hidden">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentIndex === i ? "bg-brand-purple w-4" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={24} />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length); }}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % allImages.length); }}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <img
            src={allImages[lightboxIndex]}
            alt={`${propertyName} — view ${lightboxIndex + 1} of ${allImages.length}`}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-4 py-2 rounded-full font-bold">
            {lightboxIndex + 1} of {allImages.length}
          </div>

          {/* Lightbox thumbnails */}
          {allImages.length > 1 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-xs sm:max-w-lg pb-1">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    lightboxIndex === i ? "border-white" : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

// ─── Main PropertyDetail page ─────────────────────────────────────────────
const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, isLoading } = useProperties();
  const { compareList, toggleCompare } = useCompare();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Bug 4 fix: handle both numeric (Supabase bigint) and string IDs
  const pg = properties.find(
    (p) => String(p.id) === String(id)
  );
  const isInCompare = compareList.some((p) => p.id === pg?.id);

  const handleWhatsAppClick = () => {
    if (!user) {
      showToast("Please login to contact the owner via WhatsApp", "error");
      navigate("/login");
      return;
    }
    const phone = pg.ownerPhone || "918881329192";
    const message = encodeURIComponent(
      `Hi, I am interested in ${pg.name} located at ${pg.locality}. Is it available?`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pg && !isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#F8F7F4] dark:bg-slate-900">
        <div className="text-6xl">🏠</div>
        <h2 className="text-2xl font-black text-brand-navy dark:text-white">Property Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          This listing may have been removed or is unavailable.
        </p>
        <button
          onClick={() => navigate("/listings")}
          className="mt-4 px-8 py-3 bg-brand-purple text-white font-bold rounded-2xl hover:bg-purple-700 transition-colors"
        >
          Browse All PGs
        </button>
      </div>
    );

  if (!pg)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const amenityIcons = {
    WiFi: <Wifi size={18} />,
    AC: <Wind size={18} />,
    Food: <Utensils size={18} />,
    "Food Included": <Utensils size={18} />,
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

            {/* Bug 4 fix: Full image gallery with thumbnails + lightbox */}
            <ImageGallery
              coverImage={pg.coverImage}
              galleryImages={pg.galleryImages}
              propertyName={pg.name}
            />

            {/* Main Info */}
            <div className="bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="amber" className="bg-pink-100 text-pink-600 border-none text-xs">
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
                {pg.college && (
                  <span className="flex items-center gap-1 text-emerald-500">
                    <Clock size={14} /> {pg.college}
                  </span>
                )}
                <span className="flex items-center gap-1 text-brand-amber">
                  <Star size={14} fill="currentColor" /> {pg.rating || "N/A"}
                </span>
              </div>
              {pg.description && (
                <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-700">
                  <h4 className="font-black text-sm mb-2 text-brand-navy dark:text-white">About this PG</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{pg.description}</p>
                </div>
              )}
            </div>

            {/* Amenities Grid */}
            {pg.amenities?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pg.amenities.map((a) => (
                  <div
                    key={a}
                    className="bg-white dark:bg-slate-800 p-5 rounded-2xl flex flex-col items-center gap-2 border border-slate-50 dark:border-slate-700"
                  >
                    <div className="text-brand-purple">
                      {amenityIcons[a] || <Home size={18} />}
                    </div>
                    <span className="text-xs font-black uppercase text-slate-400">{a}</span>
                  </div>
                ))}
              </div>
            )}

            {/* House Rules */}
            {pg.rules?.length > 0 && (
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
                <h4 className="flex items-center gap-2 font-black text-sm mb-6 text-brand-navy dark:text-white">
                  🏠 House Rules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                  {pg.rules.map((r) => (
                    <div key={r} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <div className="w-1.5 h-1.5 bg-brand-amber rounded-full flex-shrink-0"></div>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Distance Details */}
            {(pg.college || pg.metro || pg.hospital) && (
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
                <h4 className="flex items-center gap-2 font-black text-sm mb-6 text-brand-navy dark:text-white">
                  📍 Nearby Places
                </h4>
                <div className="space-y-4">
                  {pg.college && (
                    <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-700">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">🎓 {pg.college}</span>
                      <span className="text-xs font-black text-emerald-500">Nearby</span>
                    </div>
                  )}
                  {pg.metro && (
                    <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-700">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">🚇 {pg.metro}</span>
                      <span className="text-xs font-black text-blue-500">Metro</span>
                    </div>
                  )}
                  {pg.hospital && (
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">🏥 {pg.hospital}</span>
                      <span className="text-xs font-black text-red-400">Hospital</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Map Section */}
            {pg.mapUrl && (
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                <h4 className="font-black text-sm mb-2 text-brand-navy dark:text-white">📍 Location</h4>
                <p className="text-xs text-slate-400 mb-6 font-bold">{pg.locality}</p>
                <div
                  onClick={() => window.open(pg.mapUrl, "_blank")}
                  className="aspect-[21/9] bg-slate-100 dark:bg-slate-900 rounded-2xl relative cursor-pointer group flex items-center justify-center border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-slate-300 group-hover:scale-110 transition-transform">
                    <MapIcon size={40} />
                  </div>
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors" />
                  <a
                    href={pg.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 bg-white px-6 py-2 rounded-full shadow-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-brand-purple group-hover:text-white transition-all inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View in Google Maps →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Pricing Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PricingCard
                pg={pg}
                onEnquiry={() => setIsEnquiryOpen(true)}
                isInCompare={isInCompare}
                onCompareToggle={() => toggleCompare(pg)}
                onWhatsAppClick={handleWhatsAppClick}
              />
            </div>
          </div>
        </div>

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
