import React from "react";
import { useProperties } from "../../context/PropertyContext";
import { useSaved } from "../../context/SavedContext";
import ListingCard from "../../components/listings/ListingCard";
import PageTransition from "../../components/common/PageTransition";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { properties } = useProperties();
  const { savedIds } = useSaved();
  const navigate = useNavigate();

  // Filter properties that have their IDs in the savedIds array
  const savedList = properties.filter((p) => savedIds.includes(p.id));

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12 transition-colors">
        <div className="mb-10">
          <h1 className="text-4xl font-[900] text-brand-navy dark:text-white tracking-tighter italic">
            My Shortlist
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1 italic">
            You have {savedList.length} properties saved
          </p>
        </div>

        {savedList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedList.map((pg) => (
              <ListingCard key={pg.id} pg={pg} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-700 transition-colors">
            <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-black dark:text-white mb-2 tracking-tight">
              Your shortlist is empty
            </h3>
            <p className="text-slate-400 text-sm font-medium mb-8">
              Click the heart on any PG card to save it here for later.
            </p>
            <Button className="mx-auto" onClick={() => navigate("/listings")}>
              Explore Properties
            </Button>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Favorites;
