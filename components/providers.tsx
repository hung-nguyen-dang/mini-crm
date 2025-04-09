'use client'
import { QueryClientProvider } from '@tanstack/react-query'

import { AuthenticateProvider } from '@/hooks/use-authenticate'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ReactNode } from 'react'
import { getQueryClient } from '@/lib/react-query'

function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticateProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthenticateProvider>
    </QueryClientProvider>
  )
}

export default Providers
