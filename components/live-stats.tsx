'use client'

import { useEffect, useState } from 'react'

export type Stats = {
  publicRepos: number | null
  totalStars: number | null
  pypiLifetime: number | null
}

function useStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/stats')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Stats) => {
        if (!cancelled) setStats(data)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { stats, failed }
}

function Tile({
  value,
  label,
  note,
  failed,
}: {
  value: number | null | undefined
  label: string
  note: string
  failed: boolean
}) {
  return (
    <div className="px-2 py-8 text-center md:py-10">
      <p className="tabular text-2xl font-medium tracking-tight sm:text-3xl">
        {value != null ? (
          value.toLocaleString('en-US')
        ) : (
          <span className="text-muted-foreground text-base font-normal">
            {failed ? 'unavailable' : '...'}
          </span>
        )}
      </p>
      <p className="mt-2 text-sm">{label}</p>
      <p className="text-muted-foreground mt-1 text-xs">{note}</p>
    </div>
  )
}

/**
 * Two tiles in the signal strip are read live rather than asserted in the page.
 *
 * The download figure is lifetime including mirrors, which is the number the
 * resume quotes. The rolling 30 day window is a far smaller and quite different
 * quantity, so it is not shown here where there is no room to explain which
 * window is which.
 */
export function LiveStats() {
  const { stats, failed } = useStats()

  return (
    <>
      <Tile
        value={stats?.publicRepos}
        label="public repositories"
        note="read live from the GitHub API"
        failed={failed}
      />
      <Tile
        value={stats?.pypiLifetime}
        label="Foresight CLI downloads"
        note="lifetime, read live from PyPI"
        failed={failed}
      />
    </>
  )
}
