
import type { Category, Photo } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Pre-Wedding', slug: 'pre-wedding' },
  { id: '2', name: 'Haldi Ceremony', slug: 'haldi-ceremony' },
  { id: '3', name: 'Candid Moments', slug: 'candid-moments' },
  { id: '4', name: 'Reception', slug: 'reception' },
  { id: '5', name: 'Wedding Rituals', slug: 'wedding-rituals' },
  { id: '6', name: 'Decor & Details', slug: 'decor-details'},
  { id: '7', name: 'Bridal Portraits', slug: 'bridal-portraits'},
];

export let photos: Photo[] = [ // Changed to let to allow modification by server actions
  { id: 'p1', categoryId: '1', imageUrl: 'https://placehold.co/600x400.png', title: 'Sunset Embrace', aiHint: 'couple sunset', description: 'A beautiful pre-wedding shot during golden hour.' },
  { id: 'p2', categoryId: '1', imageUrl: 'https://placehold.co/600x400.png', title: 'Lakeside Love', aiHint: 'couple lake', description: 'Romantic moment by the serene lake, reflecting their bond.' },
  { id: 'p3', categoryId: '2', imageUrl: 'https://placehold.co/600x400.png', title: 'Joyful Haldi Smear', aiHint: 'indian wedding haldi', description: 'A candid click from the vibrant Haldi ceremony, full of laughter.' },
  { id: 'p4', categoryId: '2', imageUrl: 'https://placehold.co/600x400.png', title: 'Haldi Blessings', aiHint: 'bride ceremony', description: 'Bride being showered with blessings and turmeric paste.' },
  { id: 'p5', categoryId: '3', imageUrl: 'https://placehold.co/600x400.png', title: 'Laughing Together', aiHint: 'couple laughing candid', description: 'A precious candid moment of the couple sharing a hearty laugh.' },
  { id: 'p6', categoryId: '3', imageUrl: 'https://placehold.co/600x400.png', title: 'Stolen Glance', aiHint: 'wedding couple emotional', description: 'A stolen, loving glance between the bride and groom during the rituals.' },
  { id: 'p7', categoryId: '4', imageUrl: 'https://placehold.co/600x400.png', title: 'First Dance Magic', aiHint: 'wedding dance couple', description: 'The couple\'s magical first dance under the sparkling lights of the reception.' },
  { id: 'p8', categoryId: '4', imageUrl: 'https://placehold.co/600x400.png', title: 'Reception Glamour', aiHint: 'wedding reception decor', description: 'Elegant decor and ambiance at the wedding reception.' },
  { id: 'p9', categoryId: '5', imageUrl: 'https://placehold.co/600x400.png', title: 'Sacred Vows Exchange', aiHint: 'wedding ceremony vows', description: 'Exchanging sacred vows, marking the beginning of a new journey.' },
  { id: 'p10', categoryId: '5', imageUrl: 'https://placehold.co/600x400.png', title: 'Ritualistic Details', aiHint: 'hindu wedding ritual', description: 'Close-up of important wedding rituals, rich in tradition.' },
  { id: 'p11', categoryId: '1', imageUrl: 'https://placehold.co/600x400.png', title: 'Mountain Romance', aiHint: 'couple mountains scenic', description: 'Pre-wedding shoot with a stunning mountain backdrop, showcasing epic love.' },
  { id: 'p12', categoryId: '3', imageUrl: 'https://placehold.co/600x400.png', title: 'Tears of Joy', aiHint: 'emotional wedding moment', description: 'An emotional candid moment, tears of happiness from the wedding day.' },
  { id: 'p13', categoryId: '6', imageUrl: 'https://placehold.co/600x400.png', title: 'Floral Archway', aiHint: 'wedding floral arch', description: 'Beautiful floral archway at the ceremony venue.' },
  { id: 'p14', categoryId: '6', imageUrl: 'https://placehold.co/600x400.png', title: 'Wedding Cake Detail', aiHint: 'wedding cake elegant', description: 'Close-up of the stunning multi-tiered wedding cake.' },
  { id: 'p15', categoryId: '7', imageUrl: 'https://placehold.co/600x400.png', title: 'Radiant Bride', aiHint: 'bride portrait beautiful', description: 'A stunning portrait of the bride in her wedding attire.' },
  { id: 'p16', categoryId: '7', imageUrl: 'https://placehold.co/600x400.png', title: 'Bridal Details', aiHint: 'bride jewelry dress', description: 'Close-up of the bride\'s intricate jewelry and dress details.' },
  { id: 'p17', categoryId: '4', imageUrl: 'https://placehold.co/600x400.png', title: 'Celebratory Toast', aiHint: 'wedding toast celebration', description: 'Guests raising a toast to the happy couple at the reception.' },
  { id: 'p18', categoryId: '5', imageUrl: 'https://placehold.co/600x400.png', title: 'Joining Hands', aiHint: 'wedding hands ceremony', description: 'The couple joining hands during a significant wedding ritual.' },
  { id: 'p19', categoryId: '1', imageUrl: 'https://placehold.co/600x400.png', title: 'Urban Love Story', aiHint: 'couple city street', description: 'A chic pre-wedding shoot on a city street.' },
  { id: 'p20', categoryId: '3', imageUrl: 'https://placehold.co/600x400.png', title: 'Playful Groom', aiHint: 'groom candid fun', description: 'A candid shot of the groom sharing a playful moment.' },
];

// Functions to interact with the in-memory data
// These simulate API calls and are modified by server actions

export async function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...categories]), 50));
}

export async function getPhotos(categoryId?: string): Promise<Photo[]> {
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
