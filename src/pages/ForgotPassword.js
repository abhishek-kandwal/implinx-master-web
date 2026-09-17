import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { authService } from '../services/auth';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await authService.requestPasswordReset(email);
    setLoading(false);
    setSubmitted(true);
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
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle2 size={44} color="var(--color-success)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Check your email</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              We've sent a password reset link to <strong>{email}</strong>.
            </p>
            <Button to="/login" variant="primary" size="md" style={{ width: '100%' }}>
              Return to Login
            </Button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Reset your password</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Enter your email address and we'll send you recovery instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                label="Email Address"
                type="email"
                required
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Send Reset Link
              </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
