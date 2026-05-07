import React from "react";
import { Filter, RotateCcw } from "lucide-react";

const FilterSidebar = ({ filters, dispatch }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 sticky top-24 h-fit shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 font-black text-brand-navy">
          <Filter size={18} />
          <span>Filters</span>
        </div>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="text-slate-400 hover:text-brand-purple transition-colors"
        >
          <RotateCcw size={16} />
        </button>
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
    </div>
  );
};

export default FilterSidebar;
