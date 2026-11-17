import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Layers } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import { SERVICES_DATA } from '../../api/mockData';

export default function ServicesManagePage() {
  const [services, setServices] = useState(SERVICES_DATA);
  const [editingService, setEditingService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: '',
    shortDescription: '',
    fullDescription: '',
    features: '',
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setForm({
      title: '',
      category: 'Software Development',
      shortDescription: '',
      fullDescription: '',
      features: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (svc) => {
    setEditingService(svc);
    setForm({
      title: svc.title,
      category: svc.category,
      shortDescription: svc.shortDescription,
      fullDescription: svc.fullDescription,
      features: svc.features.join('\n'),
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to deactivate this service?')) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const featArray = form.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                title: form.title,
                category: form.category,
                shortDescription: form.shortDescription,
                fullDescription: form.fullDescription,
                features: featArray,
              }
            : s
        )
      );
    } else {
      const newSvc = {
        id: Date.now(),
        slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: form.title,
        category: form.category,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        features: featArray,
        isFeatured: false,
      };
      setServices([newSvc, ...services]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-dark">
            Service Catalog Management
          </h1>
          <p className="text-xs text-neutral-muted mt-0.5">
            Configure solutions, features, and deployment pricing for regional offerings
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
          Add New Service
        </Button>
      </div>

      <Card bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-neutral font-bold uppercase tracking-wider border-b border-surface-border">
              <tr>
                <th className="py-3 px-4">Service Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Key Features</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-neutral-dark text-sm">{svc.title}</div>
                    <div className="text-[11px] text-neutral-muted max-w-xs truncate">
                      {svc.shortDescription}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="primary" size="sm">{svc.category}</Badge>
                  </td>
                  <td className="py-3 px-4 text-neutral">
                    {svc.features?.length || 0} capabilities
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success" size="sm">ACTIVE</Badge>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(svc)}
                      className="p-1.5 rounded hover:bg-surface-subtle text-primary"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="p-1.5 rounded hover:bg-surface-subtle text-error"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-dark/50 flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-lg border-2 border-primary/20 shadow-tactile max-w-lg w-full p-6 space-y-4">
            <h3 className="font-serif font-bold text-xl text-neutral-dark border-b border-surface-border pb-2">
              {editingService ? 'Edit Service Offering' : 'Add New Service Offering'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <Input
                label="Service Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="e.g. Cold Storage Inventory Management"
              />

              <Input
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                placeholder="e.g. Retail Systems, Healthcare Tech"
              />

              <Textarea
                label="Short Description"
                rows={2}
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                required
                placeholder="One sentence summary for service card"
              />

              <Textarea
                label="Detailed Description"
                rows={3}
                value={form.fullDescription}
                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                placeholder="In-depth explanation of workflow"
              />

              <Textarea
                label="Features (One per line)"
                rows={3}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="Offline first sync&#10;Thermal receipt printing&#10;WhatsApp alerts"
              />

              <div className="flex justify-end gap-2 pt-3 border-t border-surface-border">
                <Button variant="ghost" size="md" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Save Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
