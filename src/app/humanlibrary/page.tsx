import { redirect } from "next/navigation";

const TARGET_URL =
  "https://notebooklm.google.com/notebook/dfe19997-161c-4af2-87d7-cef3dfe0951b";

export default function HumanLibraryRedirectPage() {
  redirect(TARGET_URL);
}
