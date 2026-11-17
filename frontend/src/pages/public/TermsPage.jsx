import React from 'react';
import Badge from '../../components/ui/Badge';

export default function TermsPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Badge variant="primary" size="md">SERVICE AGREEMENT</Badge>
        <h1 className="font-serif text-4xl font-bold text-neutral-dark tracking-tight mt-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-neutral-muted mt-1">Effective Date: November 2026</p>
      </div>

      <div className="bg-surface-card p-8 rounded-lg border border-surface-border text-sm text-neutral leading-relaxed space-y-6">
        <h2 className="font-serif font-bold text-xl text-primary">1. Acceptance of Terms</h2>
        <p>
          By accessing the RuralHelp website, requesting on-site consultations, or installing our software applications, you agree to comply with these terms.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">2. On-Site Installation &amp; Training</h2>
        <p>
          RuralHelp provides on-site hardware setup (thermal printers, barcode scanners, touch POS machines) and staff training within the mutually agreed timeline. The client agrees to provide stable electrical power, safe operator access, and necessary store hardware.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">3. Software Licensing &amp; Usage</h2>
        <p>
          Clients are granted a non-exclusive license to use RuralHelp software for their designated business outlets. Reselling, decompiling, or attempting to distribute cracked copies of the binary code is strictly prohibited.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">4. WhatsApp Automation &amp; Anti-Spam Policy</h2>
        <p>
          Automated WhatsApp messaging must comply with official Meta WhatsApp Business Messaging Policies. Merchants agree not to use the automated system to broadcast unconsented spam messages or illegal promotional materials.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">5. Governing Law &amp; Jurisdiction</h2>
        <p>
          Any disputes arising out of service agreements shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Jhansi, Uttar Pradesh.
        </p>
      </div>
    </div>
  );
}
