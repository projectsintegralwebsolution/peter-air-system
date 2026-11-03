"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const applicationImages = [
  { id: 1, src: "/images/applications/cleanroom-application-1.jpg", alt: "Peter Air Systems Application Photo 1" },
  { id: 2, src: "/images/applications/cleanroom-application-2.jpg", alt: "Peter Air Systems Application Photo 2" },
  { id: 3, src: "/images/applications/cleanroom-application-3.jpg", alt: "Peter Air Systems Application Photo 3" },
  { id: 4, src: "/images/applications/cleanroom-application-4.jpg", alt: "Peter Air Systems Application Photo 4" },
  { id: 5, src: "/images/applications/cleanroom-application-5.jpg", alt: "Peter Air Systems Application Photo 5" },
];

export const LatestApplicationsGallery: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + applicationImages.length) % applicationImages.length
    );
  }, []);

  const goToNext = useCallback(() => {
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % applicationImages.length
    );
  }, []);

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow || "";
      document.body.style.paddingRight = originalPaddingRight || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLightboxIndex, closeLightbox, goToPrevious, goToNext]);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Only */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Our Latest Applications
          </h2>
          <div className="w-10 h-0.5 bg-[#D93636] mx-auto rounded-full mt-3" />
        </div>

        {/* Image-Only Gallery Grid
            - Desktop: 3 images in row 1, 2 images in row 2 (centered)
            - Tablet: 2 images per row
            - Mobile: 1 image per row
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
          {applicationImages.map((img, index) => {
            const gridClasses =
              index === 3
                ? "lg:col-span-2 lg:col-start-2 sm:col-span-1 sm:col-start-auto"
                : index === 4
                ? "lg:col-span-2 sm:col-span-2 sm:max-w-md sm:mx-auto lg:max-w-none lg:mx-0 w-full"
                : "lg:col-span-2 sm:col-span-1";

            return (
              <div
                key={img.id}
                onClick={() => openLightbox(index)}
                className={`${gridClasses} group relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 cursor-pointer bg-slate-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2`}
                role="button"
                tabIndex={0}
                aria-label={`View larger application photo ${img.id}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-brand-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/95 text-brand-950 shadow-lg backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 text-brand-900" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Image Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-[9999] bg-brand-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter & Close Button Only */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-brand-800/80 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="px-3 py-1 rounded bg-brand-900 text-xs font-mono font-bold text-cyan-300 border border-brand-700">
              {activeLightboxIndex + 1} / {applicationImages.length}
            </span>

            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors border border-white/15 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Central Image Display */}
          <div
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-3 sm:my-4 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3 rounded-full bg-brand-900/80 hover:bg-brand-800 text-white border border-brand-700 shadow-xl backdrop-blur-sm transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Current Large Uncropped Photo */}
            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={applicationImages[activeLightboxIndex].src}
                alt={applicationImages[activeLightboxIndex].alt}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3 rounded-full bg-brand-900/80 hover:bg-brand-800 text-white border border-brand-700 shadow-xl backdrop-blur-sm transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Bottom Thumbnails Navigation */}
          <div
            className="w-full max-w-6xl pt-3 border-t border-brand-800/80 flex items-center justify-center gap-3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {applicationImages.map((img, tIdx) => (
              <button
                key={img.id}
                onClick={() => setActiveLightboxIndex(tIdx)}
                aria-label={`Jump to photo ${img.id}`}
                className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  tIdx === activeLightboxIndex
                    ? "border-cyan-400 scale-105 shadow-md shadow-cyan-500/20"
                    : "border-brand-700 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
