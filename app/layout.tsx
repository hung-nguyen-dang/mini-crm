import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mini CRM',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          <Providers>{children}</Providers>
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
