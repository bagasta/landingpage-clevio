'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="rounded-full border border-[#1c2974]/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
    >
      Keluar
    </button>
  )
}
