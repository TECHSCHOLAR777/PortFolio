import { NextResponse } from 'next/server'

import { site } from '@/content/site'

/**
 * Live counts for the signal strip.
 *
 * The previous build asserted "2k+ PyPI downloads" as a hardcoded string in the
 * page component. Reading it from the source of truth is both honest and a
 * smaller amount of code.
 *
 * Revalidated hourly. GITHUB_TOKEN is optional: the unauthenticated API allows
 * 60 requests an hour, which this cache never approaches.
 */
export const revalidate = 3600

type Stats = {
  publicRepos: number | null
  totalStars: number | null
  /** Lifetime downloads including mirrors, the figure quoted on the resume. */
  pypiLifetime: number | null
}

async function fetchGitHub(): Promise<Pick<Stats, 'publicRepos' | 'totalStars'>> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'rishi-garg-portfolio',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(
    `https://api.github.com/users/${site.githubUser}/repos?per_page=100&type=owner`,
    { headers, next: { revalidate } }
  )
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`)

  const repos: { stargazers_count: number; fork: boolean }[] = await res.json()
  const owned = repos.filter((r) => !r.fork)

  return {
    publicRepos: owned.length,
    totalStars: owned.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
  }
}

/**
 * Lifetime downloads, summed from the daily series.
 *
 * Deliberately not the `recent` endpoint. That one reports a rolling 30 day
 * window, which for this package is around 59 and makes the resume look
 * overstated. The lifetime total including mirrors is what the resume quotes
 * and what this returns.
 */
async function fetchPypiLifetime(): Promise<number> {
  const res = await fetch(`https://pypistats.org/api/packages/${site.pypiPackage}/overall`, {
    headers: { 'User-Agent': 'rishi-garg-portfolio' },
    next: { revalidate },
  })
  if (!res.ok) throw new Error(`pypistats responded ${res.status}`)

  const json: { data?: { category: string; downloads: number }[] } = await res.json()
  const rows = json.data ?? []
  if (rows.length === 0) throw new Error('pypistats returned no rows')

  return rows
    .filter((row) => row.category === 'with_mirrors')
    .reduce((sum, row) => sum + row.downloads, 0)
}

export async function GET() {
  // Each source degrades on its own. One outage must not blank the whole strip.
  const [github, pypi] = await Promise.allSettled([fetchGitHub(), fetchPypiLifetime()])

  const stats: Stats = {
    publicRepos: github.status === 'fulfilled' ? github.value.publicRepos : null,
    totalStars: github.status === 'fulfilled' ? github.value.totalStars : null,
    pypiLifetime: pypi.status === 'fulfilled' ? pypi.value : null,
  }

  return NextResponse.json(stats, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  })
}
