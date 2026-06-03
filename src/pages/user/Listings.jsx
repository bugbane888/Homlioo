import React, { useReducer, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProperties } from "../../context/PropertyContext";
import { useDebounce } from "../../hooks/useDebounce";
import ListingCard from "../../components/listings/ListingCard";
import ListingCardSkeleton from "../../components/listings/ListingCardSkeleton";
import FilterSidebar from "../../components/listings/FilterSidebar";
import { Search, MapPin } from "lucide-react";
import PageTransition from "../../components/common/PageTransition";

const FILTER_INIT = {
  gender: "All",
  maxBudget: 20000,
  food: false,
  ac: false,
  verified: false,
  search: "",
};

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_GENDER":
      return { ...state, gender: action.payload };
    case "SET_BUDGET":
      return { ...state, maxBudget: action.payload };
    case "TOGGLE_FOOD":
      return { ...state, food: !state.food };
    case "TOGGLE_AC":
      return { ...state, ac: !state.ac };
    case "TOGGLE_VERIFIED":
      return { ...state, verified: !state.verified };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "RESET":
      return FILTER_INIT;
    default:
      return state;
  }
}

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, isLoading } = useProperties();
  const [filters, dispatch] = useReducer(filterReducer, FILTER_INIT);
  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    const loc = searchParams.get("location");
    const gen = searchParams.get("gender");
    if (loc) dispatch({ type: "SET_SEARCH", payload: loc });
    if (gen) dispatch({ type: "SET_GENDER", payload: gen });
  }, [searchParams]);

  const filteredListings = useMemo(() => {
    return properties.filter((p) => {
      if (
        filters.gender !== "All" &&
        p.gender !== filters.gender &&
        p.gender !== "Co-ed"
      )
        return false;
      if (p.total > filters.maxBudget) return false;
      if (filters.food && !p.amenities?.includes("Food")) return false;
      if (filters.ac && !p.amenities?.includes("AC")) return false;
      if (filters.verified && !p.verified) return false;
      const s = debouncedSearch.toLowerCase();
      return (
        !s ||
        p.name.toLowerCase().includes(s) ||
        p.locality.toLowerCase().includes(s)
      );
    });
  }, [filters, debouncedSearch, properties]);

  return (
    <PageTransition>
      <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 min-h-screen transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* SIDEBAR (Stacks on top on mobile) */}
            <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24 lg:h-fit">
              <FilterSidebar filters={filters} dispatch={dispatch} />
            </aside>

            {/* RESULTS AREA */}
            <main className="flex-1 min-w-0">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 lg:gap-8">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[900] text-brand-navy dark:text-white tracking-tight leading-tight">
                    Found {filteredListings.length} <span className="text-brand-purple">Sanctuaries</span>
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mt-3 flex items-center gap-2">
                    <MapPin size={14} className="text-brand-purple shrink-0" /> Verified Stays in{" "}
                    <span className="text-brand-purple font-[900]">{filters.search || "All Locations"}</span>
                  </p>
                </div>

                <div className="relative w-full lg:w-96 group shrink-0">
                  <Search
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-purple transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    value={filters.search}
                    placeholder="Search area or college..."
                    onChange={(e) => {
                      const val = e.target.value;
                      dispatch({ type: "SET_SEARCH", payload: val });
                      setSearchParams({ location: val });
                    }}
                    className="w-full pl-14 pr-6 py-3 sm:py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] lg:rounded-full outline-none shadow-sm hover:shadow-md focus:shadow-lg focus:border-brand-purple dark:focus:border-brand-purple font-bold text-sm dark:text-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 auto-rows-max">
                {isLoading ? (
                  [...Array(6)].map((_, i) => <ListingCardSkeleton key={i} />)
                ) : filteredListings.length > 0 ? (
                  filteredListings.map((pg) => (
                    <ListingCard key={pg.id} pg={pg} />
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center bg-white dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-700">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner">
                      📍
                    </div>
                    <h3 className="text-xl font-[900] dark:text-white mb-2 tracking-tight">
                      No matching sanctuaries
                    </h3>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                      Try adjusting your filters or search criteria.
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Listings;
