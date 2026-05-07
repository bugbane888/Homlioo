import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import { X, ArrowRight, BarChart3 } from "lucide-react";
import Button from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";

const CompareBar = () => {
  const { compareList, toggleCompare } = useCompare();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] sm:w-[90%] max-w-2xl"
        >
          <div className="bg-brand-navy dark:bg-slate-800 text-white rounded-[2rem] p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-3 sm:gap-4 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar py-1">
              <div className="bg-brand-amber text-brand-navy p-2.6 rounded-xl hidden sm:flex items-center justify-center">
                <BarChart3 size={18} />
              </div>

              <div className="flex gap-2">
                {compareList.map((pg) => (
                  <div
                    key={pg.id}
                    className="bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap border border-white/5 group"
                  >
                    <span className="text-[10px] font-black uppercase tracking-tight">
                      {pg.name}
                    </span>
                    <button
                      onClick={() => toggleCompare(pg)}
                      className="p-1 hover:bg-red-500 rounded-lg transition-colors text-white/50 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}

                {compareList.length < 3 && (
                  <div className="border border-dashed border-white/20 rounded-xl px-4 py-2 flex items-center">
                    <span className="text-[10px] font-bold text-slate-500 italic">
                      Add {3 - compareList.length} more...
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              className="py-2 px-6 text-xs whitespace-nowrap"
              onClick={() => navigate("/compare")}
              disabled={compareList.length < 2}
            >
              Compare {compareList.length} <ArrowRight size={14} />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;
