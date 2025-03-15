import { formDataInterface } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import BlueprintCommonCard from "./blueprint-common-card";

export default function BlueprintResultCard({
  isGenerating,
  showResults,
  formData,
  handleBack,
  setActiveSection,
}: {
  isGenerating: boolean;
  showResults: boolean;
  formData: formDataInterface;
  handleBack: () => void;
  setActiveSection: Dispatch<SetStateAction<string>>;
}) {
  const blueprintResponse = localStorage.getItem("blueprintResponse");
  const blueprintResponseParsed = JSON.parse(blueprintResponse ?? "{}");
  if (blueprintResponseParsed.error) {
    console.error("Blueprint response error:", blueprintResponseParsed.error);
  }
  const {
    sleep_optimization,
    exercise_protocol,
    nutrition_plan,
    personal_recommendations,
  } = blueprintResponseParsed;
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
                  <Button
                    className="cursor-pointer"
                    onClick={() => setActiveSection("chat")}
                  >
                    Talk to AI Assistant
                  </Button>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <HelperCard description={sleep_optimization} />
                  <HelperCard description={exercise_protocol} />

                  <HelperCard description={nutrition_plan} />
                </div>
                <RecommendationsCard
                  personal_recommendations={personal_recommendations}
                />
              </BlueprintCommonCard>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

const HelperCard = ({ description }: { description: string }) => {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent>
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};

const RecommendationsCard = ({
  personal_recommendations,
}: {
  personal_recommendations: any;
}) => {
  return (
    <Card className="border-primary/20">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Based on your goals:</h4>
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {personal_recommendations}
            </ReactMarkdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
