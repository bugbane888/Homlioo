import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProperties } from "../../context/PropertyContext";
import { STATS } from "../../constants/data";
import ListingCard from "../../components/listings/ListingCard";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { search: urlSearch } = useLocation();
  const { properties } = useProperties();

  // Search State
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("Any Budget");
  const [gender, setGender] = useState("Any Gender");

  const featured = properties.slice(0, 3);

  // LOGIC: Scroll to "How It Works" if user clicks from Navbar on another page
  useEffect(() => {
    const params = new URLSearchParams(urlSearch);
    if (params.get("scroll") === "how-it-works") {
      const element = document.getElementById("how-it-works");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [urlSearch]);

  const isSearchDisabled = !search.trim() || budget === "Any Budget" || gender === "Any Gender";

  const handleSearch = (e) => {
    e.preventDefault();
    if (isSearchDisabled) return;
    const params = new URLSearchParams();
    if (search) params.append("location", search);
    if (budget !== "Any Budget") params.append("budget", budget);
    if (gender !== "Any Gender") params.append("gender", gender);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <PageTransition>
      {/* --- HERO SECTION: DEEP NAVY PIXEL-PERFECT --- */}
      <section className="bg-[#0F2133] pt-12 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative text-center overflow-hidden">
        {/* Subtle Gradient Glows */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,#F59E0B,transparent_50%)]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Tagline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-[900] text-white leading-tight sm:leading-tight mb-2 sm:mb-4 tracking-tight">
            Find Your Perfect PG
          </h1>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-[900] text-[#F59E0B] leading-tight sm:leading-tight mb-6 sm:mb-10 tracking-tight">
            Near Your College
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium mb-8 sm:mb-12 opacity-80 leading-relaxed max-w-2xl mx-auto">
            Verified listings. Transparent pricing. Zero broker fees.
            <br />
            On a mission to empower{" "}
            <span className="text-[#F59E0B] font-bold">
              10,000+ students
            </span>{" "}
            across India.
          </p>

          {/* --- PILL-SHAPED SEARCH BAR (AS PER SCREENSHOT) --- */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl md:rounded-full p-2 sm:p-1.5 flex flex-col md:flex-row items-stretch md:items-center max-w-4xl mx-auto mb-6 sm:mb-10 shadow-2xl transition-all gap-2 md:gap-0"
          >
            {/* 1. Location Input */}
            <div className="flex-[1.5] flex items-center gap-3 px-4 sm:px-6 py-3 md:py-2 w-full">
              <Search size={16} className="text-slate-300 shrink-0" />
              <input
                type="text"
                placeholder="Search by area, college..."
                className="bg-transparent border-none outline-none w-full text-slate-700 font-bold text-sm placeholder:text-slate-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1.5px] h-8 bg-slate-100"></div>

            {/* 2. Budget Select */}
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="flex-1 px-4 sm:px-6 py-3 md:py-2 text-slate-500 font-black text-sm outline-none cursor-pointer text-center md:text-left appearance-none bg-transparent"
            >
              <option>Any Budget</option>
              <option value="6000">Under ₹6,000</option>
              <option value="9000">₹6,000 - ₹9,000</option>
              <option value="9000+">More than ₹9,000</option>
            </select>

            {/* Divider */}
            <div className="hidden md:block w-[1.5px] h-8 bg-slate-100"></div>

            {/* 3. Gender Select */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="flex-1 px-4 sm:px-6 py-3 md:py-2 text-slate-500 font-black text-sm outline-none cursor-pointer text-center md:text-left appearance-none bg-transparent"
            >
              <option>Any Gender</option>
              <option>Boys</option>
              <option>Girls</option>
              <option>Co-ed</option>
            </select>

            {/* 4. Search Button */}
            <button
              type="submit"
              disabled={isSearchDisabled}
              className={`px-6 sm:px-10 py-3 md:py-3.5 rounded-xl md:rounded-full font-[900] text-sm flex items-center justify-center gap-2 transition-all shadow-lg md:ml-2 w-full md:w-auto shrink-0 ${
                isSearchDisabled
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-[#F59E0B] hover:bg-amber-500 text-[#0F2133] shadow-amber-500/20"
              }`}
            >
              <Search size={16} strokeWidth={3} /> <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* UNIVERSITY PILLS (Tabs behind search) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {[
              "NIET",
              "GL Bajaj",
              "Sharda",
              "Galgotias",
              "Bennett",
              "Knowledge Park",
              "Pari Chowk",
            ].map((l) => (
              <span
                key={l}
                onClick={() => navigate(`/listings?location=${l}`)}
                className="bg-[#1E2E3D] border border-white/5 text-slate-400 px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-[#F59E0B] hover:text-[#0F2133] transition-all"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- AMBER STATS BAR --- */}
      <section className="bg-[#D97706] py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 sm:gap-16 md:gap-40 flex-wrap">
          {STATS.map((s) => (
            <div key={s.label} className="text-center min-w-[120px]">
              <div className="font-[900] text-3xl sm:text-4xl text-amber-100">{s.n}</div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-amber-900/40 mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CATEGORY GRID SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div className="grid grid-rows-2 gap-8 text-left">
          <CategoryCard
            title="Boys"
            sub="Sophisticated retreats"
            emoji="🛏️"
            bg="bg-[#0D1B2A]"
            accent="text-amber-500"
            border="border-amber-500"
            onClick={() => navigate("/listings?gender=Boys")}
          />
          <CategoryCard
            title="Co-living"
            sub="Community driven"
            emoji="🌿"
            bg="bg-[#052E16]"
            accent="text-emerald-500"
            border="border-emerald-500"
            onClick={() => navigate("/listings?gender=Co-ed")}
          />
        </div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-[#4A0520] rounded-[3rem] p-12 relative overflow-hidden flex flex-col justify-between group cursor-pointer border-l-[8px] border-pink-500 min-h-[450px] text-left"
          onClick={() => navigate("/listings?gender=Girls")}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] opacity-5 group-hover:scale-110 transition-transform duration-700">
            🌸
          </div>
          <div className="relative z-10">
            <span className="text-pink-400 text-xs font-black uppercase tracking-[0.3em]">
              PG FOR
            </span>
            <h2 className="text-5xl md:text-6xl font-[900] text-white mt-2 tracking-tighter leading-none">
              Girls
            </h2>
          </div>
          <div className="relative z-10 flex justify-between items-end">
            <p className="text-pink-200/60 text-sm font-medium leading-relaxed max-w-[200px]">
              Safe, stylish & <br /> peaceful havens
            </p>
            <div className="bg-white text-[#4A0520] px-8 py-3 rounded-full font-[900] text-xs uppercase tracking-widest transition-transform group-hover:scale-105 active:scale-95">
              Explore All →
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="bg-[#0F172A] py-28 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-brand-amber text-xs font-black tracking-[0.4em] uppercase">
            Step by Step
          </span>
          <h2 className="text-4xl md:text-5xl font-[900] text-white mt-4 mb-20 tracking-tighter leading-snug">
            Find Your PG in 3 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search",
                desc: "Enter your college, locality, or budget.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Compare Verified PGs",
                desc: "Compare up to 3 PGs side-by-side.",
                icon: "✅",
              },
              {
                step: "03",
                title: "Contact Directly",
                desc: "Zero brokerage. Call or WhatsApp the owner.",
                icon: "📞",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] text-left group hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">
                  {s.icon}
                </div>
                <span className="text-[#F59E0B] text-xs font-black uppercase tracking-widest">
                  Step {s.step}
                </span>
                <h4 className="text-xl font-black text-white mt-2 mb-4 tracking-tight leading-snug">
                  {s.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRENDING LISTINGS SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex justify-between items-end mb-14 text-left">
          <div>
            <span className="text-[#F59E0B] font-black text-xs uppercase tracking-[0.3em]">
              Trending Now
            </span>
            <h2 className="text-4xl font-[900] text-brand-navy dark:text-white mt-2 tracking-tighter leading-none">
              Top Verified PGs
            </h2>
          </div>
          <Button
            variant="outline"
            className="py-3 px-10 text-xs font-black uppercase tracking-widest rounded-full border-slate-200"
            onClick={() => navigate("/listings")}
          >
            View All Properties <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((pg) => (
            <ListingCard key={pg.id} pg={pg} />
          ))}
        </div>
      </section>

      {/* --- WHY HOMLiOO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32 text-center">
        <span className="text-brand-purple text-xs font-black tracking-[0.4em] uppercase">
          Why Choose Us
        </span>
        <h2 className="text-4xl md:text-5xl font-[900] text-brand-navy dark:text-white mt-4 mb-20 tracking-tighter leading-none">
          Features Built for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Distance-From-College"
            desc="See exact walk/auto time from PG to your college gate."
            bg="bg-yellow-50"
            icon="📍"
          />
          <FeatureCard
            title="Near Metro Station"
            desc="Find PGs within walking distance of metro stations."
            bg="bg-blue-50"
            icon="🚇"
          />
          <FeatureCard
            title="Near Hospital"
            desc="All listings show the nearest hospital and distance."
            bg="bg-emerald-50"
            icon="🏥"
          />
          <FeatureCard
            title="Compare PGs"
            desc="Side-by-side comparison on every parameter."
            bg="bg-purple-50"
            icon="⚖️"
          />
          <FeatureCard
            title="Zero Brokerage"
            desc="Students pay nothing. Only owners pay to list."
            bg="bg-orange-50"
            icon="🔒"
          />
          <FeatureCard
            title="Verification-First"
            desc="Every PG physically verified by our team."
            bg="bg-emerald-50"
            icon="✅"
          />
        </div>
      </section>
    </PageTransition>
  );
};

/**
 * REUSABLE CATEGORY CARD
 */
const CategoryCard = ({ title, sub, emoji, bg, accent, border, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`${bg} rounded-[2.5rem] p-10 relative overflow-hidden group cursor-pointer flex flex-col justify-between border-l-[8px] ${border} transition-all duration-300`}
    onClick={onClick}
  >
    <div className="absolute top-6 right-10 text-6xl lg:text-7xl opacity-10 group-hover:rotate-12 transition-transform duration-500">
      {emoji}
    </div>
    <div>
      <span
        className={`${accent} text-xs font-black uppercase tracking-[0.3em]`}
      >
        PG For
      </span>
      <h3 className="text-3xl lg:text-4xl font-[900] text-white mt-1 leading-snug tracking-tight">
        {title}
      </h3>
      <p className="text-white/30 text-base mt-3 font-medium">{sub}</p>
    </div>
    <div className="mt-6 flex items-center gap-2 text-white/50 text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">
      Browse Sanctuaries <ArrowRight size={14} />
    </div>
  </motion.div>
);

const FeatureCard = ({ title, desc, bg, icon }) => (
  <div
    className={`${bg} p-10 rounded-[2.5rem] text-left border border-slate-50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 group`}
  >
    <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h4 className="font-black text-brand-navy text-sm mb-3 uppercase tracking-tight">
      {title}
    </h4>
    <p className="text-slate-500 text-sm font-medium leading-relaxed">
      {desc}
    </p>
  </div>
);

export default Home;
