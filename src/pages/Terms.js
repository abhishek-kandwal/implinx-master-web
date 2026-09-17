import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Terms = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <span className="badge badge-outline" style={{ marginBottom: '0.75rem' }}>
              Legal Agreement
            </span>
            <h1 className="display-2" style={{ marginBottom: '1rem' }}>Terms of Service</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
              Last updated: September 2026
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h3>
                <p>
                  By creating an ImPlinx account, downloading our browser extensions, or using the ImPlinx Master SaaS platform, you agree to comply with and be bound by these Terms of Service.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. Account Responsibilities</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify ImPlinx immediately of any unauthorized use.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>3. Subscriptions & Billing</h3>
                <p>
                  Paid subscription plans (such as ImPlinx Pro and Everything Plan) are billed in advance on a recurring monthly or annual basis. You may cancel at any time via your Account Dashboard. Cancellations take effect at the conclusion of the current billing cycle.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>4. Fair Use</h3>
                <p>
                  You agree not to misuse the ImPlinx sync infrastructure, reverse-engineer proprietary binary protocols, or attempt unauthorized access to other users' isolated data partitions.
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
