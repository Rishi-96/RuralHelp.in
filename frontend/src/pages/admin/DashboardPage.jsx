import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  PhoneCall, 
  Store, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function DashboardPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Load leads from storage or mock
    const stored = JSON.parse(localStorage.getItem('ruralhelp_offline_leads') || '[]');
    if (stored.length === 0) {
      // Default sample leads
      const defaults = [
        {
          id: 101,
          customer_name: "Ram Kumar Sen",
          phone: "9876543210",
          business_name: "Sen Kirana & General Merchant",
          business_type: "retail_kirana",
          service_id: "Billing & GST POS Systems",
          status: "New",
          created_at: new Date(Date.now() - 3600000).toISOString(),
          project_description: "Need fast barcode machine for 2 billing counters before festival."
        },
        {
          id: 102,
          customer_name: "Dr. Alok Nath Verma",
          phone: "9450012345",
          business_name: "Verma Children Clinic",
          business_type: "clinic_healthcare",
          service_id: "Clinic & OPD Management",
          status: "Contacted",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          project_description: "Want OPD token software for patient queue management."
        },
        {
          id: 103,
          customer_name: "Surendra Yadav",
          phone: "9123456780",
          business_name: "Bundelkhand Agro Traders",
          business_type: "manufacturing_handloom",
          service_id: "WhatsApp AI & Automation",
          status: "Qualified",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          project_description: "Automate farmer ledger updates and payments."
        }
      ];
      localStorage.setItem('ruralhelp_offline_leads', JSON.stringify(defaults));
      setLeads(defaults);
    } else {
      setLeads(stored);
    }
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <Badge variant="warning" size="sm">NEW ENQUIRY</Badge>;
      case 'Contacted':
        return <Badge variant="primary" size="sm">CONTACTED</Badge>;
      case 'Qualified':
        return <Badge variant="secondary" size="sm">QUALIFIED</Badge>;
      case 'Proposal Sent':
        return <Badge variant="neutral" size="sm">PROPOSAL SENT</Badge>;
      case 'Converted':
        return <Badge variant="success" size="sm">CONVERTED</Badge>;
      case 'Lost':
        return <Badge variant="danger" size="sm">LOST</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-dark">
            Operational Dashboard
          </h1>
          <p className="text-xs text-neutral-muted mt-0.5">
            Bundelkhand Field Operations Terminal &bull; Baruasagar &amp; Jhansi Territory
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/leads">
            <Button variant="primary" size="sm" icon={PhoneCall}>
              Manage All Leads
            </Button>
          </Link>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-surface-card p-5 rounded-lg border border-surface-border shadow-tactile-sm">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-muted mb-2">
            <span>TOTAL ENQUIRIES</span>
            <PhoneCall className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-serif font-bold text-neutral-dark">
            {leads.length}
          </div>
          <div className="text-[11px] font-bold text-secondary-dark mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Active pipeline</span>
          </div>
        </div>

        <div className="bg-surface-card p-5 rounded-lg border border-surface-border shadow-tactile-sm">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-muted mb-2">
            <span>NEW / UNCONTACTED</span>
            <AlertCircle className="w-4 h-4 text-tertiary" />
          </div>
          <div className="text-3xl font-serif font-bold text-tertiary">
            {leads.filter((l) => l.status === 'New').length}
          </div>
          <div className="text-[11px] text-neutral-muted mt-1">
            Requires callback within 2h
          </div>
        </div>

        <div className="bg-surface-card p-5 rounded-lg border border-surface-border shadow-tactile-sm">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-muted mb-2">
            <span>CONVERTED CLIENTS</span>
            <CheckCircle2 className="w-4 h-4 text-secondary-dark" />
          </div>
          <div className="text-3xl font-serif font-bold text-secondary-dark">
            140+
          </div>
          <div className="text-[11px] text-neutral-muted mt-1">
            Across 12 Bundelkhand towns
          </div>
        </div>

        <div className="bg-surface-card p-5 rounded-lg border border-surface-border shadow-tactile-sm">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-muted mb-2">
            <span>SYSTEM HEALTH</span>
            <Store className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-serif font-bold text-primary">
            100%
          </div>
          <div className="text-[11px] font-bold text-secondary-dark mt-1">
            All 6 services operational
          </div>
        </div>
      </div>

      {/* Recent Leads Ledger Table */}
      <Card
        header="Recent Business Inquiries Ledger"
        headerRight={
          <Link to="/admin/leads" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            <span>View Full Ledger</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-neutral font-bold uppercase tracking-wider border-b border-surface-border">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Customer / Firm</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="py-3 px-3 text-neutral-muted whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-neutral-dark">{lead.customer_name}</div>
                    <div className="text-[11px] text-neutral-muted">{lead.business_name}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-neutral-dark font-medium">
                    {lead.phone}
                  </td>
                  <td className="py-3 px-3 text-neutral">
                    {lead.service_id || 'General Consultation'}
                  </td>
                  <td className="py-3 px-3">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to="/admin/leads"
                      className="text-primary font-bold hover:underline"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
