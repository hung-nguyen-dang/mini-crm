'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import NavigationBar from '@/components/navigation-bar'

function PrivateRoute({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [email] = useLocalStorage('email', '')

  if (!email && typeof window !== 'undefined') {
    router.push('/login')
  }

  return (
    <SidebarProvider>
      <NavigationBar />
      <main className="w-full h-dvh min-w-0 overflow-auto p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default PrivateRoute
