
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { uploadPhoto, type PhotoUploadFormState } from "@/app/admin/actions";
import type { Category } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

interface PhotoUploadFormProps {
  categories: Category[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Uploading..." : <><UploadCloud className="mr-2 h-4 w-4" /> Upload Photo</>}
    </Button>
  );
}

export default function PhotoUploadForm({ categories }: PhotoUploadFormProps) {
  const initialState: PhotoUploadFormState | undefined = undefined;
  const [state, formAction] = useFormState(uploadPhoto, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.type === "success" ? "Success!" : "Error!",
        description: state.message,
        variant: state.type === "error" ? "destructive" : "default",
      });
      if (state.type === "success") {
        formRef.current?.reset();
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
      }
    }
  }, [state, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Photo</CardTitle>
        <CardDescription>Add a new photo to your gallery. Select a category, provide an optional title, and an AI hint for image searching.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="title" className="font-semibold">Photo Title (Optional)</Label>
            <Input id="title" name="title" type="text" placeholder="e.g., Romantic Sunset Kiss" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="categoryId" className="font-semibold">Category</Label>
            <Select name="categoryId" required>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="aiHint" className="font-semibold">AI Hint</Label>
            <Input 
              id="aiHint" 
              name="aiHint" 
              type="text" 
              placeholder="e.g., couple beach (1-2 words)" 
              required 
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">One or two keywords for AI image search if using placeholders.</p>
          </div>

          <div>
            <Label htmlFor="imageFile" className="font-semibold">Image File</Label>
            <Input 
              id="imageFile" 
              name="imageFile" 
              type="file" 
              required 
              className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              accept="image/png, image/jpeg, image/gif, image/webp"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {preview && (
              <div className="mt-4 border rounded-md p-2 inline-block">
                <Image src={preview} alt="Image preview" width={200} height={200} className="object-contain rounded max-h-[200px]" />
              </div>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

