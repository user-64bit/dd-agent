"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Message } from "@/utils/types";
import { GPTResponse } from "@/lib/llm";
import { SYSTEM_PROMPT } from "@/utils/config";

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI health assistant based on the Don't Die Blueprint. I have access to your health profile data and will provide personalized recommendations. How can I help optimize your longevity today?",
    role: "system",
    timestamp: new Date(),
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserData, setHasUserData] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if user data exists in localStorage
  useEffect(() => {
    try {
      const formDataString = localStorage.getItem("formData");
      if (formDataString) {
        const userData = JSON.parse(formDataString);
        // Check if we have at least some basic user data
        if (userData.age || userData.biologicalSex || userData.weight) {
          setHasUserData(true);
        }
      }
    } catch (error) {
      console.error("Error checking user data:", error);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Retrieve user data from localStorage
    let userData = null;
    try {
      const formDataString = localStorage.getItem("formData");
      if (formDataString) {
        userData = JSON.parse(formDataString);
        setHasUserData(true);
      }
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
    }

    // Create a modified system prompt that includes user data
    let contextualizedPrompt = SYSTEM_PROMPT;
    if (userData) {
      // Replace the placeholder in the system prompt with actual user data
      contextualizedPrompt = SYSTEM_PROMPT.replace(
        "{Insert user details: Personal metrics, lifestyle habits, health goals}",
        JSON.stringify(userData, null, 2)
      );
    }

    const response = await GPTResponse(messages, contextualizedPrompt);
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: response as string,
      role: "system",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] mx-auto">
      <Card className="flex-1 overflow-hidden flex flex-col bg-background/50 backdrop-blur-sm border-primary/10">
        {!hasUserData && (
          <div className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 p-3 flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4" />
            <p>
              For personalized health recommendations, please complete your profile in the Blueprint section.
            </p>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  message.role === "user" ? "ml-auto justify-end" : ""
                )}
              >
                <Avatar
                  className={cn(
                    "w-8 h-8 p-2 border border-white/20",
                    message.role === "user" ? "order-2" : ""
                  )}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </Avatar>

                <div
                  className={cn(
                    "rounded-lg p-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message?.timestamp?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <Avatar className="w-8 h-8">
                  <Bot className="w-4 h-4" />
                </Avatar>
                <div className="rounded-lg p-3 bg-muted">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-foreground/50"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about longevity, nutrition, exercise..."
              className="pr-10 bg-background border-primary/20 focus-visible:ring-primary/50"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are based on the Don&apos;t Die Blueprint principles
            {hasUserData && " and your personal health profile"}
          </p>
        </div>
      </Card>
    </div>
  );
}
