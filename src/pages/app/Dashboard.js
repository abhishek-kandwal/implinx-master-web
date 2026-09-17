import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  FileText,
  Sparkles,
  Download,
  CreditCard,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Laptop
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../config/products';

export const Dashboard = () => {
  const { user } = useAuth();
  const userPlan = user?.plan || 'free';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const isPro = userPlan === 'pro' || userPlan === 'everything';

  return (
    <AppShell title="Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Welcome Banner */}
        <div
          className="card"
          style={{
            background: 'var(--grad-primary)',
            color: '#fff',
            border: 'none',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-block',
                marginBottom: '0.75rem'
              }}
            >
              Master Account Hub
            </span>
            <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.5rem' }}>
              Welcome back, {userName}
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Your central place for connected bookmarks, knowledge, and productivity tools.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {!isPro ? (
                <Button
                  to="/app/billing"
                  style={{
                    background: '#fff',
                    color: 'var(--brand-primary)',
                    fontWeight: 700
                  }}
                  icon={Sparkles}
                >
                  Upgrade to Pro
                </Button>
              ) : (
                <Button
                  to="/app/billing"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                  icon={ShieldCheck}
                >
                  Manage Pro Subscription
                </Button>
              )}
              <Button
                to="/app/downloads"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
                icon={Download}
              >
                Get Browser Extension
              </Button>
            </div>
          </div>
        </div>

        {/* Product Access Ecosystem Hub */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Your ImPlinx Ecosystem</h3>
            <Link to="/app/products" style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
              View all products →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Bookmarks Card */}
            <Card style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--brand-primary-light)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Bookmark size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{PRODUCTS.BOOKMARKS.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                      {userPlan === 'free' ? 'Free License Active' : 'Pro License Active'}
                    </span>
                  </div>
                </div>
                <span className="badge badge-success">Connected</span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1 }}>
                Save, categorize, and instantly search through your links across extensions and desktop.
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <Button to="/products/bookmarks" variant="secondary" size="sm" style={{ flex: 1 }}>
                  Open Bookmarks
                </Button>
                <Button to="/app/downloads" variant="outline" size="sm" icon={Download}>
                  Install Extension
                </Button>
              </div>
            </Card>

            {/* Notes Card */}
            <Card style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-info-bg)',
                      color: 'var(--brand-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{PRODUCTS.NOTES.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-cyan)', fontWeight: 600 }}>
                      Coming Soon
                    </span>
                  </div>
                </div>
                <span className="badge badge-outline">In Development</span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1 }}>
                Capture ideas and connect rich notes directly with your saved bookmarks and research topics.
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <Button to="/products/notes" variant="secondary" size="sm" style={{ width: '100%' }}>
                  View Roadmap & Beta Status
                </Button>
              </div>
            </Card>

            {/* Future Tools Card */}
            <Card style={{ display: 'flex', flexDirection: 'column', background: 'transparent', borderStyle: 'dashed' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--badge-bg)',
                      color: 'var(--brand-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Future Productivity Tools</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Included with Everything Plan
                    </span>
                  </div>
                </div>
                <span className="badge badge-outline">Roadmap</span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1 }}>
                Reader Mode, Clipboard Sync, and AI Synthesis are currently in design for future release.
              </p>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <Button to="/pricing" variant="ghost" size="sm" style={{ width: '100%' }}>
                  Explore Everything Plan →
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Stats & Account Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <Card style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Current Plan
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'capitalize' }}>
              {userPlan} Plan
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {isPro ? 'Next billing in 30 days' : 'Free forever'}
            </div>
          </Card>

          <Card style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Active Synchronizations
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700 }}>
              Chrome Extension
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Zap size={12} /> Sync status operational
            </div>
          </Card>

          <Card style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Security & Storage
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700 }}>
              PostgreSQL RLS
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Row-level security isolated
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};
