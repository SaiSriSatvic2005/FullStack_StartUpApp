import './globals.css'
import React from 'react'
import Navbar from '@/components/Navbar'
import { SonnerProvider } from '@/components/ui/sonner'
import { Toaster } from 'sonner'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <SonnerProvider />
        {children}
        <Toaster/>
      </body>
    </html>
  )
}
