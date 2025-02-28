"use client"

import { Modal } from "./modal"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full bg-black rounded-lg overflow-hidden shadow-2xl">
        <div className="relative aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={isOpen ? "https://www.youtube.com/embed/55RieJwCRps?autoplay=1" : ""}
            title="CustomBroker Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        </div>
      </div>
    </Modal>
  )
}

