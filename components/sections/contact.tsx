'use client'

import { Check, Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Web3Forms: no account, no backend of my own, nothing that can fall asleep.
 * The access key is public by design, it only authorises posting to this form.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', `Portfolio message from ${data.get('name') ?? 'a visitor'}`)

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message ?? 'Submission failed')
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <section id="contact" className="section-y">
      <div className="container-page">
        <SectionHeading
          index="09"
          label="Contact"
          title="Get in touch"
          intro="The form goes straight to my inbox. Email works just as well."
        />

        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3">
          {/*
           * This button said "Download weights" once the epoch bar converged.
           * It was the payoff of the whole device and it was also the one
           * moment a visitor most needs the button to say what it does, so the
           * joke was charging them for it. The bar reaching "converged" is
           * payoff enough.
           */}
          <Button asChild size="lg">
            <a href={site.resume} download>
              Download resume
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </Button>
        </div>

        <form onSubmit={onSubmit} className="container-prose mt-12 space-y-4">
          {/* honeypot, bots fill it and humans never see it */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="text-left">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="border-input bg-background focus-visible:ring-ring mt-1.5 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
              />
            </div>
            <div className="text-left">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="border-input bg-background focus-visible:ring-ring mt-1.5 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
              />
            </div>
          </div>

          <div className="text-left">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="border-input bg-background focus-visible:ring-ring mt-1.5 w-full resize-y rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button type="submit" size="lg" disabled={status === 'sending' || status === 'sent'}>
              {status === 'sending' ? <Loader2 className="size-4 animate-spin" /> : null}
              {status === 'sent' ? <Check className="size-4" /> : null}
              {status === 'idle' || status === 'error' ? <Send className="size-4" /> : null}
              {status === 'sent' ? 'Message sent' : 'Send message'}
            </Button>

            <p
              aria-live="polite"
              className={cn(
                'text-sm',
                status === 'error' ? 'text-destructive' : 'text-muted-foreground'
              )}
            >
              {status === 'sent' ? 'Thanks, I will reply to the address you gave.' : null}
              {status === 'error' ? (error ?? 'Could not send, please email me directly.') : null}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
