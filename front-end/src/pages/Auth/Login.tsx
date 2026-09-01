import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Info } from 'lucide-react';
import Logo from '@/components/Logo';
import '../Pages.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rajesh.kumar@abctech.in');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate backend call / mock login success
    setTimeout(() => {
      setLoading(false);
      navigate('/my-tenders');
    }, 600);
  };

  return (
    <div className="page" style={{ paddingTop: 'calc(64px + var(--space-8))', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-light-bg)' }}>
      <div style={{ maxWidth: '440px', width: '100%', padding: 'var(--space-8)', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
        
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
            <Logo variant="dark" size="lg" />
          </div>
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-deep-navy)', marginTop: 'var(--space-4)' }}>
            Sign In to NETRA Portal
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            National Evaluation & Tender Risk Assessment Portal
          </p>
        </div>

        {/* Backend Integration Banner */}
        <div style={{ padding: 'var(--space-3) var(--space-4)', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
          <Info size={18} style={{ color: 'var(--color-govt-blue)', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '12px', color: '#1E40AF', lineHeight: 1.5 }}>
            <strong>Backend Integration Shell:</strong> Authentication connects to Express backend (<code>POST /api/auth/login</code>) when live.
          </p>
        </div>

        {error && (
          <div style={{ padding: 'var(--space-3)', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-xs)', marginBottom: 'var(--space-4)' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '38px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="registered.email@company.in"
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-govt-blue)', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '38px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            <input type="checkbox" id="remember" defaultChecked style={{ cursor: 'pointer' }} />
            <label htmlFor="remember" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
              Remember me on this device
            </label>
          </div>

          <button type="submit" className="btn btn--primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          Don't have a bidder account?{' '}
          <Link to="/" style={{ color: 'var(--color-govt-blue)', fontWeight: 600 }}>
            Register Entity
          </Link>
        </div>
      </div>
    </div>
  );
}
