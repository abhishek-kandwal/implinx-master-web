/**
 * ImPlinx Central Pricing Configuration
 */

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    badge: null,
    tagline: 'Essential link organization for individuals.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: 'forever',
    ctaText: 'Get Started Free',
    ctaLink: '/signup',
    highlighted: false,
    status: 'available',
    features: [
      { text: 'Up to 500 saved bookmarks', included: true },
      { text: 'Chrome & Edge browser extensions', included: true },
      { text: 'Standard folder hierarchy', included: true },
      { text: 'Basic title & URL search', included: true },
      { text: 'Single active session', included: true },
      { text: 'Full-text & tag search', included: false },
      { text: 'Unlimited cross-device sync', included: false },
      { text: 'Smart auto-categorization', included: false },
      { text: 'ImPlinx Notes Pro access', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'ImPlinx Pro',
    badge: 'Most Popular',
    tagline: 'Supercharge your bookmarking with power features.',
    monthlyPrice: 4.99,
    yearlyPrice: 3.99, // $47.88/year (~20% off)
    period: 'per month',
    ctaText: 'Start 14-Day Free Trial',
    ctaLink: '/signup?plan=pro',
    highlighted: true,
    status: 'available',
    features: [
      { text: 'Unlimited bookmarks & folders', included: true },
      { text: 'Chrome, Firefox, Edge extensions', included: true },
      { text: 'Real-time multi-device sync', included: true },
      { text: 'Deep full-text, note & tag search', included: true },
      { text: 'Smart auto-folders & suggestions', included: true },
      { text: 'Bulk import/export (HTML, CSV, JSON)', included: true },
      { text: 'Dead link checker & duplicate cleaner', included: true },
      { text: 'Priority customer support', included: true },
      { text: 'ImPlinx Notes Pro included', included: false }
    ]
  },
  {
    id: 'everything',
    name: 'Everything Plan',
    badge: 'Best Value',
    tagline: 'One master pass to all current & future ImPlinx tools.',
    monthlyPrice: 8.99,
    yearlyPrice: 6.99, // $83.88/year (~22% off)
    period: 'per month',
    ctaText: 'Get Everything',
    ctaLink: '/signup?plan=everything',
    highlighted: false,
    status: 'available',
    features: [
      { text: 'Everything in ImPlinx Bookmarks Pro', included: true },
      { text: 'ImPlinx Notes Pro access included', included: true },
      { text: 'All future ImPlinx apps automatically included', included: true },
      { text: 'Shared ecosystem cloud storage (25 GB)', included: true },
      { text: 'Universal global search across links & notes', included: true },
      { text: 'Early access to beta releases', included: true },
      { text: 'Dedicated 24/7 VIP support', included: true }
    ]
  }
];

export const PRICING_FAQS = [
  {
    question: 'Can I use ImPlinx Bookmarks completely free?',
    answer:
      'Yes! The Free plan gives you up to 500 bookmarks, folder organization, and our official browser extension without expiring. You only need to upgrade if you want unlimited bookmarks, deep search, and automatic cross-device sync.'
  },
  {
    question: 'What is the "Everything Plan"?',
    answer:
      'ImPlinx is building a complete productivity suite. The Everything Plan gives you unlimited access to ImPlinx Bookmarks Pro, ImPlinx Notes Pro (when launched), and any future productivity tools we release under one subscription.'
  },
  {
    question: 'How does billing and subscription management work?',
    answer:
      'Subscriptions are managed securely through our verified billing partners (Paddle / Razorpay / Stripe). You can upgrade, downgrade, or cancel anytime directly from your ImPlinx Account Dashboard.'
  },
  {
    question: 'Can I import my existing bookmarks from Chrome or Safari?',
    answer:
      'Absolutely. Both Free and Pro tiers support 1-click standard HTML bookmark imports from Chrome, Firefox, Safari, Edge, Raindrop, and Pocket.'
  },
  {
    question: 'Is my saved data private and secure?',
    answer:
      'Yes. Your bookmarks and personal metadata are stored in isolated databases protected by PostgreSQL Row Level Security (RLS). We never sell your browsing habits or share link data with advertisers.'
  }
];
