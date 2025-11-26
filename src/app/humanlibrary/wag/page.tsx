import { redirect } from "next/navigation";

const TARGET_URL =
  "https://chat.whatsapp.com/KLbeWOV6IRi9vbBxAHSnWn";

export default function HumanLibraryWAGRedirectPage() {
  redirect(TARGET_URL);
}
