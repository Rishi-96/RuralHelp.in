import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@ruralhelp.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try backend authentication endpoint
      try {
        const res = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const data = await res.json();
          login(data.user, data.access_token);
          navigate('/admin');
          return;
        }
      } catch (backendErr) {
        // Fall back to client demo verification if backend is starting up
      }

      // Built-in credential verification for offline/client demo
      if (email === 'admin@ruralhelp.in' && (password === 'admin123' || password === 'admin')) {
        login(
          {
            id: 1,
            email: 'admin@ruralhelp.in',
            full_name: 'Super Administrator',
            role: 'Super Admin',
          },
          'mock_jwt_token_ruralhelp_2026'
        );
        navigate('/admin');
      } else {
        setError('Invalid credentials. Use admin@ruralhelp.in and admin123');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 bg-primary text-white font-serif font-bold text-2xl flex items-center justify-center rounded border border-primary-dark shadow-tactile-sm">
            R
          </div>
          <span className="font-serif font-bold text-3xl text-primary">RuralHelp</span>
        </Link>
        <h2 className="font-serif text-2xl font-bold text-neutral-dark tracking-tight">
          Staff Administration Portal
        </h2>
        <p className="text-xs text-neutral-muted mt-1">
          Baruasagar &amp; Jhansi Field Team Operations Terminal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-surface-card py-8 px-6 sm:px-10 rounded-lg border-2 border-surface-border shadow-tactile">
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 text-error text-xs rounded font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Staff Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ruralhelp.in"
              required
              icon={Mail}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              icon={Lock}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
              >
                Sign In to Terminal
              </Button>
            </div>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-4 border-t border-surface-border text-center text-xs text-neutral-muted">
            <p className="font-semibold text-neutral">Demo Staff Credentials:</p>
            <p className="font-mono text-[11px] text-primary mt-1">
              admin@ruralhelp.in &bull; admin123
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
