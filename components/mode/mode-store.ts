'use client'

import { useSyncExternalStore } from 'react'

import { MODE_KEY } from '@/components/mode/mode-script'

/**
 * Terminal or graphical, stored as `data-mode` on <html>.
 *
 * The attribute is the single source of truth. CSS reads it to show or hide
 * the terminal before React hydrates, and components subscribe to it here, so
 * the toggle, the terminal and the stylesheet can never disagree.
 */
export type Mode = 'terminal' | 'graphical'

function read(): Mode {
  return document.documentElement.getAttribute('data-mode') === 'terminal' ? 'terminal' : 'graphical'
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] })
  return () => observer.disconnect()
}

export function setMode(mode: Mode) {
  document.documentElement.setAttribute('data-mode', mode)
  try {
    localStorage.setItem(MODE_KEY, mode)
  } catch {
    // Private windows can refuse storage. The switch still works for this visit.
  }
  if (mode === 'graphical') window.scrollTo({ top: 0 })
}

export function useMode(): Mode {
  return useSyncExternalStore(subscribe, read, () => 'graphical')
}
