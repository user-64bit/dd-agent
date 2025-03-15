"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@/components/loader";
import { ChatInterface } from "@/components/chat-interface";
import { Blueprint } from "@/components/blueprint-cards/blueprint";
import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";
import { VoiceInput } from "@/components/voice-input";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("blueprint");

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Check if user data exists in localStorage and set active section accordingly
  useEffect(() => {
    try {
      const formDataString = localStorage.getItem("formData");
      if (formDataString) {
        const userData = JSON.parse(formDataString);
        // Check if we have at least the required user data
        if (userData.age && userData.biologicalSex && userData.height && userData.weight) {
          setActiveSection("chat");
        } else {
          setActiveSection("blueprint");
        }
      } else {
        setActiveSection("blueprint");
      }
    } catch (error) {
      console.error("Error checking user data:", error);
      setActiveSection("blueprint");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AnimatePresence>
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen"
          >
            <Header
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            <main className="flex-1 container mx-auto px-4 py-6 relative">
              <AnimatePresence mode="wait">
                {activeSection === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ChatInterface />
                  </motion.div>
                )}

                {activeSection === "blueprint" && (
                  <motion.div
                    key="blueprint"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Blueprint setActiveSection={setActiveSection}/>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <div className="fixed bottom-6 right-6 flex gap-3">
              <VoiceInput />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
