-- Secure flag validation function
CREATE OR REPLACE FUNCTION check_flag(
  p_user_id UUID,
  p_challenge_id UUID,
  p_flag TEXT
)
RETURNS JSON AS $$
DECLARE
  v_challenge RECORD;
  v_already_solved BOOLEAN;
  v_is_correct BOOLEAN;
  v_result JSON;
BEGIN
  -- Check if already solved
  SELECT EXISTS(
    SELECT 1 FROM solves WHERE user_id = p_user_id AND challenge_id = p_challenge_id
  ) INTO v_already_solved;
  
  IF v_already_solved THEN
    RETURN json_build_object('correct', false, 'message', 'Already solved', 'already_solved', true);
  END IF;
  
  -- Get challenge
  SELECT * INTO v_challenge FROM challenges WHERE id = p_challenge_id AND is_active = true;
  
  IF v_challenge IS NULL THEN
    RETURN json_build_object('correct', false, 'message', 'Challenge not found');
  END IF;
  
  -- Check flag (case-insensitive, trim whitespace)
  v_is_correct := LOWER(TRIM(p_flag)) = LOWER(TRIM(v_challenge.flag));
  
  -- Record submission
  INSERT INTO submissions (user_id, challenge_id, flag_submitted, is_correct)
  VALUES (p_user_id, p_challenge_id, p_flag, v_is_correct);
  
  IF v_is_correct THEN
    -- Record solve
    INSERT INTO solves (user_id, challenge_id, points_earned)
    VALUES (p_user_id, p_challenge_id, v_challenge.points)
    ON CONFLICT (user_id, challenge_id) DO NOTHING;
    
    -- Update score
    PERFORM increment_score(p_user_id, v_challenge.points);
    
    RETURN json_build_object('correct', true, 'message', 'Correct flag!', 'points', v_challenge.points);
  ELSE
    RETURN json_build_object('correct', false, 'message', 'Incorrect flag, try again');
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Rate limiting function
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_user_id UUID,
  p_challenge_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_last_submission TIMESTAMP;
  v_cooldown_seconds INTEGER := 5;
BEGIN
  SELECT MAX(submitted_at) INTO v_last_submission
  FROM submissions
  WHERE user_id = p_user_id AND challenge_id = p_challenge_id;
  
  IF v_last_submission IS NULL THEN
    RETURN true;
  END IF;
  
  RETURN (EXTRACT(EPOCH FROM (NOW() - v_last_submission)) >= v_cooldown_seconds);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin check function
CREATE OR REPLACE FUNCTION is_admin(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM users WHERE id = p_user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;
