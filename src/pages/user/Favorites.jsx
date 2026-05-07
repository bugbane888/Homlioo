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

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-brand-navy dark:text-white tracking-tighter">
            My Saved Sanctuaries
          </h1>
          <p className="text-slate-500 font-medium">
            You have {savedProperties.length} items saved.
          </p>
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((pg) => (
              <ListingCard key={pg.id} pg={pg} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-700">
            <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold dark:text-white mb-2">
              No favorites yet.
            </h3>
            <p className="text-slate-400 mb-8">
              Start exploring and save the PGs you love!
            </p>
            <Button onClick={() => navigate("/listings")}>
              Browse Listings
            </Button>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Favorites;
