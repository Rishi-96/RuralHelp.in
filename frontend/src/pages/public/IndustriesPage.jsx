import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Activity, GraduationCap, Factory, Truck, ShoppingBag, ArrowUpRight } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function IndustriesPage() {
  const industries = [
    {
      title: "Retail & Wholesale Kirana",
      icon: Store,
      description: "Fast barcode billing, udhaar tracking with automatic WhatsApp reminders, and multi-godown stock management.",
      challenges: "Long billing queues during festival rushes, manual paper credit diaries, stock discrepancies.",
      solution: "Offline-first POS with 2-second barcode printing and automated UPI payment links.",
      impact: "Zero handwritten errors and 35% faster billing."
    },
    {
      title: "Clinics, Hospitals & Pathology",
      icon: Activity,
      description: "Digital OPD queue tokens, fast doctor prescription templates, and patient lab test WhatsApp delivery.",
      challenges: "Chaotic crowded waiting halls, misplaced paper prescriptions, manual lab report delivery.",
      solution: "Automated receptionist token system + digital prescription pad and direct PDF delivery.",
      impact: "60% less patient waiting anxiety and full patient medical record preservation."
    },
    {
      title: "Coaching Institutes & Schools",
      icon: GraduationCap,
      description: "Biometric student attendance, fee installment reminders, and parent SMS updates.",
      challenges: "Untracked student absenteeism, awkward manual calls for overdue fees, paper test cards.",
      solution: "Fingerprint/RFID gate reader synced to instant WhatsApp alerts and online UPI fee payment.",
      impact: "95% on-time fee recovery and improved parent trust."
    },
    {
      title: "Small Manufacturing & Handloom",
      icon: Factory,
      description: "Raw material tracking, worker wage calculation, and batch order dispatching.",
      challenges: "Wastage tracking, confusion in piece-rate artisan wages, delayed vendor orders.",
      solution: "Custom production ledger software with piece-rate ledger and invoice dispatch.",
      impact: "Accurate daily profit margins and streamlined artisan payments."
    },
    {
      title: "Transport & Logistics Fleets",
      icon: Truck,
      description: "Trip builty management, diesel expense tracking, and driver advance accounting.",
      challenges: "Lost paper builty receipts, unverified fuel bills, manual billing delays.",
      solution: "Digital builty generation with instant WhatsApp PDF sharing to consignees.",
      impact: "Same-day freight billing and instant trip expense reconciliation."
    },
    {
      title: "Apparel & Footwear Boutiques",
      icon: ShoppingBag,
      description: "Size, color, and brand matrix barcode tagging with customer loyalty rewards.",
      challenges: "Dead stock piling up without awareness, difficult seasonal sales tracking.",
      solution: "Barcode tag printing with slow-moving inventory alerts and festival WhatsApp broadcasts.",
      impact: "Reduced obsolete stock by 40% through targeted customer promotions."
    }
  ];

  return (
    <div className="py-12 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="md">SECTOR SPECIALIZATION</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            Engineered for the Specific Needs of Regional Industries
          </h1>
          <p className="text-base text-neutral-muted leading-relaxed font-sans">
            Every business sector in Bundelkhand has unique workflows. We do not force a one-size-fits-all model; we tailor the solution to your sector's reality.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <Card key={i} hover className="flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-neutral-dark mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-neutral-muted leading-relaxed mb-4">
                    {ind.description}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-surface-border text-xs">
                    <div>
                      <span className="font-bold text-neutral uppercase text-[10px] block">Common Bottleneck:</span>
                      <span className="text-neutral-muted">{ind.challenges}</span>
                    </div>
                    <div>
                      <span className="font-bold text-primary uppercase text-[10px] block">RuralHelp Solution:</span>
                      <span className="text-neutral font-semibold">{ind.solution}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-surface-border flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary-dark">{ind.impact}</span>
                  <Link to="/contact" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold">Don't See Your Industry Listed?</h3>
            <p className="text-xs text-white/80 mt-1">
              We build custom workflows for any regional business.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="secondary" size="md">
              Request Industry Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
