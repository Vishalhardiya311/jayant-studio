"use client";

import type { Photo } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deletePhoto, type PhotoUploadFormState } from "@/app/admin/actions";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Image as ImageIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface PhotoListProps {
  photos: Photo[];
}

export default function PhotoList({ photos }: PhotoListProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Store ID of photo being deleted

  const handleDelete = async (photoId: string, photoTitle?: string) => {
    setIsDeleting(photoId);
    const result: PhotoUploadFormState = await deletePhoto(photoId);
    setIsDeleting(null);
    toast({
      title: result.type === "success" ? "Success!" : "Error!",
      description: result.message,
      variant: result.type === "error" ? "destructive" : "default",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-primary" /> Uploaded Photos
        </CardTitle>
        <CardDescription>View and manage your uploaded photos.</CardDescription>
      </CardHeader>
      <CardContent>
        {photos.length === 0 ? (
          <p className="text-muted-foreground">No photos uploaded yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {photos.map((photo) => (
                <TableRow key={photo.id}>
                  <TableCell>
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title || "Photo preview"}
                      width={80}
                      height={80}
                      className="rounded object-cover aspect-square"
                      data-ai-hint={photo.aiHint || "wedding photo"}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{photo.title || "Untitled"}</TableCell>
                  <TableCell>{photo.categoryName || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={isDeleting === photo.id}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the photo "{photo.title || 'Untitled'}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={isDeleting === photo.id}>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(photo.id, photo.title)}
                            disabled={isDeleting === photo.id}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            {isDeleting === photo.id ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
