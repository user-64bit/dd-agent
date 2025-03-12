"use client";

import { motion } from "framer-motion";
import { Activity, Brain, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <motion.header
      className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <h1 className="font-bold text-xl">Longevity AI</h1>
            <p className="text-xs text-muted-foreground">
              Don&apos;t Die Blueprint
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant={activeSection === "chat" ? "default" : "ghost"}
            onClick={() => setActiveSection("chat")}
            className="relative group"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat Assistant
            {activeSection === "chat" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
              />
            )}
          </Button>

          <Button
            variant={activeSection === "blueprint" ? "default" : "ghost"}
            onClick={() => setActiveSection("blueprint")}
            className="relative group"
          >
            <Activity className="w-4 h-4 mr-2" />
            Blueprint
            {activeSection === "blueprint" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
              />
            )}
          </Button>
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setActiveSection(activeSection === "chat" ? "blueprint" : "chat")
            }
          >
            {activeSection === "chat" ? (
              <Activity className="w-5 h-5" />
            ) : (
              <MessageSquare className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
