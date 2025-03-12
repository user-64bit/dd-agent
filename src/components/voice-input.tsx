"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  const toggleListening = () => {
    // This would normally connect to the Web Speech API
    // For demo purposes, we're just toggling the state
    setIsListening(!isListening);

    if (!isListening) {
      setPulseAnimation(true);

      setTimeout(() => {
        setIsListening(false);
        setPulseAnimation(false);
      }, 2000);
    } else {
      setPulseAnimation(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {pulseAnimation && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full bg-primary"
          />
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant={isListening ? "default" : "outline"}
          size="icon"
          onClick={toggleListening}
          className={`rounded-full cursor-pointer ${
            isListening ? "bg-primary" : "bg-background/80 backdrop-blur-sm"
          }`}
        >
          {isListening ? (
            <MicOff className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Mic className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">
            {isListening ? "Stop voice input" : "Start voice input"}
          </span>
        </Button>
      </motion.div>
    </div>
  );
}
