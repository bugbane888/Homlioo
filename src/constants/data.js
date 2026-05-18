/**
 * MASTER LISTINGS DATA
 * Contains all high-fidelity fields seen in the screenshots:
 * Rules, College Distances, Transit, and Google Map URLs.
 */
export const LISTINGS_DATA = [
  {
    id: 1,
    name: "Sunrise Girls PG",
    locality: "Knowledge Park II",
    college: "4 min walk · NIET",
    price: 6500,
    total: 9000,
    gender: "Girls",
    sharing: "Double sharing",
    rating: 4.8,
    reviews: 34,
    verified: true,
    roomsLeft: 2,
    amenities: [
      "WiFi",
      "AC",
      "Food",
      "CCTV",
      "Laundry",
      "Parking",
      "Power Backup",
    ],
    tags: ["Women Safety", "Verified"],
    metro: "8 min walk · Pari Chowk Metro",
    hospital: "5 min · Yatharth Hospital",
    mapUrl: "https://www.google.com/maps/search/NIET+Greater+Noida",
    rules: [
      "Entry: Before 10 PM",
      "No smoking on premises",
      "Guest allowed till 8 PM",
      "Monthly rent due by 5th",
    ],
    description:
      "A safe, clean PG for girls near NIET. All meals included, 24-hour security, and a peaceful environment for study. Managed by professional hospitality staff.",
  },
  {
    id: 2,
    name: "Dev Residency",
    locality: "Alpha-I, Greater Noida",
    college: "7 min walk · GL Bajaj",
    price: 5500,
    total: 7900,
    gender: "Boys",
    sharing: "Triple sharing",
    rating: 4.5,
    reviews: 21,
    verified: true,
    roomsLeft: 5,
    amenities: ["WiFi", "Food", "CCTV", "Parking", "Gym"],
    tags: ["Budget Pick"],
    metro: "12 min walk · Depot Station",
    hospital: "10 min · Sharda Hospital",
    mapUrl: "https://www.google.com/maps/search/GL+Bajaj+Greater+Noida",
    rules: [
      "No loud music after 11 PM",
      "Cleanliness is mandatory",
      "Entry: Before 11 PM",
    ],
    description:
      "Budget-friendly boys PG with home-cooked meals, reliable Wi-Fi, and walking distance to GL Bajaj College. Perfect for students looking for value.",
  },
  {
    id: 3,
    name: "Platinum Boys Hostel",
    locality: "Knowledge Park IV",
    college: "2 min walk · Sharda Univ",
    price: 8000,
    total: 10500,
    gender: "Boys",
    sharing: "Single sharing",
    rating: 4.9,
    reviews: 58,
    verified: true,
    roomsLeft: 1,
    amenities: [
      "WiFi",
      "AC",
      "Food",
      "CCTV",
      "Laundry",
      "Parking",
      "Gym",
      "Power Backup",
    ],
    tags: ["Top Rated", "Premium"],
    metro: "6 min walk · Knowledge Park Metro",
    hospital: "4 min · Fortis Hospital",
    mapUrl: "https://www.google.com/maps/search/Sharda+University",
    rules: [
      "Biometric Entry",
      "Strict Silence in Study Room",
      "Guest registration required",
    ],
    description:
      "Premium single-room hostel with all amenities included. Ideal for students who value privacy and luxury near Sharda University.",
  },
  {
    id: 4,
    name: "Green Valley Co-Living",
    locality: "Gamma-I, Greater Noida",
    college: "12 min walk · Bennett Univ",
    price: 7000,
    total: 7700,
    gender: "Co-ed",
    sharing: "Double sharing",
    rating: 4.3,
    reviews: 15,
    verified: false,
    roomsLeft: 8,
    amenities: ["WiFi", "AC", "CCTV", "Gym", "Parking"],
    tags: ["Co-ed", "Modern"],
    metro: "15 min auto · Pari Chowk Metro",
    hospital: "8 min · Metro Hospital",
    mapUrl: "https://www.google.com/maps/search/Bennett+University",
    rules: [
      "Community-driven space",
      "Weekly events",
      "Quiet hours 12 AM - 7 AM",
    ],
    description:
      "Modern co-living space with a gym and high-speed Wi-Fi. Designed for students who love to socialize and network.",
  },
];

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
