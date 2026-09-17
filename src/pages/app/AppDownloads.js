import React from 'react';
import { Download as DownloadIcon, Globe, Laptop, Smartphone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { DOWNLOAD_PLATFORMS, detectUserPlatform } from '../../config/downloads';

export const AppDownloads = () => {
  const detected = detectUserPlatform();

  return (
    <AppShell title="Downloads & Extensions">
      <div style={{ maxWidth: '980px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Ecosystem Downloads</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Download companion browser extensions and desktop applications for all your active devices.
          </p>
        </div>

        {DOWNLOAD_PLATFORMS.map((productGroup) => (
          <div key={productGroup.productId}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{productGroup.productName}</span>
              <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>Licensed</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {productGroup.platforms.map((plat) => {
                const isAvailable = plat.status === 'available';
                return (
                  <Card key={plat.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{plat.name}</h4>
                      {isAvailable ? (
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                          {plat.version}
                        </span>
                      ) : (
                        <span className="badge badge-outline" style={{ fontSize: '0.7rem' }}>
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1 }}>
                      {plat.note}
                    </p>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: 'auto' }}>
                      {isAvailable ? (
                        <Button
                          href={plat.downloadUrl}
                          variant="primary"
                          size="sm"
                          icon={DownloadIcon}
                          style={{ width: '100%' }}
                        >
                          Install {plat.name}
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
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
          </div>
        ))}
      </div>
    </AppShell>
  );
};
