import type { Category, Photo } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Pre-Wedding', slug: 'pre-wedding' },
  { id: '2', name: 'Haldi Ceremony', slug: 'haldi-ceremony' },
  { id: '3', name: 'Candid Moments', slug: 'candid-moments' },
  { id: '4', name: 'Reception', slug: 'reception' },
  { id: '5', name: 'Wedding Rituals', slug: 'wedding-rituals' },
];

export const photos: Photo[] = [
  { id: 'p1', categoryId: '1', imageUrl: 'https://placehold.co/600x400.png', title: 'Sunset Embrace', aiHint: 'couple sunset', description: 'A beautiful pre-wedding shot during sunset.' },
  { id: 'p2', categoryId: '1', imageUrl: 'https://placehold.co/600x400.png', title: 'Lakeside Love', aiHint: 'couple lake', description: 'Romantic moment by the serene lake.' },
  { id: 'p3', categoryId: '2', imageUrl: 'https://placehold.co/600x400.png', title: 'Joyful Haldi', aiHint: 'haldi ceremony', description: 'A candid click from the vibrant Haldi ceremony.' },
  { id: 'p4', categoryId: '2', imageUrl: 'https://placehold.co/600x400.png', title: 'Haldi Blessings', aiHint: 'bride haldi', description: 'Bride being blessed during the Haldi ritual.' },
  { id: 'p5', categoryId: '3', imageUrl: 'https://placehold.co/600x400.png', title: 'Laughing Together', aiHint: 'couple laughing', description: 'A precious candid moment of the couple sharing a laugh.' },
  { id: 'p6', categoryId: '3', imageUrl: 'https://placehold.co/600x400.png', title: 'Stolen Glance', aiHint: 'wedding glance', description: 'A stolen glance between the bride and groom.' },
  { id: 'p7', categoryId: '4', imageUrl: 'https://placehold.co/600x400.png', title: 'First Dance', aiHint: 'wedding dance', description: 'The couple\'s magical first dance at the reception.' },
  { id: 'p8', categoryId: '4', imageUrl: 'https://placehold.co/600x400.png', title: 'Reception Glam', aiHint: 'reception decor', description: 'Elegant decor at the wedding reception.' },
  { id: 'p9', categoryId: '5', imageUrl: 'https://placehold.co/600x400.png', title: 'Sacred Vows', aiHint: 'wedding vows', description: 'Exchanging sacred vows during the wedding ceremony.' },
  { id: 'p10', categoryId: '5', imageUrl: 'https://placehold.co/600x400.png', title: 'Ritualistic Details', aiHint: 'wedding ritual', description: 'Close-up of important wedding rituals.' },
  { id: 'p11', categoryId: '1', imageUrl: 'https://placehold.co/600x400.png', title: 'Mountain Romance', aiHint: 'couple mountains', description: 'Pre-wedding shoot with a stunning mountain backdrop.' },
  { id: 'p12', categoryId: '3', imageUrl: 'https://placehold.co/600x400.png', title: 'Tears of Joy', aiHint: 'emotional wedding', description: 'An emotional candid moment from the wedding day.' },
];

export async function getCategories(): Promise<Category[]> {
  // Simulate API call
  return new Promise((resolve) => setTimeout(() => resolve(categories), 50));
}

export async function getPhotos(categoryId?: string): Promise<Photo[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPhotosWithCategoryNames = photos.map(p => ({
        ...p,
        categoryName: categories.find(c => c.id === p.categoryId)?.name || 'Unknown'
      }));
      if (categoryId) {
        resolve(allPhotosWithCategoryNames.filter((photo) => photo.categoryId === categoryId));
      } else {
        resolve(allPhotosWithCategoryNames);
      }
    }, 100);
  });
}

export async function getPhotoById(photoId: string): Promise<Photo | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const photo = photos.find(p => p.id === photoId);
            if (photo) {
                resolve({
                    ...photo,
                    categoryName: categories.find(c => c.id === photo.categoryId)?.name || 'Unknown'
                });
            } else {
                resolve(undefined);
            }
        }, 50);
    });
}
