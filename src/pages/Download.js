import React, { useState } from 'react';
import {
  Download as DownloadIcon,
  Laptop,
  Globe,
  Compass,
  Monitor,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { DOWNLOAD_PLATFORMS, detectUserPlatform } from '../config/downloads';

export const Download = () => {
  const detectedPlatform = detectUserPlatform();
  const [selectedProduct, setSelectedProduct] = useState('bookmarks');

  const getPlatformIcon = (iconName) => {
    switch (iconName) {
      case 'Chrome':
      case 'Globe':
        return <Globe size={22} />;
      case 'Compass':
        return <Compass size={22} />;
      case 'Laptop':
      case 'Monitor':
        return <Laptop size={22} />;
      case 'Smartphone':
        return <Smartphone size={22} />;
      default:
        return <Laptop size={22} />;
    }
  };

  const currentProductDownloads =
    DOWNLOAD_PLATFORMS.find((p) => p.productId === selectedProduct) || DOWNLOAD_PLATFORMS[0];

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                Official Releases
              </span>
              <h1 className="display-2">Download ImPlinx</h1>
              <p>Choose the companion app or extension that fits your browsing and research workflow.</p>

              {/* Product Selector Tabs */}
              <div
                style={{
                  display: 'inline-flex',
                  gap: '0.5rem',
                  marginTop: '2rem',
                  background: 'var(--bg-surface-subtle)',
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-default)'
                }}
              >
                {DOWNLOAD_PLATFORMS.map((prod) => (
                  <button
                    key={prod.productId}
                    type="button"
                    onClick={() => setSelectedProduct(prod.productId)}
                    style={{
                      padding: '0.5rem 1.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      background: selectedProduct === prod.productId ? 'var(--bg-surface)' : 'transparent',
                      color: selectedProduct === prod.productId ? 'var(--text-primary)' : 'var(--text-secondary)',
                      boxShadow: selectedProduct === prod.productId ? 'var(--shadow-xs)' : 'none',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {prod.productName}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Downloads Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.75rem',
                maxWidth: '1080px',
                margin: '0 auto'
              }}
            >
              {currentProductDownloads.platforms.map((platform) => {
                const isAvailable = platform.status === 'available';
                const isUserPlatform =
                  (platform.id === 'chrome' && detectedPlatform === 'chrome') ||
                  (platform.id === 'edge' && detectedPlatform === 'edge') ||
                  (platform.id === 'firefox' && detectedPlatform === 'firefox') ||
                  (platform.id === 'windows' && detectedPlatform === 'windows') ||
                  (platform.id === 'macos' && detectedPlatform === 'macos');

                return (
                  <Card
                    key={platform.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      border: isUserPlatform ? '2px solid var(--brand-primary)' : undefined,
                      position: 'relative'
                    }}
                  >
                    {isUserPlatform && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-11px',
                          right: '1.5rem',
                          background: 'var(--brand-primary)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.65rem',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        Detected for your system
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-md)',
                          background: isAvailable ? 'var(--brand-primary-light)' : 'var(--bg-surface-subtle)',
                          color: isAvailable ? 'var(--brand-primary)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {getPlatformIcon(platform.icon)}
                      </div>

                      {isAvailable ? (
                        <span className="badge badge-success">
                          <CheckCircle2 size={12} /> {platform.version}
                        </span>
                      ) : (
                        <span className="badge badge-outline">Coming Soon</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{platform.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                      {platform.note}
                    </p>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginTop: 'auto' }}>
                      {isAvailable ? (
                        <Button
                          href={platform.downloadUrl}
                          variant="primary"
                          size="md"
                          icon={DownloadIcon}
                          style={{ width: '100%' }}
                        >
                          Install {platform.name}
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="md"
                          disabled={true}
                          style={{ width: '100%', opacity: 0.6 }}
                        >
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Note on Security */}
            <div
              style={{
                maxWidth: '680px',
                margin: '4rem auto 0 auto',
                padding: '1.25rem',
                background: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem'
              }}
            >
              <Info size={20} color="var(--brand-primary)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <strong>Verified Builds:</strong> All ImPlinx extension packages are reviewed and cryptographically signed by official Webstore channels (Chrome Web Store, Firefox AMO, Edge Add-ons). No sideloading required.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
