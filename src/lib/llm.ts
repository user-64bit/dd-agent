"use server";

import OpenAI from "openai";
import { Message } from "../utils/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  dangerouslyAllowBrowser: true,
});

export async function GPTResponse(chatHistory: Message[], prompt: string) {
  // Ensure the system prompt is the first message
  const systemMessage = { role: "system" as const, content: prompt };
  
  // Format the chat history for the OpenAI API
  const formattedMessages = [
    systemMessage,
    ...chatHistory.map(msg => ({
      role: msg.role === "user" ? "user" as const : "assistant" as const,
      content: msg.content
    }))
  ];

  try {
    // Add a reminder to the model about using the user data
    if (prompt.includes("User Data Provided")) {
      formattedMessages.push({
        role: "system" as const,
        content: "Remember to use the user's health profile data provided in the system prompt to personalize your responses. Reference specific details from their profile when relevant."
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
    });
    return response.choices[0].message.content?.toString();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "I'm sorry, I encountered an error processing your request. Please try again.";
  }
}
