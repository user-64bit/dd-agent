import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function BlueprintCommonCard({
  cardTitle,
  cardDescription,
  children,
  handleNext,
  handleBack,
  className,
  ButtonHeader,
  TalkToAIButton,
}: {
  cardTitle: string;
  cardDescription?: string;
  children: React.ReactNode;
  handleNext?: () => void;
  handleBack?: () => void;
  className?: string;
  ButtonHeader?: React.ReactNode;
  TalkToAIButton?: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>{cardTitle}</span>
          {ButtonHeader}
        </CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={!handleBack}
          className={`cursor-pointer ${handleBack ? "" : "invisible"}`}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className={`cursor-pointer ${handleNext ? "" : "hidden"}`}
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        {TalkToAIButton}
      </CardFooter>
    </Card>
  );
}
