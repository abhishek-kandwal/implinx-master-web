/**
 * ImPlinx Centralized Product Registry
 * Single source of truth for all tools in the ImPlinx ecosystem.
 */

export const PRODUCT_STATUS = {
  AVAILABLE: 'available',
  DEVELOPMENT: 'development',
  COMING_SOON: 'coming_soon',
  PLANNED: 'planned'
};

export const PRODUCTS = {
  BOOKMARKS: {
    id: 'bookmarks',
    name: 'ImPlinx Bookmarks',
    shortName: 'Bookmarks',
    slug: 'bookmarks',
    tagline: 'Bookmark Manager Pro',
    subtitle: 'Save, organize, and find your important links across all your devices.',
    description:
      'The modern, fast, and intelligent bookmark manager designed for professionals, developers, and researchers. Instant capture, smart auto-tagging, and cross-device sync.',
    status: PRODUCT_STATUS.AVAILABLE,
    version: 'v1.4.2',
    icon: 'Bookmark',
    accentColor: '#4F46E5',
    route: '/products/bookmarks',
    webAppUrl: '/app/dashboard',
    ctaText: 'Explore Bookmarks',
    ctaDownloadText: 'Download Extension',
    features: [
      {
        title: 'Chrome Extension',
        description: 'Save any webpage instantly with 1-click or quick keyboard shortcut (Alt+S).'
      },
      {
        title: 'Smart Folders & Tags',
        description: 'Automatic tag suggestions and hierarchical nested folders.'
      },
      {
        title: 'Cross-Device Sync',
        description: 'Real-time synchronization across browser extensions, desktop, and web.'
      },
      {
        title: 'Deep Search',
        description: 'Search through titles, URLs, tags, and personal notes with sub-millisecond latency.'
      },
      {
        title: 'Private by Design',
        description: 'Encrypted storage with granular export and data ownership.'
      },
      {
        title: 'Offline Access',
        description: 'Browse, filter, and organize your saved link library even without internet.'
      }
    ],
    platforms: ['chrome', 'firefox', 'edge', 'windows', 'macos']
  },

  NOTES: {
    id: 'notes',
    name: 'ImPlinx Notes',
    shortName: 'Notes',
    slug: 'notes',
    tagline: 'Connected Notes & Knowledge Base',
    subtitle: 'Capture ideas, organize knowledge, and keep your notes connected.',
    description:
      'Seamlessly link your notes to bookmarks, research topics, and projects. Markdown support, bidirectional backlinking, and distraction-free writing.',
    status: PRODUCT_STATUS.COMING_SOON,
    version: 'Beta Coming Soon',
    icon: 'FileText',
    accentColor: '#06B6D4',
    route: '/products/notes',
    webAppUrl: null,
    ctaText: 'Join Waitlist',
    features: [
      {
        title: 'Rich Block Editor',
        description: 'Fast, keyboard-driven editor supporting markdown, code snippets, and callouts.'
      },
      {
        title: 'Bookmark Linking',
        description: 'Embed dynamic ImPlinx bookmarks directly inside your notes.'
      },
      {
        title: 'Graph View',
        description: 'Visualize connections between your bookmarks, thoughts, and documents.'
      },
      {
        title: 'Future AI Synthesis',
        description: 'Intelligent summarization and discovery across your personal knowledge base.'
      }
    ],
    platforms: ['web', 'windows', 'macos', 'ios', 'android']
  },

  FUTURE_APPS: {
    id: 'future',
    name: 'More tools. One account.',
    shortName: 'Ecosystem',
    slug: 'future',
    tagline: 'Continuous Innovation',
    subtitle: 'ImPlinx will continue expanding into a connected productivity ecosystem.',
    description:
      'One master subscription unlocks every tool we build. Reader mode, clipboard manager, and collaborative workspaces are currently on the product roadmap.',
    status: PRODUCT_STATUS.PLANNED,
    icon: 'Sparkles',
    accentColor: '#7C3AED',
    route: '/products',
    ctaText: 'View Roadmap',
    features: [
      {
        title: 'One Master Account',
        description: 'Sign in once and seamlessly access every application in the ecosystem.'
      },
      {
        title: 'Unified Search',
        description: 'Find links, notes, and research in one unified command palette.'
      },
      {
        title: 'Ecosystem Storage',
        description: 'Shared quota and synchronized preferences across all apps.'
      }
    ],
    platforms: ['all']
  }
};

export const PRODUCT_LIST = Object.values(PRODUCTS);

export const getProductById = (id) => {
  return PRODUCT_LIST.find((p) => p.id === id) || null;
};
