import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, FileText, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PRODUCT_LIST } from '../config/products';

export const ProductsOverview = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                Ecosystem Catalog
              </span>
              <h1 className="display-2">The ImPlinx Product Family</h1>
              <p>
                Each product is powerful on its own, and extraordinary when connected together under your master ImPlinx account.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '980px', margin: '0 auto' }}>
              {PRODUCT_LIST.map((prod) => {
                const isAvailable = prod.status === 'available';
                const isComingSoon = prod.status === 'coming_soon';

                return (
                  <Card key={prod.id} style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: 'var(--radius-md)',
                            background: isAvailable ? 'var(--brand-primary-light)' : 'var(--bg-surface-subtle)',
                            color: isAvailable ? 'var(--brand-primary)' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {prod.id === 'bookmarks' && <Bookmark size={26} />}
                          {prod.id === 'notes' && <FileText size={26} />}
                          {prod.id === 'future' && <Sparkles size={26} />}
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{prod.name}</h2>
                          <div style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                            {prod.tagline}
                          </div>
                        </div>
                      </div>

                      <div>
                        {isAvailable && <span className="badge badge-success">Available Now ({prod.version})</span>}
                        {isComingSoon && <span className="badge badge-outline">In Development</span>}
                        {!isAvailable && !isComingSoon && <span className="badge badge-outline">Roadmap</span>}
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      {prod.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                      {prod.features.map((feat) => (
                        <div key={feat.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                          <CheckCircle2 size={16} color="var(--brand-primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{feat.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{feat.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                      {isAvailable ? (
                        <>
                          <Button to={prod.route} variant="primary" size="md">
                            Explore {prod.shortName}
                          </Button>
                          <Button to="/download" variant="secondary" size="md">
                            Download Apps
                          </Button>
                        </>
                      ) : isComingSoon ? (
                        <Button to={prod.route} variant="secondary" size="md">
                          Join the Waitlist
                        </Button>
                      ) : (
                        <Button to="/pricing" variant="outline" size="md">
                          Everything Plan Details
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
