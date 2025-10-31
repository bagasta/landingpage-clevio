'use client';

import { useEffect, useState } from 'react';

import {
  LanguageProvider,
  PageHeader,
  HeroSection,
  IconCardGrid,
  ImageTileGrid,
  StepStrip,
  InfographicRow,
  GallerySlider,
  TestimonialSlider,
  FAQSection,
  FloatingChatButton,
  StickyCtaBar,
  ContactSection,
} from '@/components/site';
import { anchorNavItems, chatConfig, stickyCta } from '@/content/global';
import { aiAssistantsContent } from '@/content/ai-assistants';

export default function AIAssistantsPage() {
  const [content, setContent] = useState<typeof aiAssistantsContent>(aiAssistantsContent);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch('/api/program-pages/AI_ASSISTANTS');
        if (!response.ok) return;
        const payload = await response.json();
        if (active && payload?.data) {
          setContent(payload.data as typeof aiAssistantsContent);
        }
      } catch (error) {
        console.warn('Failed to load AI Assistants content', error);
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
          title={{ id: 'Sorotan Utama', en: 'Key Highlights' }}
          items={content.highlights}
          accentColor="from-cyan-50 to-white"
        />
        <ImageTileGrid
          id="outcomes"
          title={{ id: 'Contoh Kegunaan', en: 'Popular Use Cases' }}
          items={content.useCases}
        />
        <StepStrip
          id="how"
          title={{ id: 'Cara Kerja', en: 'How It Works' }}
          steps={content.howItWorks}
          columns={3}
        />
        <InfographicRow
          id="benefits"
          title={{ id: 'Yang Anda Dapatkan', en: 'What You Get' }}
          items={content.whatYouGet}
          accentColor="from-cyan-600 via-blue-600 to-cyan-700"
        />
        <GallerySlider
          id="gallery"
          title={{ id: 'Galeri Produk', en: 'Product Gallery' }}
          slides={content.gallery}
        />
        <TestimonialSlider
          id="testimonials"
          title={{ id: 'Apa Kata Pengguna', en: 'Customer Voices' }}
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
