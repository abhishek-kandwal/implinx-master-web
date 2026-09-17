import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Logo variant="full" size="md" asLink={true} customTagline="One place for everything connected." />
            <p>
              ImPlinx brings your bookmarks, notes, and productivity tools together in one beautifully connected workspace.
            </p>
          </div>

          {/* Products Column */}
          <div className="footer-column">
            <h4>Products</h4>
            <div className="footer-links">
              <Link to="/products/bookmarks" className="footer-link">
                ImPlinx Bookmarks
              </Link>
              <Link to="/products/notes" className="footer-link">
                ImPlinx Notes <span className="badge badge-outline" style={{ fontSize: '0.65rem' }}>Soon</span>
              </Link>
              <Link to="/products" className="footer-link">
                All Tools & Roadmap
              </Link>
              <Link to="/download" className="footer-link">
                Download Apps
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h4>Company</h4>
            <div className="footer-links">
              <Link to="/about" className="footer-link">
                About ImPlinx
              </Link>
              <Link to="/contact" className="footer-link">
                Contact & Support
              </Link>
              <Link to="/pricing" className="footer-link">
                Pricing & Plans
              </Link>
              <a
                href="https://github.com/abhishek-kandwal/implinx-master-web"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub Repository <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h4>Legal & Security</h4>
            <div className="footer-links">
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-link">
                Terms of Service
              </Link>
              <span className="footer-link" style={{ color: 'var(--text-muted)' }}>
                Security Architecture
              </span>
              <span className="footer-link" style={{ color: 'var(--text-muted)' }}>
                Subprocessors
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & compliance */}
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} ImPlinx Technologies. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy by design</span>
            <span>·</span>
            <span>PostgreSQL RLS Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
