import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Privacy = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              Security & Compliance
            </span>
            <h1 className="display-2" style={{ marginBottom: '1rem' }}>Privacy Policy</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
              Last updated: September 2026
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. Our Commitment to Privacy</h3>
                <p>
                  ImPlinx was founded on the principle that your saved bookmarks, research, and personal notes belong strictly to you. We do not monetize your browsing habits, sell user analytics to third-party data brokers, or display third-party advertisements.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. Data We Collect</h3>
                <p>
                  We collect only the minimum information necessary to provide synchronized multi-device services:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li>Account credentials (email address and securely hashed password via Supabase Auth).</li>
                  <li>Bookmark entities: URLs, page titles, folder hierarchies, and user tags.</li>
                  <li>Device identifiers used exclusively to deliver encrypted synchronization events.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>3. Data Storage & Security</h3>
                <p>
                  All database tables are protected by PostgreSQL Row-Level Security (RLS). Users can only read, update, or delete records that match their authenticated cryptographic user ID.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>4. Data Portability</h3>
                <p>
                  You can export your complete bookmark collection at any time in standard Netscape HTML format or JSON from your ImPlinx Account Dashboard. If you delete your account, your profile and all associated bookmarks are permanently expunged.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
