'use client';

import { useEffect, useState } from 'react';

import {
  LanguageProvider,
  PageHeader,
  HeroSection,
  IconCardGrid,
  StepStrip,
  BeforeAfterGrid,
  GallerySlider,
  TestimonialSlider,
  FAQSection,
  FloatingChatButton,
  StickyCtaBar,
  ContactSection,
} from '@/components/site';
import { anchorNavItems, chatConfig, stickyCta } from '@/content/global';
import { campContent } from '@/content/camp';

export default function InnovatorCampPage() {
  const [content, setContent] = useState<typeof campContent>(campContent);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch('/api/program-pages/INNOVATOR_CAMP');
        if (!response.ok) return;
        const payload = await response.json();
        if (active && payload?.data) {
          setContent(payload.data as typeof campContent);
        }
      } catch (error) {
        console.warn('Failed to load Innovator Camp content', error);
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
          title={{ id: 'Sorotan Program', en: 'Program Highlights' }}
          items={content.highlights}
          accentColor="from-orange-50 to-white"
        />
        <StepStrip
          id="how"
          title={{ id: 'Cara Bergabung', en: 'How It Works' }}
          steps={content.howItWorks}
          columns={3}
        />
        <BeforeAfterGrid
          id="outcomes"
          title={{ id: 'Hasil yang Didapat', en: 'What Students Achieve' }}
          items={content.outcomes}
        />
        <GallerySlider
          id="gallery"
          title={{ id: 'Galeri Kegiatan', en: 'Program Gallery' }}
          slides={content.gallery}
        />
        <TestimonialSlider
          id="testimonials"
          title={{ id: 'Cerita Peserta', en: 'Participant Stories' }}
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
      <StickyCtaBar label={stickyCta.label} href={stickyCta.href} />
    </LanguageProvider>
  );
}
