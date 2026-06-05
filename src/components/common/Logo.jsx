import React from "react";

/**
 * HOMLiOO Logo — unified component used in navbar, footer, auth pages & legal pages.
 *
 * Props:
 *  size        – "sm" | "md" | "lg" | "xl"
 *  showText    – show the HOMliOO wordmark text  (default true)
 *  showImage   – show the house illustration icon (default true)
 *  onDark      – true when placed on a dark background (no filter needed; image has white bg transparency handled by object-contain)
 */
const Logo = ({ size = "md", showText = true, showImage = true, onDark = false }) => {
  const sizeMap = {
    sm: { text: "text-lg",  img: "w-7 h-7",   gap: "gap-1.5" },
    md: { text: "text-2xl", img: "w-10 h-10",  gap: "gap-2"   },
    lg: { text: "text-3xl", img: "w-14 h-14",  gap: "gap-2.5" },
    xl: { text: "text-5xl", img: "w-24 h-24",  gap: "gap-3"   },
  };

  const cfg = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center ${cfg.gap} flex-shrink-0`}>
      {showImage && (
        <img
          src="/homlioo-logo.png"
          alt="HOMLiOO"
          className={`${cfg.img} object-contain drop-shadow-md`}
        />
      )}
      {showText && (
        <span className={`${cfg.text} font-[900] tracking-tight leading-none`}>
          <span className="text-blue-700 dark:text-blue-500">HOM</span>
          <span className="text-green-500">LiOO</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
