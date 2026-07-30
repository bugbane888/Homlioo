export const LISTINGS_DATA = [];

/**
 * HOME PAGE STATS
 * As seen in the amber bar on the home page screenshot.
 */
export const STATS = [
  { n: "10K+", label: "Targeting PGs" },
  { n: "0", label: "Brokerage Fee" },
  { n: "100%", label: "Verified Listings" },
];

/**
 * ABOUT PAGE STATS
 * As seen in the purple card on the About page screenshot.
 */
export const ABOUT_STATS = [
  { n: "500+", label: "Verified PGs" },
  { n: "₹0", label: "Brokerage" },
  { n: "50pt", label: "Checklist" },
  { n: "24h", label: "Support" },
];

/**
 * FOUNDERS DATA
 * High-fidelity descriptions from the provided Visionaries PDF.
 */
export const FOUNDERS = [
  {
    name: "Nitish Patel",
    role: "Founder",
    tag: "Vision & Strategy",
    icon: "👤",
    photo: "https://cdn.builder.io/api/v1/image/assets%2Fe64f25ae71a840eda495cf48dbdcb6d2%2Fc961203008444d82b668ac7e97bf2654?format=webp&width=400",
    desc: "Nitish is the driving force behind HOMLiOO's vision of making student housing transparent, safe, and stress-free. Having navigated the overwhelming and often misleading PG market firsthand, he set out to build a platform where every listing is honest and every price is clear.",
  },
  {
    name: "Neeraj Kumar",
    role: "Founder",
    tag: "Operations & Ground",
    icon: "👤",
    photo: "https://cdn.builder.io/api/v1/image/assets%2Fe64f25ae71a840eda495cf48dbdcb6d2%2F1b7dcff3bfb841f6a21ada5cb77f6c56?format=webp&width=400",
    desc: "Neeraj brings the operational backbone to HOMLiOO, ensuring that every property meets a standard worth living in. His focus on ground-level verification, owner relationships, and resident experience is what makes the HOMLiOO promise more than just words.",
  },
];

/**
 * CORE PRINCIPLES
 * Extracted from the "Our Core Principles" section of the PDF.
 */
export const CORE_PRINCIPLES = [
  {
    title: "Uncompromising Quality",
    desc: "We maintain a rigorous 50-point verification checklist for every home, ensuring premium standards of cleanliness, safety, and comfort.",
  },
  {
    title: "Community First",
    desc: "A home is more than its walls. We foster a vibrant ecosystem where like-minded professionals and students can connect and thrive.",
  },
  {
    title: "Seamless Experience",
    desc: "From digital viewings to paperless move-ins, we use technology to remove friction and put time back into your life.",
  },
];

/**
 * GENDER COLOR MAP
 * Used for dynamic Tailwind class assignment.
 */
export const GENDER_CLASSES = {
  girls: "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
  boys: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  coed: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  default:
    "bg-slate-50 text-slate-700 dark:bg-slate-900/20 dark:text-slate-400",
};
