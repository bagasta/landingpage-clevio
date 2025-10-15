'use client';

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
  return (
    <LanguageProvider defaultLocale="id">
      <PageHeader items={anchorNavItems} />
      <main>
        <HeroSection {...aiAssistantsContent.hero} />
        <IconCardGrid
          id="highlights"
          title={{ id: 'Sorotan Utama', en: 'Key Highlights' }}
          items={aiAssistantsContent.highlights}
          accentColor="from-cyan-50 to-white"
        />
        <ImageTileGrid
          id="outcomes"
          title={{ id: 'Contoh Kegunaan', en: 'Popular Use Cases' }}
          items={aiAssistantsContent.useCases}
        />
        <StepStrip
          id="how"
          title={{ id: 'Cara Kerja', en: 'How It Works' }}
          steps={aiAssistantsContent.howItWorks}
          columns={3}
        />
        <InfographicRow
          id="benefits"
          title={{ id: 'Yang Anda Dapatkan', en: 'What You Get' }}
          items={aiAssistantsContent.whatYouGet}
          accentColor="from-cyan-600 via-blue-600 to-cyan-700"
        />
        <GallerySlider
          id="gallery"
          title={{ id: 'Galeri Produk', en: 'Product Gallery' }}
          slides={aiAssistantsContent.gallery}
        />
        <TestimonialSlider
          id="testimonials"
          title={{ id: 'Apa Kata Pengguna', en: 'Customer Voices' }}
          items={aiAssistantsContent.testimonials}
        />
        <FAQSection
          id="faq"
          title={{ id: 'Pertanyaan Umum', en: 'Frequently Asked Questions' }}
          items={aiAssistantsContent.faq}
        />
        <ContactSection {...aiAssistantsContent.contact} />
      </main>
      <FloatingChatButton webhookUrl={chatConfig.webhookUrl} intro={chatConfig.intro} />
      <StickyCtaBar label={stickyCta.label} href={stickyCta.href} />
    </LanguageProvider>
  );
}
