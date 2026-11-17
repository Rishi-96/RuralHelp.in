import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    client_name: "Rameshwar Dayal Gupta",
    client_role: "Proprietor",
    company_name: "Gupta Wholesale Kirana, Baruasagar",
    content: "Pehle festival season me bill banane me 15 minute lagte the aur line bahar tak chali jaati thi. RuralHelp ne barcode billing lagayi, ab 20 second me bill nikalta hai aur WhatsApp par bhi chala jaata hai.",
    rating: 5,
    impact: "+35% Faster Checkout, 0 Billing Errors",
    is_active: true,
  },
  {
    id: 2,
    client_name: "Dr. Arvind Srivastav",
    client_role: "Chief Medical Officer",
    company_name: "Bundelkhand PolyClinic, Jhansi",
    content: "Hamare clinic me patient ki bheed manage karna mushkil ho gaya tha. RuralHelp ke OPD token system aur digital prescription software ne pura mahaul badal diya.",
    rating: 5,
    impact: "60% Reduction in Patient Waiting Time",
    is_active: true,
  },
  {
    id: 3,
    client_name: "Sunita Verma",
    client_role: "Founder & Director",
    company_name: "Prerna Coaching Classes, Baruasagar",
    content: "Fee collection register me likhte-likhte pareshan rehte the. RuralHelp ne biometric attendance lagaya aur parents ko automatic WhatsApp message jata hai. Fee collection ab 95% on-time ho gaya hai.",
    rating: 5,
    impact: "95% On-Time Fee Collection",
    is_active: true,
  }
];

export default function TestimonialsManagePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    client_name: '', client_role: '', company_name: '', content: '', rating: 5, impact: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ruralhelp_admin_testimonials') || 'null');
    setTestimonials(stored || DEFAULT_TESTIMONIALS);
  }, []);

  const save = (list) => {
    setTestimonials(list);
    localStorage.setItem('ruralhelp_admin_testimonials', JSON.stringify(list));
  };

  const handleOpenAdd = () => {
    setEditing(null);
    setForm({ client_name: '', client_role: '', company_name: '', content: '', rating: 5, impact: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (t) => {
    setEditing(t);
    setForm({
      client_name: t.client_name, client_role: t.client_role, company_name: t.company_name,
      content: t.content, rating: t.rating, impact: t.impact
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Remove this testimonial?')) save(testimonials.filter((t) => t.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      save(testimonials.map((t) => (t.id === editing.id ? { ...t, ...form } : t)));
    } else {
      save([{ id: Date.now(), ...form, is_active: true }, ...testimonials]);
    }
    setShowModal(false);
  };

  const renderStars = (count) => (
    <span className="flex items-center gap-0.5 text-secondary-dark">
      {[...Array(count)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-dark">Client Testimonials</h1>
          <p className="text-xs text-neutral-muted mt-0.5">Manage verified merchant voices &amp; impact stories</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>Add Testimonial</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-surface-card p-5 rounded-lg border border-surface-border shadow-tactile-sm flex flex-col justify-between">
            <div>
              {renderStars(t.rating)}
              <p className="mt-3 text-sm font-serif italic text-neutral leading-relaxed">
                "{t.content}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-border">
              <div className="text-xs font-bold text-secondary-dark mb-1">{t.impact}</div>
              <div className="font-bold text-sm text-neutral-dark">{t.client_name}</div>
              <div className="text-xs text-neutral-muted">{t.client_role}, {t.company_name}</div>

              <div className="mt-3 flex items-center gap-2 justify-end">
                <button onClick={() => handleOpenEdit(t)} className="p-1.5 rounded hover:bg-surface-subtle text-primary" title="Edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded hover:bg-surface-subtle text-error" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-dark/50 flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-lg border-2 border-primary/20 shadow-tactile max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-xl text-neutral-dark border-b border-surface-border pb-2">
              {editing ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Client Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required placeholder="e.g. Rameshwar Dayal Gupta" />
                <Input label="Role / Designation" value={form.client_role} onChange={(e) => setForm({ ...form, client_role: e.target.value })} required placeholder="e.g. Proprietor" />
              </div>
              <Input label="Business / Company Name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} required placeholder="e.g. Gupta Wholesale Kirana, Baruasagar" />
              <Textarea label="Testimonial Quote" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required placeholder="Client testimonial in Hindi/English..." />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral uppercase tracking-wider mb-1.5">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}
                        className={`text-xl ${star <= form.rating ? 'text-secondary-dark' : 'text-neutral/20'}`}>★</button>
                    ))}
                  </div>
                </div>
                <Input label="Impact Summary" value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} placeholder="e.g. +35% Faster Checkout" />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-surface-border">
                <Button variant="ghost" size="md" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Testimonial</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
