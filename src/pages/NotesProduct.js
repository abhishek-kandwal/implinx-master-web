import React, { useState } from 'react';
import { FileText, Sparkles, Link2, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';

export const NotesProduct = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-glow-bg" />
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge-container">
                <span className="badge badge-outline">
                  <Sparkles size={13} color="var(--brand-cyan)" /> In Active Development · Coming Soon
                </span>
              </div>

              <h1 className="display-1 hero-title">
                Capture ideas.
                <br />
                <span className="text-gradient">Connect knowledge.</span>
              </h1>

              <p className="hero-subtitle">
                ImPlinx Notes will bring connected thinking directly alongside your bookmarks. Markdown notes, bidirectional backlinks, and unified ecosystem search.
              </p>

              {/* Waitlist Form */}
              <div style={{ maxWidth: '480px', margin: '0 auto 2rem auto' }}>
                {submitted ? (
                  <Card style={{ background: 'var(--color-success-bg)', borderColor: 'var(--color-success)', color: 'var(--color-success)', textAlign: 'center', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <CheckCircle2 size={18} /> You're on the early access waitlist!
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                      We will notify you at <strong>{email}</strong> when beta invitations open.
                    </div>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early beta access..."
                      className="form-input"
                      style={{ flex: 1 }}
                    />
                    <Button type="submit" variant="primary" size="md">
                      Join Waitlist
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Teaser Preview Card */}
            <div
              className="card"
              style={{
                maxWidth: '780px',
                margin: '3rem auto 0 auto',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                padding: '2rem',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  Architecture Preview · Notes Editor
                </span>
              </div>

              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Research & Architectural Decisions for Q3</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Linked to 4 ImPlinx Bookmarks · Last edited today
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <p>
                  We are consolidating our research on distributed vector storage. Here are the core references imported from ImPlinx Bookmarks:
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                  <Link2 size={16} color="var(--brand-primary)" />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>PostgreSQL RLS Implementation Guide</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>#database</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                  <Link2 size={16} color="var(--brand-primary)" />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Web Baseline 2026 Standards</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>#performance</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
