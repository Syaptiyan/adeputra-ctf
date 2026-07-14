export interface User {
  id: string
  email: string
  username: string
  role: 'user' | 'admin'
  score: number
  created_at: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  category: 'web' | 'crypto' | 'forensics' | 'reverse' | 'osint' | 'misc'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  flag: string
  hints: string[]
  author: string
  is_active: boolean
  created_at: string
}

export interface Submission {
  id: string
  user_id: string
  challenge_id: string
  flag_submitted: string
  is_correct: boolean
  submitted_at: string
}

export interface Solve {
  id: string
  user_id: string
  challenge_id: string
  solved_at: string
  points_earned: number
}

export interface LeaderboardEntry {
  username: string
  score: number
  solves: number
}
