"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageForCarousel {
  src: string
  alt: string
  title?: string // Optional title for the image
}

interface ImageCarouselModalProps {
  images: ImageForCarousel[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ImageCarouselModal({ images, isOpen, onOpenChange }: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    // Reset index when modal opens/closes or images change
    if (!isOpen) {
      setCurrentIndex(0)
    }
  }, [isOpen, images])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const currentImage = images[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-center">{currentImage?.title || "Image Gallery"}</DialogTitle>
        </DialogHeader>
        <div className="relative flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 z-10 rounded-full bg-white/50 hover:bg-white/70"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="relative h-[20rem] w-full overflow-hidden rounded-md md:h-[25rem] lg:h-[30rem]">
            {currentImage && (
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                fill
                className="object-contain"
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 z-10 rounded-full bg-white/50 hover:bg-white/70"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4 pt-0 text-center text-sm text-gray-500">
          {currentIndex + 1} / {images.length}
        </div>
      </DialogContent>
    </Dialog>
  )
}
