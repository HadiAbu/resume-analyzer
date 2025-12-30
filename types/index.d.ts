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
    tips: string[];
  };
  toneAndStyle: {
    score: number;
    tips: string[];
  };
  content: {
    score: number;
    tips: string[];
  };
  structure: {
    score: number;
    tips: string[];
  };
  skills: {
    score: number;
    tips: string[];
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
