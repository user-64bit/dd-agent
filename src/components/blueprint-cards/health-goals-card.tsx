import { Activity, Brain, Check, Dumbbell, Heart, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import BlueprintCommonCard from "./blueprint-common-card";
import { formDataInterface } from "@/utils/types";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";

const GOALS = [
  {
    id: "get-healthier",
    label: "Get Healthier Overall",
    icon: Activity,
  },
  { id: "lose-weight", label: "Lose Weight", icon: Activity },
  { id: "improve-sleep", label: "Improve Sleep", icon: Brain },
  {
    id: "increase-energy",
    label: "Increase Energy",
    icon: Activity,
  },
  { id: "build-muscle", label: "Build Muscle", icon: Dumbbell },
  { id: "longevity", label: "Extend Lifespan", icon: Heart },
];
export default function HealthGoalsCard({
  formData,
  handleGoalToggle,
  setFormData,
  handleNext,
  handleBack,
}: {
  formData: formDataInterface;
  handleGoalToggle: (goal: string) => void;
  setFormData: (data: formDataInterface) => void;
  handleNext: () => void;
  handleBack: () => void;
}) {
  const [showOptionalGoals, setShowOptionalGoals] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Check if all required fields are filled
  const isFormValid = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.primaryGoal) {
      newErrors.primaryGoal = "Primary goal is required";
    }
    
    if (formData.goals.length === 0) {
      newErrors.goals = "Please select at least one goal";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextWithValidation = () => {
    if (isFormValid()) {
      handleNext();
    }
  };

  return (
    <BlueprintCommonCard
      cardTitle="Health Goals"
      cardDescription="Select your primary health and longevity goals."
      handleNext={handleNextWithValidation}
      handleBack={handleBack}
    >
      <div>
        <h3 className="text-lg font-medium mb-2">Essential Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryGoal" className="flex items-center">
              Primary Goal <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Weight Management",
                "Longevity",
                "Disease Prevention",
                "Energy & Performance",
                "Mental Clarity",
                "Sleep Improvement",
              ].map((goal) => (
                <Button
                  key={goal}
                  type="button"
                  variant={formData.primaryGoal === goal ? "default" : "outline"}
                  className={`${
                    formData.primaryGoal === goal ? "" : "hover:bg-muted/50"
                  } ${errors.primaryGoal ? "border-red-500" : ""}`}
                  onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                >
                  {goal}
                </Button>
              ))}
            </div>
            {errors.primaryGoal && (
              <div className="text-red-500 text-xs flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.primaryGoal}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals" className="flex items-center">
              Specific Goals <span className="text-red-500 ml-1">*</span>
            </Label>
            <p className="text-sm text-muted-foreground">
              Select all that apply to you
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {GOALS.map((goal) => {
                const isSelected = formData.goals.includes(goal.label);
                return (
                  <Button
                    key={goal.id}
                    type="button"
                    variant="outline"
                    className={`flex items-center justify-start space-x-2 h-auto py-3 ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "hover:bg-muted/50"
                    } ${errors.goals ? "border-red-500" : ""}`}
                    onClick={() => handleGoalToggle(goal.label)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <goal.icon className="w-3 h-3" />
                      )}
                    </div>
                    <span>{goal.label}</span>
                  </Button>
                );
              })}
            </div>
            {errors.goals && (
              <div className="text-red-500 text-xs flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.goals}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Optional Details</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => setShowOptionalGoals(!showOptionalGoals)}
          >
            {showOptionalGoals ? "Hide" : "Show"} Optional Fields
          </Button>
        </div>

        {showOptionalGoals && (
          <div className="space-y-4 border rounded-md p-4 bg-muted/20">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <div className="grid grid-cols-3 gap-2">
                {["Short-Term", "Medium-Term", "Long-Term"].map((timeframe) => (
                  <Button
                    key={timeframe}
                    type="button"
                    variant={
                      formData.timeframe === timeframe ? "default" : "outline"
                    }
                    className="h-auto py-2"
                    onClick={() =>
                      setFormData({ ...formData, timeframe: timeframe })
                    }
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  "Omnivore",
                  "Vegetarian",
                  "Vegan",
                  "Pescatarian",
                  "Keto",
                  "Paleo",
                  "Mediterranean",
                  "Low-Carb",
                ].map((diet) => (
                  <div key={diet} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`diet-${diet.toLowerCase()}`}
                      checked={formData.dietaryPreferences.includes(diet)}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          dietaryPreferences:
                            formData.dietaryPreferences.includes(diet)
                              ? formData.dietaryPreferences.filter(
                                  (d) => d !== diet
                                )
                              : [...formData.dietaryPreferences, diet],
                        });
                      }}
                      className="h-4 w-4 text-primary"
                    />
                    <Label
                      htmlFor={`diet-${diet.toLowerCase()}`}
                      className="text-sm font-normal"
                    >
                      {diet}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodSensitivities">
                Food Allergies or Sensitivities
              </Label>
              <Input
                id="foodSensitivities"
                placeholder="e.g., dairy, gluten, nuts"
                value={formData.foodSensitivities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    foodSensitivities: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="intermittentFasting"
                  checked={formData.intermittentFasting}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intermittentFasting: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-primary"
                />
                <Label
                  htmlFor="intermittentFasting"
                  className="text-sm font-normal"
                >
                  I practice intermittent fasting
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mentalGoals">Mental Health Goals</Label>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  "Reduce Stress",
                  "Improve Focus",
                  "Better Sleep",
                  "Mood Enhancement",
                  "Cognitive Performance",
                  "Meditation Practice",
                ].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`mental-${goal.toLowerCase().replace(/\s/g, "-")}`}
                      checked={formData.mentalGoals.includes(goal)}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          mentalGoals: formData.mentalGoals.includes(goal)
                            ? formData.mentalGoals.filter((g) => g !== goal)
                            : [...formData.mentalGoals, goal],
                        });
                      }}
                      className="h-4 w-4 text-primary"
                    />
                    <Label
                      htmlFor={`mental-${goal
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className="text-sm font-normal"
                    >
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="longevityFocus">Longevity Focus</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {["Casual Interest", "Moderate Focus", "Committed"].map(
                  (focus) => (
                    <Button
                      key={focus}
                      type="button"
                      variant={
                        formData.longevityFocus === focus ? "default" : "outline"
                      }
                      className="h-auto py-2"
                      onClick={() =>
                        setFormData({ ...formData, longevityFocus: focus })
                      }
                    >
                      {focus}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground mt-4">
        <p>Fields marked with <span className="text-red-500">*</span> are required.</p>
      </div>
    </BlueprintCommonCard>
  );
}
