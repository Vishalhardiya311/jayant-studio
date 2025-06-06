
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Category, Photo } from '@/lib/types';
import { getCategories, getPhotos } from '@/lib/data';
import CategoryTabs from '@/components/gallery/CategoryTabs';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import Lightbox from '@/components/gallery/Lightbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Camera, Smile, Users, Award, CalendarDays } from 'lucide-react';

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
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-10 w-1/2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-16">
      <section className="text-center py-12">
        <h1 className="text-5xl font-headline text-primary mb-6">Welcome to Jayant Studio</h1>
        <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Discover the art of wedding photography where every click tells a story of love, joy, and timeless moments. 
          We are passionate about capturing the essence of your special day with creativity and elegance.
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="#portfolio">View Our Work</Link>
        </Button>
      </section>

      <section id="introduction" className="py-12 bg-card rounded-lg p-8 shadow-lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-headline text-primary mb-6">Meet Jayant: Your Wedding Storyteller</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Hello! I'm Jayant, the heart and lens behind Jayant Studio. With years of experience and a deep passion for capturing genuine emotions, I specialize in creating wedding albums that are as unique and beautiful as your love story. My approach is personal and unobtrusive, allowing me to document the authentic moments that make your day truly yours.
            </p>
            <p className="text-lg text-muted-foreground">
              From the grandest celebrations to the most intimate elopements, I strive to create images that not only look stunning but also evoke the feelings and memories of your wedding day for years to come.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/600x450.png" 
              alt="Jayant, the photographer" 
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              data-ai-hint="photographer portrait"
            />
          </div>
        </div>
      </section>


      <section id="why-us" className="py-12 bg-muted/40 rounded-lg p-8">
        <h2 className="text-4xl font-headline text-center mb-10 text-primary">Why Choose Jayant Studio?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Heart className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Passionate Storytelling</h3>
            <p className="text-muted-foreground">We believe every wedding has a unique story. Our goal is to narrate yours through breathtaking images that you'll cherish forever.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Camera className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Artistic Vision</h3>
            <p className="text-muted-foreground">With a keen eye for detail and a love for creative composition, we craft photos that are not just pictures, but pieces of art.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Smile className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Personalized Experience</h3>
            <p className="text-muted-foreground">We work closely with you to understand your vision and preferences, ensuring a comfortable and enjoyable photography experience.</p>
          </div>
        </div>
      </section>
      
      <section id="portfolio" className="py-12">
        <h2 className="text-4xl font-headline text-center mb-4 text-primary">Our Portfolio</h2>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore a collection of cherished moments, beautifully captured across various wedding events. Each photograph is a testament to the love and joy we've had the honor to witness.
        </p>
        
        <CategoryTabs
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
      </section>

      <section id="services" className="py-12 bg-card rounded-lg p-8 shadow-lg">
        <h2 className="text-4xl font-headline text-center mb-10 text-primary">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Full Wedding Coverage</h3>
            <p className="text-muted-foreground">Comprehensive photography from pre-wedding preparations to the final send-off. We capture every significant moment.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Engagement Shoots</h3>
            <p className="text-muted-foreground">Beautiful and relaxed engagement sessions at a location of your choice, perfect for save-the-dates or just to celebrate your love.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
            <CalendarDays className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Custom Packages</h3>
            <p className="text-muted-foreground">Tailored packages to suit your specific needs, including destination weddings, elopements, and multi-day events.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-card p-8 md:p-12 rounded-lg shadow-lg">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-headline text-primary mb-6">Our Approach to Your Day</h2>
            <p className="text-lg text-muted-foreground mb-4">
              From the initial consultation to the final delivery of your beautifully edited photos, we are dedicated to providing a seamless and stress-free experience. We focus on capturing authentic emotions and candid moments, blending into the background to let your day unfold naturally.
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6 list-disc list-inside">
              <li>Understanding your unique style and preferences.</li>
              <li>Scouting locations and planning for the perfect shots.</li>
              <li>Using professional equipment for high-quality results.</li>
              <li>Delivering a stunning gallery of memories in a timely manner.</li>
            </ul>
            <Button size="lg" asChild className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
              <Link href="/admin">Learn More (Admin Link)</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/600x450.png" 
              alt="Photographer in action" 
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              data-ai-hint="photographer camera"
            />
          </div>
        </div>
      </section>

      <section className="text-center py-12 bg-muted/40 rounded-lg p-8">
        <h2 className="text-4xl font-headline text-primary mb-6">Ready to Create Magic Together?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          If you're looking for a wedding photographer who will capture your day with passion and artistry, we'd love to hear from you. Let's discuss your vision and how we can make your wedding memories last a lifetime.
        </p>
        <Button size="lg" variant="default" asChild>
          <Link href="/admin">Contact Us (Admin Link)</Link>
        </Button>
      </section>
      
      {currentPhoto && (
        <Lightbox
          photo={currentPhoto}
          isOpen={lightboxOpen}
          onClose={handleCloseLightbox}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
          hasNext={filteredPhotos.length > 1 && currentPhotoIndex < filteredPhotos.length -1}
          hasPrev={filteredPhotos.length > 1 && currentPhotoIndex > 0}
        />
      )}
    </div>
  );
}
