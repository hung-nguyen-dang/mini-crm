'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Breadcrumbs() {
  const pathName = usePathname()

  const crumb = useMemo(() => {
    if (pathName === '/') return null

    if (pathName === '/customers/new') {
      return (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Add Customer</BreadcrumbItem>
        </>
      )
    }
    return (
      <>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Customer Details - {pathName.split('/').pop()}</BreadcrumbItem>
      </>
    )
  }, [pathName])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <SidebarTrigger />
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumb}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
