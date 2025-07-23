"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserTable } from "@/components/user-table"
import { UserModal } from "@/components/user-modal"
import { UserFormModal } from "@/components/user-form-modal"
import { DeleteConfirmModal } from "@/components/delete-confirm-modal"

export interface User {
  id: number
  name: string
  email: string
  role: "Admin" | "Editor" | "Viewer"
  phone: string
  address: string
  password: string
  status: "Active" | "Inactive"
  lastLogin: string
  createdAt: string
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "Srijan Bahal",
    email: "BlahBlahh@company.com",
    role: "Admin",
    phone: "+91 1385928794",
    address: "New Delhi, India",
    password: "password123",
    status: "Active",
    lastLogin: "2024-01-15 10:30 AM",
    createdAt: "2023-06-15",
  },
  {
    id: 2,
    name: "ramu shyam",
    email: "ramu123@gmail.com",
    role: "Editor",
    phone: "+91 1234567890",
    address: "barely, UP",
    password: "password456",
    status: "Active",
    lastLogin: "2024-01-14 2:15 PM",
    createdAt: "2023-08-22",
  },
  {
    id: 3,
    name: "Aastha Kumari",
    email: "aastha123@gmail.com",
    role: "Viewer",
    phone: "+91 987324552",
    address: "Agra,UP",
    password: "password789",
    status: "Inactive",
    lastLogin: "2024-01-10 9:45 AM",
    createdAt: "2023-09-10",
  },
  // {
  //   id: 4,
  //   name: "Sarah Wilson",
  //   email: "sarah.wilson@company.com",
  //   role: "Editor",
  //   phone: "+1 (555) 321-0987",
  //   address: "321 Elm St, Miami, FL 33101",
  //   password: "password321",
  //   status: "Active",
  //   lastLogin: "2024-01-15 11:20 AM",
  //   createdAt: "2023-07-05",
  // },
  {
    id: 5,
    name: "Bhagwan Das",
    email: "Bhagwan123@gmail.com",
    role: "Viewer",
    phone: "+91 987324552",
    address: "Ludhiana, Punjab",
    password: "password654",
    status: "Active",
    lastLogin: "2024-01-13 4:30 PM",
    createdAt: "2023-10-18",
  },
]

export function UserDashboard() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeleteingUser] = useState<User | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsFormModalOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setDeleteingUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleAddUser = () => {
    setEditingUser(null)
    setIsFormModalOpen(true)
  }

  const handleSaveUser = (userData: Omit<User, "id" | "status" | "lastLogin" | "createdAt">) => {
    if (editingUser) {
      // Edit existing user
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...userData } : user)))
    } else {
      // Add new user
      const newUser: User = {
        ...userData,
        id: Math.max(...users.map((u) => u.id)) + 1,
        status: "Active",
        lastLogin: "Never",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, newUser])
    }
    setIsFormModalOpen(false)
    setEditingUser(null)
  }

  const handleConfirmDelete = () => {
    if (deletingUser) {
      setUsers(users.filter((user) => user.id !== deletingUser.id))
      setIsDeleteModalOpen(false)
      setDeleteingUser(null)
    }
  }

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    admins: users.filter((u) => u.role === "Admin").length,
    editors: users.filter((u) => u.role === "Editor").length,
    viewers: users.filter((u) => u.role === "Viewer").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">{((stats.active / stats.total) * 100).toFixed(1)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admins}</div>
            <p className="text-xs text-muted-foreground">System administrators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Editors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.editors}</div>
            <p className="text-xs text-muted-foreground">Content management</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage your team members and their account permissions here.</CardDescription>
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UserTable users={users} onView={handleViewUser} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        </CardContent>
      </Card>

      {/* Modals */}
      <UserModal user={selectedUser} isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />

      <UserFormModal
        user={editingUser}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveUser}
      />

      <DeleteConfirmModal
        user={deletingUser}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
