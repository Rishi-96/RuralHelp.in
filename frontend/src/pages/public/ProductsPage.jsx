import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowUpRight, Zap, Database, Smartphone, Lock } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function ProductsPage() {
  const products = [
    {
      name: "RuralBilling POS",
      tagline: "Ultra-Fast Retail Invoicing & GST Engine",
      target: "Kirana Stores, Supermarkets, Hardware & Sanitary Showrooms",
      price: "Transparent One-Time Setup",
      features: [
        "2-second barcode billing with thermal printer integration",
        "Dual offline-online storage (Never stops during network drop)",
        "Automated WhatsApp bill & UPI payment link dispatch",
        "Customer Udhaar ledger with scheduled Hindi reminders",
        "GSTR-1, GSTR-3B audit-ready Excel reports",
        "Stock low-quantity alerts and purchase order creator"
      ],
      badge: "BESTSELLER"
    },
    {
      name: "RuralClinic OPD",
      tagline: "Smart Healthcare Management & Prescription System",
      target: "General Physicians, Pediatricians, Dental Clinics, Pathology Labs",
      price: "Turnkey Installation",
      features: [
        "Patient token display TV software for OPD queue management",
        "Fast 30-second digital prescription writer with diagnosis templates",
        "Instant WhatsApp prescription & lab report delivery to patient",
        "Lifetime digital medical record search by phone number",
        "Medicine inventory and stock expiry tracker",
        "Daily clinic revenue and consultation fee ledger"
      ],
      badge: "HEALTHCARE"
    },
    {
      name: "RuralTutor Academy ERP",
      tagline: "Biometric Attendance & Fee Collection Portal",
      target: "Competitive Coaching Centers, Private Schools, Computer Institutes",
      price: "Per Branch Deployment",
      features: [
        "Biometric fingerprint / RFID gate attendance machine sync",
        "Instant WhatsApp alert to parents when student enters/leaves",
        "Installment fee reminder alerts with direct UPI QR code",
        "Exam mark sheet and batch ranking generator",
        "Teacher payroll and lecture schedule tracker",
        "Student ID card generation with QR barcode"
      ],
      badge: "EDUCATION"
    },
    {
      name: "RuralWhatsApp Bot",
      tagline: "24/7 AI Customer Order & Catalog Assistant",
      target: "Wholesalers, Distributors, Restaurants, Service Providers",
      price: "Official Meta API Connected",
      features: [
        "Instant auto-reply with your full product catalog and prices",
        "Accept orders and quotation requests directly inside WhatsApp",
        "Broadcast festival offers to 10,000+ customers legally without ban risk",
        "Multi-agent live chat inbox for your sales staff",
        "Automatic order status updates ('Order Dispatched', 'Out for Delivery')",
        "Google Sheets or SQL sync for live inventory pricing"
      ],
      badge: "AUTOMATION"
    }
  ];

  return (
    <div className="py-12 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="md">READY PRODUCTS &amp; SOLUTIONS</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            Turnkey Software Ready for Immediate Deployment
          </h1>
          <p className="text-base text-neutral-muted leading-relaxed font-sans">
            Pre-engineered, field-tested software packages configured with hardware on-site in Baruasagar and Jhansi within 48 to 72 hours.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((prod, pIdx) => (
            <div
              key={pIdx}
              className="bg-surface-card border-2 border-surface-border rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-tactile-sm hover:border-primary/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={pIdx === 0 ? 'success' : 'primary'} size="sm">
                    {prod.badge}
                  </Badge>
                  <span className="text-xs font-bold text-primary bg-surface-subtle px-2.5 py-1 rounded">
                    {prod.price}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-3xl text-neutral-dark mb-1">
                  {prod.name}
                </h3>
                <p className="text-xs font-bold text-secondary-dark uppercase tracking-wider mb-2">
                  {prod.tagline}
                </p>
                <p className="text-xs text-neutral-muted mb-6 bg-surface-subtle p-2 rounded">
                  <strong>Ideal for:</strong> {prod.target}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-surface-border text-xs text-neutral">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-neutral-muted mb-2">
                    Included Features:
                  </p>
                  {prod.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-secondary/20 text-secondary-dark font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        ✓
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-border">
                <Link to="/contact">
                  <Button variant="primary" size="md" className="w-full" icon={ArrowUpRight} iconPosition="right">
                    Book On-Site Demo for {prod.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
