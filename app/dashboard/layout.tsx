import type React from "react"
import Sidebar from "@/components/dashboard/Sidebar"
import Header from "@/components/dashboard/Header"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-screen bg-transparent text-white">
      {/* Background Beams pushed to the background */}
      <div className="absolute inset-0 -z-10">
        <BackgroundBeams />
      </div>

      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">{children}</main>
      </div>
    </div>
  )
}