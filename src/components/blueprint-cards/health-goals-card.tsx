import { Activity, Brain, Check, Dumbbell, Heart, Salad } from "lucide-react";
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
  return (
    <BlueprintCommonCard
      cardTitle="Health Goals"
      cardDescription="Select your primary health and longevity goals."
      handleNext={handleNext}
      handleBack={handleBack}
    >
      <div>
        <h3 className="text-lg font-medium mb-2">Essential Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryGoal">Primary Goal</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GOALS.map((goal) => (
                <Button
                  key={goal.id}
                  variant={
                    formData.primaryGoal === goal.id ? "default" : "outline"
                  }
                  className="h-auto py-3 justify-start"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      primaryGoal: goal.id,
                    })
                  }
                >
                  <goal.icon className="mr-2 h-4 w-4" />
                  {goal.label}
                  {formData.primaryGoal === goal.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe for Goals</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "short-term", label: "Short-Term (1-3 months)" },
                { id: "long-term", label: "Long-Term (1+ years)" },
                { id: "lifelong", label: "Lifelong Commitment" },
              ].map((timeframe) => (
                <Button
                  key={timeframe.id}
                  variant={
                    formData.timeframe === timeframe.id ? "default" : "outline"
                  }
                  className="h-auto py-2"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      timeframe: timeframe.id,
                    })
                  }
                >
                  {timeframe.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
              {[
                "No Restrictions",
                "Vegetarian",
                "Vegan",
                "Pescatarian",
                "Keto",
                "Paleo",
                "Mediterranean",
                "Low Carb",
                "Gluten-Free",
              ].map((diet) => (
                <div key={diet} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`diet-${diet.toLowerCase().replace(/\s|-/g, "-")}`}
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
                    htmlFor={`diet-${diet.toLowerCase().replace(/\s|-/g, "-")}`}
                    className="text-sm font-normal"
                  >
                    {diet}
                  </Label>
                </div>
              ))}
            </div>
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
              <Label htmlFor="foodSensitivities">
                Food Sensitivities or Allergies
              </Label>
              <Input
                id="foodSensitivities"
                name="foodSensitivities"
                placeholder="List any food sensitivities or allergies"
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
                  onChange={() =>
                    setFormData({
                      ...formData,
                      intermittentFasting: !formData.intermittentFasting,
                    })
                  }
                  className="h-4 w-4 text-primary"
                />
                <Label htmlFor="intermittentFasting" className="font-medium">
                  Interested in Intermittent Fasting or Time-Restricted Eating
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mentalGoals">Mental & Cognitive Goals</Label>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  "Improve Focus",
                  "Reduce Anxiety",
                  "Better Memory",
                  "Stress Management",
                  "Mental Clarity",
                  "Mood Enhancement",
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
              <Label htmlFor="longevityFocus">Longevity Focus Level</Label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    id: "mild",
                    label: "Mild Interest (General Health Improvement)",
                  },
                  {
                    id: "committed",
                    label: "Committed (Actively Pursuing Longevity)",
                  },
                  {
                    id: "extreme",
                    label: "Extreme Biohacker (Cutting-Edge Approaches)",
                  },
                ].map((level) => (
                  <div key={level.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`longevity-${level.id}`}
                      name="longevityFocus"
                      value={level.id}
                      checked={formData.longevityFocus === level.id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          longevityFocus: e.target.value,
                        })
                      }
                      className="h-4 w-4 text-primary"
                    />
                    <Label
                      htmlFor={`longevity-${level.id}`}
                      className="text-sm font-normal"
                    >
                      {level.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalGoals">Additional Health Goals</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "heart", label: "Heart Health", icon: Heart },
                  { id: "weight", label: "Weight Management", icon: Activity },
                  { id: "nutrition", label: "Optimize Nutrition", icon: Salad },
                  { id: "mobility", label: "Improve Mobility", icon: Activity },
                ].map((goal) => (
                  <Button
                    key={goal.id}
                    variant={
                      formData.goals.includes(goal.id) ? "default" : "outline"
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
            </div>
          </div>
        )}
      </div>
    </BlueprintCommonCard>
  );
}
