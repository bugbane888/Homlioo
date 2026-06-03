import React from "react";
import PageTransition from "../../components/common/PageTransition";
import Logo from "../../components/common/Logo";
import { ABOUT_STATS, FOUNDERS } from "../../constants/data";

const About = () => {
  return (
    <PageTransition>
      <div className="bg-white dark:bg-slate-900 transition-colors">
        {/* --- 1. HERO SECTION (RESTORED EXACTLY) --- */}
        <section className="bg-[#0F172A] pt-24 pb-20 px-6 text-center text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-[900] mt-8 mb-6 tracking-tighter leading-tight">
              Reimagining the <br />
              <span className="text-brand-amber">Way You Live</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              We don't just find you a place to sleep. We curate your next
              sanctuary — blending safety, community, and uncompromising quality
              into every space we bring to you.
            </p>
          </div>
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple opacity-10 blur-[120px]"></div>
        </section>

        {/* --- 2. VISION & STATS SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Origin Text */}
            <div className="space-y-6">
              <span className="text-brand-purple font-black text-[10px] uppercase tracking-[0.3em]">
                Our Origin
              </span>
              <h2 className="text-3xl md:text-4xl font-[900] text-brand-navy dark:text-white tracking-tighter">
                The Vision of a <br /> Curated Sanctuary
              </h2>
              <div className="space-y-6 text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                <p>
                  <span className="inline-block translate-y-1"><Logo size="sm" showIcon={false} /></span> was born from a simple observation: the transition to
                  a new city is often marred by the stress of finding a living
                  space that truly feels like home.
                </p>
                <p>
                  Traditional PG listings were a sea of unverified photos,
                  broken promises, and hidden costs that left students feeling
                  cheated before they even unpacked.
                </p>
                <p>
                  Today, <span className="inline-block translate-y-1"><Logo size="sm" showIcon={false} /></span> stands as Greater Noida's most trusted smart PG
                  search platform — where every listing is a promise, not just a
                  post.
                </p>
              </div>
            </div>

            {/* Right: Purple Stats Card */}
            <div className="bg-brand-purple rounded-[3rem] p-10 lg:p-14 text-white text-center shadow-2xl shadow-purple-900/30">
              <div className="text-6xl mb-6">🏠</div>
              <h3 className="text-5xl font-[900] mb-2 tracking-tighter">
                10,000+
              </h3>
              <p className="text-purple-200 font-medium mb-12">
                Students empowered across India
              </p>

              <div className="grid grid-cols-2 gap-4">
                {ABOUT_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur-sm"
                  >
                    <div className="text-xl font-black mb-1">{s.n}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-purple-200">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. THE VISIONARIES SECTION --- */}
        <section className="bg-slate-50 dark:bg-slate-800/50 py-24 px-6 transition-colors">
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-brand-purple font-black text-[10px] uppercase tracking-[0.3em]">
              The Visionaries
            </span>
            <h2 className="text-3xl md:text-4xl font-[900] text-brand-navy dark:text-white mt-4 mb-16 tracking-tighter">
              Built by Students, for Students
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
              {FOUNDERS.map((f) => (
                <div
                  key={f.name}
                  className="bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm group hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-brand-purple/10 dark:bg-brand-purple/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                      {f.photo ? (
                        <img
                          src={f.photo}
                          alt={f.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        f.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-[900] text-brand-navy dark:text-white tracking-tight">
                        {f.name}
                      </h4>
                      <p className="text-brand-purple font-bold text-xs">
                        {f.role}
                      </p>
                      <span className="inline-block mt-2 bg-purple-50 dark:bg-purple-900/30 text-brand-purple dark:text-purple-300 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        {f.tag}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. FINAL PROMISE SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="bg-brand-amber rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-amber-500/20">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-[900] text-brand-navy mb-6 tracking-tighter leading-tight flex items-center justify-center gap-3">
                <Logo size="lg" showIcon={false} /> is not just a platform.
              </h2>
              <p className="text-amber-900/70 text-base md:text-lg font-bold mb-10 max-w-xl mx-auto">
                It is a commitment — to transparency, to quality, and to you.
              </p>
              <div className="space-y-2">
                <p className="text-brand-navy font-black text-xl italic tracking-tighter">
                  Welcome home. 🏡
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-900/40 flex items-center justify-center gap-1">
                  <Logo size="sm" showIcon={false} /> — Smart PG Search · India
                </p>
              </div>
            </div>
            {/* Decorative design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-navy/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
