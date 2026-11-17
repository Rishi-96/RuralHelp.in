import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Products', path: '/products' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-canvas/95 backdrop-blur-sm border-b border-surface-border">
      {/* Top Ledger Strip */}
      <div className="bg-primary text-white text-[11px] font-sans font-semibold tracking-wider py-1.5 px-4 sm:px-8 border-b border-primary-dark">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>SERVING BARUASAGAR, JHANSI &amp; BUNDELKHAND MSMEs</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <Phone className="w-3 h-3 text-secondary" />
              <span>Helpline: +91 79050 00000</span>
            </span>
            <Link to="/admin/login" className="text-secondary hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary text-white font-serif font-bold text-2xl flex items-center justify-center rounded border border-primary-dark shadow-tactile-sm group-hover:bg-primary-dark transition-all">
              R
            </div>
            <div>
              <div className="font-serif font-bold text-2xl text-primary tracking-tight leading-none group-hover:text-primary-dark transition-colors">
                RuralHelp
              </div>
              <div className="text-[10px] font-sans font-bold tracking-widest text-neutral-muted uppercase mt-0.5">
                Digital Transformation
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 text-sm font-semibold tracking-wide rounded transition-colors ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10 border-b-2 border-primary font-bold'
                    : 'text-neutral hover:text-primary hover:bg-surface-subtle'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact">
              <Button variant="secondary" size="md" icon={ArrowUpRight} iconPosition="right">
                Enquire Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded text-neutral hover:bg-surface-subtle border border-surface-border"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-surface-border bg-surface-card px-4 pt-3 pb-6 shadow-md">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 text-base font-semibold rounded ${
                  isActive(link.path)
                    ? 'bg-primary text-white font-bold'
                    : 'text-neutral hover:bg-surface-subtle'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-surface-border flex flex-col gap-2">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" size="md" className="w-full">
                  Get Free Consultation
                </Button>
              </Link>
              <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
