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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "relative bg-background rounded-lg shadow-lg w-full max-w-md md:max-w-lg overflow-hidden",
          "max-h-[90vh] animate-in fade-in zoom-in duration-300",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-lg font-semibold">{title}</h3>
           
          </div>
        )}


        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">{children}</div>
      </div>
    </div>
  )
}

export default Modal

