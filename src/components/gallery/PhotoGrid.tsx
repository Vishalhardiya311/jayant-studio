"use client";

import type { Photo } from '@/lib/types';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  if (photos.length === 0) {
    return <p className="text-center text-muted-foreground text-lg">No photos found in this category.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo, index) => (
        <PhotoCard 
          key={photo.id} 
          photo={photo} 
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
}
