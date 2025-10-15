'use client';

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
  return (
    <LanguageProvider defaultLocale="id">
      <PageHeader items={anchorNavItems} />
      <main>
        <HeroSection {...innovatorProContent.hero} />
        <IconCardGrid
          id="highlights"
          title={{ id: 'Sorotan Layanan', en: 'Service Highlights' }}
          items={innovatorProContent.highlights}
          accentColor="from-slate-100 to-white"
        />
        <StepStrip
          id="how"
          title={{ id: 'Pendekatan Implementasi', en: 'Implementation Approach' }}
          steps={innovatorProContent.howItWorks}
          columns={4}
        />
        <ImageTileGrid
          id="tracks"
          title={{ id: 'Track & Modul', en: 'Tracks & Modules' }}
          items={innovatorProContent.tracks}
        />
        <BeforeAfterGrid
          id="outcomes"
          title={{ id: 'Dampak yang Dicapai', en: 'Outcomes Delivered' }}
          items={innovatorProContent.outcomes}
        />
        <GallerySlider
          id="gallery"
          title={{ id: 'Galeri Program', en: 'Program Gallery' }}
          slides={innovatorProContent.gallery}
        />
        <TestimonialSlider
          id="testimonials"
          title={{ id: 'Cerita Klien', en: 'Client Stories' }}
          items={innovatorProContent.testimonials}
        />
        <FAQSection
          id="faq"
          title={{ id: 'Pertanyaan Umum', en: 'Frequently Asked Questions' }}
          items={innovatorProContent.faq}
        />
        <ContactSection {...innovatorProContent.contact} />
      </main>
      <FloatingChatButton webhookUrl={chatConfig.webhookUrl} intro={chatConfig.intro} />
      <StickyCtaBar label={stickyCta.label} href={stickyCta.href} />
    </LanguageProvider>
  );
}
