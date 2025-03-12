import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import BlueprintCommonCard from "./blueprint-common-card";

export default function LifestyleCard({
  formData,
  handleSliderChange,
  handleNext,
  handleBack,
}: {
  formData: any;
  handleSliderChange: (name: string, value: number[]) => void;
  handleNext: () => void;
  handleBack: () => void;
}) {
  return (
    <BlueprintCommonCard
      cardTitle="Lifestyle Factors"
      cardDescription="Tell us about your current lifestyle habits to help us
        create your blueprint."
      handleNext={handleNext}
      handleBack={handleBack}
    >
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="sleepHours">Sleep (hours per night)</Label>
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
          onValueChange={(value) => handleSliderChange("sleepHours", value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="exerciseHours">Exercise (hours per week)</Label>
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
          onValueChange={(value) => handleSliderChange("exerciseHours", value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="stressLevel">Stress Level</Label>
          <span className="text-sm font-medium">{formData.stressLevel}/10</span>
        </div>
        <Slider
          id="stressLevel"
          min={1}
          max={10}
          step={1}
          value={[formData.stressLevel]}
          onValueChange={(value) => handleSliderChange("stressLevel", value)}
        />
      </div>
    </BlueprintCommonCard>
  );
}
