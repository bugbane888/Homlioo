import React, { useEffect } from "react";
import { useCompare } from "../../context/CompareContext";
import { useNavigate, Navigate } from "react-router-dom";
import { X, ChevronLeft } from "lucide-react";
import Button from "../../components/common/Button"; // FIXED PATH
import PageTransition from "../../components/common/PageTransition";

const Compare = () => {
  const { compareList, toggleCompare } = useCompare();
  const navigate = useNavigate();

  useEffect(() => {
    if (compareList.length < 2) {
      navigate("/listings", { replace: true });
    }
  }, [compareList.length, navigate]);

  if (compareList.length < 2) return <Navigate to="/listings" />;

  const features = [
    { key: "total", label: "Total/mo" },
    { key: "price", label: "Base Rent" },
    { key: "locality", label: "Metro" },
    { key: "college", label: "Hospital" },
    { key: "gender", label: "Rating" },
    { key: "sharing", label: "Verified" },
    { key: "roomsLeft", label: "Rooms Left" },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 font-bold hover:text-brand-navy dark:hover:text-white transition-colors text-sm"
          >
            <ChevronLeft size={18} /> Back
          </button>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tighter mb-1">
          Compare PGs
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">
          Side-by-side comparison
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {compareList.map((pg) => (
            <div
              key={pg.id}
              className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-lg relative"
            >
              <button
                onClick={() => toggleCompare(pg)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-slate-300 hover:text-red-500 transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Header Banner */}
              <div className="h-24 sm:h-32 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <div className="text-5xl sm:text-6xl">🏠</div>
              </div>

              {/* Property Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-black text-brand-navy dark:text-white mb-1">
                  {pg.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-brand-purple mb-4 sm:mb-6">
                  {pg.locality}
                </p>

                {/* Features */}
                <div className="space-y-3 sm:space-y-4">
                  {features.map((f) => (
                    <div
                      key={f.key}
                      className="flex justify-between items-start border-t border-slate-100 dark:border-slate-700 pt-3 sm:pt-4"
                    >
                      <span className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-wide">
                        {f.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white text-right">
                        {f.key === "price" || f.key === "total"
                          ? `₹${pg[f.key] ? Number(pg[f.key]).toLocaleString() : "N/A"}`
                          : pg[f.key] || "N/A"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View Details Button */}
                <Button
                  className="mt-6 sm:mt-8 w-full py-2 sm:py-3 text-xs sm:text-sm font-bold"
                  onClick={() => navigate(`/property/${pg.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Compare;
