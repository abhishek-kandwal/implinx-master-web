# ImPlinx — Master SaaS Product Website & Platform Ecosystem

> **One place for everything connected.**

ImPlinx is a master technology and productivity software ecosystem designed for modern knowledge workers, researchers, creators, and developers. Rather than isolated utilities, ImPlinx unifies bookmarks, knowledge notes, and future productivity applications under one master account with cross-device sync.

---

## 🌟 Ecosystem Overview

* **ImPlinx Bookmarks (Available Now)**: Bookmark Manager Pro with instant browser extensions (Chrome, Edge, Firefox), nested smart folders, tags, sub-millisecond search, and PostgreSQL RLS cloud sync.
* **ImPlinx Notes (Coming Soon)**: Markdown-powered connected notes and knowledge management with bidirectional backlinking directly to bookmarks.
* **Future Productivity Suite**: Expanding platform including reader mode, universal clipboard, and AI knowledge synthesis.
* **Master Account & Billing**: Single login for all tools, centralized entitlement management, and multi-provider billing abstraction (Stripe, Paddle, Razorpay).

---

## 🛠️ Technology Stack

* **Core**: JavaScript (ES6+), React 18, React Router v6
* **Build System**: Webpack 5, Webpack Dev Server, Babel
* **Styling**: Vanilla CSS Design System with theme tokens, dark/light mode, and micro-interactions
* **Icons**: [Lucide React](https://lucide.dev)
* **Backend & Auth**: [Supabase](https://supabase.com) JavaScript Client (`@supabase/supabase-js`)
* **Security**: PostgreSQL Row-Level Security (RLS) policies

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment (Optional for Live Database)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your Supabase project credentials:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note**: If environment variables are not configured, the website automatically operates in **Interactive Demo / Evaluator Mode**, allowing complete exploration of all public marketing pages, authentication, and the authenticated dashboard without external dependencies.

### 3. Start Local Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
```

The optimized static production bundle is generated in `dist/`.

---

## 🗄️ Database Setup (Supabase PostgreSQL)

The database schema and security policies are in [`supabase/schema.sql`](./supabase/schema.sql):

1. Open your [Supabase Dashboard](https://supabase.com/dashboard) -> **SQL Editor**.
2. Copy and execute the contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. The script automatically sets up:
   * `profiles` (linked to `auth.users` with automatic creation trigger)
   * `products` (seeded with ImPlinx Bookmarks, Notes, and Future Apps)
   * `plans` (Free, Pro, Everything)
   * `subscriptions` & `entitlements`
   * `bookmarks`, `bookmark_folders`, `tags`, and `bookmark_tags`
   * Strict Row Level Security (RLS) policies enforcing multi-tenant isolation.

---

## 📁 Project Architecture

```text
implinx-master-web/
├── public/
│   ├── favicon.svg             # Iconic ImPlinx brand SVG mark
│   └── index.html              # HTML5 template with modern typography & SEO
├── src/
│   ├── components/
│   │   ├── bookmarks/          # Interactive Bookmarks mockup UI
│   │   ├── common/             # Logo, Button, Input, Modal, Badge, Card, ThemeToggle
│   │   ├── home/               # Ecosystem visual graph & hero components
│   │   └── layout/             # Navbar, Footer, AppShell, Mobile Navigation
│   ├── config/
│   │   ├── downloads.js        # Central release & platform matrix
│   │   ├── pricing.js          # Pricing tiers, billing cycles & FAQs
│   │   └── products.js         # Centralized Product Registry
│   ├── context/
│   │   ├── AuthContext.js      # Session management & demo mode
│   │   └── ThemeContext.js     # Light / dark mode persistence
│   ├── pages/
│   │   ├── app/                # Authenticated Platform (Dashboard, Billing, Account, etc.)
│   │   ├── About.js
│   │   ├── BookmarksProduct.js
│   │   ├── Contact.js
│   │   ├── Download.js
│   │   ├── Home.js
│   │   ├── Login.js & Signup.js
│   │   ├── NotesProduct.js
│   │   ├── Pricing.js
│   │   └── Privacy.js & Terms.js
│   ├── routes/
│   │   ├── AppRoutes.js        # React Router mapping
│   │   └── ProtectedRoute.js   # Route guard for /app/*
│   ├── services/
│   │   ├── auth.js             # Authentication operations
│   │   ├── billing/            # Provider abstraction (Stripe, Paddle, Razorpay)
│   │   └── supabase.js         # Supabase client initializer
│   ├── styles/
│   │   ├── components.css      # Reusable UI component styling
│   │   ├── main.css            # Master styles & layouts
│   │   ├── reset.css           # Modern CSS reset
│   │   ├── tokens.css          # Theme tokens & design system variables
│   │   └── typography.css      # Typography scales & Google Fonts
│   ├── App.js
│   └── index.js
├── supabase/
│   └── schema.sql              # Master database schema with RLS
├── babel.config.json
├── package.json
└── webpack.config.js
```

---

## 🔒 Security & Best Practices

* **No Service Role Keys**: Client code only accesses public anonymous keys.
* **Row-Level Security**: Direct database queries are scoped strictly to `auth.uid()`.
* **Provider-Agnostic Billing**: Checkouts and subscription updates are verified via server webhooks before updating user entitlements.

---

## 📄 License

Apache-2.0 © [Implinx](https://github.com/abhishek-kandwal/implinx-master-web).
