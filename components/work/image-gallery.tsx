'use client'

import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { LaptopFrame } from '@/components/work/laptop-frame'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { ProjectImage } from '@/content/projects'

/**
 * Wide, text dense diagrams need pan and zoom, not swiping. Putting the
 * architecture diagram in a carousel slot would shrink it to illegibility and
 * then take away the only gesture that could recover it.
 */
function DiagramViewer({ image }: { image: ProjectImage }) {
  const [zoom, setZoom] = useState(1)

  return (
    <figure className="border-border bg-muted/30 overflow-hidden rounded-lg border">
      <Dialog onOpenChange={(open) => !open && setZoom(1)}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative block w-full cursor-zoom-in"
            aria-label="Open the diagram full screen"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="h-auto w-full"
              priority
            />
            <span className="bg-background/80 text-foreground absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Maximize2 className="size-3.5" />
              Expand
            </span>
          </button>
        </DialogTrigger>

        <DialogContent className="max-h-[92vh] w-[96vw] max-w-[96vw] overflow-hidden p-0 sm:max-w-[96vw]">
          <DialogTitle className="sr-only">{image.alt}</DialogTitle>

          <div className="bg-background/90 absolute top-3 left-3 z-10 flex gap-1 rounded-md p-1 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
              aria-label="Zoom out"
              disabled={zoom <= 1}
            >
              <ZoomOut className="size-4" />
            </Button>
            <span className="tabular text-muted-foreground self-center px-1 text-xs">
              {zoom.toFixed(1)}x
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom((z) => Math.min(4, z + 0.5))}
              aria-label="Zoom in"
              disabled={zoom >= 4}
            >
              <ZoomIn className="size-4" />
            </Button>
          </div>

          <div className="max-h-[92vh] overflow-auto p-2">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="96vw"
              className="h-auto origin-top-left transition-transform duration-200"
              style={{ width: `${zoom * 100}%`, maxWidth: 'none' }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <figcaption className="text-muted-foreground border-border border-t px-4 py-3 text-center text-xs">
        {image.alt}
      </figcaption>
    </figure>
  )
}

function Lightbox({ image }: { image: ProjectImage }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="border-border bg-muted/30 block w-full cursor-zoom-in overflow-hidden rounded-lg border"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1024px) 100vw, 900px"
            className="h-auto w-full"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[94vw] max-w-[94vw] overflow-auto p-2 sm:max-w-[94vw]">
        <DialogTitle className="sr-only">{image.alt}</DialogTitle>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="94vw"
          className="h-auto w-full"
        />
      </DialogContent>
    </Dialog>
  )
}

export function ImageGallery({ images }: { images: ProjectImage[] }) {
  if (images.length === 0) return null

  const diagrams = images.filter((i) => i.kind === 'diagram')
  const framed = images.filter((i) => i.frame === 'laptop')
  const rest = images.filter((i) => i.kind !== 'diagram' && i.frame !== 'laptop')

  return (
    <div className="space-y-12">
      {diagrams.map((image) => (
        <DiagramViewer key={image.src} image={image} />
      ))}

      {framed.map((image) => (
        <div key={image.src}>
          <LaptopFrame src={image.src} alt={image.alt} width={image.width} height={image.height} />
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-center text-xs">
            {image.alt}
          </p>
        </div>
      ))}

      {rest.length > 0 ? (
        <Carousel className="mx-auto w-full max-w-3xl" opts={{ loop: rest.length > 1 }}>
          <CarouselContent>
            {rest.map((image) => (
              <CarouselItem key={image.src}>
                <Lightbox image={image} />
                <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-center text-xs">
                  {image.alt}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          {rest.length > 1 ? (
            <>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </>
          ) : null}
        </Carousel>
      ) : null}
    </div>
  )
}
