"use client"; 

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
      <h2 className="text-3xl font-headline mb-4 text-destructive">Oops, Something Went Wrong!</h2>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">
        We encountered an unexpected issue. Please try again, or if the problem persists, contact support.
      </p>
      {error?.message && (
        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md mb-6">
          Error details: {error.message}
        </p>
      )}
      <Button
        onClick={() => reset()}
        className="text-lg px-6 py-3"
      >
        Try Again
      </Button>
    </div>
  );
}
