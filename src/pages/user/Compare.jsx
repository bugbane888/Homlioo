import React from "react";
import { useCompare } from "../../context/CompareContext";
import { useNavigate, Navigate } from "react-router-dom";
import { X, ChevronLeft } from "lucide-react";
import Button from "../../components/common/Button"; // FIXED PATH
import PageTransition from "../../components/common/PageTransition";

const Compare = () => {
  const { compareList, toggleCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length < 2) return <Navigate to="/listings" />;

  const features = [
    { key: "price", label: "Base Rent" },
    { key: "total", label: "Total/Month" },
    { key: "locality", label: "Area" },
    { key: "college", label: "Near College" },
    { key: "gender", label: "Type" },
    { key: "sharing", label: "Sharing" },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 font-bold hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tighter">
            Compare Sanctuaries
          </h1>
          <button
            onClick={clearCompare}
            className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Labels Column */}
          <div className="hidden lg:block space-y-4 pt-52">
            {features.map((f) => (
              <div
                key={f.key}
                className="h-20 flex items-center font-black text-[10px] uppercase tracking-[0.2em] text-slate-400"
              >
                {f.label}
              </div>
            ))}
          </div>

          {/* Property Columns */}
          {compareList.map((pg) => (
            <div
              key={pg.id}
              className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 p-6 shadow-xl relative"
            >
              <button
                onClick={() => toggleCompare(pg)}
                className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8 pt-4">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-lg font-black text-brand-navy dark:text-white mb-1 line-clamp-1">
                  {pg.name}
                </h3>
                <p className="text-xs font-bold text-brand-purple">
                  {pg.locality}
                </p>
                <Button
                  className="mt-6 w-full py-2 text-xs"
                  onClick={() => navigate(`/property/${pg.id}`)}
                >
                  View Details
                </Button>
              </div>

              <div className="space-y-4">
                {features.map((f) => (
                  <div
                    key={f.key}
                    className="h-20 flex flex-col justify-center border-t border-slate-50 dark:border-slate-700/50"
                  >
                    <span className="lg:hidden text-[10px] font-black text-slate-300 uppercase mb-1">
                      {f.label}
                    </span>
                    <div className="font-bold text-brand-navy dark:text-white text-sm">
                      {f.key === "price" || f.key === "total"
                        ? `₹${pg[f.key].toLocaleString()}`
                        : pg[f.key]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Compare;
