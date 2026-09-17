import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, AlertCircle } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { useAuth } from '../context/AuthContext';

export const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle, loginAsDemo, isConfigured } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'free';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await signup(email, password, fullName);
      if (res.error) {
        setError(res.error.message);
      } else {
        navigate('/app/dashboard', { replace: true });
      }
    } catch (err) {
      setError('Registration failed. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const res = await loginWithGoogle();
      if (res.error) {
        setError(res.error.message);
      } else if (!isConfigured) {
        navigate('/app/dashboard', { replace: true });
      }
    } catch (err) {
      setError('Google Sign-In could not be initialized.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--bg-canvas)'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <Logo variant="default" size="lg" />
      </div>

      <Card style={{ width: '100%', maxWidth: '440px', padding: '2.25rem', boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Create your account</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            One master identity for all ImPlinx tools and apps
          </p>
          {selectedPlan !== 'free' && (
            <div style={{ marginTop: '0.5rem' }}>
              <span className="badge badge-primary">
                Selected Plan: {selectedPlan.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            required
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alex Chen"
          />

          <Input
            label="Email Address"
            type="email"
            required
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            helperText="Must be at least 6 characters"
          />

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
            By registering, you agree to the ImPlinx{' '}
            <Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Privacy Policy</Link>.
          </p>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            style={{ width: '100%' }}
          >
            Create ImPlinx Account
          </Button>
        </form>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '1.5rem 0',
            color: 'var(--text-muted)',
            fontSize: '0.8rem'
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }} />
          <span>or sign up with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }} />
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={handleGoogleSignUp}
          style={{ width: '100%', marginBottom: '1.25rem' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Google
        </Button>

        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </Card>

      <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)' }}>
          ← Back to ImPlinx Homepage
        </Link>
      </div>
    </div>
  );
};
