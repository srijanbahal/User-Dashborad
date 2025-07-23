"use client"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function CustomSidebarTrigger() {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
      aria-label="Toggle Sidebar"
    >
      <div className="relative w-4 h-4">
        <Menu
          className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
            state === "collapsed" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
          }`}
        />
        <X
          className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
            state === "expanded" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </div>
    </Button>
  )
}
