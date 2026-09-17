import React, { useState } from 'react';
import {
  Search,
  Bookmark,
  Star,
  Clock,
  Folder,
  Tag,
  ExternalLink,
  Plus,
  Compass,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const BookmarksMockup = () => {
  const [activeFolder, setActiveFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'PostgreSQL Row-Level Security Handbook',
      url: 'https://postgresql.org/docs/current/ddl-rowsecurity.html',
      folder: 'dev',
      tags: ['database', 'security', 'backend'],
      notes: 'Essential for multi-tenant SaaS architecture.',
      favorite: true,
      time: '2h ago'
    },
    {
      id: 2,
      title: 'Tailoring Modern UI Typography and Contrast',
      url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG',
      folder: 'design',
      tags: ['design', 'a11y', 'css'],
      notes: 'Check contrast tokens for dark mode compatibility.',
      favorite: true,
      time: '4h ago'
    },
    {
      id: 3,
      title: 'Supabase Auth & Session Refresh in Single-Page Apps',
      url: 'https://supabase.com/docs/guides/auth/sessions',
      folder: 'dev',
      tags: ['supabase', 'auth', 'react'],
      notes: 'Configure autoRefreshToken and detectSessionInUrl.',
      favorite: false,
      time: '1d ago'
    },
    {
      id: 4,
      title: 'State of Web APIs & Performance Benchmarks 2026',
      url: 'https://web.dev/explore/baseline',
      folder: 'research',
      tags: ['web', 'standards', 'performance'],
      notes: 'Browser baseline compatibility notes.',
      favorite: false,
      time: '2d ago'
    }
  ]);

  const folders = [
    { id: 'all', name: 'All Bookmarks', icon: Bookmark, count: bookmarks.length },
    { id: 'favorites', name: 'Favorites', icon: Star, count: bookmarks.filter((b) => b.favorite).length },
    { id: 'recent', name: 'Recent Items', icon: Clock, count: bookmarks.length },
    { id: 'dev', name: 'Engineering & Architecture', icon: Folder, count: 2 },
    { id: 'design', name: 'Design Systems & UI', icon: Folder, count: 1 },
    { id: 'research', name: 'Research & Articles', icon: Folder, count: 1 }
  ];

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesFolder =
      activeFolder === 'all' ||
      (activeFolder === 'favorites' && b.favorite) ||
      (activeFolder === 'recent') ||
      b.folder === activeFolder;

    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.notes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  const toggleFavorite = (id) => {
    setBookmarks(
      bookmarks.map((b) => (b.id === id ? { ...b, favorite: !b.favorite } : b))
    );
  };

  return (
    <div className="mockup-window">
      {/* Title bar */}
      <div className="mockup-titlebar">
        <div className="mockup-controls">
          <span className="mockup-dot red" />
          <span className="mockup-dot yellow" />
          <span className="mockup-dot green" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem', fontWeight: 500 }}>
            ImPlinx Bookmarks Pro — Extension & Desktop
          </span>
        </div>

        <div className="mockup-search-container">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search bookmarks, URLs, tags, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: '0.8125rem'
            }}
          />
        </div>

        <button
          className="btn btn-primary btn-sm"
          style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
          onClick={() => alert('Demo extension save: Press Alt+S on any tab to save instantly with ImPlinx extension.')}
        >
          <Plus size={13} /> Save Bookmark
        </button>
      </div>

      {/* Body */}
      <div className="mockup-body">
        {/* Sidebar */}
        <aside className="mockup-sidebar">
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.35rem 0.75rem' }}>
            Library
          </div>
          {folders.slice(0, 3).map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className={`mockup-nav-item ${activeFolder === f.id ? 'active' : ''}`}
                onClick={() => setActiveFolder(f.id)}
              >
                <Icon size={15} />
                <span style={{ flex: 1 }}>{f.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{f.count}</span>
              </div>
            );
          })}

          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.75rem 0.75rem 0.35rem 0.75rem' }}>
            Folders
          </div>
          {folders.slice(3).map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className={`mockup-nav-item ${activeFolder === f.id ? 'active' : ''}`}
                onClick={() => setActiveFolder(f.id)}
              >
                <Icon size={15} />
                <span style={{ flex: 1 }}>{f.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{f.count}</span>
              </div>
            );
          })}

          <div style={{ marginTop: 'auto', padding: '0.75rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-success)', fontWeight: 600, marginBottom: '0.2rem' }}>
              <CheckCircle2 size={13} /> Cloud Sync Active
            </div>
            <div style={{ color: 'var(--text-muted)' }}>Last synced 2 seconds ago</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="mockup-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>
                {folders.find((f) => f.id === activeFolder)?.name || 'Bookmarks'}
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Showing {filteredBookmarks.length} link{filteredBookmarks.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          {filteredBookmarks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Compass size={32} style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
              <p>No bookmarks match your search criteria.</p>
            </div>
          ) : (
            <div className="mockup-items-grid">
              {filteredBookmarks.map((item) => (
                <div key={item.id} className="mockup-item-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          background: 'var(--brand-primary-light)',
                          color: 'var(--brand-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 700
                        }}
                      >
                        {item.title[0]}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.time}</span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      style={{ color: item.favorite ? '#f59e0b' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                      title={item.favorite ? 'Favorited' : 'Add to favorites'}
                    >
                      <Star size={14} fill={item.favorite ? '#f59e0b' : 'none'} />
                    </button>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      lineHeight: 1.3,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    {item.title}
                    <ExternalLink size={12} color="var(--text-muted)" />
                  </a>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'var(--bg-surface-subtle)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                    💡 {item.notes}
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.4rem' }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.68rem',
                          background: 'var(--badge-bg)',
                          color: 'var(--text-secondary)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          fontWeight: 500
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
