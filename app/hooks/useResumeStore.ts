import { create } from "zustand";
import axios from "axios";
import { convertPdfToText } from "../lib/pdfParser";

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
}

interface Section {
  score: number;
  tips: Tip[];
}

interface Feedback {
  overallScore: number;
  ATS: Section;
  toneAndStyle: Section;
  content: Section;
  structure: Section;
  skills: Section;
}

interface ResumeState {
  isAnalyzing: boolean;
  results: Feedback | null; // Use the new nested interface
  analyzeResume: (
    file: File,
    jobTitle: string,
    jobDescription: string
  ) => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set) => ({
  isAnalyzing: false,
  results: null,

  analyzeResume: async (file: File) => {
    console.log("Analyzing resume");
    set({ isAnalyzing: true });
    try {
      // 1. Convert to text locally
      const extractedText = await convertPdfToText(file);
      // 2. Send plain JSON to backend
      const response = await axios.post("http://localhost:5000/api/analyze", {
        text: extractedText,
      });

      set({ results: response.data, isAnalyzing: false });
    } catch (err) {
      set({ isAnalyzing: false });
      console.error("Extraction/Analysis failed", err);
    }
  },
}));
