import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const { messages, systemPrompt } = await request.json();

    // Ensure the system prompt is the first message
    const systemMessage = { role: "system" as const, content: systemPrompt };
    
    // Add instruction for concise, focused responses
    const responseStyleMessage = { 
      role: "system" as const, 
      content: "Provide concise, focused responses that directly address the user's question. Avoid overwhelming the user with too much information. Use Markdown formatting to enhance readability, but prioritize simplicity and clarity. Only include information that is directly relevant to what the user is asking about."
    };
    
    // Format the messages for the OpenAI API
    const formattedMessages = [
      systemMessage,
      responseStyleMessage,
      ...messages.map((msg: any) => ({
        role: msg.role === "user" ? "user" as const : "assistant" as const,
        content: msg.content
      }))
    ];

    // Add a reminder to the model about using the user data if applicable
    if (systemPrompt.includes("User Data Provided")) {
      formattedMessages.push({
        role: "system" as const,
        content: "Remember to use the user's health profile data to personalize your responses, but only reference details that are directly relevant to their specific question. Keep your answers focused and to the point."
      });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
    });

    // Return the response
    return NextResponse.json({
      content: response.choices[0].message.content || "",
    });
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing your request" },
      { status: 500 }
    );
  }
} 