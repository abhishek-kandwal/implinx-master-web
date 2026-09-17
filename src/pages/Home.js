import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  Search,
  Bookmark,
  FileText,
  CheckCircle2,
  Download,
  FolderSync
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { EcosystemVisual } from '../components/home/EcosystemVisual';
import { BookmarksMockup } from '../components/bookmarks/BookmarksMockup';
import { PRODUCTS } from '../config/products';

export const Home = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {/* ------------------------------------------------------------- */}
        {/* Hero Section                                                  */}
        {/* ------------------------------------------------------------- */}
        <section className="hero-section">
          <div className="hero-glow-bg" />
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge-container">
                <span className="badge badge-primary" style={{ padding: '0.35rem 0.85rem' }}>
                  <Sparkles size={13} /> The Connected Productivity Ecosystem
                </span>
              </div>

              <h1 className="display-1 hero-title">
                Everything you save.
                <br />
                <span className="text-gradient">Everything you create.</span>
                <br />
                Connected.
              </h1>

              <p className="hero-subtitle">
                ImPlinx brings your bookmarks, notes, and productivity tools together in one beautifully connected workspace.
              </p>

              <div className="hero-ctas">
                <Button to="/signup" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Get Started Free
                </Button>
                <Button to="/products" variant="secondary" size="lg">
                  Explore Products
                </Button>
              </div>

              <p className="hero-guarantee">
                Start free. Upgrade when you need more. No credit card required.
              </p>
            </div>

            {/* Ecosystem Node Graph Visual */}
            <EcosystemVisual />
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Product Ecosystem Family Section                              */}
        {/* ------------------------------------------------------------- */}
        <section className="section" style={{ background: 'var(--bg-surface-subtle)', borderTop: '1px solid var(--border-default)' }}>
          <div className="container">
            <div className="section-header">
              <span className="badge badge-outline" style={{ marginBottom: '0.75rem' }}>
                Product Suite
              </span>
              <h2>One ecosystem. Multiple powerful tools.</h2>
              <p>Start with the tools you need today. Add more as your workflow grows.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Product 1: Bookmarks */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--brand-primary-light)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Bookmark size={24} />
                  </div>
                  <span className="badge badge-success">Available Now</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>
                  {PRODUCTS.BOOKMARKS.name}
                </h3>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>
                  {PRODUCTS.BOOKMARKS.tagline}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.5rem', flex: 1 }}>
                  {PRODUCTS.BOOKMARKS.subtitle}
                </p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.875rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" /> Chrome, Edge & Firefox extensions
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" /> Smart nested folders & auto-tagging
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" /> Instant cross-device cloud sync
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" /> Sub-millisecond deep text search
                  </li>
                </ul>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Button to={PRODUCTS.BOOKMARKS.route} variant="primary" size="md" style={{ flex: 1 }}>
                    Explore Bookmarks
                  </Button>
                  <Button to="/download" variant="secondary" size="md" icon={Download} />
                </div>
              </div>

              {/* Product 2: Notes */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-info-bg)',
                      color: 'var(--brand-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FileText size={24} />
                  </div>
                  <span className="badge badge-outline">Coming Soon</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>
                  {PRODUCTS.NOTES.name}
                </h3>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-cyan)', marginBottom: '0.75rem' }}>
                  {PRODUCTS.NOTES.tagline}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.5rem', flex: 1 }}>
                  {PRODUCTS.NOTES.subtitle}
                </p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.875rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-cyan)" /> Fast keyboard-driven block editor
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-cyan)" /> Bidirectional bookmark-to-note links
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-cyan)" /> Visual graph connectivity
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-cyan)" /> Future intelligent knowledge synthesis
                  </li>
                </ul>

                <Button to={PRODUCTS.NOTES.route} variant="secondary" size="md">
                  Join the Waitlist
                </Button>
              </div>

              {/* Product 3: Future Tools */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'transparent', borderStyle: 'dashed' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--brand-primary-light)',
                      color: 'var(--brand-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Layers size={24} />
                  </div>
                  <span className="badge badge-outline">Roadmap</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>
                  More tools. One account.
                </h3>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-secondary)', marginBottom: '0.75rem' }}>
                  Expanding Connected Ecosystem
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.5rem', flex: 1 }}>
                  ImPlinx will continue expanding into a unified productivity suite. New tools like Reader Mode and Clipboard Sync will connect automatically to your account.
                </p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.875rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-secondary)" /> Unified master credentials
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-secondary)" /> Shared cloud quota & preferences
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--brand-secondary)" /> All future apps included in Everything Plan
                  </li>
                </ul>

                <Button to="/pricing" variant="ghost" size="md" icon={ArrowRight} iconPosition="right">
                  Explore Everything Plan
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Interactive Bookmarks UI Showcase                             */}
        {/* ------------------------------------------------------------- */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                Live Interactive Preview
              </span>
              <h2>Designed for speed, clarity, and control.</h2>
              <p>
                Experience the bookmark manager built from the ground up for modern workflows. Try filtering and searching below.
              </p>
            </div>

            <BookmarksMockup />
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Value Pillars                                                 */}
        {/* ------------------------------------------------------------- */}
        <section className="section" style={{ borderTop: '1px solid var(--border-default)', background: 'var(--bg-surface-subtle)' }}>
          <div className="container">
            <div className="section-header">
              <h2>Why professionals choose ImPlinx</h2>
              <p>Engineered to be fast, reliable, and completely under your control.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Zap size={28} />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>Instant Capture & Speed</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Save any webpage in under 200ms using smart browser extensions. Never disrupt your browsing focus.
                </p>
              </div>

              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <FolderSync size={28} />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>Seamless Cloud Sync</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Changes sync immediately across all connected extensions and desktop apps via secure real-time protocols.
                </p>
              </div>

              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Search size={28} />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>Deep Intelligent Search</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Find anything instantly by searching titles, full URLs, custom tags, or personal research notes.
                </p>
              </div>

              <div className="card">
                <div style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>
                  <Shield size={28} />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>Private by Design</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Your data belongs to you. Stored with PostgreSQL Row-Level Security and exportable at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Bottom CTA                                                    */}
        {/* ------------------------------------------------------------- */}
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <div
              className="card"
              style={{
                background: 'var(--grad-primary)',
                color: '#ffffff',
                padding: '4rem 2rem',
                border: 'none',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3vw + 0.5rem, 2.75rem)', marginBottom: '1rem' }}>
                Start organizing your digital life today.
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '580px', margin: '0 auto 2rem auto', fontSize: '1.15rem' }}>
                Join thousands of researchers, creators, and developers who rely on ImPlinx for connected productivity.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  to="/signup"
                  style={{
                    background: '#ffffff',
                    color: 'var(--brand-primary)',
                    fontWeight: 700,
                    padding: '0.85rem 2rem'
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  to="/download"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '0.85rem 2rem'
                  }}
                  icon={Download}
                >
                  Download Extension
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
