
import React from 'react';
import PhotoUploadForm from "@/components/admin/PhotoUploadForm";
import PhotoList from "@/components/admin/PhotoList";
import { getCategories, getPhotos } from "@/lib/data";
import type { Category, Photo } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function ManagePhotosPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  React.use(searchParams); // Ensure searchParams Thenable is resolved

  let categories: Category[] = [];
  let photos: Photo[] = [];
  
  // Fetch data. Errors here should be caught by the nearest error.js or global error handler.
  // For more specific error handling on this page, you could wrap this in a try/catch.
  categories = await getCategories();
  photos = await getPhotos(); 

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline mb-2">Manage Photos</h2>
        <p className="text-muted-foreground">
          Upload new photos to your gallery. Assign them to relevant categories for easy browsing.
        </p>
      </div>
      <PhotoUploadForm categories={categories} />
      <PhotoList photos={photos} />
    </div>
  );
}
