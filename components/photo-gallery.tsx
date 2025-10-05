"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

interface PhotoGalleryProps {
  countryName: string;
  flagUrl: string;
}

export function PhotoGallery({ countryName, flagUrl }: PhotoGalleryProps) {
  // In a real app, this would fetch from a photo API
  const photos = [
    { id: 1, url: flagUrl, alt: `${countryName} landscape 1` },
    { id: 2, url: flagUrl, alt: `${countryName} landscape 2` },
    { id: 3, url: flagUrl, alt: `${countryName} landscape 3` },
    { id: 4, url: flagUrl, alt: `${countryName} landscape 4` },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Photo Gallery</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="group relative aspect-square overflow-hidden cursor-pointer hover:shadow-lg transition-all"
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover transition-transform group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
