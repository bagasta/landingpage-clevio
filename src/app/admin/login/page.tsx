import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { AdminLoginForm } from '@/components/admin/login-form'

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-[#f6f7fb] to-[#e9ecf5] px-6 py-16">
      <AdminLoginForm />
    </div>
  )
}
