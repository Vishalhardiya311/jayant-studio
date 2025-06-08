
"use server";

import { revalidatePath } from "next/cache";
import type { Category, Photo } from "@/lib/types";
// Import the mutable arrays directly to modify them
import { categories as categoriesData, photos as photosData } from "@/lib/data"; 

// Simulate database operations - IDs need to be dynamic based on current array length + new entries
// This needs to be robust if items are deleted. A simple increment might lead to ID collision if not careful,
// but for in-memory, we'll find the max current ID.
const getNextId = (items: Array<{id: string}>): string => {
  if (items.length === 0) return "1";
  return String(Math.max(...items.map(item => parseInt(item.id.replace(/\D/g,'') || "0"))) + 1);
}


export interface CategoryFormState {
  message: string;
  type: "success" | "error";
}

export async function createCategory(
  prevState: CategoryFormState | undefined,
  formData: FormData
): Promise<CategoryFormState> {
  const categoryName = formData.get("name") as string;

  if (!categoryName || categoryName.trim().length === 0) {
    return { message: "Category name cannot be empty.", type: "error" };
  }

  try {
    const nextCategoryId = getNextId(categoriesData);
    const newCategory: Category = {
      id: nextCategoryId,
      name: categoryName.trim(),
      slug: categoryName.trim().toLowerCase().replace(/\s+/g, "-"),
    };
    categoriesData.push(newCategory); 
    
    revalidatePath("/admin/categories");
    revalidatePath("/"); 
    revalidatePath("/admin/(protected)/categories"); // ensure correct path revalidation
    return { message: `Category "${categoryName}" created successfully.`, type: "success" };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { message: `Failed to create category: ${error.message}`, type: "error" };
  }
}

export interface PhotoUploadFormState {
  message: string;
  type: "success" | "error";
}

export async function uploadPhoto(
  prevState: PhotoUploadFormState | undefined,
  formData: FormData
): Promise<PhotoUploadFormState> {
  const title = formData.get("title") as string;
  const categoryId = formData.get("categoryId") as string;
  const imageFile = formData.get("imageFile") as File; // This is for potential future use with actual storage
  const aiHintValue = formData.get("aiHint") as string | null;

  if (!categoryId) {
    return { message: "Please select a category.", type: "error" };
  }
  // For this prototype, actual file upload isn't implemented, so imageFile check is less critical
  // but we'll keep it for completeness.
  if (!imageFile || imageFile.size === 0) {
     // In a real app, this would be a hard error. For placeholders, it's okay.
     // For now, we proceed but a real image would be expected.
  }


  const finalAiHint = aiHintValue ? aiHintValue.trim() : "";
  if (finalAiHint && (finalAiHint.split(' ').length > 2 || finalAiHint.split(' ').some(word => word.length === 0))) {
    return { message: "AI hint, if provided, should be one or two non-empty words.", type: "error" };
  }

  try {
    // Simulate image upload, using a placeholder.
    const imageUrl = `https://placehold.co/600x400.png`; 
    const nextPhotoId = getNextId(photosData);
    
    const newPhoto: Photo = {
      id: String(nextPhotoId),
      title: title || "Untitled Photo",
      categoryId,
      imageUrl, // Using the placeholder
      aiHint: finalAiHint || undefined // Store as undefined if empty for cleaner data
    };
    photosData.push(newPhoto);

    revalidatePath("/admin/photos");
    revalidatePath("/"); 
    revalidatePath("/admin/(protected)/photos"); // ensure correct path revalidation
    return { message: `Photo "${newPhoto.title}" (using placeholder image) uploaded successfully.`, type: "success" };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { message: `Failed to upload photo: ${error.message}`, type: "error" };
  }
}

export async function deleteCategory(categoryId: string): Promise<CategoryFormState> {
  try {
    const index = categoriesData.findIndex(c => c.id === categoryId);
    if (index === -1) {
      return { message: "Category not found.", type: "error" };
    }
    
    const photosInCategory = photosData.filter(p => p.categoryId === categoryId).length;
    if (photosInCategory > 0) {
        return { message: `Cannot delete category. It has ${photosInCategory} photo(s). Please remove or reassign photos first.`, type: "error"};
    }

    categoriesData.splice(index, 1);
    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/admin/(protected)/categories");
    return { message: "Category deleted successfully.", type: "success" };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { message: `Failed to delete category: ${error.message}`, type: "error" };
  }
}

export async function deletePhoto(photoId: string): Promise<PhotoUploadFormState> {
  try {
    const index = photosData.findIndex(p => p.id === photoId);
    if (index === -1) {
      return { message: "Photo not found.", type: "error" };
    }
    photosData.splice(index, 1);
    revalidatePath("/admin/photos");
    revalidatePath("/");
    revalidatePath("/admin/(protected)/photos");
    return { message: "Photo deleted successfully.", type: "success" };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { message: `Failed to delete photo: ${error.message}`, type: "error" };
  }
}
