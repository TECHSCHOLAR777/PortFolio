'use client'

import { useEffect, useState } from 'react'

export default function BootSequence() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="boot-screen" role="status" aria-label="Loading portfolio">
      <div className="boot-head">
        <span>RG / PORTFOLIO</span>
        <span>INITIALIZING</span>
      </div>
      <div className="boot-layout" aria-hidden="true">
        <div className="boot-copy">
          <i /><i /><i className="short" />
          <div className="boot-lines"><b /><b /><b /><b /></div>
        </div>
        <div className="boot-console">
          <span>Loading systems</span>
          <span>Indexing selected work</span>
          <span>Calibrating interface</span>
        </div>
      </div>
      <div className="boot-progress"><span /></div>
    </div>
  )
}
