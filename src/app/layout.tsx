'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {SessionProvider} from 'next-auth/react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Analyst mimic',
  description: 'Redirects to app-admin',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
