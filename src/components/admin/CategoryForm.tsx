
"use client";

import { useActionState, useEffect, useRef } from "react"; // Changed from react-dom
import { useFormStatus } from "react-dom"; // useFormStatus remains in react-dom
import { createCategory, type CategoryFormState } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Creating..." : <><PlusCircle className="mr-2 h-4 w-4" /> Create Category</>}
    </Button>
  );
}

export default function CategoryForm() {
  const initialState: CategoryFormState | undefined = undefined;
  const [state, formAction] = useActionState(createCategory, initialState); // Changed to useActionState
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.type === "success" ? "Success!" : "Error!",
        description: state.message,
        variant: state.type === "error" ? "destructive" : "default",
      });
      if (state.type === "success") {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Category</CardTitle>
        <CardDescription>Add a new category for organizing your photos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="name" className="font-semibold">Category Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Pre-Wedding Shoots"
              required
              className="mt-1"
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
