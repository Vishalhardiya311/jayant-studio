"use client";

import Image from 'next/image';
import type { Photo } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect } from 'react';

interface LightboxProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Lightbox({ photo, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight' && hasNext) onNext();
      if (event.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!photo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 bg-background/90 backdrop-blur-md border-none shadow-2xl !rounded-lg">
        <div className="relative aspect-[16/10] w-full">
           <Image
            src={photo.imageUrl}
            alt={photo.title || 'Wedding photo'}
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg"
            data-ai-hint={photo.aiHint || "wedding photography"}
          />
          {hasPrev && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white h-12 w-12"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white h-12 w-12"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}
           <DialogClose asChild>
             <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white h-10 w-10"
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </Button>
           </DialogClose>
        </div>
        {(photo.title || photo.description) && (
          <div className="p-6">
            {photo.title && <DialogTitle className="text-2xl font-headline mb-2 text-foreground">{photo.title}</DialogTitle>}
            {photo.description && <DialogDescription className="text-base text-muted-foreground">{photo.description}</DialogDescription>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
