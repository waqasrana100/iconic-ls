"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

interface AdminModalProps {
    isOpen: boolean
    onClose: () => void
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-luxury-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-luxury-gold">Admin Dashboard</h2>
                <p className="mb-6 text-white">Do you want to go to the admin dashboard?</p>
                <div className="flex justify-end space-x-4">
                    <Button onClick={onClose} variant="outline">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => router.push("/admin/dashboard")}
                        className="bg-luxury-gold text-black hover:bg-luxury-gold/90"
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminModal

