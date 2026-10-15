'use client'

import { SquareTerminal } from 'lucide-react'

import { setMode } from '@/components/mode/mode-store'
import { Button } from '@/components/ui/button'

export function OpenTerminalButton() {
  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() => setMode('terminal')}
      className="border-alert text-alert hover:bg-alert font-mono tracking-wider uppercase hover:text-white"
    >
      <SquareTerminal className="size-4" />
      Open terminal
    </Button>
  )
}
