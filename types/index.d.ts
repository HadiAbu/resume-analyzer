export interface Resume {
  id: string;
  companyName: string;
  jobTitle: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}
export interface Suggestion {
  type: "good" | "improve";
  tip: string;
  explination?: string;
}

export interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: Suggestion[];
  };
  toneAndStyle: {
    score: number;
    tips: Suggestion[];
  };
  content: {
    score: number;
    tips: Suggestion[];
  };
  structure: {
    score: number;
    tips: Suggestion[];
  };
  skills: {
    score: number;
    tips: Suggestion[];
  };
}

// new authentication types

export interface User {
  id: string;
  email: string;
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
