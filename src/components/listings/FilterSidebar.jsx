import React, { useState } from "react";
import { Filter, RotateCcw, X } from "lucide-react";

const FilterSidebar = ({ filters, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden w-full mb-4 bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-2 font-bold text-brand-navy hover:bg-slate-50 transition-colors"
      >
        <Filter size={18} />
        <span>Show Filters</span>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Content */}
      <div
        className={`bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700 shadow-lg dark:shadow-xl transition-all ${
          isOpen
            ? "fixed inset-x-4 bottom-4 top-auto rounded-2xl z-50 lg:relative lg:inset-auto lg:sticky lg:rounded-3xl lg:top-24 max-h-[80vh] overflow-y-auto"
            : "hidden lg:block sticky top-24 h-fit"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 font-black text-brand-navy dark:text-white text-lg">
            <Filter size={20} />
            <span>Refine Search</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="text-slate-400 hover:text-brand-purple transition-colors"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Budget Range */}
        <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
          <label className="block text-sm font-bold text-brand-navy dark:text-white mb-4">
            Price Range: ₹{filters.maxBudget.toLocaleString()}
          </label>
          <input
            type="range"
            min="4000"
            max="20000"
            step="500"
            value={filters.maxBudget}
            onChange={(e) =>
              dispatch({ type: "SET_BUDGET", payload: Number(e.target.value) })
            }
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-purple"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
            <span>₹4K</span>
            <span>₹20K</span>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
          <label className="block text-sm font-bold text-brand-navy dark:text-white mb-4">
            Facilities
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* WiFi */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_WIFI" })}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                filters.wifi
                  ? "border-brand-purple bg-brand-purple/5"
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="text-2xl text-blue-500">📶</div>
              <span className="text-xs font-bold text-slate-600">WiFi</span>
            </button>

            {/* AC */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_AC" })}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                filters.ac
                  ? "border-brand-purple bg-brand-purple/5"
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="text-2xl text-cyan-400">❄️</div>
              <span className="text-xs font-bold text-slate-600">AC</span>
            </button>

            {/* Food */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_FOOD" })}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                filters.food
                  ? "border-brand-purple bg-brand-purple/5"
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="text-2xl">🍽️</div>
              <span className="text-xs font-bold text-slate-600">Food</span>
            </button>

            {/* Parking */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_PARKING" })}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                filters.parking
                  ? "border-brand-purple bg-brand-purple/5"
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="text-2xl">🚗</div>
              <span className="text-xs font-bold text-slate-600">Parking</span>
            </button>
          </div>
        </div>

        {/* Gender Selection */}
        <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
          <label className="block text-sm font-bold text-brand-navy dark:text-white mb-4">
            Gender
          </label>
          <div className="space-y-3">
            {["All", "Boys", "Girls", "Co-ed"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="gender"
                  checked={filters.gender === g}
                  onChange={() => dispatch({ type: "SET_GENDER", payload: g })}
                  className="w-4 h-4 text-brand-purple focus:ring-brand-purple"
                />
                <span
                  className={`text-sm font-medium ${filters.gender === g ? "text-brand-purple font-bold" : "text-slate-600 group-hover:text-brand-navy"}`}
                >
                  {g}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Verified Only Toggle */}
        <div className="mb-8">
          <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-all">
            <span className="text-sm font-bold text-brand-navy">
              Verified Only
            </span>
            <div className={`w-12 h-7 rounded-full transition-all ${filters.verified ? "bg-brand-purple" : "bg-slate-300"}`}>
              <div className={`w-6 h-6 bg-white rounded-full transition-all ${filters.verified ? "translate-x-6" : "translate-x-0.5"} mt-0.5`}></div>
            </div>
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={() => dispatch({ type: "TOGGLE_VERIFIED" })}
              className="hidden"
            />
          </label>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="w-full py-3 rounded-2xl border border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
        >
          Reset Filters
        </button>

      </div>
    </>
  );
};

export default FilterSidebar;
