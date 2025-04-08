import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarHeader,
} from '@/components/ui/sidebar'

function NavigationBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 font-[family-name:var(--font-geist-mono)] font-semibold">
        Mini CRM
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <HomeIcon /> Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default NavigationBar
