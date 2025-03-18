"use client"

import React from "react"
import { cn } from "../../lib/utils"

interface ModalProps {
  children: React.ReactNode
  closeModal: () => void
  title?: string
  className?: string
}

const Modal = ({ children, closeModal, title, className }: ModalProps) => {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  // Close modal when pressing Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [closeModal])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-7 rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
        </div>
        <div >{children}</div>
      </div>
    </div>
  )
}

export default Modal

