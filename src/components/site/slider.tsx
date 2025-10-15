"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { LocalizedString, useLocale, t } from "./localization";

interface Slide {
  src: string;
  alt: LocalizedString;
}

export function GallerySlider({ id, title, slides }: { id: string; title: LocalizedString; slides: Slide[] }) {
  const { locale } = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    handleSelect();
    emblaApi.on("select", handleSelect);
  }, [emblaApi, handleSelect]);

  return (
    <section id={id} className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900">{t(title, locale)}</h2>
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, idx) => (
              <figure key={idx} className="relative min-w-0 flex-[0_0_100%]">
                <Image
                  src={slide.src}
                  alt={t(slide.alt, locale)}
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover"
                  priority={idx === 0}
                />
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            aria-label={locale === "en" ? "Previous slide" : "Slide sebelumnya"}
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`h-2 w-2 rounded-full transition ${selectedIndex === idx ? "bg-slate-900" : "bg-slate-300"}`}
                aria-label={`${locale === "en" ? "Slide" : "Slide"} ${idx + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            aria-label={locale === "en" ? "Next slide" : "Slide berikutnya"}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
