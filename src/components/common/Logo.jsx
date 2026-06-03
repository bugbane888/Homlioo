import React from "react";

const Logo = ({ size = "md", showText = true, showIcon = false }) => {
  const sizeMap = {
    sm: { text: "text-lg", gap: "gap-1.5" },
    md: { text: "text-2xl", gap: "gap-2" },
    lg: { text: "text-4xl", gap: "gap-3" },
  };

  const config = sizeMap[size];

  return (
    <div className={`flex items-center ${config.gap} flex-shrink-0`}>
      {showText && (
        <span className={`${config.text} font-[900] tracking-tight`}>
          <span className="text-blue-700 dark:text-blue-600">HOM</span>
          <span className="text-green-500">LiOO</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
