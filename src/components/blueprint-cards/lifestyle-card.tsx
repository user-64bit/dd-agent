import { formDataInterface } from "@/utils/types";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import BlueprintCommonCard from "./blueprint-common-card";
import { Button } from "../ui/button";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function LifestyleCard({
  formData,
  handleSliderChange,
  setFormData,
  handleNext,
  handleBack,
}: {
  formData: formDataInterface;
  handleSliderChange: (name: string, value: number[]) => void;
  setFormData: (data: formDataInterface) => void;
  handleNext: () => void;
  handleBack: () => void;
}) {
  const [showOptionalLifestyle, setShowOptionalLifestyle] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Check if all required fields are filled
  const isFormValid = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.sleepQuality) {
      newErrors.sleepQuality = "Sleep quality is required";
    }
    
    if (!formData.sleepConsistency) {
      newErrors.sleepConsistency = "Sleep consistency is required";
    }
    
    if (!formData.activityLevel) {
      newErrors.activityLevel = "Activity level is required";
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
      cardTitle="Lifestyle Factors"
      cardDescription="Tell us about your current lifestyle habits to help us
        create your blueprint."
      handleNext={handleNextWithValidation}
      handleBack={handleBack}
    >
      <div>
        <h3 className="text-lg font-medium mb-2">Essential Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="sleepHours" className="flex items-center">
                Sleep Duration (hours per night) <span className="text-red-500 ml-1">*</span>
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
              onValueChange={(value) => handleSliderChange("sleepHours", value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepQuality" className="flex items-center">
              Sleep Quality <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {["Poor", "Average", "Excellent"].map((quality) => (
                <Button
                  key={quality}
                  type="button"
                  variant={formData.sleepQuality === quality ? "default" : "outline"}
                  className={`${
                    formData.sleepQuality === quality
                      ? ""
                      : "hover:bg-muted/50"
                  } ${errors.sleepQuality ? "border-red-500" : ""}`}
                  onClick={() =>
                    setFormData({ ...formData, sleepQuality: quality })
                  }
                >
                  {quality}
                </Button>
              ))}
            </div>
            {errors.sleepQuality && (
              <div className="text-red-500 text-xs flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.sleepQuality}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepConsistency" className="flex items-center">
              Sleep Consistency <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {["Irregular", "Somewhat Regular", "Very Consistent"].map(
                (consistency) => (
                  <Button
                    key={consistency}
                    type="button"
                    variant={
                      formData.sleepConsistency === consistency
                        ? "default"
                        : "outline"
                    }
                    className={`${
                      formData.sleepConsistency === consistency
                        ? ""
                        : "hover:bg-muted/50"
                    } ${errors.sleepConsistency ? "border-red-500" : ""}`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        sleepConsistency: consistency,
                      })
                    }
                  >
                    {consistency}
                  </Button>
                )
              )}
            </div>
            {errors.sleepConsistency && (
              <div className="text-red-500 text-xs flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.sleepConsistency}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="stressLevel" className="flex items-center">
                Stress Level <span className="text-red-500 ml-1">*</span>
              </Label>
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

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="exerciseHours" className="flex items-center">
                Exercise (hours per week) <span className="text-red-500 ml-1">*</span>
              </Label>
              <span className="text-sm font-medium">
                {formData.exerciseHours} hours
              </span>
            </div>
            <Slider
              id="exerciseHours"
              min={0}
              max={20}
              step={0.5}
              value={[formData.exerciseHours]}
              onValueChange={(value) =>
                handleSliderChange("exerciseHours", value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityLevel" className="flex items-center">
              Overall Activity Level <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Sedentary",
                "Lightly Active",
                "Moderately Active",
                "Very Active",
              ].map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={
                    formData.activityLevel === level ? "default" : "outline"
                  }
                  className={`${
                    formData.activityLevel === level ? "" : "hover:bg-muted/50"
                  } ${errors.activityLevel ? "border-red-500" : ""}`}
                  onClick={() =>
                    setFormData({ ...formData, activityLevel: level })
                  }
                >
                  {level}
                </Button>
              ))}
            </div>
            {errors.activityLevel && (
              <div className="text-red-500 text-xs flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.activityLevel}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mt-4">
        <p>Fields marked with <span className="text-red-500">*</span> are required.</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Optional Details</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => setShowOptionalLifestyle(!showOptionalLifestyle)}
          >
            {showOptionalLifestyle ? "Hide" : "Show"} Optional Fields
          </Button>
        </div>

        {showOptionalLifestyle && (
          <div className="space-y-4 border rounded-md p-4 bg-muted/20">
            <div className="space-y-2">
              <Label htmlFor="exerciseTypes">Exercise Types</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                {[
                  "Strength Training",
                  "Cardio",
                  "HIIT",
                  "Yoga/Stretching",
                  "Sports",
                  "Walking",
                ].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`exercise-${type.toLowerCase().replace(/\s|\//g, "-")}`}
                      checked={formData.exerciseTypes.includes(type)}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          exerciseTypes: formData.exerciseTypes.includes(type)
                            ? formData.exerciseTypes.filter((t) => t !== type)
                            : [...formData.exerciseTypes, type],
                        });
                      }}
                      className="h-4 w-4 text-primary"
                    />
                    <Label
                      htmlFor={`exercise-${type
                        .toLowerCase()
                        .replace(/\s|\//g, "-")}`}
                      className="text-sm font-normal"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stressManagement">
                Stress Management Techniques
              </Label>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  "Meditation",
                  "Deep Breathing",
                  "Yoga",
                  "Nature Time",
                  "Therapy",
                  "None",
                ].map((technique) => (
                  <div key={technique} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`stress-${technique
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      checked={formData.stressManagement.includes(technique)}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          stressManagement: formData.stressManagement.includes(
                            technique
                          )
                            ? formData.stressManagement.filter(
                                (t) => t !== technique
                              )
                            : [...formData.stressManagement, technique],
                        });
                      }}
                      className="h-4 w-4 text-primary"
                    />
                    <Label
                      htmlFor={`stress-${technique
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className="text-sm font-normal"
                    >
                      {technique}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="screenTime">Screen Time (hours per day)</Label>
                <span className="text-sm font-medium">
                  {formData.screenTime} hours
                </span>
              </div>
              <Slider
                id="screenTime"
                min={0}
                max={16}
                step={0.5}
                value={[formData.screenTime]}
                onValueChange={(value) =>
                  handleSliderChange("screenTime", value)
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caffeineIntake">Caffeine Intake</Label>
                <div className="grid grid-cols-1 gap-2">
                  {["None", "Low", "Moderate", "High"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`caffeine-${level.toLowerCase()}`}
                        name="caffeineIntake"
                        value={level}
                        checked={formData.caffeineIntake === level}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            caffeineIntake: e.target.value,
                          })
                        }
                        className="h-4 w-4 text-primary"
                      />
                      <Label
                        htmlFor={`caffeine-${level.toLowerCase()}`}
                        className="text-sm font-normal"
                      >
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
                <div className="grid grid-cols-1 gap-2">
                  {["None", "Occasional", "Moderate", "Frequent"].map(
                    (level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`alcohol-${level.toLowerCase()}`}
                          name="alcoholConsumption"
                          value={level}
                          checked={formData.alcoholConsumption === level}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              alcoholConsumption: e.target.value,
                            })
                          }
                          className="h-4 w-4 text-primary"
                        />
                        <Label
                          htmlFor={`alcohol-${level.toLowerCase()}`}
                          className="text-sm font-normal"
                        >
                          {level}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smokingHabit">Smoking/Vaping</Label>
                <div className="grid grid-cols-1 gap-2">
                  {["None", "Occasional", "Regular", "Former Smoker"].map(
                    (level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`smoking-${level
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                          name="smokingHabit"
                          value={level}
                          checked={formData.smokingHabit === level}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              smokingHabit: e.target.value,
                            })
                          }
                          className="h-4 w-4 text-primary"
                        />
                        <Label
                          htmlFor={`smoking-${level
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                          className="text-sm font-normal"
                        >
                          {level}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BlueprintCommonCard>
  );
}
