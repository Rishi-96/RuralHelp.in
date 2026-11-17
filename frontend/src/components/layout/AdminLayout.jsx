import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  FileText, 
  FolderKanban, 
  MessageSquareQuote, 
  ShieldCheck, 
  LogOut, 
  ExternalLink,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AdminLayout() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Leads & Enquiries', path: '/admin/leads', icon: PhoneCall },
    { name: 'Services Catalog', path: '/admin/services', icon: Layers },
    { name: 'Portfolio Projects', path: '/admin/portfolio', icon: FolderKanban },
    { name: 'Client Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Knowledge Blog', path: '/admin/blog', icon: FileText },
    { name: 'Staff Users', path: '/admin/users', icon: Users, roleRequired: 'super_admin' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-surface-canvas flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-surface-card border-r border-surface-border hidden md:flex md:flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="h-16 px-6 border-b border-surface-border flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary text-white font-serif font-bold text-base flex items-center justify-center rounded">
                R
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-primary tracking-tight">
                  RuralHelp
                </span>
                <span className="block text-[9px] font-sans font-bold tracking-widest text-neutral-muted uppercase -mt-1">
                  Staff Terminal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-white shadow-tactile-sm'
                      : 'text-neutral hover:bg-surface-subtle hover:text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded bg-primary/20 text-primary font-bold text-xs flex items-center justify-center border border-primary/30">
              {user?.full_name ? user.full_name.charAt(0) : 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-neutral truncate">
                {user?.full_name || 'Staff Administrator'}
              </div>
              <div className="text-[10px] text-neutral-muted uppercase font-semibold">
                {user?.role || 'Super Admin'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-surface-border/60">
            <Link
              to="/"
              target="_blank"
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-[11px] font-bold text-error hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-surface-card border-b border-surface-border p-4 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary text-white font-serif font-bold text-sm flex items-center justify-center rounded">
            R
          </div>
          <span className="font-serif font-bold text-base text-primary">RuralHelp Admin</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded text-neutral border border-surface-border"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-card border-b border-surface-border p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded text-xs font-bold uppercase ${
                  isActive(item.path) ? 'bg-primary text-white' : 'text-neutral hover:bg-surface-subtle'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-surface-border flex justify-between">
            <Link to="/" className="text-xs font-bold text-primary">Public Site</Link>
            <button onClick={handleLogout} className="text-xs font-bold text-error">Logout</button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
