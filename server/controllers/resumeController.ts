// controllers/resumeController.ts
import OpenAI from "openai";
import { Request, Response } from "express";
import { AIResponseFormat } from "server/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const { text, jobTitle, jobDescription } = req.body;

    const systemPrompt = `You are an expert in ATS and resume analysis.
        Analyze the resume text against the Job Title: ${jobTitle} and Description: ${jobDescription}.
        Provide feedback in this JSON format: ${AIResponseFormat}
        Return ONLY the JSON object. No markdown, no backticks.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Resume Text: ${text}` },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    res.json(result);
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to parse resume with AI" });
  }
};

// export const analyzeResume = async (req: Request, res: Response) => {
//   try {
//     const { text } = req.body; // Receive text directly

//     if (!text)
//       return res.status(400).json({ error: "No resume text provided" });

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an ATS expert. Analyze this resume text and return JSON: { atsScore, insights[], recommendations[] }",
//         },
//         { role: "user", content: text },
//       ],
//       response_format: { type: "json_object" },
//     });

//     res.json(JSON.parse(response.choices[0].message.content || "{}"));
//   } catch (error) {
//     res.status(500).json({ error: "Analysis failed" });
//   }
// };
