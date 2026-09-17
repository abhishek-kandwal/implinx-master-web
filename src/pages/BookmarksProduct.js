import React from 'react';
import {
  Bookmark,
  Sparkles,
  Zap,
  Tag,
  Search,
  Laptop,
  Shield,
  ArrowRight,
  Download,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { BookmarksMockup } from '../components/bookmarks/BookmarksMockup';

export const BookmarksProduct = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-glow-bg" />
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge-container">
                <span className="badge badge-primary">
                  <Bookmark size={13} /> ImPlinx Bookmarks Pro
                </span>
              </div>

              <h1 className="display-1 hero-title">
                Your bookmarks,
                <br />
                <span className="text-gradient">finally organized.</span>
              </h1>

              <p className="hero-subtitle">
                Save important links in seconds, organize them effortlessly, and access them wherever you go.
              </p>

              <div className="hero-ctas">
                <Button to="/signup" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Get Started Free
                </Button>
                <Button to="/download" variant="secondary" size="lg" icon={Download}>
                  Download Extension
                </Button>
              </div>

              <p className="hero-guarantee">
                Available for Chrome, Edge, and Firefox. Instant cloud sync.
              </p>
            </div>

            {/* Live Interactive UI Preview */}
            <BookmarksMockup />
          </div>
        </section>

        {/* Core Features Deep Dive */}
        <section className="section" style={{ background: 'var(--bg-surface-subtle)', borderTop: '1px solid var(--border-default)' }}>
          <div className="container">
            <div className="section-header">
              <span className="badge badge-outline" style={{ marginBottom: '0.75rem' }}>
                Features
              </span>
              <h2>Built for the way you actually browse.</h2>
              <p>Everything you need to turn raw links into structured knowledge.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Feature 1 */}
              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Zap size={28} />
                </div>
                <h3>Save in seconds</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                  Save any webpage with one click or a keyboard shortcut (Alt+S). Grab metadata, titles, and site favicons without waiting.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Tag size={28} />
                </div>
                <h3>Smart organization</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                  Get folder and tag suggestions while saving. Create nested folder trees and tag libraries that adapt to your taxonomy.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Search size={28} />
                </div>
                <h3>Find anything</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                  Search bookmarks, full URLs, custom tags, and personal notes simultaneously with instantaneous keyboard navigation.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Laptop size={28} />
                </div>
                <h3>Across your devices</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                  Access your saved links from Chrome, desktop app, and our responsive web dashboard. Changes sync in real-time.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Shield size={28} />
                </div>
                <h3>Private by design</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                  Keep your personal data under your control. We do not sell tracking profiles or display targeted advertisements.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Share2 size={28} />
                </div>
                <h3>Easy Import & Export</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                  Import thousands of links in seconds from Chrome HTML export or Raindrop/Pocket. Never get locked into a proprietary silo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <div className="card" style={{ background: 'var(--grad-primary)', color: '#fff', padding: '4rem 2rem', border: 'none' }}>
              <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Start organizing your digital life.</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
                Join thousands of users organizing their daily research and links with ImPlinx Bookmarks.
              </p>
              <Button
                to="/signup"
                style={{ background: '#fff', color: 'var(--brand-primary)', fontWeight: 700, padding: '0.85rem 2.25rem' }}
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
