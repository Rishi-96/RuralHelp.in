import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Complete Digitization of 3-Floor Hardware & Sanitary Showroom",
    client: "Shri Balaji Sanitary & Pipe Store",
    location: "Jhansi Bypass",
    category: "Retail Systems",
    summary: "Implemented 4-counter networked POS, 18,000 SKU barcode cataloging, and vendor purchase order automation.",
    metrics: "Reduced inventory discrepancy from 14% to 0.4%",
    is_active: true,
  },
  {
    id: 2,
    title: "Smart OPD & Pathology Lab Sync for 50-Bed Maternity Hospital",
    client: "Vatsalya Hospital & Research Center",
    location: "Baruasagar",
    category: "Healthcare Tech",
    summary: "Integrated patient registration, doctor prescription tablets, sonography report generation, and automated WhatsApp patient updates.",
    metrics: "Issued over 25,000 digital records with zero paper loss",
    is_active: true,
  },
  {
    id: 3,
    title: "Omnichannel Ordering App for Organic Bundelkhand Jaggery Producers",
    client: "Bhoomi Krishi FPO",
    location: "Mauranipur / Jhansi",
    category: "E-Commerce",
    summary: "Built farmer-direct marketplace connecting regional producers with bulk buyers across UP and Delhi-NCR.",
    metrics: "₹42 Lakhs direct farmer transactions in first season",
    is_active: true,
  }
];

export default function PortfolioManagePage() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({
    title: '', client: '', location: '', category: '', summary: '', metrics: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ruralhelp_admin_portfolio') || 'null');
    setProjects(stored || DEFAULT_PROJECTS);
  }, []);

  const save = (list) => {
    setProjects(list);
    localStorage.setItem('ruralhelp_admin_portfolio', JSON.stringify(list));
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm({ title: '', client: '', location: 'Baruasagar / Jhansi', category: '', summary: '', metrics: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProject(p);
    setForm({ title: p.title, client: p.client, location: p.location, category: p.category, summary: p.summary, metrics: p.metrics });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Remove this project from the portfolio?')) save(projects.filter((p) => p.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingProject) {
      save(projects.map((p) => (p.id === editingProject.id ? { ...p, ...form } : p)));
    } else {
      save([{ id: Date.now(), ...form, is_active: true }, ...projects]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-dark">Portfolio Projects</h1>
          <p className="text-xs text-neutral-muted mt-0.5">Client case studies &amp; deployment showcases</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>Add Project</Button>
      </div>

      <Card bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-neutral font-bold uppercase tracking-wider border-b border-surface-border">
              <tr>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Impact Metric</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-neutral-dark text-sm">{p.title}</div>
                    <div className="text-[11px] text-neutral-muted max-w-xs truncate">{p.summary}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-neutral">{p.client}</td>
                  <td className="py-3 px-4 text-neutral-muted">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />{p.location}</span>
                  </td>
                  <td className="py-3 px-4"><Badge variant="primary" size="sm">{p.category}</Badge></td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-secondary-dark font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />{p.metrics}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(p)} className="p-1.5 rounded hover:bg-surface-subtle text-primary"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-surface-subtle text-error"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-dark/50 flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-lg border-2 border-primary/20 shadow-tactile max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-xl text-neutral-dark border-b border-surface-border pb-2">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <Input label="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. POS System for Supermarket Chain" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Client Name" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required placeholder="e.g. Gupta Wholesale" />
                <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Baruasagar" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required placeholder="e.g. Retail Systems" />
                <Input label="Impact Metric" value={form.metrics} onChange={(e) => setForm({ ...form, metrics: e.target.value })} placeholder="e.g. 35% faster checkout" />
              </div>
              <Textarea label="Project Summary" rows={3} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required placeholder="Describe the deployment..." />
              <div className="flex justify-end gap-2 pt-3 border-t border-surface-border">
                <Button variant="ghost" size="md" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
