import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import { Home } from '../pages/Home';
import { ProductsOverview } from '../pages/ProductsOverview';
import { BookmarksProduct } from '../pages/BookmarksProduct';
import { NotesProduct } from '../pages/NotesProduct';
import { Pricing } from '../pages/Pricing';
import { Download } from '../pages/Download';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Privacy } from '../pages/Privacy';
import { Terms } from '../pages/Terms';
import { NotFound } from '../pages/NotFound';

// Auth Pages
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';

// Authenticated App Pages
import { ProtectedRoute } from './ProtectedRoute';
import { Dashboard } from '../pages/app/Dashboard';
import { AppProducts } from '../pages/app/AppProducts';
import { Billing } from '../pages/app/Billing';
import { Account } from '../pages/app/Account';
import { Settings } from '../pages/app/Settings';
import { AppDownloads } from '../pages/app/AppDownloads';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsOverview />} />
      <Route path="/products/bookmarks" element={<BookmarksProduct />} />
      <Route path="/products/notes" element={<NotesProduct />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/download" element={<Download />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Authenticated Platform Shell Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Navigate to="/app/dashboard" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/products"
        element={
          <ProtectedRoute>
            <AppProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/billing"
        element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/downloads"
        element={
          <ProtectedRoute>
            <AppDownloads />
          </ProtectedRoute>
        }
      />

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
