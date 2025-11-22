import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_DATA } from "../constants";

let aiClient: GoogleGenAI | null = null;

const initializeClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

// Construct a system prompt based on the portfolio data
const SYSTEM_PROMPT = `
You are an AI assistant for ${PORTFOLIO_DATA.name}'s professional portfolio website.
Your role is to act as a knowledgeable representative of ${PORTFOLIO_DATA.name}.

Here is ${PORTFOLIO_DATA.name}'s resume data:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

Instructions:
1. Answer questions about skills, experience, projects, and background based ONLY on the data provided.
2. Be professional, concise, and friendly.
3. If asked about contact info, provide the email from the data.
4. If asked about something not in the data, politely say you don't have that information but suggest contacting ${PORTFOLIO_DATA.name} directly.
5. Keep answers relatively short (under 100 words) unless asked for details.
6. Speak in the first person plural "we" or third person referring to "Alex", or act as a dedicated assistant. Let's act as a dedicated assistant named "Portfolio Bot".
`;

export const sendMessageToGemini = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]): Promise<string> => {
  const client = initializeClient();
  
  if (!client) {
    console.warn("Gemini API Key is missing.");
    return "I'm sorry, my brain (API Key) is currently offline. Please try again later or contact Alex directly via email.";
  }

  try {
    // Transform history for the chat context
    // We only keep the last few turns to save tokens and context window
    const recentHistory = history.slice(-6); 
    
    // Create a chat session
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
      history: recentHistory.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({
      message: userMessage
    });

    return result.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I encountered a temporary error connecting to the AI service. Please try again.";
  }
};
