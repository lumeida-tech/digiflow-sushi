"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SushiItem {
  id: string
  name: string
  image: string
  description: string
  carouselImages: string[] // Still keep this for data, but not used directly in this component
}

interface SushiCardProps {
  item: SushiItem
  className?: string
}

export function SushiCard({ item, className }: SushiCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Card
      className={cn(
        "flex-none bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        // Adjusted width classes: from w-[384px] to w-[280px] (md:w-[280px] xl:w-[320px])
        "w-[240px] md:w-[280px] xl:w-[320px]",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={384} // Keep original width for image itself, object-cover will handle fitting
          height={160}
          className="w-full h-40 object-cover transition-all duration-300"
        />
        {/* Overlay for blur - no button here anymore */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300",
            isHovered ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none",
          )}
        >
          {/* No button here */}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold mb-2 text-gray-900">{item.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{item.description}</CardDescription>
      </CardContent>
    </Card>
  )
}
