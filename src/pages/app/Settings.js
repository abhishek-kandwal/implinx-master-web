import React, { useState } from 'react';
import { Sun, Moon, Laptop, Bell, Keyboard, Shield, CheckCircle2 } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [syncOnSave, setSyncOnSave] = useState(true);
  const [smartTags, setSmartTags] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <AppShell title="Preferences & Settings">
      <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Preferences</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Configure your workspace interface, sync behavior, and shortcuts.
          </p>
        </div>

        {/* Theme Settings */}
        <Card style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Appearance & Theme</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            Choose how ImPlinx looks on your device.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div
              onClick={() => setTheme('light')}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: theme === 'light' ? '2px solid var(--brand-primary)' : '1px solid var(--border-default)',
                background: 'var(--bg-surface)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <Sun size={20} color="var(--brand-primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Light Mode</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Crisp clean neutrals</div>
              </div>
            </div>

            <div
              onClick={() => setTheme('dark')}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: theme === 'dark' ? '2px solid var(--brand-primary)' : '1px solid var(--border-default)',
                background: 'var(--bg-surface)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <Moon size={20} color="var(--brand-primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dark Mode</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sleek deep navy</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sync & Automation Settings */}
        <Card style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Sync & Productivity</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Manage extension automation and cloud synchronization.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Instant Cloud Sync</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Immediately push bookmark additions and tag edits to PostgreSQL RLS database.
                </div>
              </div>
              <input
                type="checkbox"
                checked={syncOnSave}
                onChange={(e) => setSyncOnSave(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)' }}
              />
            </label>

            <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Smart Folder Suggestions</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Automatically analyze webpage keywords to suggest destination folders.
                </div>
              </div>
              <input
                type="checkbox"
                checked={smartTags}
                onChange={(e) => setSmartTags(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)' }}
              />
            </label>

            <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Weekly Knowledge Digest</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Receive a weekly email summarizing your most visited links and saved topics.
                </div>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)' }}
              />
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <Button variant="primary" size="md" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
            {savedNotice && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> Preferences updated!
              </span>
            )}
          </div>
        </Card>

        {/* Global Keyboard Shortcuts */}
        <Card style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Keyboard size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Browser & Desktop Shortcuts</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>Instant Save Active Tab</span>
              <kbd style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-default)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 600 }}>
                Alt + S (Option + S)
              </kbd>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>Open Global Search Palette</span>
              <kbd style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-default)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 600 }}>
                Ctrl + Shift + K (Cmd + Shift + K)
              </kbd>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0' }}>
              <span>Toggle Side Panel</span>
              <kbd style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-default)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 600 }}>
                Alt + B (Option + B)
              </kbd>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
};
