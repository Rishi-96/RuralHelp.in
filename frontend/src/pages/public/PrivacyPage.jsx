import React from 'react';
import Badge from '../../components/ui/Badge';

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Badge variant="primary" size="md">LEGAL TRANSPARENCY</Badge>
        <h1 className="font-serif text-4xl font-bold text-neutral-dark tracking-tight mt-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-muted mt-1">Last Updated: November 2026</p>
      </div>

      <div className="bg-surface-card p-8 rounded-lg border border-surface-border text-sm text-neutral leading-relaxed space-y-6">
        <h2 className="font-serif font-bold text-xl text-primary">1. Our Commitment to Regional MSME Privacy</h2>
        <p>
          RuralHelp Technologies Pvt Ltd ("RuralHelp", "we", "us") respects the privacy and confidentiality of regional merchants, clinic practitioners, educational institutes, and their end customers in Baruasagar, Jhansi, and across India.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">2. Merchant Data Ownership</h2>
        <p>
          All business records—including customer names, phone numbers, transaction histories, inventory prices, and patient medical files—remain the sole proprietary property of the respective merchant or clinic. RuralHelp acts strictly as a data processor.
        </p>
        <p>
          We do not sell, rent, or monetize your retail transaction records to third-party marketing companies, banks, or competitors under any circumstances.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">3. Information Collected via Enquiries</h2>
        <p>
          When you submit an enquiry through our public portal, we collect your name, phone number, business name, and operational requirements solely to schedule an on-site visit or provide technical demonstrations.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">4. Data Security &amp; Local Storage</h2>
        <p>
          Where offline-first software is deployed, critical operational databases reside on the client's local PC hardware, protected by user role passwords and local cryptographic hashing.
        </p>

        <h2 className="font-serif font-bold text-xl text-primary">5. Contact Our Data Officer</h2>
        <p>
          For privacy inquiries or data removal requests, contact us at: <strong>privacy@ruralhelp.in</strong> or visit our office at Station Road, Baruasagar, Jhansi, UP 284201.
        </p>
      </div>
    </div>
  );
}
