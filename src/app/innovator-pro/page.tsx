'use client';

import { useEffect, useState } from 'react';

import {
  LanguageProvider,
  PageHeader,
  HeroSection,
  IconCardGrid,
  StepStrip,
  ImageTileGrid,
  BeforeAfterGrid,
  GallerySlider,
  TestimonialSlider,
  FAQSection,
  FloatingChatButton,
  StickyCtaBar,
  ContactSection,
} from '@/components/site';
import { anchorNavItems, chatConfig, stickyCta } from '@/content/global';
import { innovatorProContent } from '@/content/innovator-pro';

export default function InnovatorProPage() {
  const [content, setContent] = useState<typeof innovatorProContent>(innovatorProContent);
  const stickyTarget = content.contact?.cta ?? stickyCta;

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch('/api/program-pages/INNOVATOR_PRO');
        if (!response.ok) return;
        const payload = await response.json();
        if (active && payload?.data) {
          setContent(payload.data as typeof innovatorProContent);
        }
      } catch (error) {
        console.warn('Failed to load Innovator Pro content', error);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <LanguageProvider defaultLocale="id">
      <PageHeader items={anchorNavItems} />
      <main>
        <HeroSection {...content.hero} />
        <IconCardGrid
          id="highlights"
          title={{ id: 'Sorotan Layanan', en: 'Service Highlights' }}
          items={content.highlights}
          accentColor="from-slate-100 to-white"
        />
        <StepStrip
          id="how"
          title={{ id: 'Pendekatan Implementasi', en: 'Implementation Approach' }}
          steps={content.howItWorks}
          columns={4}
        />
        <ImageTileGrid
          id="tracks"
          title={{ id: 'Track & Modul', en: 'Tracks & Modules' }}
          items={content.tracks}
        />
        <BeforeAfterGrid
          id="outcomes"
          title={{ id: 'Dampak yang Dicapai', en: 'Outcomes Delivered' }}
          items={content.outcomes}
        />
        <GallerySlider
          id="gallery"
          title={{ id: 'Galeri Program', en: 'Program Gallery' }}
          slides={content.gallery}
        />
        <TestimonialSlider
          id="testimonials"
          title={{ id: 'Cerita Klien', en: 'Client Stories' }}
          items={content.testimonials}
        />
        <FAQSection
          id="faq"
          title={{ id: 'Pertanyaan Umum', en: 'Frequently Asked Questions' }}
          items={content.faq}
        />
        <ContactSection {...content.contact} />
      </main>
      <FloatingChatButton webhookUrl={chatConfig.webhookUrl} intro={chatConfig.intro} />
      <StickyCtaBar label={stickyTarget.label} href={stickyTarget.href} />
    </LanguageProvider>
  );
}
