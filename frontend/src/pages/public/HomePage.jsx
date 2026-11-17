import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  TrendingUp, 
  Store, 
  Activity, 
  GraduationCap, 
  MessageSquare, 
  Receipt, 
  Code,
  Zap,
  Users,
  ChevronRight
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { SERVICES_DATA, TESTIMONIALS_DATA, STATS_DATA, BLOG_POSTS_DATA } from '../../api/mockData';

export default function HomePage() {
  const [quickContactPhone, setQuickContactPhone] = useState('');
  const [quickContactSent, setQuickContactSent] = useState(false);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (quickContactPhone.trim()) {
      setQuickContactSent(true);
      // In a real app or with backend, we dispatch to lead API
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          HERO SECTION — Direction: Hybrid (Photo Hero + Pragmatic Bento)
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-12 pb-10 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Editorial Subheading / Location Seal */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="primary" size="md">
              <span className="font-bold">BUNDELKHAND DIGITAL INITIATIVE</span>
            </Badge>
            <span className="hidden sm:inline text-neutral-muted text-xs font-serif italic">
              Empowering merchants in Baruasagar, Jhansi &amp; surrounding towns
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-dark leading-[1.12]">
                Practical Digital Systems for <span className="text-primary italic">Regional Businesses</span>
              </h1>
              
              <p className="text-base sm:text-lg text-neutral-muted leading-relaxed font-sans max-w-2xl">
                We replace chaotic paper registers and sluggish generic software with lightning-fast barcode billing, WhatsApp customer automation, and custom management systems designed specifically for regional stores, clinics, and schools.
              </p>

              {/* Local Trust Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 text-xs font-semibold text-neutral">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary-dark shrink-0" />
                  <span>Physical In-Store Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary-dark shrink-0" />
                  <span>Hindi &amp; English UI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary-dark shrink-0" />
                  <span>Offline-First Billing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/contact">
                  <Button variant="primary" size="lg" icon={ArrowUpRight} iconPosition="right">
                    Book On-Site Consultation
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    Browse All Services
                  </Button>
                </Link>
              </div>

              {/* Quick Callback Widget */}
              <div className="p-4 bg-surface-subtle border border-surface-border rounded-lg max-w-xl mt-4">
                <p className="text-xs font-bold text-neutral uppercase tracking-wider mb-2">
                  Want a quick callback in 30 minutes?
                </p>
                {quickContactSent ? (
                  <div className="text-xs font-bold text-primary flex items-center gap-2 py-1">
                    <CheckCircle2 className="w-4 h-4 text-secondary-dark" />
                    <span>Thank you! Our Baruasagar team will call {quickContactPhone} shortly.</span>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="flex gap-2">
                    <input
                      type="tel"
                      value={quickContactPhone}
                      onChange={(e) => setQuickContactPhone(e.target.value)}
                      placeholder="Enter 10-digit WhatsApp number"
                      required
                      className="flex-1 px-3 py-2 text-sm bg-surface-card border border-surface-border-strong rounded focus:outline-none focus:border-primary"
                    />
                    <Button type="submit" variant="secondary" size="md">
                      Get Call
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Visual / Bento Ledger Highlight */}
            <div className="lg:col-span-5">
              <div className="bg-surface-card border-2 border-primary/20 rounded-lg p-6 shadow-tactile relative overflow-hidden">
                {/* Header ribbon */}
                <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-secondary rounded-full inline-block"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral">
                      Active Deployment Terminal
                    </span>
                  </div>
                  <Badge variant="success" size="sm">LIVE IN PRODUCTION</Badge>
                </div>

                {/* Feature Spotlight */}
                <div className="space-y-4">
                  <div className="p-3.5 bg-surface-subtle rounded border border-surface-border">
                    <div className="text-xs text-neutral-muted uppercase font-bold tracking-wider">
                      Retail Transformation
                    </div>
                    <div className="text-base font-serif font-bold text-primary mt-0.5">
                      Gupta Wholesale Kirana — Baruasagar
                    </div>
                    <div className="mt-2 text-xs text-neutral-muted flex items-center justify-between">
                      <span>Barcode POS + Thermal Print</span>
                      <span className="font-bold text-secondary-dark">2.4s per bill</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-subtle rounded border border-surface-border">
                    <div className="text-xs text-neutral-muted uppercase font-bold tracking-wider">
                      Medical OPD Token System
                    </div>
                    <div className="text-base font-serif font-bold text-primary mt-0.5">
                      Bundelkhand PolyClinic — Jhansi
                    </div>
                    <div className="mt-2 text-xs text-neutral-muted flex items-center justify-between">
                      <span>Digital Prescription &amp; WhatsApp Rx</span>
                      <span className="font-bold text-secondary-dark">180 Patients / Day</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-subtle rounded border border-surface-border">
                    <div className="text-xs text-neutral-muted uppercase font-bold tracking-wider">
                      Automated Udhaar Recovery
                    </div>
                    <div className="text-base font-serif font-bold text-primary mt-0.5">
                      Smart WhatsApp Payment Links
                    </div>
                    <div className="mt-2 text-xs text-neutral-muted flex items-center justify-between">
                      <span>Direct UPI QR with polite Hindi alerts</span>
                      <span className="font-bold text-secondary-dark">85% Collection</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between text-xs text-neutral-muted">
                  <span>Local Support Station: <strong>Baruasagar, UP</strong></span>
                  <Link to="/portfolio" className="text-primary font-bold hover:underline flex items-center gap-1">
                    <span>View 12 Case Studies</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY NUMBERS & REGIONAL IMPACT LEDGER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-card border border-surface-border rounded-lg p-6 sm:p-8 shadow-tactile-sm">
          <div className="border-b border-surface-border pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-neutral-dark">
                The Regional Impact Ledger
              </h3>
              <p className="text-xs text-neutral-muted mt-0.5">
                Measurable, auditable transformation across Bundelkhand small enterprises
              </p>
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded">
              Verified 2026 Data
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-surface-border">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className={`pt-4 lg:pt-0 ${idx !== 0 ? 'lg:pl-6' : ''}`}>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-neutral mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-secondary-dark font-medium mt-1">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE SERVICES BENTO GRID
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-surface-border">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">COMPREHENSIVE DIGITAL SUITE</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-dark">
              Built for How Small Businesses Actually Operate
            </h2>
          </div>
          <Link to="/services" className="mt-3 md:mt-0 text-sm font-bold text-primary hover:underline flex items-center gap-1">
            <span>View All Detailed Services</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <Card
              key={service.id}
              hover
              header={service.category}
              headerRight={
                service.isFeatured ? (
                  <Badge variant="success" size="sm">FEATURED</Badge>
                ) : null
              }
              footer={
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-bold text-primary hover:text-primary-dark flex items-center justify-between w-full"
                >
                  <span>Learn workflow &amp; specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              }
            >
              <h3 className="font-serif font-bold text-xl text-neutral-dark mb-2">
                {service.title}
              </h3>
              <p className="text-xs text-neutral-muted leading-relaxed mb-4">
                {service.shortDescription}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-surface-border text-xs text-neutral font-medium">
                {service.features.slice(0, 3).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <span className="text-secondary-dark font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          THE RURALHELP DIFFERENCE (WHY NOT GENERIC SAAS)
          ========================================================================= */}
      <section className="bg-surface-subtle border-y border-surface-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="primary" size="sm" className="mb-2">THE LOCAL ADVANTAGE</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-dark">
              Why Generic Bangalore/Silicon Valley Software Fails in Bundelkhand
            </h2>
            <p className="text-sm text-neutral-muted mt-3">
              Corporate SaaS companies sell expensive subscriptions with zero regional ground presence. Here is how RuralHelp works differently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-card p-6 rounded-lg border border-surface-border shadow-tactile-sm">
              <div className="w-10 h-10 bg-primary/10 text-primary font-bold flex items-center justify-center rounded mb-4">
                01
              </div>
              <h3 className="font-serif font-bold text-xl text-neutral-dark mb-2">
                Physical On-Site Onboarding
              </h3>
              <p className="text-xs text-neutral-muted leading-relaxed">
                We don't send you a video link and abandon you. Our engineers visit your shop in Baruasagar or Jhansi, connect your thermal printer and barcode scanner, and sit beside your cashier until they are fluent.
              </p>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-surface-border shadow-tactile-sm">
              <div className="w-10 h-10 bg-secondary/20 text-secondary-dark font-bold flex items-center justify-center rounded mb-4">
                02
              </div>
              <h3 className="font-serif font-bold text-xl text-neutral-dark mb-2">
                Offline-First Reliability
              </h3>
              <p className="text-xs text-neutral-muted leading-relaxed">
                Fiber cuts and power outages should never stop your billing counter. Our software continues saving sales offline and synchronizes automatically the moment connectivity returns.
              </p>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-surface-border shadow-tactile-sm">
              <div className="w-10 h-10 bg-tertiary/20 text-tertiary-dark font-bold flex items-center justify-center rounded mb-4">
                03
              </div>
              <h3 className="font-serif font-bold text-xl text-neutral-dark mb-2">
                Honest Regional Pricing
              </h3>
              <p className="text-xs text-neutral-muted leading-relaxed">
                No steep monthly US-dollar subscriptions. Fair, transparent pricing calibrated for regional Indian MSME profit margins, with zero predatory lock-in contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VOICES OF LOCAL MERCHANTS (TESTIMONIALS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-4 border-b border-surface-border flex items-end justify-between">
          <div>
            <Badge variant="warning" size="sm" className="mb-2">VERIFIED MERCHANT VOICES</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-dark">
              Proven on the Ground in Baruasagar &amp; Jhansi
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-surface-card p-6 rounded-lg border border-surface-border flex flex-col justify-between shadow-tactile-sm"
            >
              <div>
                <div className="flex items-center gap-1 text-secondary-dark mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                <p className="text-sm font-serif italic text-neutral leading-relaxed mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border">
                <div className="text-xs font-bold text-secondary-dark mb-1">
                  {item.impact}
                </div>
                <div className="font-sans font-bold text-sm text-neutral-dark">
                  {item.clientName}
                </div>
                <div className="text-xs text-neutral-muted">
                  {item.clientRole}, {item.companyName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          RECENT KNOWLEDGE LEDGER (BLOG PREVIEWS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-4 border-b border-surface-border flex items-end justify-between">
          <div>
            <Badge variant="primary" size="sm" className="mb-2">KNOWLEDGE LEDGER</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-dark">
              Technology Guides for Small Business Owners
            </h2>
          </div>
          <Link to="/blog" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
            <span>Read All Guides</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS_DATA.map((post) => (
            <article
              key={post.id}
              className="bg-surface-card rounded-lg border border-surface-border p-5 flex flex-col justify-between hover:shadow-tactile transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-muted mb-2">
                  <span className="uppercase tracking-wider text-primary">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-serif font-bold text-lg text-neutral-dark hover:text-primary transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-xs text-neutral-muted leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs text-neutral-muted">
                <span>By {post.author}</span>
                <Link to={`/blog/${post.slug}`} className="font-bold text-primary hover:underline flex items-center gap-1">
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FINAL HIGH-CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-primary text-white rounded-lg p-8 sm:p-12 border-2 border-primary-dark shadow-tactile relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="secondary" size="md">
              <span className="text-neutral-dark font-bold">READY TO UPGRADE YOUR STORE OR CLINIC?</span>
            </Badge>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Let's modernize your business without disrupting daily sales.
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              We will visit your establishment in Baruasagar or Jhansi, demonstrate the hardware and software in person, and give you a free digital health assessment.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/contact">
                <Button variant="secondary" size="lg" icon={ArrowUpRight} iconPosition="right">
                  Schedule In-Person Visit
                </Button>
              </Link>
              <a href="tel:+917905000000">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Call Direct: +91 79050 00000
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
