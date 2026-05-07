import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-purple transition-all border border-slate-100 dark:border-slate-700"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
