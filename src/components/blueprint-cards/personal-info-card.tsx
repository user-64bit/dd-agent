import { formDataInterface } from "@/utils/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import BlueprintCommonCard from "./blueprint-common-card";

export default function PersonalInfoCard({
  formData,
  handleInputChange,
  handleNext,
}: {
  formData: formDataInterface;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
}) {
  return (
    <BlueprintCommonCard
      cardTitle="Personal Information"
      cardDescription="Enter your basic information to get started with your
        personalized longevity blueprint."
      handleNext={handleNext}
    >
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          placeholder="Enter your age"
          value={formData.age}
          min={1}
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
            min={1}
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
            min={1}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </BlueprintCommonCard>
  );
}
