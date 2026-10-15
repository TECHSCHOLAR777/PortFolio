'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { LatentMap } from '@/components/work/latent-map'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { featuredProjects, type Project } from '@/content/projects'

/**
 * Cover for a project with no screenshot: its headline numbers, set large on
 * caution tape, read straight from the eval rows so nothing is restated.
 */
function ScorePlate({ project }: { project: Project }) {
  const [lead, ...rest] = project.evals
  return (
    <Link
      href={`/work/${project.slug}`}
      className="border-line-strong bg-background hover:border-signal group mt-8 block overflow-hidden border-2 transition-colors"
    >
      <div aria-hidden className="hazard-tape h-3" />
      <div className="grid aspect-[16/9] place-items-center px-6 py-10">
        <div>
          <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
            {lead.metric}
          </p>
          <p className="text-signal mt-2 font-[family-name:var(--font-display)] text-6xl leading-none uppercase sm:text-8xl">
            {lead.value}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {rest.slice(0, 3).map((row) => (
              <div key={row.metric}>
                <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
                  {row.value}
                </p>
                <p className="text-muted-foreground mt-1 font-mono text-[10px] tracking-widest uppercase">
                  {row.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden className="hazard-tape h-3" />
    </Link>
  )
}

/**
 * The list is the default and the map is opt in.
 *
 * A recruiter scans a list. The map is the more interesting object, but letting
 * it own navigation would put a clever visualisation between a reader and the
 * thing they came for, so it sits behind a tab and is hidden on small screens
 * where six labelled nodes are unreadable.
 */
export function WorkViews() {
  return (
    <Tabs defaultValue="list" className="mt-12">
      <TabsList className="mx-auto">
        <TabsTrigger value="list">List</TabsTrigger>
        <TabsTrigger value="map" className="hidden sm:inline-flex">
          Similarity map
        </TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="mt-10">
        <div className="space-y-16">
          {featuredProjects.map((project) => {
            const cover = project.images[0]
            return (
              <article key={project.slug} className="brutal p-6 text-center sm:p-10">
                <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
                  {project.period}
                </p>
                <h3 className="text-signal mt-2 font-[family-name:var(--font-display)] text-4xl font-normal tracking-wide uppercase sm:text-5xl">
                  {project.title}
                </h3>
                <p className="text-muted-foreground container-prose mt-3 leading-relaxed">
                  {project.tagline}
                </p>

                <ul className="mt-5 flex flex-wrap justify-center gap-1.5">
                  {project.stack.slice(0, 6).map((tech) => (
                    <li
                      key={tech}
                      className="border-line-strong text-muted-foreground border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {cover ? (
                  <Link
                    href={`/work/${project.slug}`}
                    className="border-line-strong bg-surface-alt hover:border-signal group mt-8 block overflow-hidden border-2 transition-colors"
                  >
                    {/*
                     * Screenshots share one 16:9 frame so the set reads as a
                     * set. Diagrams keep their own ratio: cropping a wide
                     * architecture diagram cuts off its outer columns.
                     */}
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className={
                        cover.kind === 'diagram'
                          ? 'h-auto w-full'
                          : 'aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
                      }
                    />
                  </Link>
                ) : (
                  <ScorePlate project={project} />
                )}

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button asChild>
                    <Link href={`/work/${project.slug}`}>Read the case study</Link>
                  </Button>
                  {project.links.map((link) => (
                    <Button key={link.url} asChild variant="ghost">
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </TabsContent>

      <TabsContent value="map">
        <LatentMap />
      </TabsContent>
    </Tabs>
  )
}
