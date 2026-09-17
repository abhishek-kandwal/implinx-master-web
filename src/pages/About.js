import React from 'react';
import { Shield, Sparkles, Layers, Heart, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Logo } from '../components/common/Logo';

export const About = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="section-header" style={{ maxWidth: '780px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                Our Mission
              </span>
              <h1 className="display-1">One place for everything connected.</h1>
              <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
                We believe your digital workspace shouldn't feel fragmented across dozens of disconnected tools.
              </p>
            </div>

            <div style={{ maxWidth: '820px', margin: '0 auto 4rem auto', display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              <p>
                Every day, modern knowledge workers, engineers, and creators open dozens of browser tabs, save links to temporary messaging channels, write quick notes in text files, and lose valuable context along the way.
              </p>
              <p>
                <strong>ImPlinx</strong> was created to change this. Rather than creating another isolated single-feature utility, we are building a unified ecosystem platform where your bookmarks, notes, research artifacts, and workspaces communicate through one central account.
              </p>

              <div className="card" style={{ background: 'var(--bg-surface-subtle)', padding: '2rem', margin: '1rem 0' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Our Guiding Principles</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1rem' }}>
                  <li style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>01.</span>
                    <span><strong>Speed first:</strong> Actions like saving a bookmark or opening a note must take milliseconds, not seconds.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>02.</span>
                    <span><strong>User data sovereignty:</strong> Your links and thoughts are yours alone. You can export everything at any moment in standard open formats.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>03.</span>
                    <span><strong>One master pass:</strong> Upgrading to ImPlinx unlocks every application we build, eliminating the fatigue of multiple SaaS subscriptions.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button to="/signup" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Join the ImPlinx Ecosystem
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
