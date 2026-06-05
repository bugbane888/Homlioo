import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Search, MapPin, Clock, TrendingUp, X, Navigation } from "lucide-react";
import { useProperties } from "../../context/PropertyContext";

// ─── Static known nearby places / zones ───────────────────────────────────────
const NEARBY_ZONES = [
  { label: "Knowledge Park II",      type: "area",     icon: "🏘️" },
  { label: "Knowledge Park IV",      type: "area",     icon: "🏘️" },
  { label: "Alpha-I, Greater Noida", type: "area",     icon: "🏘️" },
  { label: "Gamma-I, Greater Noida", type: "area",     icon: "🏘️" },
  { label: "Pari Chowk",            type: "metro",    icon: "🚇" },
  { label: "Depot Station",          type: "metro",    icon: "🚇" },
  { label: "NIET",                   type: "college",  icon: "🎓" },
  { label: "GL Bajaj",               type: "college",  icon: "🎓" },
  { label: "Sharda University",      type: "college",  icon: "🎓" },
  { label: "Galgotias University",   type: "college",  icon: "🎓" },
  { label: "Bennett University",     type: "college",  icon: "🎓" },
  { label: "Yatharth Hospital",      type: "hospital", icon: "🏥" },
  { label: "Fortis Hospital",        type: "hospital", icon: "🏥" },
  { label: "Sharda Hospital",        type: "hospital", icon: "🏥" },
];

const TRENDING = ["NIET", "GL Bajaj", "Sharda", "Knowledge Park", "Pari Chowk"];
const MAX_RECENT = 5;
const LS_KEY = "homlioo_recent_searches";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getRecent = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};
const saveRecent = (term) => {
  const existing = getRecent().filter((t) => t !== term);
  const updated = [term, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};
const removeRecent = (term) => {
  const updated = getRecent().filter((t) => t !== term);
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};

// ─── Type badge colors – dark variants for hero, light for listings ────────────
const TYPE_BADGE_DARK = {
  area:     { label: "Area",     color: "bg-blue-500/20 text-blue-300 border border-blue-500/30" },
  college:  { label: "College",  color: "bg-amber-500/20 text-amber-300 border border-amber-500/30" },
  metro:    { label: "Metro",    color: "bg-purple-500/20 text-purple-300 border border-purple-500/30" },
  hospital: { label: "Hospital", color: "bg-rose-500/20 text-rose-300 border border-rose-500/30" },
  property: { label: "PG",       color: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" },
};
const TYPE_BADGE_LIGHT = {
  area:     { label: "Area",     color: "bg-blue-100 text-blue-700" },
  college:  { label: "College",  color: "bg-amber-100 text-amber-700" },
  metro:    { label: "Metro",    color: "bg-purple-100 text-purple-700" },
  hospital: { label: "Hospital", color: "bg-rose-100 text-rose-700" },
  property: { label: "PG",       color: "bg-emerald-100 text-emerald-700" },
};

/**
 * Props:
 *  value        – controlled string value
 *  onChange     – called with new string
 *  onSearch     – called when user commits (Enter / click)
 *  placeholder  – override placeholder
 *  className    – extra classes for wrapper
 *  compact      – smaller variant (Listings page)
 *  darkDropdown – use dark navy dropdown (hero page)
 */
const SmartSearchBar = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search by area, college, metro…",
  className = "",
  compact = false,
  darkDropdown = false,
}) => {
  const { properties } = useProperties();
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState(getRecent);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Build property-derived suggestions
  const propSuggestions = useMemo(() => {
    const seen = new Set();
    const list = [];
    properties.forEach((p) => {
      if (p.locality && !seen.has(p.locality)) {
        seen.add(p.locality);
        list.push({ label: p.locality, type: "area", icon: "🏘️" });
      }
      if (p.name && !seen.has(p.name)) {
        seen.add(p.name);
        list.push({ label: p.name, type: "property", icon: "🏠" });
      }
    });
    return list;
  }, [properties]);

  const allSuggestions = useMemo(
    () => [...NEARBY_ZONES, ...propSuggestions],
    [propSuggestions]
  );

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return allSuggestions.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 8);
  }, [value, allSuggestions]);

  const showEmpty = open && value.trim() !== "" && filtered.length === 0;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIdx(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const commit = useCallback((term) => {
    if (!term.trim()) return;
    saveRecent(term.trim());
    setRecent(getRecent());
    onChange?.(term.trim());
    onSearch?.(term.trim());
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.blur();
  }, [onChange, onSearch]);

  const handleKeyDown = (e) => {
    const items = filtered.length > 0 ? filtered : [];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && items[activeIdx]) commit(items[activeIdx].label);
      else commit(value);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIdx(-1);
    }
  };

  const handleDeleteRecent = (e, term) => {
    e.stopPropagation();
    removeRecent(term);
    setRecent(getRecent());
  };

  // ── Theme classes ──────────────────────────────────────────────────────────
  const BADGE = darkDropdown ? TYPE_BADGE_DARK : TYPE_BADGE_LIGHT;

  // Input row styles
  // When darkDropdown: input is inside the white pill in Home.jsx – keep it transparent
  const inputWrapBase = compact ? "px-3 py-2" : "px-4 py-3";
  const inputFocusRing = darkDropdown
    ? "" // parent pill handles border/shadow
    : open ? "border-brand-purple shadow-lg shadow-brand-purple/10" : "border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md";

  const inputBg = darkDropdown
    ? "" // fully transparent – parent pill provides background
    : "bg-white dark:bg-slate-800 border";

  const inputTextColor = darkDropdown
    ? "text-slate-700 placeholder:text-slate-400"
    : "text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

  const iconColor = darkDropdown
    ? open ? "text-[#F59E0B]" : "text-slate-400"
    : open ? "text-brand-purple" : "text-slate-400";

  const clearBtnColor = darkDropdown
    ? "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100";

  // Dropdown styles
  const dropBg = darkDropdown
    ? "bg-[#0F2133] border border-white/10 shadow-2xl shadow-black/60"
    : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-2xl shadow-slate-200/80 dark:shadow-slate-900/80";

  const dropHeaderColor = darkDropdown
    ? "text-white/40"
    : "text-slate-400";

  const dropItemHover = darkDropdown
    ? "hover:bg-white/5"
    : "hover:bg-slate-50 dark:hover:bg-slate-800";

  const dropItemActiveColor = darkDropdown
    ? "bg-[#F59E0B]/10"
    : "bg-brand-purple/10 dark:bg-brand-purple/20";

  const dropTextPrimary = darkDropdown
    ? "text-white/90"
    : "text-slate-700 dark:text-slate-200";

  const dropTextSecondary = darkDropdown
    ? "text-white/50"
    : "text-slate-600 dark:text-slate-300";

  const pillBg = darkDropdown
    ? "bg-white/5 border border-white/10 text-white/60 hover:bg-[#F59E0B]/20 hover:border-[#F59E0B]/40 hover:text-[#F59E0B]"
    : "bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-brand-purple/10 hover:border-brand-purple/30 hover:text-brand-purple";

  const showDropdown = open && (filtered.length > 0 || value.trim() === "");

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div ref={wrapperRef} className={`relative ${className}`} style={{ isolation: "isolate" }}>

      {/* Input row */}
      <div className={`flex items-center gap-2 ${inputBg} ${inputFocusRing} rounded-2xl transition-all duration-200 ${inputWrapBase}`}>
        <Search
          size={compact ? 16 : 18}
          className={`shrink-0 transition-colors ${iconColor}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => { onChange?.(e.target.value); setActiveIdx(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`flex-1 bg-transparent outline-none font-semibold ${inputTextColor} ${compact ? "text-sm" : "text-sm sm:text-base"}`}
        />
        {value && (
          <button
            type="button"
            onClick={() => { onChange?.(""); inputRef.current?.focus(); }}
            className={`shrink-0 p-0.5 rounded-full transition-all ${clearBtnColor}`}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Dropdown ─────────────────────────────────────────────────────────── */}
      {(showDropdown || showEmpty) && (
        <div
          className={`absolute left-0 right-0 mt-2 ${dropBg} rounded-2xl overflow-hidden`}
          style={{ zIndex: 9999, maxHeight: 440, overflowY: "auto", top: "100%" }}
        >
          {/* Filtered suggestions */}
          {filtered.length > 0 && (
            <div>
              <p className={`px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${dropHeaderColor}`}>
                <MapPin size={10} /> Suggestions
              </p>
              {filtered.map((s, i) => {
                const badge = BADGE[s.type] || BADGE.area;
                return (
                  <button
                    key={`${s.label}-${i}`}
                    type="button"
                    className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors ${
                      i === activeIdx ? dropItemActiveColor : dropItemHover
                    }`}
                    onMouseDown={(e) => { e.preventDefault(); commit(s.label); }}
                    onMouseEnter={() => setActiveIdx(i)}
                  >
                    <span className="text-lg shrink-0">{s.icon}</span>
                    <span className={`flex-1 text-sm font-semibold truncate ${dropTextPrimary}`}>
                      {highlightMatch(s.label, value, darkDropdown)}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* No results */}
          {showEmpty && (
            <div className="px-4 py-6 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className={`text-sm font-semibold ${dropTextSecondary}`}>
                No places found for "{value}"
              </p>
              <p className={`text-xs mt-1 ${dropHeaderColor}`}>Press Enter to search anyway</p>
            </div>
          )}

          {/* Empty input: show recent + trending + zones */}
          {open && value.trim() === "" && (
            <>
              {/* Recent searches */}
              {recent.length > 0 && (
                <div>
                  <p className={`px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${dropHeaderColor}`}>
                    <Clock size={10} /> Recent Searches
                  </p>
                  {recent.map((term) => (
                    <div
                      key={term}
                      className={`flex items-center gap-3 px-4 py-2.5 group cursor-pointer transition-colors ${dropItemHover}`}
                      onMouseDown={(e) => { e.preventDefault(); commit(term); }}
                    >
                      <Clock size={14} className={`shrink-0 ${darkDropdown ? "text-white/30" : "text-slate-300"}`} />
                      <span className={`flex-1 text-sm font-semibold ${dropTextSecondary}`}>{term}</span>
                      <button
                        type="button"
                        className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full ${darkDropdown ? "hover:bg-white/10 text-white/40" : "hover:bg-slate-200 text-slate-400"}`}
                        onMouseDown={(e) => handleDeleteRecent(e, term)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Trending */}
              <div>
                <p className={`px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${dropHeaderColor}`}>
                  <TrendingUp size={10} /> Trending Now
                </p>
                {TRENDING.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors ${dropItemHover}`}
                    onMouseDown={(e) => { e.preventDefault(); commit(t); }}
                  >
                    <TrendingUp size={14} className="text-amber-400 shrink-0" />
                    <span className={`text-sm font-semibold ${dropTextSecondary}`}>{t}</span>
                  </button>
                ))}
              </div>

              {/* Browse by location pills */}
              <div className="pb-4">
                <p className={`px-4 pt-3 pb-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${dropHeaderColor}`}>
                  <Navigation size={10} /> Browse by Location
                </p>
                <div className="px-4 flex flex-wrap gap-2">
                  {NEARBY_ZONES.filter((z) => z.type === "area" || z.type === "metro").map((z) => (
                    <button
                      key={z.label}
                      type="button"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${pillBg}`}
                      onMouseDown={(e) => { e.preventDefault(); commit(z.label); }}
                    >
                      <span>{z.icon}</span> {z.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Highlight matching text ───────────────────────────────────────────────────
function highlightMatch(text, query, dark = false) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  const highlightClass = dark
    ? "bg-[#F59E0B]/25 text-[#F59E0B] font-black rounded px-0.5"
    : "bg-brand-purple/15 text-brand-purple font-black rounded px-0.5";
  return (
    <>
      {text.slice(0, idx)}
      <mark className={highlightClass}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default SmartSearchBar;
