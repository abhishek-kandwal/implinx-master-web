import React from 'react';
import { Bookmark, FileText, Sparkles, Download, ExternalLink, CheckCircle2 } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PRODUCT_LIST } from '../../config/products';
import { useAuth } from '../../context/AuthContext';

export const AppProducts = () => {
  const { user } = useAuth();

  return (
    <AppShell title="Ecosystem Products">
      <div style={{ maxWidth: '980px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Connected Applications</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Every product in your ImPlinx subscription connects with your single master login.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {PRODUCT_LIST.map((product) => {
            const isAvailable = product.status === 'available';
            const isComingSoon = product.status === 'coming_soon';

            return (
              <Card key={product.id} style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: isAvailable ? 'var(--brand-primary-light)' : 'var(--bg-surface-subtle)',
                        color: isAvailable ? 'var(--brand-primary)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {product.id === 'bookmarks' && <Bookmark size={24} />}
                      {product.id === 'notes' && <FileText size={24} />}
                      {product.id === 'future' && <Sparkles size={24} />}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{product.name}</h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{product.tagline}</div>
                    </div>
                  </div>

                  <div>
                    {isAvailable && <span className="badge badge-success">Entitlement Active</span>}
                    {isComingSoon && <span className="badge badge-outline">Beta Coming Soon</span>}
                    {!isAvailable && !isComingSoon && <span className="badge badge-outline">Roadmap</span>}
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {isAvailable ? (
                    <>
                      <Button to="/products/bookmarks" variant="primary" size="sm">
                        Open Web Application
                      </Button>
                      <Button to="/app/downloads" variant="secondary" size="sm" icon={Download}>
                        Download Extension
                      </Button>
                    </>
                  ) : isComingSoon ? (
                    <Button to="/products/notes" variant="secondary" size="sm">
                      Check Beta Status
                    </Button>
                  ) : (
                    <Button to="/pricing" variant="outline" size="sm">
                      Learn about Everything Plan
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
