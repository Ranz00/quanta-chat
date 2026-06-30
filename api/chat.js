// Gemini SDK for Vercel serverless function
import { GoogleGenerativeAI } from "@google/generative-ai";

// Init SDK with API key from env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Quanta's system prompt
const SYSTEM_PROMPT = `Sos Quanta, una inteligencia artificial con mentalidad científica.
Explicás los temas con precisión y evidencia, evitando vaguedades y relleno.
Tu tono es calmado, directo y conciso: respondés en máximo 3 líneas.
Si no sabés algo con certeza, lo decís explícitamente y proponés cómo verificarlo.
No usás emojis ni exclamaciones innecesarias.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Init model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Map frontend history to Gemini format: { role, content } → { role, parts }
    const geminiHistory = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Send message with conversation history + system prompt
    const chat = model.startChat({
      history: geminiHistory,
      systemInstruction: SYSTEM_PROMPT,
    });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
