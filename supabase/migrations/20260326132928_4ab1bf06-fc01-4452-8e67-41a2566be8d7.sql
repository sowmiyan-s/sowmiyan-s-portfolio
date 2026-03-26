-- Table for hidden projects (admin can hide GitHub repos)
CREATE TABLE public.hidden_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  github_repo_id INTEGER NOT NULL UNIQUE,
  repo_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hidden_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hidden projects are publicly readable"
  ON public.hidden_projects FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert hidden projects"
  ON public.hidden_projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can delete hidden projects"
  ON public.hidden_projects FOR DELETE TO authenticated USING (true);

-- Table for skills
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tech', 'non-tech')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Skills are publicly readable"
  ON public.skills FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert skills"
  ON public.skills FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON public.skills FOR DELETE TO authenticated USING (true);

-- Seed default skills
INSERT INTO public.skills (name, category) VALUES
  ('Python', 'tech'), ('JavaScript', 'tech'), ('React', 'tech'),
  ('Node.js', 'tech'), ('TensorFlow', 'tech'), ('PyTorch', 'tech'),
  ('AWS', 'tech'), ('Docker', 'tech'),
  ('Problem Solving', 'non-tech'), ('Communication', 'non-tech'),
  ('Team Leadership', 'non-tech'), ('Project Management', 'non-tech'),
  ('Public Speaking', 'non-tech');
