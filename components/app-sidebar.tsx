"use client"

import { useState } from "react"
import {
  Users,
  Settings,
  BarChart3,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  User,
  Home,
  Database,
  FileText,
  Calendar,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SettingsDialog } from "@/components/settings-dialog"

const navigationItems = [
  { title: "Dashboard", icon: Home, isActive: false },
  { title: "User Management", icon: Users, isActive: true },
  { title: "Analytics", icon: BarChart3, isActive: false },
  { title: "Reports", icon: FileText, isActive: false },
  { title: "Database", icon: Database, isActive: false },
  { title: "Calendar", icon: Calendar, isActive: false },
]

const systemItems = [
  { title: "Security", icon: Shield },
  { title: "Notifications", icon: Bell },
  { title: "Settings", icon: Settings },
  { title: "Help & Support", icon: HelpCircle },
]

export function AppSidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AdminPanel</h1>
            <p className="text-sm text-gray-500">User Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-8">
        {/* Main Navigation */}
        <div>
          <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main Navigation</h2>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.title}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  item.isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        {/* System */}
        <div>
          <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">System</h2>
          <nav className="space-y-1">
            {systemItems.map((item) => (
              <button
                key={item.title}
                onClick={item.title === "Settings" ? () => setIsSettingsOpen(true) : undefined}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-3 h-auto">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@company.com</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  )
}
