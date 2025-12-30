import { GoogleGenAI } from "@google/genai";

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    const model = 'gemini-3-flash-preview'; 
    
    // Fallback if no API key is present for demo purposes
    if (!apiKey) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `[SIMULATED GEMINI RESPONSE]
      
I have analyzed your request: "${prompt}".
      
Since no API key was provided in the environment variables, this is a placeholder response demonstrating where the AI content would appear. 

In a real scenario, I would be generating complex text, code, or data structures here.`;
    }

    const ai = new GoogleGenAI({ apiKey });

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