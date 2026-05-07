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
        className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${
          isOpen
            ? "fixed inset-x-4 bottom-4 top-auto rounded-2xl z-50 lg:relative lg:inset-auto lg:sticky lg:rounded-3xl lg:top-24 max-h-[80vh] overflow-y-auto"
            : "hidden lg:block sticky top-24 h-fit"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 font-black text-brand-navy">
            <Filter size={18} />
            <span>Filters</span>
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
        <div className="mb-8">
          <label className="block text-sm font-bold text-brand-navy mb-4">
            Max Budget: ₹{filters.maxBudget.toLocaleString()}
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

        {/* Gender Selection */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-brand-navy mb-4">
            Gender Preference
          </label>
          <div className="space-y-2">
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
                  className={`text-sm font-medium ${filters.gender === g ? "text-brand-purple font-bold" : "text-slate-500 group-hover:text-brand-navy"}`}
                >
                  {g}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Facilities Toggle */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-brand-navy mb-2">
            Essential Facilities
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="text-sm font-medium text-slate-600">
              Include Food
            </span>
            <input
              type="checkbox"
              checked={filters.food}
              onChange={() => dispatch({ type: "TOGGLE_FOOD" })}
              className="w-4 h-4 rounded text-brand-purple"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="text-sm font-medium text-slate-600">
              Air Conditioning (AC)
            </span>
            <input
              type="checkbox"
              checked={filters.ac}
              onChange={() => dispatch({ type: "TOGGLE_AC" })}
              className="w-4 h-4 rounded text-brand-purple"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="text-sm font-medium text-slate-600">
              Verified Only
            </span>
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={() => dispatch({ type: "TOGGLE_VERIFIED" })}
              className="w-4 h-4 rounded text-brand-purple"
            />
          </label>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-8 lg:hidden bg-brand-navy text-white py-3 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default FilterSidebar;
