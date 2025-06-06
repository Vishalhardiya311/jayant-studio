import PhotoUploadForm from "@/components/admin/PhotoUploadForm";
import PhotoList from "@/components/admin/PhotoList";
import { getCategories, getPhotos } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function ManagePhotosPage() {
  const categories = await getCategories();
  const photos = await getPhotos(); // Fetch all photos, PhotoList can display category name

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
