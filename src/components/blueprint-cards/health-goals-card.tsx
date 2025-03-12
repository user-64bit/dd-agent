import { Activity, Brain, Check, Dumbbell, Heart, Salad } from "lucide-react";
import { Button } from "../ui/button";
import BlueprintCommonCard from "./blueprint-common-card";

const GOALS = [
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
];
export default function HealthGoalsCard({
  formData,
  handleGoalToggle,
  handleNext,
  handleBack,
}: {
  formData: any;
  handleGoalToggle: (goal: string) => void;
  handleNext: () => void;
  handleBack: () => void;
}) {
  return (
    <BlueprintCommonCard
      cardTitle="Health Goals"
      cardDescription="Select your primary health and longevity goals."
      handleNext={handleNext}
      handleBack={handleBack}
    >
      <div className="grid grid-cols-2 gap-3">
        {GOALS.map((goal) => (
          <Button
            key={goal.id}
            variant={formData.goals.includes(goal.id) ? "default" : "outline"}
            className="h-auto py-3 justify-start cursor-pointer"
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
    </BlueprintCommonCard>
  );
}
