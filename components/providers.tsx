import { AuthenticateProvider } from '@/hooks/use-authenticate'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ReactNode } from 'react'

function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthenticateProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AuthenticateProvider>
  )
}

export default Providers
