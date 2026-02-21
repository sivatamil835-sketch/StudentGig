-- ============================================================
-- StudentGig Supabase Database Schema
-- Run this in your Supabase project's SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- JOBS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS jobs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  budget      TEXT,
  duration    TEXT,
  skills      TEXT[],
  type        TEXT DEFAULT 'Remote',
  employer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- APPLICATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id     UUID REFERENCES jobs(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status     TEXT DEFAULT 'Pending',  -- Pending | Accepted | Rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, student_id)  -- Prevent duplicate applications
);

-- ============================================================
-- MESSAGES TABLE (for Chat)
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id   UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Jobs: anyone can read, only employer can insert/update their own
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Employers can insert jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = employer_id);
CREATE POLICY "Employers can update their jobs" ON jobs FOR UPDATE USING (auth.uid() = employer_id);
CREATE POLICY "Employers can delete their jobs" ON jobs FOR DELETE USING (auth.uid() = employer_id);

-- Applications: students see their own, employers see applicants on their jobs
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students see own applications" ON applications FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Employers see their job applications" ON applications FOR SELECT
  USING (EXISTS ( SELECT 1 FROM jobs WHERE jobs.id = applications.job_id AND jobs.employer_id = auth.uid()));
CREATE POLICY "Students can apply" ON applications FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Employers can update status" ON applications FOR UPDATE
  USING (EXISTS ( SELECT 1 FROM jobs WHERE jobs.id = applications.job_id AND jobs.employer_id = auth.uid()));

-- Messages: users can see their own sent/received messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own messages" ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ============================================================
-- SAMPLE DATA (optional - for testing)
-- ============================================================
-- INSERT INTO jobs (title, description, budget, duration, skills, type, employer_id)
-- VALUES ('React Frontend Developer', 'Build our MVP UI', '$200-$500', '2 weeks', ARRAY['React','CSS'], 'Remote', '<your-employer-user-id>');
