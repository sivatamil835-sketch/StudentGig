-- VLSI Career Hub Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table extending Auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'experienced', 'admin')),
  phone TEXT,
  skills TEXT[],
  experience_years INTEGER DEFAULT 0,
  resume_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  skills_required TEXT[],
  experience_level TEXT CHECK (experience_level IN ('fresher', 'experienced')),
  location TEXT,
  job_type TEXT CHECK (job_type IN ('onsite', 'remote', 'hybrid')),
  salary_range TEXT,
  posted_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  job_id UUID REFERENCES jobs(id),
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'reviewing', 'shortlisted', 'rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view, only owner can update
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Jobs: Anyone can view, only admins (or specific users) can insert
CREATE POLICY "Jobs are viewable by everyone." ON jobs FOR SELECT USING (true);
CREATE POLICY "Only admins can insert jobs." ON jobs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Applications: Users can see their own, admins can see all
CREATE POLICY "Users can see their own applications." ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own applications." ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);
