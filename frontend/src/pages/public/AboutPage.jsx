import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Heart, Award, ArrowUpRight, MapPin } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AboutPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="md">OUR ROOTS &amp; MISSION</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            Bridging the Digital Divide for the Real Backbone of India
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed font-sans">
            RuralHelp was founded in Baruasagar, Bundelkhand with one steadfast mission: to make high-grade software, AI automation, and digital commerce affordable, reliable, and practically useful for Tier-3, Tier-4, and rural businesses.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-surface-card p-8 sm:p-12 rounded-lg border border-surface-border shadow-tactile-sm">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
              Why We Started in Baruasagar
            </h2>
            <p>
              In metropolitan tech hubs, software is engineered for venture-funded companies with high-speed fiber internet and dedicated IT departments. But walk through the wholesale markets of Baruasagar, Sipri Bazar in Jhansi, or the grain mandis of Bundelkhand, and you see a completely different reality.
            </p>
            <p>
              Regional store owners, healthcare clinics, and coaching institutes were juggling paper ledgers, losing hours every evening reconciling accounts, and losing lakhs of rupees in untracked credit (udhaar). Generic cloud software would either freeze during power cuts or demand incomprehensible monthly fees.
            </p>
            <p className="font-semibold text-primary">
              We realized that regional businesses don't need complicated tech jargon—they need pragmatic, lightning-fast tools backed by local engineers who will actually come to their store and shake their hand.
            </p>
          </div>

          <div className="lg:col-span-5 bg-surface-subtle p-6 rounded border border-surface-border space-y-6">
            <h3 className="font-serif font-bold text-lg text-neutral-dark border-b border-surface-border pb-2">
              Our Core Guarantees
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-primary text-white font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-neutral text-sm">Grounded Physical Presence</h4>
                  <p className="text-neutral-muted mt-0.5">We operate on-ground across Baruasagar, Jhansi, and Bundelkhand with same-day field support.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-secondary-dark text-white font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-neutral text-sm">No Recurring Lock-In Traps</h4>
                  <p className="text-neutral-muted mt-0.5">Fair, transparent pricing where you own your business data completely.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-tertiary text-white font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-neutral text-sm">Zero English Barriers</h4>
                  <p className="text-neutral-muted mt-0.5">All software interfaces and training are delivered in conversational Hindi and English.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="primary" size="sm" className="mb-2">PRINCIPLES</Badge>
          <h2 className="font-serif text-3xl font-bold text-neutral-dark">
            Our Architectural Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-card p-6 rounded border border-surface-border">
            <ShieldCheck className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-serif font-bold text-lg text-neutral-dark mb-1">
              Data Sovereignty
            </h3>
            <p className="text-xs text-neutral-muted leading-relaxed">
              Your customer lists, transaction ledgers, and profit margins belong exclusively to you. We never monetize or share merchant data.
            </p>
          </div>

          <div className="bg-surface-card p-6 rounded border border-surface-border">
            <Target className="w-8 h-8 text-secondary-dark mb-3" />
            <h3 className="font-serif font-bold text-lg text-neutral-dark mb-1">
              Speed Over Flashiness
            </h3>
            <p className="text-xs text-neutral-muted leading-relaxed">
              During a festival rush, a cashier needs to issue a bill in 3 seconds flat. Every millisecond of latency is lost money. We optimize for extreme speed.
            </p>
          </div>

          <div className="bg-surface-card p-6 rounded border border-surface-border">
            <Heart className="w-8 h-8 text-tertiary-dark mb-3" />
            <h3 className="font-serif font-bold text-lg text-neutral-dark mb-1">
              Empathetic Training
            </h3>
            <p className="text-xs text-neutral-muted leading-relaxed">
              We patiently teach operators who have never used a computer before. If your cashier is 55 years old and nervous, we stay until they feel like a pro.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-subtle border border-surface-border p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-neutral-dark">
              Meet Us at our Baruasagar Center
            </h3>
            <p className="text-xs text-neutral-muted mt-1">
              Station Road, Baruasagar, Jhansi District, Uttar Pradesh
            </p>
          </div>
          <Link to="/contact">
            <Button variant="primary" size="md" icon={ArrowUpRight} iconPosition="right">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
