import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MessageSquare, 
  Clock, 
  Phone, 
  Mail, 
  Building2, 
  CheckCircle2, 
  Plus, 
  Edit3,
  X
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLead, setActiveLead] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Lost'];

  const loadLeads = () => {
    const stored = JSON.parse(localStorage.getItem('ruralhelp_offline_leads') || '[]');
    setLeads(stored);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const updateLeadStatus = (leadId, newStatus) => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          status: newStatus,
          activities: [
            ...(l.activities || []),
            {
              type: 'status_change',
              text: `Status updated to ${newStatus}`,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('ruralhelp_offline_leads', JSON.stringify(updated));
    if (activeLead && activeLead.id === leadId) {
      setActiveLead((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleAddNote = (leadId) => {
    if (!noteText.trim()) return;
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          notes: [
            ...(l.notes || []),
            {
              id: Date.now(),
              text: noteText.trim(),
              author: 'Field Admin',
              created_at: new Date().toISOString(),
            },
          ],
        };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('ruralhelp_offline_leads', JSON.stringify(updated));
    setNoteText('');
    const refreshed = updated.find((l) => l.id === leadId);
    if (refreshed) setActiveLead(refreshed);
  };

  const handleSetFollowUp = (leadId) => {
    if (!followUpDate) return;
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          follow_up_date: followUpDate,
        };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('ruralhelp_offline_leads', JSON.stringify(updated));
    const refreshed = updated.find((l) => l.id === leadId);
    if (refreshed) setActiveLead(refreshed);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchSearch =
      (lead.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm) ||
      (lead.business_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <Badge variant="warning" size="sm">NEW</Badge>;
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-dark">
            Enquiry &amp; Lead Management
          </h1>
          <p className="text-xs text-neutral-muted mt-0.5">
            Track customer enquiries through the 6-stage sales &amp; deployment workflow
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-surface-card p-4 rounded-lg border border-surface-border flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <Input
            placeholder="Search by customer, firm or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all whitespace-nowrap border ${
                statusFilter === st
                  ? 'bg-primary text-white border-primary shadow-tactile-sm'
                  : 'bg-surface-subtle text-neutral border-surface-border hover:bg-surface-card'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table + Details Drawer Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Column */}
        <div className={activeLead ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <Card bodyClassName="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-subtle text-neutral font-bold uppercase tracking-wider border-b border-surface-border">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Customer &amp; Business</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-neutral-muted">
                        No enquiries matching the filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setActiveLead(lead)}
                        className={`cursor-pointer transition-colors ${
                          activeLead?.id === lead.id
                            ? 'bg-primary/5 font-semibold'
                            : 'hover:bg-surface-subtle/60'
                        }`}
                      >
                        <td className="py-3 px-4 text-neutral-muted whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-neutral-dark">{lead.customer_name}</div>
                          <div className="text-[11px] text-neutral-muted flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-primary shrink-0" />
                            <span>{lead.business_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-dark">
                          {lead.phone}
                        </td>
                        <td className="py-3 px-4 text-neutral">
                          {lead.service_id || 'Consultation'}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(lead.status)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLead(lead);
                            }}
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Lead Detail Panel / Modal */}
        {activeLead && (
          <div className="lg:col-span-5 bg-surface-card border-2 border-primary/20 rounded-lg p-6 shadow-tactile space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted">
                  Enquiry ID #{activeLead.id}
                </span>
                <h3 className="font-serif font-bold text-xl text-neutral-dark">
                  {activeLead.customer_name}
                </h3>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="p-1 rounded text-neutral-muted hover:bg-surface-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Firm Details */}
            <div className="space-y-2 text-xs bg-surface-subtle p-3 rounded border border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-neutral-muted font-bold">Business:</span>
                <span className="font-bold text-neutral-dark">{activeLead.business_name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-muted font-bold">Phone:</span>
                <a href={`tel:${activeLead.phone}`} className="font-mono font-bold text-primary hover:underline">
                  {activeLead.phone}
                </a>
              </div>
              {activeLead.email && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-muted font-bold">Email:</span>
                  <span className="text-neutral">{activeLead.email}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-neutral-muted font-bold">Service Required:</span>
                <span className="font-semibold text-neutral">{activeLead.service_id || 'Not specified'}</span>
              </div>
            </div>

            {/* Project / Problem Description */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted block mb-1">
                Client Requirement:
              </span>
              <p className="text-xs text-neutral leading-relaxed bg-surface-canvas p-3 rounded border border-surface-border">
                {activeLead.project_description || 'No description provided.'}
              </p>
            </div>

            {/* Workflow Status Selector */}
            <div className="pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted block mb-1.5">
                Update Workflow Status:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Lost'].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateLeadStatus(activeLead.id, st)}
                    className={`py-1.5 px-2 text-[10px] font-bold rounded uppercase tracking-wider border transition-all ${
                      activeLead.status === st
                        ? 'bg-primary text-white border-primary shadow-tactile-sm'
                        : 'bg-surface-subtle text-neutral border-surface-border hover:bg-surface-card'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Follow-up scheduler */}
            <div className="pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted block mb-1.5">
                Schedule Field Visit / Follow-Up:
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="flex-1 text-xs px-3 py-1.5 border border-surface-border-strong rounded bg-surface-card"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetFollowUp(activeLead.id)}
                >
                  Save Date
                </Button>
              </div>
              {activeLead.follow_up_date && (
                <div className="mt-1.5 text-xs text-secondary-dark font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Scheduled for: {activeLead.follow_up_date}</span>
                </div>
              )}
            </div>

            {/* Internal Field Notes */}
            <div className="pt-2 border-t border-surface-border">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted block mb-2">
                Internal Field Notes ({activeLead.notes?.length || 0})
              </span>

              <div className="space-y-2 max-h-36 overflow-y-auto mb-3">
                {activeLead.notes && activeLead.notes.length > 0 ? (
                  activeLead.notes.map((note) => (
                    <div key={note.id} className="p-2.5 bg-surface-subtle rounded border border-surface-border text-xs">
                      <p className="text-neutral">{note.text}</p>
                      <div className="mt-1 text-[10px] text-neutral-muted flex justify-between">
                        <span>{note.author}</span>
                        <span>{new Date(note.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-muted italic">No internal notes added yet.</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add note (e.g. Visited store, wants 2 thermal printers)..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 text-xs px-3 py-1.5 border border-surface-border-strong rounded bg-surface-card"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddNote(activeLead.id)}
                >
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
