"use client";

import { Message } from "../utils/types";

export async function GPTResponse(chatHistory: Message[], prompt: string) {
  try {
    // Call our API route instead of OpenAI directly
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: chatHistory.map(msg => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        })),
        systemPrompt: prompt
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate response');
    }

    const data = await response.json();
    return data.content;
  } catch (error: any) {
    console.error("Error generating response:", error);
    return `I'm sorry, I encountered an error processing your request: ${error.message || "Unknown error"}. Please try again later.`;
  }
}
