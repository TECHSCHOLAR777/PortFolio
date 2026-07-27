'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { LatentMap } from '@/components/work/latent-map'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { featuredProjects } from '@/content/projects'

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
              <article key={project.slug} className="text-center">
                <p className="text-muted-foreground text-xs">{project.period}</p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                  {project.title}
                </h3>
                <p className="text-muted-foreground container-prose mt-3 leading-relaxed">
                  {project.tagline}
                </p>

                <ul className="mt-5 flex flex-wrap justify-center gap-1.5">
                  {project.stack.slice(0, 6).map((tech) => (
                    <li
                      key={tech}
                      className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {cover ? (
                  <Link
                    href={`/work/${project.slug}`}
                    className="border-border bg-muted/40 hover:border-primary/40 group mt-8 block overflow-hidden rounded-lg border transition-colors"
                  >
                    {/*
                     * Fixed ratio across all three. Left at their natural
                     * heights the covers came out at 535, 658 and 691 pixels,
                     * which reads as three accidents rather than one set.
                     */}
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                ) : null}

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
