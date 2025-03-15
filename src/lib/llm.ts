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

    // Parse the response as JSON, with error handling
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Failed to parse server response");
    }

    // Check if the response contains an error
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate response');
    }

    // Check if the content field exists
    if (data.content === undefined) {
      console.error("Invalid response format:", data);
      throw new Error("Invalid response format from server");
    }

    return data.content;
  } catch (error: unknown) {
    console.error("Error generating response:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // For blueprint generation, return a structured error object
    if (prompt.includes("Don't Die Blueprint")) {
      return JSON.stringify({
        error: "Failed to generate blueprint",
        message: errorMessage,
        sleep_optimization: "Error: Unable to generate sleep recommendations",
        exercise_protocol: "Error: Unable to generate exercise recommendations",
        nutrition_plan: "Error: Unable to generate nutrition recommendations",
        personal_recommendations: `We encountered an error while generating your personalized blueprint: ${errorMessage}. Please try again later.`
      });
    }
    
    // For chat, return a friendly error message
    return `I'm sorry, I encountered an error processing your request: ${errorMessage}. Please try again later.`;
  }
}
