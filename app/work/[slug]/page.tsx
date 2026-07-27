import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { EvalTable } from '@/components/work/eval-table'
import { ImageGallery } from '@/components/work/image-gallery'
import { TrainingChart } from '@/components/work/training-chart'
import { featuredProjects, getProject } from '@/content/projects'

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project || !project.featured) notFound()

  return (
    <>
      <SiteHeader />

      <main id="content">
        <article>
          <header className="container-page section-y text-center">
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href="/#work">
                <ArrowLeft className="size-4" />
                All work
              </Link>
            </Button>

            <p className="text-muted-foreground text-xs">{project.period}</p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-muted-foreground container-prose mt-5 leading-relaxed">
              {project.tagline}
            </p>

            <ul className="mt-7 flex flex-wrap justify-center gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {project.links.map((link) => (
                <Button key={link.url} asChild variant="outline">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ))}
            </div>

            {project.teamRepo ? (
              <p className="text-muted-foreground mx-auto mt-5 max-w-md text-xs">
                Built as a team entry. The training notebook lives in a teammate repository, so it
                does not appear under my own GitHub activity.
              </p>
            ) : null}
          </header>

          {project.images.length > 0 ? (
            <section className="container-page pb-20 md:pb-28">
              <ImageGallery images={project.images} />
            </section>
          ) : null}

          <section className="bg-muted/25 border-border/70 section-y border-y">
            <div className="container-page">
              <h2 className="text-center text-2xl font-medium tracking-tight">What I built</h2>
              <ul className="container-prose mt-10 space-y-4">
                {project.contribution.map((item) => (
                  <li key={item} className="border-border/70 flex gap-3 border-t pt-4">
                    <span aria-hidden className="text-muted-foreground/50 mt-1.5 select-none">
                      &bull;
                    </span>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {project.slug === 'pt-jepa' ? (
            <section className="section-y">
              <div className="container-page">
                <h2 className="text-center text-2xl font-medium tracking-tight">
                  What the training run actually did
                </h2>
                <p className="text-muted-foreground container-prose mt-4 text-center leading-relaxed">
                  This is the one project here with training logs kept from the run, so it is the one
                  project that gets a curve.
                </p>
                <div className="mt-10">
                  <TrainingChart />
                </div>
              </div>
            </section>
          ) : null}

          <section className="bg-muted/25 border-border/70 section-y border-y">
            <div className="container-page">
              <h2 className="text-center text-2xl font-medium tracking-tight">Results</h2>
              <p className="text-muted-foreground container-prose mt-4 text-center leading-relaxed">
                Each figure carries the data it came from and how it was produced.
              </p>
              <div className="mt-10">
                <EvalTable rows={project.evals} note={project.evalNote} />
              </div>
            </div>
          </section>

          <section className="container-page section-y text-center">
            <h2 className="text-2xl font-medium tracking-tight">Read another</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {featuredProjects
                .filter((p) => p.slug !== project.slug)
                .map((p) => (
                  <Button key={p.slug} asChild variant="outline">
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
                  </Button>
                ))}
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
