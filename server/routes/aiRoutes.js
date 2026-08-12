import express from "express";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, courseTitle } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Question is required.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured.");
      return res.status(500).json({
        message: "AI service is not configured.",
      });
    }

    const prompt = `You are a helpful, friendly learning assistant embedded in an e-learning course page about "${courseTitle || "general learning"}".

Keep responses short and conversational — 2 to 4 sentences maximum, unless the student explicitly asks for a detailed explanation or step-by-step answer.

Student's question:
${message}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(response.status).json({
        message: "Gemini API request failed.",
      });
    }

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return res.status(500).json({
        message: "Gemini returned an empty response.",
      });
    }

    res.json({ response: aiText });
  } catch (error) {
    console.error("AI route error:", error);

    res.status(500).json({
      message: "Something went wrong while generating the response.",
    });
  }
});

export default router;