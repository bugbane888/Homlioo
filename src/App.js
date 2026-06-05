import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

// --- CONTEXT PROVIDERS ---
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import { CompareProvider } from "./context/CompareContext";
import { EnquiryProvider } from "./context/EnquiryContext";
import { SavedProvider } from "./context/SavedContext";
import { NotificationProvider } from "./context/NotificationContext";

// --- LAYOUTS ---
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// --- SHARED COMPONENTS ---
import PageTransition from "./components/common/PageTransition";
import ErrorBoundary from "./components/common/ErrorBoundary";

// --- PAGES: AUTH ---
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Callback from "./pages/auth/Callback";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// --- PAGES: USER / STUDENT ---
import Home from "./pages/user/Home";
import Listings from "./pages/user/Listings";
import PropertyDetail from "./pages/user/PropertyDetail";
import Compare from "./pages/user/Compare";
import Profile from "./pages/user/Profile";
import Help from "./pages/user/Help";
import UserSettings from "./pages/user/UserSettings";
import Favorites from "./pages/user/Favorites"; // FIXED: Import is here
import About from "./pages/user/About";

// --- PAGES: LEGAL ---
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import CookiePolicy from "./pages/legal/CookiePolicy";

// --- PAGES: ADMIN ---
import AdminDashboard from "./pages/admin/Dashboard";
import Properties from "./pages/admin/Properties";
import Enquiries from "./pages/admin/Enquiries";
import Settings from "./pages/admin/Settings";
import Drafts from "./pages/admin/Drafts";

/**
 * PROTECTED ROUTE COMPONENT
 * Restricts access based on authentication status and user role.
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">
          HOMLiOO Security
        </p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

/**
 * ANIMATED ROUTE WRAPPER
 * Handles the logic for page entry and exit animations.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* --- AUTHENTICATION (Isolated Layout) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<Callback />} />
        <Route path="/auth/v1/verify" element={<Callback />} />

        {/* --- PUBLIC STUDENT SITE --- */}
        <Route
          path="/"
          element={
            <UserLayout>
              <PageTransition>
                <Home />
              </PageTransition>
            </UserLayout>
          }
        />
        <Route
          path="/listings"
          element={
            <UserLayout>
              <PageTransition>
                <Listings />
              </PageTransition>
            </UserLayout>
          }
        />
        <Route
          path="/property/:id"
          element={
            <UserLayout>
              <PageTransition>
                <PropertyDetail />
              </PageTransition>
            </UserLayout>
          }
        />
        <Route
          path="/compare"
          element={
            <UserLayout>
              <PageTransition>
                <Compare />
              </PageTransition>
            </UserLayout>
          }
        />
        <Route
          path="/about"
          element={
            <UserLayout>
              <PageTransition>
                <About />
              </PageTransition>
            </UserLayout>
          }
        />
        <Route
          path="/help"
          element={
            <UserLayout>
              <PageTransition>
                <Help />
              </PageTransition>
            </UserLayout>
          }
        />
        
        {/* --- LEGAL PAGES --- */}
        <Route
          path="/privacy"
          element={
            <UserLayout>
              <PageTransition>
                <PrivacyPolicy />
              </PageTransition>
            </UserLayout>
          }
        />
        <Route
          path="/terms"
          element={
            <UserLayout>
              <PageTransition>
                <TermsAndConditions />
              </PageTransition>
            </UserLayout>
          }
        />
        <Route
          path="/cookies"
          element={
            <UserLayout>
              <PageTransition>
                <CookiePolicy />
              </PageTransition>
            </UserLayout>
          }
        />

        {/* --- PRIVATE STUDENT SITE (Requires Auth) --- */}
        <Route
          path="/favorites"
          element={
            <UserLayout>
              <PageTransition>
                <Favorites />
              </PageTransition>
            </UserLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <PageTransition>
                  <Profile />
                </PageTransition>
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute role="user">
              <UserLayout>
                <PageTransition>
                  <UserSettings />
                </PageTransition>
              </UserLayout>
            </ProtectedRoute>
          }
        />

        {/* --- ADMIN CONSOLE (Sidebar Layout) --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <PageTransition>
                  <AdminDashboard />
                </PageTransition>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <PageTransition>
                  <Properties />
                </PageTransition>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/drafts"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <PageTransition>
                  <Drafts />
                </PageTransition>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <PageTransition>
                  <Enquiries />
                </PageTransition>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <PageTransition>
                  <Settings />
                </PageTransition>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* --- 404 / REDIRECT --- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * MASTER ROOT COMPONENT
 */
function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <PropertyProvider>
                <CompareProvider>
                  <EnquiryProvider>
                    <SavedProvider>
                      <NotificationProvider>
                        <Router>
                          <AnimatedRoutes />
                        </Router>
                      </NotificationProvider>
                    </SavedProvider>
                  </EnquiryProvider>
                </CompareProvider>
              </PropertyProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
