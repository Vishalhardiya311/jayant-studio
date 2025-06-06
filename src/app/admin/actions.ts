"use server";

import { revalidatePath } from "next/cache";
import type { Category, Photo } from "@/lib/types";
import { categories as categoriesData, photos as photosData } from "@/lib/data"; // Placeholder

// Simulate database operations
let nextCategoryId = categoriesData.length + 1;
let nextPhotoId = photosData.length + 1;

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
    // Simulate saving to database
    const newCategory: Category = {
      id: String(nextCategoryId++),
      name: categoryName.trim(),
      slug: categoryName.trim().toLowerCase().replace(/\s+/g, "-"),
    };
    categoriesData.push(newCategory); // Add to in-memory store
    console.log("Created category:", newCategory);
    
    revalidatePath("/admin/categories");
    revalidatePath("/"); // Revalidate gallery page too if categories change
    return { message: `Category "${categoryName}" created successfully.`, type: "success" };
  } catch (e) {
    console.error("Failed to create category", e);
    return { message: "Failed to create category.", type: "error" };
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
  const imageFile = formData.get("imageFile") as File;

  if (!categoryId) {
    return { message: "Please select a category.", type: "error" };
  }
  if (!imageFile || imageFile.size === 0) {
    return { message: "Please select an image file.", type: "error" };
  }

  try {
    // Simulate image upload to a service like Firebase Storage or Cloudinary
    // For now, we'll just use a placeholder URL structure.
    const imageUrl = `https://placehold.co/600x400.png?text=${encodeURIComponent(title || 'New Photo')}`;
    
    const newPhoto: Photo = {
      id: String(nextPhotoId++),
      title: title || "Untitled Photo",
      categoryId,
      imageUrl,
      aiHint: "uploaded photo"
    };
    photosData.push(newPhoto); // Add to in-memory store
    console.log("Uploaded photo:", newPhoto);

    revalidatePath("/admin/photos");
    revalidatePath("/"); // Revalidate gallery page too
    return { message: `Photo "${newPhoto.title}" uploaded successfully.`, type: "success" };
  } catch (e) {
    console.error("Failed to upload photo", e);
    return { message: "Failed to upload photo.", type: "error" };
  }
}

export async function deleteCategory(categoryId: string): Promise<CategoryFormState> {
  try {
    const index = categoriesData.findIndex(c => c.id === categoryId);
    if (index === -1) {
      return { message: "Category not found.", type: "error" };
    }
    // Also handle deleting photos in this category or reassigning them. For simplicity, just remove category for now.
    const photosInCategory = photosData.filter(p => p.categoryId === categoryId).length;
    if (photosInCategory > 0) {
        return { message: `Cannot delete category. It has ${photosInCategory} photo(s). Please remove photos first.`, type: "error"};
    }

    categoriesData.splice(index, 1);
    console.log("Deleted category:", categoryId);
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { message: "Category deleted successfully.", type: "success" };
  } catch (e) {
    console.error("Failed to delete category", e);
    return { message: "Failed to delete category.", type: "error" };
  }
}

export async function deletePhoto(photoId: string): Promise<PhotoUploadFormState> {
  try {
    const index = photosData.findIndex(p => p.id === photoId);
    if (index === -1) {
      return { message: "Photo not found.", type: "error" };
    }
    photosData.splice(index, 1);
    console.log("Deleted photo:", photoId);
    revalidatePath("/admin/photos");
    revalidatePath("/");
    return { message: "Photo deleted successfully.", type: "success" };
  } catch (e) {
    console.error("Failed to delete photo", e);
    return { message: "Failed to delete photo.", type: "error" };
  }
}
