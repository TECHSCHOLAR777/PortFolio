import Image from 'next/image'

import { cn } from '@/lib/utils'

/**
 * Laptop shell for low resolution captures.
 *
 * The PT-JEPA retrieval capture is 788px wide. Displayed full bleed it would be
 * upscaled and visibly soft, so the screen area here is capped around 640 CSS
 * pixels: the source renders downscaled, which hides softness rather than
 * magnifying it. The frame also reads as "this is a running application"
 * without a caption having to say so.
 */
export function LaptopFrame({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  return (
    <figure className={cn('mx-auto w-full max-w-[680px]', className)}>
      <div className="border-steel-400/40 bg-steel-800 rounded-t-xl border border-b-0 p-2.5 shadow-lg sm:p-3">
        <div className="bg-steel-950 flex items-center gap-1.5 rounded-t-md px-3 py-2">
          <span className="bg-steel-600 size-2 rounded-full" />
          <span className="bg-steel-600 size-2 rounded-full" />
          <span className="bg-steel-600 size-2 rounded-full" />
        </div>
        <div className="bg-steel-950 overflow-hidden rounded-b-md">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 680px) 100vw, 640px"
            className="h-auto w-full"
          />
        </div>
      </div>
      {/* base and hinge */}
      <div className="bg-steel-700 border-steel-400/40 mx-auto h-3 rounded-b-xl border border-t-0" />
      <div className="bg-steel-600/60 mx-auto h-1 w-1/4 rounded-b-lg" />
    </figure>
  )
}
