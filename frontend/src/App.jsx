import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import ServiceDetailPage from './pages/public/ServiceDetailPage';
import IndustriesPage from './pages/public/IndustriesPage';
import ProductsPage from './pages/public/ProductsPage';
import PortfolioPage from './pages/public/PortfolioPage';
import BlogPage from './pages/public/BlogPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPage from './pages/public/PrivacyPage';
import TermsPage from './pages/public/TermsPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import LeadsPage from './pages/admin/LeadsPage';
import ServicesManagePage from './pages/admin/ServicesManagePage';
import PortfolioManagePage from './pages/admin/PortfolioManagePage';
import TestimonialsManagePage from './pages/admin/TestimonialsManagePage';
import BlogManagePage from './pages/admin/BlogManagePage';
import UsersManagePage from './pages/admin/UsersManagePage';

// Auth Guard Helper
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Admin Terminal Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="services" element={<ServicesManagePage />} />
          <Route path="portfolio" element={<PortfolioManagePage />} />
          <Route path="testimonials" element={<TestimonialsManagePage />} />
          <Route path="blog" element={<BlogManagePage />} />
          <Route path="users" element={<UsersManagePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
