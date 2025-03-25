import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { cn } from "../../lib/utils";

export function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Bun + React</h1>
      <p className="text-lg text-muted-foreground mb-6">A lightweight template with TanStack Router</p>
      
      <div className="flex justify-center">
        <Button onClick={toggleAlert} size="lg">Toggle Alert</Button>
      </div>
      
      <Alert
        variant="default"
        className={cn(
          isOpen
            ? "fixed bottom-10 right-10 flex flex-col gap-2 items-center w-fit max-w-md z-50 shadow-lg"
            : "hidden"
        )}
      >
        <AlertTitle className="text-lg">Alert Title</AlertTitle>
        <AlertDescription>
          Some additional information that helps to clarify the status of this
          alert.
        </AlertDescription>
      </Alert>
    </div>
  );
} 