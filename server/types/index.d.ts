export interface User {
  id: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ResumeInsight {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}
