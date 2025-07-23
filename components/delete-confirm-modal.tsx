"use client"

import { AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/components/user-dashboard"

interface DeleteConfirmModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({ user, isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user account and remove all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{user.name}</span>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <p className="text-sm text-destructive font-medium">⚠️ Warning: This action is irreversible</p>
            <p className="text-sm text-muted-foreground mt-1">
              All user data, permissions, and history will be permanently removed from the system.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Delete User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
