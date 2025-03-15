export interface formDataInterface {
  age: string;
  weight: string;
  height: string;
  biologicalSex: string;
  medicalConditions: string[];
  bodyFatPercentage: string;
  restingHeartRate: string;
  bloodPressure: string;
  medications: string;
  sleepHours: number;
  sleepQuality: string;
  sleepConsistency: string;
  stressLevel: number;
  stressManagement: string[];
  exerciseHours: number;
  exerciseTypes: string[];
  activityLevel: string;
  screenTime: number;
  caffeineIntake: string;
  alcoholConsumption: string;
  smokingHabit: string;
  primaryGoal: string;
  timeframe: string;
  dietaryPreferences: string[];
  foodSensitivities: string;
  intermittentFasting: boolean;
  mentalGoals: string[];
  longevityFocus: string;
  goals: string[];
}

export interface Message {
  id?: string;
  role: "user" | "system";
  content: string;
  timestamp?: Date;
}
