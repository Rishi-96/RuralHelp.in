import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Shield, User, Mail, CheckCircle2, XCircle, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const DEFAULT_USERS = [
  {
    id: 1,
    full_name: "System Administrator",
    email: "admin@ruralhelp.in",
    role: "Super Admin",
    department: "Executive & Systems",
    is_active: true,
    created_at: "2026-11-01",
  },
  {
    id: 2,
    full_name: "Rishi & Regional Ops Lead",
    email: "operations@ruralhelp.in",
    role: "Admin",
    department: "Baruasagar Field Ops",
    is_active: true,
    created_at: "2026-11-05",
  },
  {
    id: 3,
    full_name: "Pooja Sharma",
    email: "pooja.sharma@ruralhelp.in",
    role: "Operations Lead",
    department: "Client Onboarding & Training",
    is_active: true,
    created_at: "2026-11-08",
  },
  {
    id: 4,
    full_name: "Amit Patel",
    email: "amit.patel@ruralhelp.in",
    role: "Field Consultant",
    department: "Jhansi Retail Tech Cell",
    is_active: true,
    created_at: "2026-11-10",
  },
  {
    id: 5,
    full_name: "Sunil Verma",
    email: "sunil.v@ruralhelp.in",
    role: "Content Editor",
    department: "Knowledge Base & Case Studies",
    is_active: false,
    created_at: "2026-11-12",
  }
];

export default function UsersManagePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    role: 'Operations Lead',
    department: 'Field Operations',
    is_active: true,
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ruralhelp_admin_users') || 'null');
    setUsers(stored || DEFAULT_USERS);
  }, []);

  const save = (list) => {
    setUsers(list);
    localStorage.setItem('ruralhelp_admin_users', JSON.stringify(list));
  };

  const handleOpenAdd = () => {
    setEditing(null);
    setForm({
      full_name: '',
      email: '',
      role: 'Operations Lead',
      department: 'Field Operations',
      is_active: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (user) => {
    setEditing(user);
    setForm({
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      department: user.department || 'Field Operations',
      is_active: user.is_active,
    });
    setShowModal(true);
  };

  const handleToggleStatus = (id) => {
    const updated = users.map(u => {
      if (u.id === id) {
        if (u.role === 'Super Admin' && u.is_active) {
          alert('Cannot deactivate the root Super Admin account.');
          return u;
        }
        return { ...u, is_active: !u.is_active };
      }
      return u;
    });
    save(updated);
  };

  const handleDelete = (id) => {
    const target = users.find(u => u.id === id);
    if (target?.role === 'Super Admin') {
      alert('The root Super Admin account cannot be removed.');
      return;
    }
    if (confirm(`Remove staff access for ${target?.full_name || 'this user'}?`)) {
      save(users.filter(u => u.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) return;

    if (editing) {
      save(users.map(u => (u.id === editing.id ? { ...u, ...form } : u)));
    } else {
      const newUser = {
        id: Date.now(),
        ...form,
        created_at: new Date().toISOString().slice(0, 10),
      };
      save([newUser, ...users]);
    }
    setShowModal(false);
  };

  const filtered = users.filter(u => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-neutral-dark">Staff & Team Users</h1>
            <Badge variant="primary">{users.length} Total</Badge>
          </div>
          <p className="text-sm text-neutral-medium mt-1">
            Manage administrative personnel, field support leads, and RBAC permissions for RuralHelp.
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Staff Member
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-surface-card">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium" />
            <input
              type="text"
              placeholder="Search by name, email, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-surface-canvas border border-surface-border rounded focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-medium whitespace-nowrap">Filter Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-surface-canvas border border-surface-border rounded font-medium focus:outline-none focus:border-brand-primary"
            >
              <option value="ALL">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Operations Lead">Operations Lead</option>
              <option value="Field Consultant">Field Consultant</option>
              <option value="Content Editor">Content Editor</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-canvas border-b border-surface-border text-xs uppercase tracking-wider text-neutral-medium">
                <th className="py-3 px-4 font-semibold">Staff Member</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Department</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Joined Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-neutral-medium">
                    No team members found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-canvas/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center justify-center font-serif font-bold text-sm">
                          {user.full_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-dark flex items-center gap-1.5">
                            {user.full_name}
                            {user.role === 'Super Admin' && (
                              <Shield className="w-3.5 h-3.5 text-brand-primary" title="Root Super Admin" />
                            )}
                          </div>
                          <div className="text-xs text-neutral-medium flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        user.role === 'Super Admin'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : user.role === 'Admin'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-stone-100 text-stone-800 border border-stone-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-neutral-medium">
                      {user.department || 'Bundelkhand Operations'}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className="inline-flex items-center gap-1.5 text-xs focus:outline-none"
                      >
                        {user.is_active ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-neutral-500 bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded">
                            <XCircle className="w-3 h-3 text-neutral-400" />
                            Inactive
                          </span>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-neutral-medium">
                      {user.created_at}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 hover:bg-surface-canvas rounded text-neutral-medium hover:text-brand-primary transition-colors"
                          title="Edit Member"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {user.role !== 'Super Admin' && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 hover:bg-red-50 rounded text-neutral-medium hover:text-red-600 transition-colors"
                            title="Remove Access"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-surface-border rounded-lg max-w-lg w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-serif text-xl font-bold text-neutral-dark mb-4">
              {editing ? 'Edit Staff Member' : 'Add New Staff Member'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Full Name"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                placeholder="e.g. Anand Kumar"
              />

              <Input
                label="Email Address"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="anand@ruralhelp.in"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Role (Access Level)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  options={[
                    { value: 'Super Admin', label: 'Super Admin (Full System)' },
                    { value: 'Admin', label: 'Admin (Operations & Leads)' },
                    { value: 'Operations Lead', label: 'Operations Lead' },
                    { value: 'Field Consultant', label: 'Field Consultant' },
                    { value: 'Content Editor', label: 'Content Editor' },
                  ]}
                />

                <Input
                  label="Department / Unit"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  placeholder="e.g. Baruasagar Hub"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="user_is_active"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded border-surface-border text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="user_is_active" className="text-sm text-neutral-dark select-none">
                  User is Active (can login and perform assigned operations)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editing ? 'Save Changes' : 'Create User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
