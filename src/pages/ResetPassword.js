import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { authService } from '../services/auth';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error: err } = await authService.updatePassword(password);
    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
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
        {success ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle2 size={44} color="var(--color-success)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Password Updated</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Your ImPlinx master password has been successfully changed.
            </p>
            <Button to="/login" variant="primary" size="md" style={{ width: '100%' }}>
              Sign in with New Password
            </Button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Set new password</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Please create a secure password for your ImPlinx account.
              </p>
            </div>

            {error && (
              <div style={{ padding: '0.75rem', background: 'var(--color-danger-bg)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                label="New Password"
                type="password"
                required
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />

              <Input
                label="Confirm New Password"
                type="password"
                required
                icon={Lock}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Update Password
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};
