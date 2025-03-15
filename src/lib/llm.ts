"use server";

import OpenAI from "openai";
import { Message } from "../utils/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  dangerouslyAllowBrowser: true,
});

export async function GPTResponse(chatHistory: Message[], prompt: string) {
  chatHistory = [{ role: "system", content: prompt }, ...chatHistory];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: chatHistory,
  });
  return response.choices[0].message.content?.toString();
}
