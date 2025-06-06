export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Photo {
  id: string;
  title?: string;
  imageUrl: string;
  categoryId: string;
  categoryName?: string; // Optional: denormalized for convenience
  description?: string; // Optional: for lightbox
  aiHint?: string; // For placeholder image generation
}
