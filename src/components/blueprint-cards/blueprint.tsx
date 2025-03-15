"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BlueprintResultCard from "./blueprint-result-card";
import HealthGoalsCard from "./health-goals-card";
import LifestyleCard from "./lifestyle-card";
import PersonalInfoCard from "./personal-info-card";
import { GPTResponse } from "@/lib/llm";
import { BLUEPRINT_PROMPT } from "@/utils/config";

type FormStep = "personal" | "lifestyle" | "goals" | "results";

export function Blueprint({setActiveSection}: {setActiveSection: Dispatch<SetStateAction<string>>}) {
  const [step, setStep] = useState<FormStep>("personal");
  const [formData, setFormData] = useState({
    // Personal Details
    age: "",
    weight: "",
    height: "",
    biologicalSex: "",
    medicalConditions: [] as string[],
    bodyFatPercentage: "",
    restingHeartRate: "",
    bloodPressure: "",
    medications: "",

    // Lifestyle
    sleepHours: 7,
    sleepQuality: "Average",
    sleepConsistency: "Somewhat Regular",
    stressLevel: 5,
    stressManagement: [] as string[],
    exerciseHours: 3,
    exerciseTypes: [] as string[],
    activityLevel: "Moderately Active",
    screenTime: 4,
    caffeineIntake: "Moderate",
    alcoholConsumption: "Occasional",
    smokingHabit: "None",

    // Goals
    primaryGoal: "",
    timeframe: "Long-Term",
    dietaryPreferences: [] as string[],
    foodSensitivities: "",
    intermittentFasting: false,
    mentalGoals: [] as string[],
    longevityFocus: "Committed",
    goals: [] as string[],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const formData = localStorage.getItem("formData");
    if (formData) {
      setFormData(JSON.parse(formData));
    }
  }, []);
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => {
      const goals = [...prev.goals];
      if (goals.includes(goal)) {
        return { ...prev, goals: goals.filter((g) => g !== goal) };
      } else {
        return { ...prev, goals: [...goals, goal] };
      }
    });
  };

  const handleNext = async () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    if (step === "personal") setStep("lifestyle");
    else if (step === "lifestyle") setStep("goals");
    else if (step === "goals") {
      setStep("results");
      setIsGenerating(true);
      try {
        const response = await GPTResponse(
          [{ role: "user", content: JSON.stringify(formData) }],
          BLUEPRINT_PROMPT
        );
        if (response) {
          const cleanedResponse = response.replace(/```json|```/g, "");
          const parsedResponse = JSON.parse(cleanedResponse);
          localStorage.setItem("blueprintResponse", JSON.stringify(parsedResponse));
        } else {
          console.error("Received undefined response from GPT API");
        }
      } catch (error) {
        console.error("Error fetching blueprint response:", error);
        localStorage.setItem("blueprintResponse", JSON.stringify({ error: "Failed to fetch data" }));
      }
      setIsGenerating(false);
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step === "lifestyle") setStep("personal");
    else if (step === "goals") setStep("lifestyle");
    else if (step === "results") {
      setShowResults(false);
      setStep("goals");
    }
  };

  return (
    <div className="mx-auto">
      <Tabs value={step} className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger
            value="personal"
            disabled
            className={`flex items-center ${
              step === "personal"
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            <BreadCrumbNumber step={step} number={1} />
            Personal
          </TabsTrigger>
          <BreadCrumbDirection />
          <TabsTrigger
            value="lifestyle"
            disabled
            className={`flex items-center ${
              step === "lifestyle"
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            <BreadCrumbNumber step={step} number={2} />
            Lifestyle
          </TabsTrigger>
          <BreadCrumbDirection />
          <TabsTrigger
            value="goals"
            disabled
            className={`flex items-center ${
              step === "goals"
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            <BreadCrumbNumber step={step} number={3} />
            Goals
          </TabsTrigger>
          <BreadCrumbDirection />
          <TabsTrigger
            value="results"
            disabled
            className={`flex items-center ${
              step === "results"
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            <BreadCrumbNumber step={step} number={4} />
            Blueprint
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          {step === "personal" && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="personal" className="mt-0">
                <PersonalInfoCard
                  formData={formData}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              </TabsContent>
            </motion.div>
          )}

          {step === "lifestyle" && (
            <motion.div
              key="lifestyle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="lifestyle" className="mt-0">
                <LifestyleCard
                  formData={formData}
                  handleSliderChange={handleSliderChange}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              </TabsContent>
            </motion.div>
          )}

          {step === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="goals" className="mt-0">
                <HealthGoalsCard
                  formData={formData}
                  handleGoalToggle={handleGoalToggle}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              </TabsContent>
            </motion.div>
          )}

          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="results" className="mt-0">
                <BlueprintResultCard
                  isGenerating={isGenerating}
                  showResults={showResults}
                  formData={formData}
                  handleBack={handleBack}
                  setActiveSection={setActiveSection}
                />
              </TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

const BreadCrumbDirection = () => {
  return (
    <div className="mx-2 text-muted-foreground">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-right"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  );
};

const BreadCrumbNumber = ({
  number,
  step,
}: {
  number: number;
  step: FormStep;
}) => {
  return (
    <span
      className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
        step === "personal" ? "bg-primary text-primary-foreground" : "bg-muted"
      }`}
    >
      {number}
    </span>
  );
};
