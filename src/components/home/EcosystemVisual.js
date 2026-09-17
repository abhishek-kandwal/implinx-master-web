import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, FileText, Sparkles, ArrowRight, ShieldCheck, RefreshCw, Key } from 'lucide-react';
import { PRODUCTS } from '../../config/products';
import { Logo } from '../common/Logo';

export const EcosystemVisual = () => {
  const [activeTab, setActiveTab] = useState('bookmarks');

  return (
    <div className="ecosystem-visual-wrapper">
      <div className="ecosystem-stage">
        {/* Nexus Center Hub */}
        <div className="nexus-header">
          <div className="nexus-chip">
            <Logo variant="icon" size="sm" asLink={false} />
            <span>ImPlinx Unified Core</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)' }} />
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            One single login syncs your bookmarks, notes, and preferences across every device.
          </p>
        </div>

        {/* Connected Applications Grid */}
        <div className="ecosystem-grid">
          {/* Card 1: Bookmarks */}
          <div
            className={`ecosystem-card ${activeTab === 'bookmarks' ? 'ecosystem-card-active' : ''}`}
            onMouseEnter={() => setActiveTab('bookmarks')}
          >
            <div className="ecosystem-card-header">
              <div className="ecosystem-card-icon">
                <Bookmark size={22} />
              </div>
              <span className="badge badge-success">Available Now</span>
            </div>
            <div className="ecosystem-card-body">
              <h3>{PRODUCTS.BOOKMARKS.name}</h3>
              <p>{PRODUCTS.BOOKMARKS.subtitle}</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={13} color="var(--brand-primary)" /> Instant browser extension sync
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={13} color="var(--brand-primary)" /> Isolated private encryption
                </div>
              </div>
            </div>
            <div className="ecosystem-card-footer">
              <Link
                to={PRODUCTS.BOOKMARKS.route}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--brand-primary)'
                }}
              >
                Explore Bookmarks <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Notes */}
          <div
            className={`ecosystem-card ${activeTab === 'notes' ? 'ecosystem-card-active' : ''}`}
            onMouseEnter={() => setActiveTab('notes')}
          >
            <div className="ecosystem-card-header">
              <div className="ecosystem-card-icon" style={{ background: 'var(--color-info-bg)', color: 'var(--brand-cyan)' }}>
                <FileText size={22} />
              </div>
              <span className="badge badge-outline">In Development</span>
            </div>
            <div className="ecosystem-card-body">
              <h3>{PRODUCTS.NOTES.name}</h3>
              <p>{PRODUCTS.NOTES.subtitle}</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={13} color="var(--brand-cyan)" /> Bidirectional link integration
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Key size={13} color="var(--brand-cyan)" /> One account access
                </div>
              </div>
            </div>
            <div className="ecosystem-card-footer">
              <Link
                to={PRODUCTS.NOTES.route}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--brand-cyan)'
                }}
              >
                View Roadmap <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 3: Future Apps */}
          <div
            className={`ecosystem-card ${activeTab === 'future' ? 'ecosystem-card-active' : ''}`}
            onMouseEnter={() => setActiveTab('future')}
          >
            <div className="ecosystem-card-header">
              <div className="ecosystem-card-icon" style={{ background: 'var(--badge-bg)', color: 'var(--brand-secondary)' }}>
                <Sparkles size={22} />
              </div>
              <span className="badge badge-outline">Planned</span>
            </div>
            <div className="ecosystem-card-body">
              <h3>More tools. One account.</h3>
              <p>ImPlinx will continue expanding into a connected productivity ecosystem.</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={13} color="var(--brand-secondary)" /> Shared workspace storage
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={13} color="var(--brand-secondary)" /> Everything Plan included
                </div>
              </div>
            </div>
            <div className="ecosystem-card-footer">
              <Link
                to="/pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--brand-secondary)'
                }}
              >
                See Everything Plan <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
