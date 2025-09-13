"use client"
import React from "react"
import { Toaster, toast as sonnerToast } from "sonner"

export { sonnerToast as toast }

// Simple provider to include in your root layout
export function SonnerProvider() {
  return <Toaster position="top-right" richColors />
}
