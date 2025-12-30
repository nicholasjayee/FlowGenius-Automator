import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
    if (!apiKey) {
      console.warn("Gemini API Key is missing.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const ai = getGenAI();
    const model = 'gemini-3-flash-preview'; 
    
    // Fallback if no API key is present for demo purposes
    if (!process.env.API_KEY) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `[SIMULATED GEMINI RESPONSE]
      
I have analyzed your request: "${prompt}".
      
Since no API key was provided in the environment variables, this is a placeholder response demonstrating where the AI content would appear. 

In a real scenario, I would be generating complex text, code, or data structures here.`;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error generating content: ${(error as Error).message}`;
  }
};