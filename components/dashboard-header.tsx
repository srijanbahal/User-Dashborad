"use client"

import { Bell, Search, Settings, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  toggleSidebar: () => void
  sidebarOpen: boolean
}

export function DashboardHeader({ toggleSidebar, sidebarOpen }: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-10 w-10 hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="relative w-5 h-5">
            <Menu
              className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                sidebarOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                sidebarOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </div>
        </Button>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center text-sm text-gray-600">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">User Management</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-80 pl-10 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">3</Badge>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
