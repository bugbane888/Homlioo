import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCompare } from "../../context/CompareContext";
import { X, ArrowRight, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CompareBar = () => {
  const { compareList, toggleCompare } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();
  const isComparePage = location.pathname === "/compare";

  if (compareList.length === 0 || isComparePage) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="compare-bar"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999 }}
      >
        {/* Outer wrapper — full width, dark bg with top border */}
        <div
          style={{
            background: "#0F172A",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.35)",
          }}
        >
          {/* Icon — hidden on small screens */}
          <div
            style={{
              background: "#F59E0B",
              borderRadius: "10px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            className="hidden sm:flex"
          >
            <BarChart3 size={16} color="#0F172A" />
          </div>

          {/* Label text — desktop only */}
          <span
            className="hidden md:block"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              flexShrink: 0,
            }}
          >
            Comparing:
          </span>

          {/* Property chips — scrollable, takes remaining space */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flex: 1,
              overflowX: "auto",
              minWidth: 0,
              scrollbarWidth: "none",
            }}
          >
            {compareList.map((pg) => (
              <div
                key={pg.id}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    maxWidth: "80px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {String(pg?.name || "Property").substring(0, 12)}
                </span>
                <button
                  onClick={() => toggleCompare(pg)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "2px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(255,255,255,0.4)",
                    borderRadius: "4px",
                    transition: "all 0.15s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ef4444";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  }}
                  title={`Remove ${pg?.name}`}
                >
                  <X size={11} />
                </button>
              </div>
            ))}

            {/* Empty slot */}
            {compareList.length < 3 && (
              <div
                style={{
                  border: "1px dashed rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "10px",
                    fontWeight: "700",
                    fontStyle: "italic",
                  }}
                >
                  +{3 - compareList.length} more
                </span>
              </div>
            )}
          </div>

          {/* Compare Button — always visible, never shrinks */}
          <button
            onClick={() => compareList.length >= 2 && navigate("/compare")}
            disabled={compareList.length < 2}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "9px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: compareList.length >= 2 ? "pointer" : "not-allowed",
              fontWeight: "800",
              fontSize: "12px",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              background: compareList.length >= 2 ? "#F59E0B" : "rgba(255,255,255,0.1)",
              color: compareList.length >= 2 ? "#0F172A" : "rgba(255,255,255,0.3)",
              boxShadow: compareList.length >= 2 ? "0 4px 12px rgba(245,158,11,0.4)" : "none",
            }}
          >
            <span>Compare</span>
            <span
              style={{
                background: compareList.length >= 2 ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "1px 6px",
                fontSize: "10px",
              }}
            >
              {compareList.length}/3
            </span>
            <ArrowRight size={13} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
