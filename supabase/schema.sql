-- ==============================================================================
-- ImPlinx Master SaaS Platform Database Schema
-- Compatible with Supabase PostgreSQL (Row Level Security enabled)
-- ==============================================================================

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. Profiles Table (extends Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 2. Products Registry Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY, -- e.g. 'bookmarks', 'notes', 'reader'
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'development', 'coming_soon')),
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to products"
  ON public.products FOR SELECT
  TO public
  USING (true);

-- Seed core products
INSERT INTO public.products (id, name, slug, description, status)
VALUES
  ('bookmarks', 'ImPlinx Bookmarks', 'bookmarks', 'Bookmark Manager Pro for links, tags, and research.', 'active'),
  ('notes', 'ImPlinx Notes', 'notes', 'Connected notes and knowledge management.', 'coming_soon')
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 3. Plans Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.plans (
  id TEXT PRIMARY KEY, -- 'free', 'pro', 'everything'
  name TEXT NOT NULL,
  description TEXT,
  price_monthly NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
  price_yearly NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
  currency TEXT DEFAULT 'USD' NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to plans"
  ON public.plans FOR SELECT
  TO public
  USING (true);

INSERT INTO public.plans (id, name, description, price_monthly, price_yearly, features)
VALUES
  ('free', 'Free Forever', 'Core bookmarks and essential organization.', 0.00, 0.00, '["Up to 500 bookmarks", "Browser extension access", "Standard search", "Single device sync"]'::jsonb),
  ('pro', 'ImPlinx Pro', 'Supercharge your link workflows with unlimited power.', 4.99, 47.90, '["Unlimited bookmarks", "Full-text & tag search", "Smart auto-folders", "Cross-device instant sync", "Priority support"]'::jsonb),
  ('everything', 'Everything Plan', 'All ImPlinx tools combined under one master license.', 8.99, 86.30, '["All ImPlinx Bookmarks Pro features", "ImPlinx Notes Pro access", "Future apps automatically included", "Shared ecosystem storage", "Early beta access"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 4. Subscriptions Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id TEXT REFERENCES public.plans(id) NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('paddle', 'razorpay', 'stripe', 'manual')),
  provider_subscription_id TEXT UNIQUE,
  provider_customer_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 5. Product Entitlements Table (Grants user access to specific products)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.entitlements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  is_active BOOLEAN DEFAULT true,
  granted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  expires_at TIMESTAMPTZ,
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own entitlements"
  ON public.entitlements FOR SELECT
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 6. ImPlinx Bookmarks (Product-Specific Tables)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookmark_folders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#4F46E5',
  icon TEXT DEFAULT 'folder',
  parent_id UUID REFERENCES public.bookmark_folders(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.bookmark_folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own bookmark folders"
  ON public.bookmark_folders FOR ALL
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  folder_id UUID REFERENCES public.bookmark_folders(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  favicon_url TEXT,
  is_favorite BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own bookmarks"
  ON public.bookmarks FOR ALL
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, name)
);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own tags"
  ON public.tags FOR ALL
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.bookmark_tags (
  bookmark_id UUID REFERENCES public.bookmarks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (bookmark_id, tag_id)
);

ALTER TABLE public.bookmark_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their bookmark tags"
  ON public.bookmark_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.bookmarks b
      WHERE b.id = bookmark_tags.bookmark_id AND b.user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- 7. ImPlinx Notes (Future Product Foundation)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Note',
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own notes"
  ON public.notes FOR ALL
  USING (auth.uid() = user_id);
