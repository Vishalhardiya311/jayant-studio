"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Category, Photo } from '@/lib/types';
import { getCategories, getPhotos } from '@/lib/data';
import CategoryTabs from '@/components/gallery/CategoryTabs';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import Lightbox from '@/components/gallery/Lightbox';
import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [fetchedCategories, fetchedPhotos] = await Promise.all([
          getCategories(),
          getPhotos(),
        ]);
        setCategories(fetchedCategories);
        setAllPhotos(fetchedPhotos);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Optionally, set an error state and display an error message
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!selectedCategoryId) return allPhotos;
    return allPhotos.filter(photo => photo.categoryId === selectedCategoryId);
  }, [allPhotos, selectedCategoryId]);

  const handlePhotoClick = (photo: Photo) => {
    const indexInFiltered = filteredPhotos.findIndex(p => p.id === photo.id);
    setCurrentPhoto(photo);
    setCurrentPhotoIndex(indexInFiltered);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setCurrentPhoto(null);
  };

  const handleNextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    setCurrentPhoto(filteredPhotos[nextIndex]);
    setCurrentPhotoIndex(nextIndex);
  };

  const handlePrevPhoto = () => {
    const prevIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentPhoto(filteredPhotos[prevIndex]);
    setCurrentPhotoIndex(prevIndex);
  };
  
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center">
          <Skeleton className="h-10 w-1/2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-4xl font-headline text-center mb-4 text-primary">Our Portfolio</h2>
      <p className="text-xl text-center text-muted-foreground mb-12">
        Explore a collection of cherished moments, beautifully captured.
      </p>
      
      <CategoryTabs
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
      
      {currentPhoto && (
        <Lightbox
          photo={currentPhoto}
          isOpen={lightboxOpen}
          onClose={handleCloseLightbox}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
          hasNext={currentPhotoIndex < filteredPhotos.length - 1}
          hasPrev={currentPhotoIndex > 0}
        />
      )}
    </div>
  );
}
