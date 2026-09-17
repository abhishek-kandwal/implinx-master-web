/**
 * ImPlinx Central Downloads Configuration
 * Defines supported platforms, versions, and release statuses for all products.
 */

export const DOWNLOAD_PLATFORMS = [
  {
    productId: 'bookmarks',
    productName: 'ImPlinx Bookmarks',
    platforms: [
      {
        id: 'chrome',
        name: 'Chrome Extension',
        badge: 'Recommended',
        icon: 'Chrome',
        version: 'v1.4.2',
        status: 'available',
        downloadUrl: 'https://chrome.google.com/webstore',
        note: 'Requires Chrome 100+ or Chromium-based browsers (Brave, Edge, Arc, Opera)',
        fileSize: '3.4 MB'
      },
      {
        id: 'edge',
        name: 'Microsoft Edge Add-on',
        icon: 'Globe',
        version: 'v1.4.2',
        status: 'available',
        downloadUrl: 'https://microsoftedge.microsoft.com/addons',
        note: 'Available in Edge Add-ons store',
        fileSize: '3.4 MB'
      },
      {
        id: 'firefox',
        name: 'Firefox Extension',
        icon: 'Compass',
        version: 'v1.4.0',
        status: 'available',
        downloadUrl: 'https://addons.mozilla.org',
        note: 'Requires Firefox 105+',
        fileSize: '3.2 MB'
      },
      {
        id: 'windows',
        name: 'Windows Desktop App',
        icon: 'Laptop',
        version: 'v1.0.0-beta',
        status: 'coming_soon',
        downloadUrl: null,
        note: 'Windows 10 / 11 (64-bit installer coming soon)',
        fileSize: '68 MB'
      },
      {
        id: 'macos',
        name: 'macOS Desktop App',
        icon: 'AppWindow',
        version: 'v1.0.0-beta',
        status: 'coming_soon',
        downloadUrl: null,
        note: 'Apple Silicon & Intel Universal DMG coming soon',
        fileSize: '72 MB'
      },
      {
        id: 'mobile',
        name: 'iOS & Android App',
        icon: 'Smartphone',
        version: 'v1.0',
        status: 'coming_soon',
        downloadUrl: null,
        note: 'Mobile companion apps currently in closed beta testing',
        fileSize: null
      }
    ]
  },
  {
    productId: 'notes',
    productName: 'ImPlinx Notes',
    platforms: [
      {
        id: 'web',
        name: 'Web Application',
        icon: 'Globe',
        version: 'Alpha',
        status: 'coming_soon',
        downloadUrl: null,
        note: 'Cloud knowledge base with offline PWA support'
      },
      {
        id: 'desktop',
        name: 'Desktop App (macOS / Windows)',
        icon: 'Monitor',
        version: 'Alpha',
        status: 'coming_soon',
        downloadUrl: null,
        note: 'Native high-speed editor'
      }
    ]
  }
];

export const detectUserPlatform = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes('edg/')) return 'edge';
  if (ua.includes('chrome') && !ua.includes('edg/')) return 'chrome';
  if (ua.includes('firefox')) return 'firefox';
  if (ua.includes('macintosh') || ua.includes('mac os x')) return 'macos';
  if (ua.includes('windows')) return 'windows';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
  if (ua.includes('android')) return 'android';
  return 'web';
};
