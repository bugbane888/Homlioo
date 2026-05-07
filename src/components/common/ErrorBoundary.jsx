import React from "react";
import Button from "./Button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // In production, you would log this to a service like Sentry
    console.error("App Crash Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl text-center border border-slate-100 dark:border-slate-700">
            <div className="text-5xl mb-6">🛠️</div>
            <h1 className="text-2xl font-black text-brand-navy dark:text-white mb-4 tracking-tighter">
              Something went wrong.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
              The sanctuary is undergoing maintenance. Please try refreshing the
              page.
            </p>
            <Button className="w-full" onClick={() => window.location.reload()}>
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
