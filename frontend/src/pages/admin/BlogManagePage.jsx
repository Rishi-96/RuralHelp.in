import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Clock, User, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';

const DEFAULT_POSTS = [
  {
    id: 1,
    title: "How Small Shopkeepers in Baruasagar Are Recovering ₹2+ Lakhs in Udhaar Using WhatsApp Automation",
    slug: "recovering-udhaar-whatsapp-automation",
    excerpt: "Manual telephone calls to remind customers of pending ledger balances often lead to awkward relations. Here is how polite automated WhatsApp reminders are delivering 85% collection rates.",
    content: "",
    category: "Retail Tech",
    author: "Rishi & Tech Team",
    read_time: "4 min read",
    status: "Published",
    created_at: "2026-11-12",
  },
  {
    id: 2,
    title: "GST 2026 Mandates for Tier-3 Retailers: What Bundelkhand MSMEs Must Know",
    slug: "gst-2026-mandates-tier-3-retailers",
    excerpt: "A simple, non-legal guide for shop owners on upcoming electronic invoice regulations and how modern POS software keeps you fully compliant.",
    content: "",
    category: "Compliance & Tax",
    author: "CA Advisory Group",
    read_time: "6 min read",
    status: "Published",
    created_at: "2026-10-28",
  },
  {
    id: 3,
    title: "Why Generic SaaS Tools Fail Regional Businesses: The Case for Offline-First Architecture",
    slug: "why-generic-saas-fails-regional-businesses",
    excerpt: "When power cuts or fiber cuts happen in regional towns, cloud-only POS systems shut down. Here is how our dual-cache local database guarantees continuous billing.",
    content: "",
    category: "Engineering Insights",
    author: "RuralHelp Engineering",
    read_time: "5 min read",
    status: "Published",
    created_at: "2026-10-14",
  }
];

export default function BlogManagePage() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: '', author: 'RuralHelp Team', read_time: '5 min read', status: 'Draft',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ruralhelp_admin_blog') || 'null');
    setPosts(stored || DEFAULT_POSTS);
  }, []);

  const save = (list) => {
    setPosts(list);
    localStorage.setItem('ruralhelp_admin_blog', JSON.stringify(list));
  };

  const handleOpenAdd = () => {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', category: 'Retail Tech', author: 'RuralHelp Team', read_time: '5 min read', status: 'Draft' });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title, excerpt: p.excerpt, content: p.content || '',
      category: p.category, author: p.author, read_time: p.read_time, status: p.status,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this blog post?')) save(posts.filter((p) => p.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (editing) {
      save(posts.map((p) => (p.id === editing.id ? { ...p, ...form, slug } : p)));
    } else {
      save([{ id: Date.now(), ...form, slug, created_at: new Date().toISOString().slice(0, 10) }, ...posts]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-dark">Knowledge Blog</h1>
          <p className="text-xs text-neutral-muted mt-0.5">Write &amp; manage technology guides for regional business owners</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>New Blog Post</Button>
      </div>

      <Card bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle text-neutral font-bold uppercase tracking-wider border-b border-surface-border">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-neutral-dark text-sm max-w-sm">{post.title}</div>
                    <div className="text-[11px] text-neutral-muted max-w-sm truncate mt-0.5">{post.excerpt}</div>
                  </td>
                  <td className="py-3 px-4"><Badge variant="primary" size="sm">{post.category}</Badge></td>
                  <td className="py-3 px-4 text-neutral">
                    <span className="flex items-center gap-1"><User className="w-3 h-3 text-primary" />{post.author}</span>
                  </td>
                  <td className="py-3 px-4 text-neutral-muted whitespace-nowrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.created_at}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={post.status === 'Published' ? 'success' : 'warning'} size="sm">
                      {post.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(post)} className="p-1.5 rounded hover:bg-surface-subtle text-primary"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded hover:bg-surface-subtle text-error"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-dark/50 flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-lg border-2 border-primary/20 shadow-tactile max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-xl text-neutral-dark border-b border-surface-border pb-2">
              {editing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <Input label="Article Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. How Barcode Billing Saves ₹50,000/month in Leakage" />
              <Textarea label="Excerpt / Summary" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required placeholder="Short summary for the blog listing page" />
              <Textarea label="Full Article Content" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write full article here (supports plain text; rich text editor coming in next phase)..." />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required placeholder="Retail Tech" />
                <Input label="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author name" />
                <Input label="Read Time" value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="5 min read" />
                <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  options={[{ value: 'Draft', label: 'Draft' }, { value: 'Published', label: 'Published' }]} />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-surface-border">
                <Button variant="ghost" size="md" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">
                  {form.status === 'Published' ? 'Publish Post' : 'Save Draft'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
