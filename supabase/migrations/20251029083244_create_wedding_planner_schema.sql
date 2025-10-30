/*
  # DreamDay Wedding Planner Schema (Supabase-Safe)

  ✅ Fully compatible with Supabase
  ✅ Uses Row Level Security (RLS)
  ✅ Automatically generates UUIDs
  ✅ Automatically updates timestamps
  ✅ Creates user profile upon signup
*/

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- Shared helper function to auto-update timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 1. Profiles
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  wedding_date date,
  partner_name text,
  budget_total numeric DEFAULT 25000,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Combined RLS policies (simplified)
CREATE POLICY "Users manage own profile"
  ON public.profiles
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Auto-update timestamp
CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

-- =====================================================
-- 2. Tasks
-- =====================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  due_date date,
  priority text DEFAULT 'Medium Priority',
  category text DEFAULT 'General',
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own tasks"
  ON public.tasks
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_tasks_timestamp
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_completed_idx ON public.tasks(completed);

-- =====================================================
-- 3. Expenses
-- =====================================================
CREATE TABLE IF NOT EXISTS public.expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  item text NOT NULL,
  estimated numeric DEFAULT 0,
  actual numeric DEFAULT 0,
  status text DEFAULT 'Pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own expenses"
  ON public.expenses
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_expenses_timestamp
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

CREATE INDEX IF NOT EXISTS expenses_user_id_idx ON public.expenses(user_id);

-- =====================================================
-- 4. Guests
-- =====================================================
CREATE TABLE IF NOT EXISTS public.guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  rsvp_status text DEFAULT 'Pending',
  plus_one boolean DEFAULT false,
  dietary_restrictions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own guests"
  ON public.guests
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_guests_timestamp
  BEFORE UPDATE ON public.guests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

CREATE INDEX IF NOT EXISTS guests_user_id_idx ON public.guests(user_id);
CREATE INDEX IF NOT EXISTS guests_rsvp_status_idx ON public.guests(rsvp_status);

-- =====================================================
-- 5. Vendors
-- =====================================================
CREATE TABLE IF NOT EXISTS public.vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  email text,
  phone text,
  website text,
  notes text,
  status text DEFAULT 'Interested',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own vendors"
  ON public.vendors
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_vendors_timestamp
  BEFORE UPDATE ON public.vendors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

CREATE INDEX IF NOT EXISTS vendors_user_id_idx ON public.vendors(user_id);

-- =====================================================
-- 6. Gallery Items
-- =====================================================
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  image_url text NOT NULL,
  category text DEFAULT 'General',
  notes text,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own gallery items"
  ON public.gallery_items
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_gallery_items_timestamp
  BEFORE UPDATE ON public.gallery_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_timestamp();

CREATE INDEX IF NOT EXISTS gallery_items_user_id_idx ON public.gallery_items(user_id);

-- =====================================================
-- 7. Contact Submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow both anonymous and logged-in users to submit
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- =====================================================
-- 8. Auto-create profile on signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
