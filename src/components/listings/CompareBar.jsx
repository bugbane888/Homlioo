import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import { X, ArrowRight, BarChart3 } from "lucide-react";
import Button from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";

const CompareBar = () => {
  const { compareList, toggleCompare } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();
  const isComparePage = location.pathname === "/compare";

  return (
    <AnimatePresence>
      {compareList.length > 0 && !isComparePage && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-[100] sm:w-[90%] sm:max-w-2xl"
        >
          <div className="bg-brand-navy dark:bg-slate-800 text-white rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 overflow-x-auto no-scrollbar">
              <div className="bg-brand-amber text-brand-navy p-2 sm:p-2.6 rounded-lg sm:rounded-xl hidden sm:flex items-center justify-center shrink-0">
                <BarChart3 size={16} className="sm:w-5 sm:h-5" />
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar min-h-[32px] items-center">
                {compareList.map((pg) => (
                  <div
                    key={pg.id}
                    className="bg-white/10 rounded-lg px-2 py-1 sm:px-3 sm:py-2 flex items-center gap-1 sm:gap-2 whitespace-nowrap border border-white/5 group shrink-0"
                  >
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-tight line-clamp-1">
                      {String(pg?.name || "Property").substring(0, 8)}
                    </span>
                    <button
                      onClick={() => toggleCompare(pg)}
                      className="p-0.5 hover:bg-red-500 rounded transition-colors text-white/50 hover:text-white shrink-0"
                    >
                      <X size={12} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                ))}

                {compareList.length < 3 && (
                  <div className="border border-dashed border-white/20 rounded-lg px-2 py-1 sm:px-4 sm:py-2 flex items-center shrink-0">
                    <span className="text-[7px] sm:text-[10px] font-bold text-slate-400 italic">
                      +{3 - compareList.length}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full sm:w-auto py-2 sm:py-2 px-3 sm:px-6 text-[10px] sm:text-xs font-bold whitespace-nowrap shrink-0"
              onClick={() => navigate("/compare")}
              disabled={compareList.length < 2}
            >
              <span className="flex items-center justify-center gap-1">
                <span className="hidden sm:inline">Compare</span>
                <span className="sm:hidden">Go</span>
                <span className="text-[9px] sm:text-xs">({compareList.length})</span>
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;
