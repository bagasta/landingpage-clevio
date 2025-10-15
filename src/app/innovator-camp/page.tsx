'use client';

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
  return (
    <LanguageProvider defaultLocale="id">
      <PageHeader items={anchorNavItems} />
      <main>
        <HeroSection {...campContent.hero} />
        <IconCardGrid
          id="highlights"
          title={{ id: 'Sorotan Program', en: 'Program Highlights' }}
          items={campContent.highlights}
          accentColor="from-orange-50 to-white"
        />
        <StepStrip
          id="how"
          title={{ id: 'Cara Bergabung', en: 'How It Works' }}
          steps={campContent.howItWorks}
          columns={3}
        />
        <BeforeAfterGrid
          id="outcomes"
          title={{ id: 'Hasil yang Didapat', en: 'What Students Achieve' }}
          items={campContent.outcomes}
        />
        <GallerySlider
          id="gallery"
          title={{ id: 'Galeri Kegiatan', en: 'Program Gallery' }}
          slides={campContent.gallery}
        />
        <TestimonialSlider
          id="testimonials"
          title={{ id: 'Cerita Peserta', en: 'Participant Stories' }}
          items={campContent.testimonials}
        />
        <FAQSection
          id="faq"
          title={{ id: 'Pertanyaan Umum', en: 'Frequently Asked Questions' }}
          items={campContent.faq}
        />
        <ContactSection {...campContent.contact} />
      </main>
      <FloatingChatButton webhookUrl={chatConfig.webhookUrl} intro={chatConfig.intro} />
      <StickyCtaBar label={stickyCta.label} href={stickyCta.href} />
    </LanguageProvider>
  );
}
