import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas selection:bg-secondary/30 selection:text-neutral-dark">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Scroll restoration helper when navigating */}
    </div>
  );
}
