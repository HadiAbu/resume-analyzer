// controllers/resumeController.ts
import pdf from "pdf-parse";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const analyzeResume = async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    // 1. Translate PDF Buffer to Text
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    // 2. Communicate with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an ATS (Applicant Tracking System) expert. Analyze the following resume text and provide a JSON response with an ATS score (0-100), key strengths, and areas for improvement.",
        },
        { role: "user", content: resumeText },
      ],
      response_format: { type: "json_object" },
    });

    res.json(JSON.parse(completion.choices[0].message.content || "{}"));
  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
};
