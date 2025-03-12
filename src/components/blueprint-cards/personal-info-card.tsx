import { formDataInterface } from "@/utils/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import BlueprintCommonCard from "./blueprint-common-card";

export default function PersonalInfoCard({
  formData,
  setFormData,
  handleNext,
}: {
  formData: formDataInterface;
  setFormData: (data: formDataInterface) => void;
  handleNext: () => void;
}) {
  const [showOptionalPersonal, setShowOptionalPersonal] = useState(false);
  return (
    <BlueprintCommonCard
      cardTitle="Personal Information"
      cardDescription="Enter your basic information to get started with your
        personalized longevity blueprint."
      handleNext={handleNext}
    >
      <div>
        <h3 className="text-lg font-medium mb-2">Essential Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biologicalSex">Biological Sex</Label>
            <div className="flex space-x-4 pt-2">
              {["Male", "Female", "Other"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`sex-${option.toLowerCase()}`}
                    name="biologicalSex"
                    value={option}
                    checked={formData.biologicalSex === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        biologicalSex: e.target.value,
                      })
                    }
                    className="h-4 w-4 text-primary"
                  />
                  <Label
                    htmlFor={`sex-${option.toLowerCase()}`}
                    className="text-sm font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              placeholder="Height in cm"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="medicalConditions">
              Existing Medical Conditions
            </Label>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "None",
                "Diabetes",
                "Hypertension",
                "Heart Disease",
                "Asthma",
                "Thyroid Issues",
                "Other",
              ].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`condition-${condition
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    checked={formData.medicalConditions.includes(condition)}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        medicalConditions: formData.medicalConditions.includes(
                          condition
                        )
                          ? formData.medicalConditions.filter(
                              (c) => c !== condition
                            )
                          : [...formData.medicalConditions, condition],
                      })
                    }
                    className="h-4 w-4 text-primary"
                  />
                  <Label
                    htmlFor={`condition-${condition
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    className="text-sm font-normal"
                  >
                    {condition}
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
            className="text-xs cursor-pointer"
            onClick={() => setShowOptionalPersonal(!showOptionalPersonal)}
          >
            {showOptionalPersonal ? "Hide" : "Show"} Optional Fields
          </Button>
        </div>

        {showOptionalPersonal && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-md p-4 bg-muted/20">
            <div className="space-y-2">
              <Label htmlFor="bodyFatPercentage">Body Fat Percentage (%)</Label>
              <Input
                id="bodyFatPercentage"
                name="bodyFatPercentage"
                type="number"
                placeholder="If known"
                value={formData.bodyFatPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bodyFatPercentage: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restingHeartRate">Resting Heart Rate (bpm)</Label>
              <Input
                id="restingHeartRate"
                name="restingHeartRate"
                type="number"
                placeholder="If known"
                value={formData.restingHeartRate}
                onChange={(e) =>
                  setFormData({ ...formData, restingHeartRate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodPressure">Blood Pressure</Label>
              <Input
                id="bloodPressure"
                name="bloodPressure"
                placeholder="e.g., 120/80"
                value={formData.bloodPressure}
                onChange={(e) =>
                  setFormData({ ...formData, bloodPressure: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Medications or Supplements</Label>
              <Input
                id="medications"
                name="medications"
                placeholder="List any medications or supplements"
                value={formData.medications}
                onChange={(e) =>
                  setFormData({ ...formData, medications: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>
    </BlueprintCommonCard>
  );
}
