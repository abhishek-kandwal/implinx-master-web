import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  CreditCard,
  Download,
  Settings,
  User,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../config/products';

export const AppShell = ({ children, title = 'Dashboard' }) => {
  const { user, logout, isDemo } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/app/products', label: 'Products', icon: Layers },
    { to: '/app/billing', label: 'Billing & Plans', icon: CreditCard },
    { to: '/app/downloads', label: 'Downloads', icon: Download },
    { to: '/app/settings', label: 'Settings', icon: Settings },
    { to: '/app/account', label: 'Account', icon: User }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userPlan = user?.plan || 'free';
  const planDisplay = userPlan === 'everything' ? 'Everything Plan' : userPlan === 'pro' ? 'ImPlinx Pro' : 'Free Plan';

  return (
    <div className="app-shell">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className="app-sidebar"
        style={{
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          position: window.innerWidth <= 860 ? 'fixed' : undefined,
          zIndex: 999,
          height: '100%'
        }}
      >
        <div className="app-sidebar-header">
          <Logo variant="default" size="sm" asLink={false} />
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn-ghost"
            style={{ display: window.innerWidth <= 860 ? 'block' : 'none' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="app-sidebar-nav">
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.5rem 0.85rem' }}>
            Ecosystem Platform
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `app-sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {/* Quick Launchpad to Tools */}
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '1.25rem 0.85rem 0.5rem 0.85rem' }}>
            Active Tools
          </div>

          <a
            href={PRODUCTS.BOOKMARKS.route}
            className="app-sidebar-link"
            style={{ fontSize: '0.85rem' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
            <span>ImPlinx Bookmarks</span>
            <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
          </a>

          <a
            href={PRODUCTS.NOTES.route}
            className="app-sidebar-link"
            style={{ fontSize: '0.85rem', opacity: 0.7 }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-muted)' }} />
            <span>ImPlinx Notes</span>
            <span style={{ fontSize: '0.65rem', background: 'var(--badge-bg)', padding: '0.1rem 0.35rem', borderRadius: '4px', marginLeft: 'auto' }}>
              Soon
            </span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="app-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--brand-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {planDisplay}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn-ghost"
              style={{ padding: '0.4rem', color: 'var(--text-muted)' }}
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="app-main-viewport">
        {/* Topbar */}
        <header className="app-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="btn-ghost"
              style={{ display: window.innerWidth <= 860 ? 'flex' : 'none', padding: '0.4rem' }}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {isDemo && (
              <span className="badge badge-warning" title="Running in Interactive Evaluator Demo Mode">
                <Sparkles size={12} /> Demo Session
              </span>
            )}

            <span className={`badge ${userPlan === 'free' ? 'badge-outline' : 'badge-primary'}`}>
              <ShieldCheck size={12} /> {planDisplay}
            </span>

            <ThemeToggle />
          </div>
        </header>

        {/* Content Page */}
        <main className="app-page-content">{children}</main>
      </div>
    </div>
  );
};
