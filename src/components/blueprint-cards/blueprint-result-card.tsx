import { AnimatePresence, motion } from "framer-motion";
import { Brain, Download, Dumbbell, LucideIcon, Salad } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import BlueprintCommonCard from "./blueprint-common-card";

export default function BlueprintResultCard({
  isGenerating,
  showResults,
  formData,
  handleBack,
}: {
  isGenerating: boolean;
  showResults: boolean;
  formData: any;
  handleBack: () => void;
}) {
  return (
    <div>
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
              <BlueprintCommonCard
                cardTitle="Your Personalized Longevity Blueprint"
                cardDescription="Based on your data, we've created a personalized blueprint to optimize your longevity."
                handleBack={handleBack}
                ButtonHeader={
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                }
                TalkToAIButton={
                  <Button className="cursor-pointer">
                    Talk to AI Assistant
                  </Button>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <HelperCard
                    title="Sleep Optimization"
                    description={`Aim for ${
                      formData.sleepHours + 0.5
                    } hours of quality sleep. Create a cool, dark environment and establish a consistent sleep schedule.`}
                    Icon={Brain}
                  />
                  <HelperCard
                    title="Exercise Protocol"
                    description={`Increase to ${Math.min(
                      formData.exerciseHours + 2,
                      14
                    )} hours weekly with a mix of resistance training and zone 2 cardio for optimal results.`}
                    Icon={Dumbbell}
                  />

                  <HelperCard
                    title="Nutrition Plan"
                    description={`Focus on plant-forward meals with adequate protein (1.6g/kg) and time-restricted eating (8-hour window).`}
                    Icon={Salad}
                  />
                </div>
                <RecommendationsCard
                  title="Personal Recommendations"
                  formData={formData}
                />
              </BlueprintCommonCard>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

const HelperCard = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) => {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Icon className="mr-2 h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

const RecommendationsCard = ({
  title,
  formData,
}: {
  title: string;
  formData: any;
}) => {
  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Based on your goals:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {formData.goals.includes("energy") && (
              <li>
                Incorporate morning sunlight exposure for 10-15 minutes to
                regulate circadian rhythm and boost energy.
              </li>
            )}
            {formData.goals.includes("sleep") && (
              <li>
                Implement a digital sunset 1 hour before bed and consider
                magnesium glycinate supplementation.
              </li>
            )}
            {formData.goals.includes("heart") && (
              <li>
                Add 2-3 sessions of zone 2 cardio (120-140 bpm) per week for
                cardiovascular health.
              </li>
            )}
            {formData.goals.includes("muscle") && (
              <li>
                Focus on progressive overload resistance training 3x weekly with
                adequate protein intake.
              </li>
            )}
            {formData.goals.includes("weight") && (
              <li>
                Implement time-restricted eating with an 8-hour feeding window
                to support metabolic health.
              </li>
            )}
            {formData.goals.includes("nutrition") && (
              <li>
                Prioritize a diverse range of plant foods (30+ varieties weekly)
                for microbiome health.
              </li>
            )}
            {formData.goals.length === 0 && (
              <li>
                Focus on foundational habits: quality sleep, regular movement,
                and nutrient-dense foods.
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Stress Management:</h4>
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
  );
};
