"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Download,
  ArrowRight,
  Check,
  Activity,
  Brain,
  Heart,
  Dumbbell,
  Salad,
} from "lucide-react";

type FormStep = "personal" | "lifestyle" | "goals" | "results";

export function Blueprint() {
  const [step, setStep] = useState<FormStep>("personal");
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    sleepHours: 7,
    exerciseHours: 3,
    stressLevel: 5,
    goals: [] as string[],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleNext = () => {
    if (step === "personal") setStep("lifestyle");
    else if (step === "lifestyle") setStep("goals");
    else if (step === "goals") {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setShowResults(true);
        setStep("results");
      }, 3000);
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
    <div className="max-w-3xl mx-auto">
      <Tabs value={step} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="personal" className={`cursor-pointer ${step !== "personal" && "cursor-not-allowed"}`}>
            Personal
          </TabsTrigger>
          <TabsTrigger value="lifestyle" className={`cursor-pointer ${step !== "lifestyle" && "cursor-not-allowed"}`}>
            Lifestyle
          </TabsTrigger>
          <TabsTrigger value="goals" className={`cursor-pointer ${step !== "goals" && "cursor-not-allowed"}`}>
            Goals
          </TabsTrigger>
          <TabsTrigger value="results" className={`cursor-pointer ${step !== "results" && "cursor-not-allowed"}`}>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Enter your basic information to get started with your
                      personalized longevity blueprint.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          placeholder="Height in cm"
                          value={formData.height}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          placeholder="Weight in kg"
                          value={formData.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled>
                      Back
                    </Button>
                    <Button onClick={handleNext}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Lifestyle Factors</CardTitle>
                    <CardDescription>
                      Tell us about your current lifestyle habits to help us
                      create your blueprint.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="sleepHours">
                          Sleep (hours per night)
                        </Label>
                        <span className="text-sm font-medium">
                          {formData.sleepHours} hours
                        </span>
                      </div>
                      <Slider
                        id="sleepHours"
                        min={4}
                        max={10}
                        step={0.5}
                        value={[formData.sleepHours]}
                        onValueChange={(value) =>
                          handleSliderChange("sleepHours", value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="exerciseHours">
                          Exercise (hours per week)
                        </Label>
                        <span className="text-sm font-medium">
                          {formData.exerciseHours} hours
                        </span>
                      </div>
                      <Slider
                        id="exerciseHours"
                        min={0}
                        max={14}
                        step={0.5}
                        value={[formData.exerciseHours]}
                        onValueChange={(value) =>
                          handleSliderChange("exerciseHours", value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="stressLevel">Stress Level</Label>
                        <span className="text-sm font-medium">
                          {formData.stressLevel}/10
                        </span>
                      </div>
                      <Slider
                        id="stressLevel"
                        min={1}
                        max={10}
                        step={1}
                        value={[formData.stressLevel]}
                        onValueChange={(value) =>
                          handleSliderChange("stressLevel", value)
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button onClick={handleNext}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Health Goals</CardTitle>
                    <CardDescription>
                      Select your primary health and longevity goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          id: "energy",
                          label: "Increase Energy",
                          icon: Activity,
                        },
                        { id: "sleep", label: "Improve Sleep", icon: Brain },
                        { id: "heart", label: "Heart Health", icon: Heart },
                        { id: "muscle", label: "Build Muscle", icon: Dumbbell },
                        {
                          id: "weight",
                          label: "Weight Management",
                          icon: Activity,
                        },
                        {
                          id: "nutrition",
                          label: "Optimize Nutrition",
                          icon: Salad,
                        },
                      ].map((goal) => (
                        <Button
                          key={goal.id}
                          variant={
                            formData.goals.includes(goal.id)
                              ? "default"
                              : "outline"
                          }
                          className="h-auto py-3 justify-start"
                          onClick={() => handleGoalToggle(goal.id)}
                        >
                          <goal.icon className="mr-2 h-4 w-4" />
                          {goal.label}
                          {formData.goals.includes(goal.id) && (
                            <Check className="ml-auto h-4 w-4" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button onClick={handleNext}>
                      Generate Blueprint <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
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
                {isGenerating ? (
                  <Card className="relative overflow-hidden">
                    <CardContent className="pt-6 pb-20 flex flex-col items-center justify-center min-h-[400px]">
                      <div className="relative w-20 h-20 mb-4">
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-primary/30"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />

                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      </div>
                      <p className="text-lg font-medium">
                        Generating your personalized blueprint...
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Analyzing your data and creating recommendations
                      </p>

                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                      >
                        <div className="absolute inset-0 flex flex-wrap gap-4 p-4 overflow-hidden">
                          {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="text-xs font-mono opacity-50"
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 0.5 }}
                              transition={{ delay: i * 0.02 }}
                            >
                              {
                                [
                                  "sleep",
                                  "exercise",
                                  "nutrition",
                                  "stress",
                                  "supplements",
                                ][i % 5]
                              }
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                ) : (
                  <AnimatePresence>
                    {showResults && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <span className="text-2xl">
                                Your Personalized Longevity Blueprint
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="ml-auto"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </CardTitle>
                            <CardDescription>
                              Based on your data, we've created a personalized
                              blueprint to optimize your longevity.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card className="bg-primary/5 border-primary/20">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <Brain className="mr-2 h-5 w-5 text-primary" />
                                    Sleep Optimization
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm">
                                    Aim for {formData.sleepHours + 0.5} hours of
                                    quality sleep. Create a cool, dark
                                    environment and establish a consistent sleep
                                    schedule.
                                  </p>
                                </CardContent>
                              </Card>

                              <Card className="bg-primary/5 border-primary/20">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <Dumbbell className="mr-2 h-5 w-5 text-primary" />
                                    Exercise Protocol
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm">
                                    Increase to{" "}
                                    {Math.min(formData.exerciseHours + 2, 14)}{" "}
                                    hours weekly with a mix of resistance
                                    training and zone 2 cardio for optimal
                                    results.
                                  </p>
                                </CardContent>
                              </Card>

                              <Card className="bg-primary/5 border-primary/20">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <Salad className="mr-2 h-5 w-5 text-primary" />
                                    Nutrition Plan
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm">
                                    Focus on plant-forward meals with adequate
                                    protein (1.6g/kg) and time-restricted eating
                                    (8-hour window).
                                  </p>
                                </CardContent>
                              </Card>
                            </div>

                            <Card className="border-primary/20">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">
                                  Personalized Recommendations
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium">
                                    Based on your goals:
                                  </h4>
                                  <ul className="list-disc pl-5 space-y-1 text-sm">
                                    {formData.goals.includes("energy") && (
                                      <li>
                                        Incorporate morning sunlight exposure
                                        for 10-15 minutes to regulate circadian
                                        rhythm and boost energy.
                                      </li>
                                    )}
                                    {formData.goals.includes("sleep") && (
                                      <li>
                                        Implement a digital sunset 1 hour before
                                        bed and consider magnesium glycinate
                                        supplementation.
                                      </li>
                                    )}
                                    {formData.goals.includes("heart") && (
                                      <li>
                                        Add 2-3 sessions of zone 2 cardio
                                        (120-140 bpm) per week for
                                        cardiovascular health.
                                      </li>
                                    )}
                                    {formData.goals.includes("muscle") && (
                                      <li>
                                        Focus on progressive overload resistance
                                        training 3x weekly with adequate protein
                                        intake.
                                      </li>
                                    )}
                                    {formData.goals.includes("weight") && (
                                      <li>
                                        Implement time-restricted eating with an
                                        8-hour feeding window to support
                                        metabolic health.
                                      </li>
                                    )}
                                    {formData.goals.includes("nutrition") && (
                                      <li>
                                        Prioritize a diverse range of plant
                                        foods (30+ varieties weekly) for
                                        microbiome health.
                                      </li>
                                    )}
                                    {formData.goals.length === 0 && (
                                      <li>
                                        Focus on foundational habits: quality
                                        sleep, regular movement, and
                                        nutrient-dense foods.
                                      </li>
                                    )}
                                  </ul>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="font-medium">
                                    Stress Management:
                                  </h4>
                                  <p className="text-sm">
                                    {formData.stressLevel > 7
                                      ? "Your stress levels are high. Implement daily meditation, breathwork, and consider adaptogens like Ashwagandha."
                                      : formData.stressLevel > 4
                                      ? "Moderate stress detected. Add 10-minute daily meditation and regular nature exposure."
                                      : "Your stress levels are well-managed. Maintain current practices and consider adding regular cold exposure."}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handleBack}>
                              Back
                            </Button>
                            <Button>Speak with AI Assistant</Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
