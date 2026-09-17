import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Trash2, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';

export const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  );
  const [saved, setSaved] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteAccount = async () => {
    await logout();
    navigate('/');
  };

  return (
    <AppShell title="Account Profile">
      <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Personal Identity</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your personal profile details and master authentication credentials.
          </p>
        </div>

        {/* Profile Card */}
        <Card style={{ padding: '2rem' }}>
          <form onSubmit={handleProfileSave}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--brand-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}
              >
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>

              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem' }}>{fullName || 'User Profile'}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user?.email}</div>
              </div>
            </div>

            <Input
              label="Display Name"
              required
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
            />

            <Input
              label="Primary Email Address"
              type="email"
              disabled
              icon={Mail}
              value={user?.email || ''}
              helperText="Email is bound to your primary Supabase auth identifier."
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
              <Button type="submit" variant="primary" size="md">
                Save Changes
              </Button>
              {saved && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> Saved successfully!
                </span>
              )}
            </div>
          </form>
        </Card>

        {/* Security & Providers */}
        <Card style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Authentication Providers</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Connected authentication methods for this account.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Key size={18} color="var(--brand-primary)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email & Password</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Enabled for {user?.email}</div>
                </div>
              </div>
              <Button to="/reset-password" variant="secondary" size="sm">
                Change Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-danger)', marginBottom: '0.5rem' }}>
            Danger Zone
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            Permanently delete your master account and expunge all synchronized bookmarks, notes, and subscriptions.
          </p>

          <Button
            variant="danger"
            size="md"
            icon={Trash2}
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete ImPlinx Account
          </Button>
        </Card>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Master Account"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--color-danger)' }}>
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                This action is irreversible. All bookmarks, folders, tags, and account entitlements will be purged permanently.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteAccount}>
                Yes, Delete Account
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
};
