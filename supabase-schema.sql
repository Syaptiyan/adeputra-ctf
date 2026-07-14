-- ADE PUTRA CTF - Supabase Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('web', 'crypto', 'forensics', 'reverse', 'osint', 'misc')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER NOT NULL,
  flag TEXT NOT NULL,
  hints TEXT[] DEFAULT '{}',
  files TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'ADE PUTRA',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  flag_submitted TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Solves table
CREATE TABLE IF NOT EXISTS solves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  points_earned INTEGER NOT NULL,
  solved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Function to increment user score
CREATE OR REPLACE FUNCTION increment_score(user_id UUID, points INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE users SET score = score + points WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE solves ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Challenges policies
CREATE POLICY "Anyone can view active challenges" ON challenges FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage challenges" ON challenges FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Submissions policies
CREATE POLICY "Users can view own submissions" ON submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create submissions" FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Solves policies
CREATE POLICY "Anyone can view solves" ON solves FOR SELECT USING (true);
CREATE POLICY "Users can create solves" FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample challenges
INSERT INTO challenges (title, description, category, difficulty, points, flag, hints, author) VALUES
(
  'Cookie Monster',
  'The admin left a cookie on the table. Can you use it to get the flag?

URL: https://example.com/login

Hint: Check the cookies in your browser.',
  'web',
  'easy',
  100,
  'APCTF{c00k13_m0nst3r_1s_hungry}',
  ARRAY['Try inspecting the cookies after visiting the login page', 'The cookie value might be base64 encoded'],
  'ADE PUTRA'
),
(
  'Base64ception',
  'I found this encoded message. Can you decode it all the way down?

Encoded: YUhSMGNITTZMeTluYVhRdk1UWXlNRGd3TVM1amIyMHZkR0ZzY3k5cFpDOWpZMkZ5ZEY5bGVTOWlZWE5sTmpZdk1UWXlNRGd3TVM1amIyMA==',
  'crypto',
  'easy',
  100,
  'APCTF{b4s364_1s_fun_r1ght?}',
  ARRAY['Try decoding base64 multiple times', 'Use an online base64 decoder'],
  'ADE PUTRA'
),
(
  'Hidden in Plain Sight',
  'Download this image and find the hidden flag.

The flag is hiding somewhere you might not expect.',
  'forensics',
  'easy',
  100,
  'APCTF{m3t4d4t4_r3v34ls_s3cr3ts}',
  ARRAY['Check the image metadata (EXIF data)', 'Use exiftool or an online EXIF viewer'],
  'ADE PUTRA'
),
(
  'SQL Injection 101',
  'This login form seems vulnerable. Can you bypass it?

URL: https://example.com/login

Username: admin
Password: ???',
  'web',
  'easy',
  150,
  'APCTF{sql_1nj3ct10n_b4s1cs}',
  ARRAY['Try using a single quote in the username field', 'The classic payload is: admin'' OR 1=1--'],
  'ADE PUTRA'
),
(
  'XOR Crack',
  'I encrypted a flag using XOR with a single character key. Can you crack it?

Encrypted (hex): 1a0a1b0d1e081a071c061f0d1e0a071c0e0f1a',
  'crypto',
  'medium',
  200,
  'APCTF{x0r_s1ngl3_k3y_cr4ck3d}',
  ARRAY['XOR with the same key twice gives back the original', 'Try XORing with common characters like space (0x20)'],
  'ADE PUTRA'
),
(
  'JWT None',
  'This API uses JWT for authentication. Can you forge a token?

API: https://example.com/api/flag
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ3Vlc3QiLCJyb2xlIjoiZ3Vlc3QifQ.xxx',
  'web',
  'medium',
  200,
  'APCTF{jwt_n0n3_4lg0r1thm_byp4ss}',
  ARRAY['Look at the JWT algorithm field', 'Try changing the algorithm to "none"'],
  'ADE PUTRA'
),
(
  'Reverse Me',
  'Can you reverse engineer this Python bytecode?

The flag is hidden in the code.',
  'reverse',
  'medium',
  200,
  'APCTF{pyth0n_byt3c0d3_r3v3rs3d}',
  ARRAY['Use uncompyle6 or decompyle3', 'The bytecode is in a .pyc file'],
  'ADE PUTRA'
),
(
  'Race Condition',
  'This e-commerce site has a flash sale. Can you exploit it to get the flag?

URL: https://example.com/flash-sale

Balance: Rp 100.000
Flag price: Rp 1.000.000',
  'web',
  'hard',
  300,
  'APCTF{r4c3_c0nd1t10n_3xpl01t3d}',
  ARRAY['Try sending multiple requests at the same time', 'Use Burp Intruder or a custom script'],
  'ADE PUTRA'
),
(
  'OSINT Investigation',
  'Find information about this person based on their online presence.

Username: cyberghost404',
  'osint',
  'medium',
  200,
  'APCTF{s0c14l_m3d14_0s1nt_ftw}',
  ARRAY['Search for the username across different platforms', 'Check GitHub, Twitter, Reddit'],
  'ADE PUTRA'
),
(
  'Steganography Advanced',
  'This image contains more than meets the eye. Can you extract the hidden data?

The flag is embedded using LSB steganography.',
  'forensics',
  'hard',
  300,
  'APCTF{lsb_st3g_1s_cl4ss1c}',
  ARRAY['Use stegsolve or zsteg', 'Check the least significant bits of each pixel'],
  'ADE PUTRA'
);
