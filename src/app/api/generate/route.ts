import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Define types for the message structure
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  role: MessageRole;
  content: string;
}

interface RequestBody {
  messages: Array<{
    role: string;
    content: string;
  }>;
  systemPrompt: string;
}

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
    const { messages, systemPrompt } = await request.json() as RequestBody;

    // Ensure the system prompt is the first message
    const systemMessage: Message = { role: "system", content: systemPrompt };
    
    // Add instruction for concise, focused responses
    const responseStyleMessage: Message = { 
      role: "system", 
      content: "Provide concise, focused responses that directly address the user's question. Avoid overwhelming the user with too much information. Use Markdown formatting to enhance readability, but prioritize simplicity and clarity. Only include information that is directly relevant to what the user is asking about."
    };
    
    // Format the messages for the OpenAI API
    const formattedMessages: Message[] = [
      systemMessage,
      responseStyleMessage,
      ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      })) as Message[]
    ];

    // Add a reminder to the model about using the user data if applicable
    if (systemPrompt.includes("User Data Provided")) {
      formattedMessages.push({
        role: "system",
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
  } catch (error: unknown) {
    console.error("Error calling OpenAI API:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred while processing your request";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 