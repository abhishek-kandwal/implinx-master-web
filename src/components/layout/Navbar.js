import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, LayoutDashboard, LogOut } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../config/products';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container" style={{ height: '100%' }}>
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Logo variant="default" size="md" />

          {/* Desktop Navigation Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            {/* Products Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                type="button"
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                aria-expanded={productsDropdownOpen}
              >
                <span>Products</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: productsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform var(--transition-fast)'
                  }}
                />
              </button>

              {productsDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-1rem',
                    width: '320px',
                    padding: '0.75rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xl)',
                    zIndex: 1000,
                    animation: 'fadeIn 0.15s ease-out'
                  }}
                >
                  <Link
                    to={PRODUCTS.BOOKMARKS.route}
                    onClick={() => setProductsDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div
                      style={{
                        padding: '0.45rem',
                        background: 'var(--brand-primary-light)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--brand-primary)',
                        display: 'flex'
                      }}
                    >
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {PRODUCTS.BOOKMARKS.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {PRODUCTS.BOOKMARKS.tagline}
                      </div>
                    </div>
                  </Link>

                  <Link
                    to={PRODUCTS.NOTES.route}
                    onClick={() => setProductsDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div
                      style={{
                        padding: '0.45rem',
                        background: 'var(--color-info-bg)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--brand-cyan)',
                        display: 'flex'
                      }}
                    >
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {PRODUCTS.NOTES.name}
                        <span style={{ fontSize: '0.65rem', background: 'var(--badge-bg)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                          Soon
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {PRODUCTS.NOTES.tagline}
                      </div>
                    </div>
                  </Link>

                  <div
                    style={{
                      paddingTop: '0.5rem',
                      marginTop: '0.5rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Link
                      to="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: 600 }}
                    >
                      Browse all tools →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Pricing
            </NavLink>
            <NavLink to="/download" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Download
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </nav>

          {/* Actions & Auth */}
          <div className="nav-actions">
            <ThemeToggle />

            <div className="nav-actions-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {isAuthenticated ? (
                <>
                  <Button to="/app/dashboard" variant="secondary" size="sm" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    title="Log out"
                  >
                    <LogOut size={16} />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost btn-sm">
                    Log in
                  </Link>
                  <Button to="/signup" variant="primary" size="sm">
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <Link
            to="/products"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Products
          </Link>
          <Link
            to="/products/bookmarks"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{ paddingLeft: '1rem', fontSize: '0.95rem' }}
          >
            → ImPlinx Bookmarks
          </Link>
          <Link
            to="/products/notes"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{ paddingLeft: '1rem', fontSize: '0.95rem' }}
          >
            → ImPlinx Notes (Soon)
          </Link>
          <Link
            to="/pricing"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/download"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Download
          </Link>
          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {isAuthenticated ? (
              <>
                <Button to="/app/dashboard" variant="primary" size="md" onClick={() => setMobileMenuOpen(false)}>
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button to="/login" variant="secondary" size="md" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Button>
                <Button to="/signup" variant="primary" size="md" onClick={() => setMobileMenuOpen(false)}>
                  Get Started Free
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
