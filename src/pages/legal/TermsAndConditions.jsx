import React, { useEffect } from "react";
import PageTransition from "../../components/common/PageTransition";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      num: "1",
      title: "DEFINITIONS AND SCOPE",
      items: [
        { label: '"Platform"', text: 'refers to the HOMLiOO mobile application, web portal (www.homliooo.com), and all aligned official support communication channels.' },
        { label: '"HOMLiOO", "Company", "We", "Us", or "Our"', text: 'refers explicitly to the corporate operating entity of the technology interface.' },
        { label: '"Users"', text: 'collectively refers to casual Visitors, registered Students, and registered Property Owners.' },
        { label: '"Students"', text: 'refers to any individual utilizing the platform resources to discover, view, filter, sort, compare, or shortlist Paying Guest (PG) accommodations.' },
        { label: '"PG Owners"', text: 'refers to property owners, operators, hosts, managers, or legally authorized representatives listing and hosting details of their accommodation on the platform.' },
        { label: '"Intermediary Status"', text: "All users explicitly acknowledge that HOMLiOO operates strictly as a digital intermediary marketplace under the definition of Section 2(1)(w) of India's Information Technology Act, 2000." },
      ],
    },
    {
      num: "2",
      title: "NATURE OF HOMLiOO SERVICES",
      items: [
        { label: "Discovery Framework", text: "HOMLiOO serves as an open technology-driven discovery model that provides tools for Students to review verified PG listings matching their educational campus, amenities, and budget constraints." },
        { label: "Zero Student Fees", text: "The platform operates completely free of charge for students looking for properties. HOMLiOO does not charge any brokerage, booking fees, or hidden platform commissions from student accounts." },
        { label: "Exclusion of Rental Contracts", text: "HOMLiOO is entirely excluded from any real lease, license, or tenancy agreement generated between a Student and a PG Owner. The platform does not collect rental deposits, manage physical inventory, or set binding offline terms for properties." },
      ],
    },
    {
      num: "3",
      title: "USER ACCOUNT PROVISIONING & ELIGIBILITY",
      items: [
        { label: "Age Requirement", text: "You must be at least 18 years of age or possess valid parental or legal guardian supervision to access and establish an account profile on the platform." },
        { label: "OTP Authentication", text: "Accounts are provisioned and verified solely via mobile One-Time Passwords (OTPs). You are strictly responsible for maintaining control of your active mobile device and securing your platform session from unauthorized local use." },
        { label: "Data Accuracy", text: "Users warrant that all uploaded or shared details during verification or signup (such as student college enrollment labels or property authorization status) are authentic, accurate, and current." },
      ],
    },
    {
      num: "4",
      title: "REGULATORY RULES FOR PG OWNERS",
      items: [
        { label: "Identity Verification", text: "To publish any property live to the user directory, PG Owners must upload valid government identity proofs (such as Aadhaar or PAN) for backend authentication. In alignment with our Privacy Policy, these records are strictly encrypted and never shared with public users or third parties outside the direct authorization chain." },
        { label: "Field Inspection Authorization", text: "Owners explicitly grant the HOMLiOO field operations team full authorization to visit the physical listing, map precise geolocation data, verify structural amenities, and take digital photographs for platform inclusion." },
        { label: "Data Freshness and Accuracy", text: "It is the absolute responsibility of the PG Owner to keep rental availability metrics, house regulations, and real monthly pricing breakdowns exact. Displaying deliberately deceptive pricing structures or non-existent rooms is a material breach of these terms." },
        { label: "Marketing & Visibility Enhancements", text: "Fees paid by PG Owners to unlock premium position updates, high-visibility filters, or business dashboards are entirely non-refundable and do not constitute a performance guarantee for active room bookings." },
      ],
    },
    {
      num: "5",
      title: "GUIDELINES FOR STUDENT USERS",
      items: [
        { label: "Independent Due Diligence", text: "While HOMLiOO deploys a physical verification visit to check property parameters, students are strongly directed to visually inspect the site in person, confirm utility inclusions with the owner, and verify all documentation before exchanging financial tokens, booking tokens, or security deposits." },
        { label: "Authentic Review Integrity", text: "When authoring platform reviews, students guarantee that the text reflects an accurate, uncompensated personal residency experience. All reviews are displayed tied solely to the verified college brand to maximize peer trust while cleanly shielding the user's explicit full name." },
      ],
    },
    {
      num: "6",
      title: "PROHIBITED PLATFORM ACTIVITIES",
      intro: "Users explicitly agree to not commit, host, or participate in the following restrictive acts:",
      bullets: [
        "Publishing an accommodation listing without possessing explicit legal title, property deeds, or a clean management mandate.",
        "Generating fake, malicious, paid, or structurally misleading property reviews.",
        "Deploying automated scrapers, data-mining spiders, crawl bots, or extraction scripts to capture user numbers, addresses, or listing databases from the platform interface.",
        "Using partner phone numbers generated via the platform call actions to dispatch marketing spam, cross-sell separate products, or harass individuals outside accommodation scope.",
        "Impersonating any third-party entity, other student profile, fellow property manager, or HOMLiOO executive staff member.",
      ],
      footer: "Violations of this section will translate into immediate profile blockages, platform blacklisting, and where relevant, legal escalation under the terms of India's IT Act 2000.",
    },
    {
      num: "7",
      title: "LIMITATION OF INDEPENDENT LIABILITY",
      items: [
        { label: "As-Is Availability", text: 'All core search capabilities, AI Match Scores, campus walking metrics, and property photos are distributed on an "as-is" and "as-available" architecture. HOMLiOO disclaims any real warranties concerning real-time operational availability or instant status tracking.' },
        { label: "Exclusion of Interpersonal Liability", text: "HOMLiOO assumes zero legal or financial liability for physical injuries, lease defaults, contract breaches, room maintenance problems, unexpected lockouts, or theft situations encountered by users during their subsequent offline tenancy periods." },
      ],
    },
    {
      num: "8",
      title: "INTELLECTUAL PROPERTY & DATA LICENSING",
      items: [
        { label: "Corporate Ownership", text: "All custom platform logos, user interface elements, graphic configurations, matching engine code frameworks, and field-captured photography remain the absolute property of HOMLiOO." },
        { label: "Content Grant", text: "By contributing reviews or text blocks, users hand HOMLiOO a perpetual, worldwide, zero-royalty license to safely process, display, format, and host that text to support the structural operations and transparency metrics of the community marketplace." },
      ],
    },
    {
      num: "9",
      title: "SYSTEM ACCOUNT TERMINATION",
      text: "Users can choose to sever their account profiles at any given time by selecting the platform termination settings or by directly mailing a request to homlioopg@gmail.com. Account data-removal cycles will progress inside the bounds outlined in the platform Privacy Policy.",
    },
    {
      num: "10",
      title: "GOVERNING LAW & LEGAL JURISDICTION",
      text: "These Terms and Conditions are managed, interpreted, and governed cleanly in complete alignment with the legal rules of the Republic of India. Any litigation, dispute, or judicial proceeding arising from these terms will fall strictly under the exclusive legal jurisdiction of the courts located inside Greater Noida, Uttar Pradesh.",
    },
    {
      num: "11",
      title: "INDEMNIFICATION",
      text: "You agree to safeguard, indemnify, and hold entirely harmless HOMLiOO, its management founders, corporate officers, field representatives, and operational agents from any loss, liability, cost, legal damage, or expense (including advocate fees) flowing from your direct misuse of platform services, breach of these active terms, or leasehold property disputes initiated with other platform participants.",
    },
  ];

  return (
    <PageTransition>
      <div className="bg-[#F8F7F4] dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* ── Header Card ─────────────────────────────────────────────────── */}
          <div className="bg-[#0F2133] rounded-3xl overflow-hidden shadow-2xl mb-6">
            {/* Decorative blobs */}
            <div className="relative overflow-hidden">
              <div className="absolute top-[-30%] left-[-10%] w-72 h-72 bg-brand-purple rounded-full filter blur-3xl opacity-30 pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-5%] w-60 h-60 bg-amber-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />

              <div className="relative z-10 px-8 pt-10 pb-8 text-center flex flex-col items-center gap-3">
                {/* Logo */}
                <img src="/homlioo-logo.png" alt="HOMLiOO" className="w-20 h-20 object-contain drop-shadow-2xl" />
                <span className="text-2xl font-[900] tracking-tight">
                  <span className="text-blue-400">HOM</span><span className="text-green-400">LiOO</span>
                </span>

                {/* Title */}
                <div className="mt-2">
                  <h1 className="text-3xl sm:text-4xl font-[900] text-white tracking-tight">
                    TERMS &amp; CONDITIONS
                  </h1>
                  <p className="text-amber-400 font-bold tracking-widest uppercase text-xs mt-3">
                    India's Verified PG Accommodation Discovery Platform
                  </p>
                  <p className="text-slate-400 text-xs mt-2 font-medium">
                    Effective Date: June 1, 2025 &nbsp;|&nbsp; Version 1.0
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-500/10 border-t border-amber-500/20 px-8 py-5 text-center">
              <p className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">⚠ Important Notice to All Users</p>
              <p className="text-slate-300 text-sm leading-relaxed max-w-3xl mx-auto">
                HOMLiOO operates strictly as an <strong className="text-white">intermediary technology framework</strong>. It is not a real estate agent, broker, property manager, or landlord.
                All leasing, physical verifications, and financial transactions take place independently and directly between the respective parties off the platform.
              </p>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Welcome to HOMLiOO (the "Platform"). By accessing, browsing, registering, or using our website, mobile application, or any associated digital services, you confirm that you have read, understood, and agreed to be legally bound by these Terms and Conditions ("Terms").
              If you do not agree to these terms, please immediately discontinue using the platform.
            </p>
          </div>

          {/* ── Sections 1–11 ────────────────────────────────────────────────── */}
          <div className="space-y-4">
            {sections.map((sec) => (
              <div
                key={sec.num}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                {/* Section header */}
                <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 px-6 py-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0F2133] text-amber-400 text-xs font-black flex items-center justify-center shrink-0">
                    {sec.num}
                  </span>
                  <h2 className="text-sm font-[900] text-brand-navy dark:text-white tracking-tight uppercase">
                    {sec.title}
                  </h2>
                </div>

                {/* Section body */}
                <div className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                  {/* Intro text (section 6) */}
                  {sec.intro && <p className="font-medium text-slate-700 dark:text-slate-200">{sec.intro}</p>}

                  {/* Definition / item list */}
                  {sec.items && sec.items.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-amber-500 mt-0.5 shrink-0">▸</span>
                      <p>
                        <strong className="text-slate-800 dark:text-white">{item.label}:</strong>{" "}
                        {item.text}
                      </p>
                    </div>
                  ))}

                  {/* Bullet list (section 6) */}
                  {sec.bullets && (
                    <ul className="space-y-2 mt-2">
                      {sec.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Footer warning text (section 6) */}
                  {sec.footer && (
                    <p className="mt-3 text-red-500 dark:text-red-400 font-semibold text-xs bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl border border-red-100 dark:border-red-900/30">
                      {sec.footer}
                    </p>
                  )}

                  {/* Plain paragraph (sections 9, 10, 11) */}
                  {sec.text && <p>{sec.text}</p>}
                </div>
              </div>
            ))}

            {/* ── Section 12 — Grievance Officer ──────────────────────────── */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 px-6 py-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0F2133] text-amber-400 text-xs font-black flex items-center justify-center shrink-0">
                  12
                </span>
                <h2 className="text-sm font-[900] text-brand-navy dark:text-white tracking-tight uppercase">
                  GRIEVANCE REDRESSAL ARCHITECTURE
                </h2>
              </div>

              <div className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="mb-5">
                  In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021,
                  any compliance issues or platform structural complaints should be routed to our Grievance Officer:
                </p>

                {/* Grievance Officer Card */}
                <div className="bg-[#0F2133]/5 dark:bg-white/5 border border-[#0F2133]/10 dark:border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Designated</p>
                      <p className="text-base font-[900] text-brand-navy dark:text-white">Grievance Officer</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Name",                value: "Neeraj Kumar" },
                      { label: "Designation",         value: "Platform Operator — HOMLiOO" },
                      { label: "Official Intake Email", value: "homlioopg@gmail.com", href: "mailto:homlioopg@gmail.com" },
                      { label: "Corporate Address",   value: "Greater Noida, Uttar Pradesh, India" },
                      { label: "Acknowledgement",     value: "Within 72 hours of receipt" },
                      { label: "Resolution",          value: "Within 1 week of acknowledgement" },
                    ].map(({ label, value, href }) => (
                      <div
                        key={label}
                        className="bg-white dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-600"
                      >
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                          {label}
                        </p>
                        {href ? (
                          <a href={href} className="font-bold text-brand-purple hover:underline">
                            {value}
                          </a>
                        ) : (
                          <p className="font-bold text-slate-800 dark:text-white">{value}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    You may contact the Grievance Officer for any complaints or concerns relating to our platform.
                    We are committed to addressing your concerns promptly and transparently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer note ─────────────────────────────────────────────────── */}
          <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium pb-4">
            © {new Date().getFullYear()} HOMLiOO Technology Private Limited · Greater Noida, Uttar Pradesh, India
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TermsAndConditions;
