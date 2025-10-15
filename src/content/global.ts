export const whatsAppHref = "https://wa.me/6282221000061";

export const anchorNavItems = [
  { anchor: "hero", label: { id: "Beranda", en: "Home" } },
  { anchor: "highlights", label: { id: "Sorotan", en: "Highlights" } },
  { anchor: "how", label: { id: "Cara", en: "How It Works" } },
  { anchor: "outcomes", label: { id: "Hasil", en: "Outcomes" } },
  { anchor: "gallery", label: { id: "Galeri", en: "Gallery" } },
  { anchor: "testimonials", label: { id: "Testimoni", en: "Testimonials" } },
  { anchor: "faq", label: { id: "FAQ", en: "FAQ" } },
  { anchor: "contact", label: { id: "Kontak", en: "Contact" } },
] as const;

export const stickyCta = {
  label: { id: "Chat WhatsApp", en: "WhatsApp Chat" },
  href: whatsAppHref,
};

export const chatConfig = {
  webhookUrl: "https://n8n-new.chiefaiofficer.id/webhook/websitechat",
  intro: {
    id: "Hai! Tanyakan apa pun tentang Clevio.",
    en: "Hi! Ask us anything about Clevio.",
  },
};
