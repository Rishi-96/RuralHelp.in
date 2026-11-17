import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-subtle border-t border-surface-border text-neutral pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-surface-border">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary text-white font-serif font-bold text-xl flex items-center justify-center rounded border border-primary-dark shadow-tactile-sm">
                R
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-primary tracking-tight">
                  RuralHelp
                </span>
                <span className="block text-[10px] font-sans font-bold tracking-widest text-neutral-muted uppercase">
                  Digital Transformation
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-muted leading-relaxed max-w-sm">
              Empowering small businesses, clinics, coaching institutes, and retailers across Baruasagar, Jhansi, Bundelkhand, and all of India with accessible, high-ROI digital technology and software solutions.
            </p>
            <div className="pt-2 text-xs text-neutral font-semibold space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Station Road, Baruasagar, Jhansi, Uttar Pradesh, 284201</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 79050 00000 / +91 94500 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contact@ruralhelp.in</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-primary mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/custom-software" className="text-neutral-muted hover:text-primary transition-colors">
                  Custom Business Software
                </Link>
              </li>
              <li>
                <Link to="/services/whatsapp-automation" className="text-neutral-muted hover:text-primary transition-colors">
                  WhatsApp AI Automation
                </Link>
              </li>
              <li>
                <Link to="/services/billing-inventory" className="text-neutral-muted hover:text-primary transition-colors">
                  Billing &amp; GST POS Systems
                </Link>
              </li>
              <li>
                <Link to="/services/website-development" className="text-neutral-muted hover:text-primary transition-colors">
                  Website &amp; App Development
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="text-neutral-muted hover:text-primary transition-colors">
                  Regional Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-primary mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-neutral-muted hover:text-primary transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-neutral-muted hover:text-primary transition-colors">
                  Industries We Transform
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-muted hover:text-primary transition-colors">
                  Ready Products
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-neutral-muted hover:text-primary transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-neutral-muted hover:text-primary transition-colors">
                  Tech Knowledge Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Banner / Legal */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-primary mb-4">
              Built For Bharat
            </h4>
            <div className="bg-surface-card p-4 rounded border border-surface-border text-xs space-y-2">
              <p className="font-semibold text-neutral">
                Local Presence, World-Class Engineering
              </p>
              <p className="text-neutral-muted leading-relaxed">
                We provide hands-on training, physical onboarding, and local Hindi &amp; English support for rural merchants.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-1 text-primary font-bold hover:underline pt-1">
                <span>Book a Store Visit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-muted gap-4">
          <p>
            &copy; {currentYear} RuralHelp Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/admin/login" className="hover:text-primary transition-colors font-medium">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
