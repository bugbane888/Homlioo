import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Providers
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import { CompareProvider } from "./context/CompareContext";
import { EnquiryProvider } from "./context/EnquiryContext";
import { SavedProvider } from "./context/SavedContext";

// Layouts & UI
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import PageTransition from "./components/common/PageTransition";

// Pages
import Home from "./pages/user/Home";
import Listings from "./pages/user/Listings";
import PropertyDetail from "./pages/user/PropertyDetail";
import Compare from "./pages/user/Compare";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/Dashboard";
import Properties from "./pages/admin/Properties";
import Enquiries from "./pages/admin/Enquiries";
import About from "./pages/user/About";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth (Clean Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student Site (UserLayout) */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/listings"
          element={
            <UserLayout>
              <Listings />
            </UserLayout>
          }
        />
        <Route
          path="/property/:id"
          element={
            <UserLayout>
              <PropertyDetail />
            </UserLayout>
          }
        />
        <Route
          path="/compare"
          element={
            <UserLayout>
              <Compare />
            </UserLayout>
          }
        />
        <Route
          path="/about"
          element={
            <UserLayout>
              <About />
            </UserLayout>
          }
        />

        {/* Admin Console (AdminLayout) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Properties />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Enquiries />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <PropertyProvider>
            <CompareProvider>
              <EnquiryProvider>
                <SavedProvider>
                  <Router>
                    <AnimatedRoutes />
                  </Router>
                </SavedProvider>
              </EnquiryProvider>
            </CompareProvider>
          </PropertyProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
