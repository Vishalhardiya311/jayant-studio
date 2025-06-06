"use client";

import Image from 'next/image';
import type { Photo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Maximize } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
  className?: string;
}

export default function PhotoCard({ photo, onClick, className }: PhotoCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group animate-fadeIn",
        className
      )}
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 0.3}s` }} // Staggered fade-in
    >
      <CardContent className="p-0 relative aspect-square">
        <Image
          src={photo.imageUrl}
          alt={photo.title || 'Wedding photo'}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={photo.aiHint || "wedding photography"}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Maximize className="h-10 w-10 text-white" />
        </div>
        {photo.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-white text-lg font-semibold truncate">{photo.title}</h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
