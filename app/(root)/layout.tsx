import '../globals.css'
import React from 'react'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        
        {children}
      </body>
    </html>
  )
}