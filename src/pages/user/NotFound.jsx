import React from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";
import Button from "../../components/common/Button";
import { ArrowLeft, Search } from "lucide-react";

const NotFound = ({
  title = "Page not found",
  description = "The page you are looking for does not exist or may have been removed.",
  actionText = "Browse Listings",
  actionLink = "/listings",
}) => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8F7F4] dark:bg-slate-900 flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-3xl p-10 sm:p-14 border border-slate-100 dark:border-slate-700 shadow-xl text-center">
          <p className="text-brand-amber text-sm font-black uppercase tracking-[0.3em] mb-4">
            404 Error
          </p>
          <h1 className="text-4xl sm:text-5xl font-[900] text-brand-navy dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate(actionLink)} className="px-8 py-4">
              <Search size={16} /> {actionText}
            </Button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
