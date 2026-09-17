import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main
        className="main-content"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 1.5rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '540px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--brand-primary-light)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <Compass size={32} />
          </div>

          <h1 className="display-2" style={{ marginBottom: '0.75rem' }}>Page not found</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            The link you followed may be broken, or the page may have been removed. Let's get you back on track.
          </p>

          <Button to="/" variant="primary" size="lg" icon={ArrowLeft}>
            Return to Homepage
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
