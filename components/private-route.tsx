'use client'

import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthenticate } from '@/hooks/use-authenticate'
import NavigationBar from '@/components/navigation-bar'

function PrivateRoute({ children }: { children: ReactNode }) {
  const { email } = useAuthenticate()

  if (typeof window !== 'undefined' && !email) {
    redirect('/login')
  }

  return (
    <>
      <NavigationBar />
      <div className="w-full h-dvh min-w-0 overflow-auto p-4">
        <SidebarTrigger />
        {children}
      </div>
    </>
  )
}

export default PrivateRoute
