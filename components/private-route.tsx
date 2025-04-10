'use client'

import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { useAuthenticate } from '@/hooks/use-authenticate'
import NavigationBar from '@/components/navigation-bar'
import Breadcrumb from '@/components/breadcrumb'

function PrivateRoute({ children }: { children: ReactNode }) {
  const { email } = useAuthenticate()

  if (typeof window !== 'undefined' && !email) {
    redirect('/login')
  }

  return (
    <>
      <NavigationBar />
      <div className="w-full h-dvh min-w-0 overflow-auto p-4 flex flex-col gap-4">
        <Breadcrumb />
        {children}
      </div>
    </>
  )
}

export default PrivateRoute
