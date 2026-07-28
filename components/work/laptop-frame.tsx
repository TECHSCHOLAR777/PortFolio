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
 *
 * The chassis keeps its own fixed greys rather than following the theme. A
 * laptop is a physical object in the photograph, and objects do not repaint
 * themselves when the page switches to light mode.
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
      <div className="rounded-t-xl border border-b-0 border-[#3a3a3d] bg-[#232326] p-2.5 shadow-lg sm:p-3">
        <div className="flex items-center gap-1.5 rounded-t-md bg-[#141416] px-3 py-2">
          <span className="size-2 rounded-full bg-[#4a4a4f]" />
          <span className="size-2 rounded-full bg-[#4a4a4f]" />
          <span className="size-2 rounded-full bg-[#4a4a4f]" />
        </div>
        <div className="overflow-hidden rounded-b-md bg-[#141416]">
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
      <div className="mx-auto h-3 rounded-b-xl border border-t-0 border-[#3a3a3d] bg-[#2c2c30]" />
      <div className="mx-auto h-1 w-1/4 rounded-b-lg bg-[#3a3a3d]" />
    </figure>
  )
}
