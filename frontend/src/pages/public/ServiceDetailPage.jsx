import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowUpRight, Phone, Clock, ShieldCheck } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { SERVICES_DATA } from '../../api/mockData';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="py-12 space-y-12">
      {/* Back button and breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <Badge variant="primary" size="md">{service.category}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-neutral leading-relaxed font-sans">
              {service.shortDescription}
            </p>
            <p className="text-sm text-neutral-muted leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Quick Consultation Action Box */}
          <div className="lg:col-span-4 bg-surface-card p-6 rounded-lg border-2 border-primary/20 shadow-tactile space-y-4">
            <h3 className="font-serif font-bold text-xl text-neutral-dark">
              Request On-Site Demo
            </h3>
            <p className="text-xs text-neutral-muted leading-relaxed">
              We bring the working system to your store or office in Baruasagar / Jhansi for a live demonstration.
            </p>
            <div className="space-y-2 text-xs text-neutral font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary-dark" />
                <span>Zero Obligation Free Demo</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary-dark" />
                <span>Same-Week On-Site Setup</span>
              </div>
            </div>
            <Link to="/contact" className="block pt-2">
              <Button variant="primary" size="md" className="w-full" icon={ArrowUpRight} iconPosition="right">
                Book Demonstration
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Deep Features Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-card p-8 rounded-lg border border-surface-border shadow-tactile-sm">
          <h2 className="font-serif text-2xl font-bold text-neutral-dark mb-6">
            Detailed Capabilities &amp; System Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-surface-subtle/60 rounded border border-surface-border">
                <CheckCircle2 className="w-5 h-5 text-secondary-dark shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-neutral">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Deployment Process */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge variant="primary" size="sm" className="mb-2">IMPLEMENTATION ROADMAP</Badge>
            <h2 className="font-serif text-3xl font-bold text-neutral-dark">
              How We Deploy This in Your Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, sIdx) => (
              <div key={sIdx} className="bg-surface-card p-5 rounded border border-surface-border shadow-tactile-sm">
                <span className="font-serif text-3xl font-bold text-primary/30 block mb-2">
                  {step.step}
                </span>
                <h3 className="font-sans font-bold text-base text-neutral-dark mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold">Have Questions About Pricing?</h3>
            <p className="text-xs text-white/80 mt-1">
              Speak directly with our technical founder: +91 79050 00000
            </p>
          </div>
          <Link to="/contact">
            <Button variant="secondary" size="md">
              Contact Sales Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
