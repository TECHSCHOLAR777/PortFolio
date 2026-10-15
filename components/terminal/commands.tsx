'use client'

import { createContext, useContext, type ReactNode } from 'react'

import { setMode } from '@/components/mode/mode-store'
import {
  about,
  achievements,
  certifications,
  education,
  experience,
  limitations,
  skillGroups,
} from '@/content/profile'
import { projects, type Project } from '@/content/projects'
import { site } from '@/content/site'

/**
 * Every line the terminal prints comes from the same content files as the
 * graphical page, so the two views cannot drift apart.
 */

type Shell = {
  run: (input: string) => void
  clear: () => void
  history: string[]
}

export const ShellContext = createContext<Shell | null>(null)

function useShell() {
  const shell = useContext(ShellContext)
  if (!shell) throw new Error('useShell outside the terminal')
  return shell
}

/** A word that runs a command when clicked, so nobody has to know the syntax. */
export function Cmd({ run, children }: { run: string; children?: ReactNode }) {
  const shell = useShell()
  return (
    <button
      type="button"
      onClick={() => shell.run(run)}
      className="text-signal decoration-signal/40 hover:bg-signal hover:text-signal-ink cursor-pointer justify-self-start text-left underline underline-offset-2"
    >
      {children ?? run}
    </button>
  )
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-signal hover:bg-signal hover:text-signal-ink underline underline-offset-2"
    >
      {children}
    </a>
  )
}

function Heading({ children }: { children: ReactNode }) {
  return <p className="text-alert mt-1 font-bold tracking-widest uppercase">{`// ${children}`}</p>
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid gap-x-3 sm:grid-cols-[9.5rem_1fr]">
      <span className="text-signal">{k}</span>
      <span>{children}</span>
    </div>
  )
}

const muted = 'text-muted-foreground'

function EvalTable({ project }: { project: Project }) {
  return (
    <div className="mt-1 space-y-0.5">
      {project.evals.map((row) => (
        <div key={row.metric} className="grid gap-x-3 sm:grid-cols-[minmax(0,15rem)_1fr]">
          <span className={muted}>{row.metric}</span>
          <span>
            <span className="text-signal font-bold">{row.value}</span>
            <span className={muted}>{`  (${row.dataset})`}</span>
          </span>
        </div>
      ))}
      {project.evalNote ? <p className={`${muted} mt-1`}>{`# ${project.evalNote}`}</p> : null}
    </div>
  )
}

function findProject(arg: string | undefined) {
  if (!arg) return undefined
  const q = arg.toLowerCase().replace(/\.md$/, '')
  return projects.find((p) => p.slug === q || p.slug.startsWith(q) || p.title.toLowerCase().startsWith(q))
}

function ProjectNotFound({ arg }: { arg?: string }) {
  return (
    <p>
      <span className="text-alert">{arg ? `no such project: ${arg}` : 'which project?'}</span>{' '}
      <span className={muted}>try</span> <Cmd run="ls" />
    </p>
  )
}

export type Command = {
  name: string
  summary: string
  hidden?: boolean
  run: (args: string[], shell: Shell) => ReactNode
}

/** A hidden second name for a command, resolved when it runs. */
function alias(name: string, target: string): Command {
  return {
    name,
    summary: '',
    hidden: true,
    run: (args, shell) => commands.find((c) => c.name === target)!.run(args, shell),
  }
}

export const commands: Command[] = [
  {
    name: 'help',
    summary: 'list every command',
    run: () => (
      <div>
        <Heading>commands</Heading>
        {commands
          .filter((c) => !c.hidden)
          .map((c) => (
            <Row key={c.name} k={c.name}>
              <span className={muted}>{c.summary}</span>
            </Row>
          ))}
        <p className={`${muted} mt-2`}>
          Tab completes, arrow keys walk history, Ctrl+L clears. Prefer pixels? <Cmd run="gui" />
        </p>
      </div>
    ),
  },
  {
    name: 'whoami',
    summary: 'who this is',
    run: () => (
      <div className="max-w-3xl space-y-2">
        <p>
          <span className="text-signal font-bold">{site.name}</span>
          <span className={muted}>{`, ${site.role}. ${site.location}.`}</span>
        </p>
        {about.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <p className={muted}>
          next: <Cmd run="ls" /> <Cmd run="experience" /> <Cmd run="achievements" />
        </p>
      </div>
    ),
  },
  {
    name: 'ls',
    summary: 'list projects',
    run: () => (
      <div>
        <Heading>~/projects</Heading>
        {projects.map((p) => (
          <div key={p.slug} className="grid gap-x-3 pb-1 sm:grid-cols-[13rem_1fr] sm:pb-0">
            <Cmd run={`cat ${p.slug}`}>{`${p.slug}.md`}</Cmd>
            <span className={muted}>{p.tagline}</span>
          </div>
        ))}
        <p className={`${muted} mt-2`}>
          {'cat <name> for the full story, eval <name> for the numbers, open <name> for the case study'}
        </p>
      </div>
    ),
  },
  {
    name: 'cat',
    summary: 'read a project, e.g. cat realpde',
    run: ([arg]) => {
      const p = findProject(arg)
      if (!p) return <ProjectNotFound arg={arg} />
      return (
        <div className="max-w-3xl space-y-2">
          <p>
            <span className="text-signal text-base font-bold">{p.title}</span>
            <span className={muted}>{`  ${p.period}`}</span>
          </p>
          <p>{p.summary}</p>
          <div>
            <Heading>what I built</Heading>
            {p.contribution.map((c) => (
              <p key={c}>
                <span className="text-alert">{'> '}</span>
                {c}
              </p>
            ))}
          </div>
          <p className={muted}>{`stack: ${p.stack.join(', ')}`}</p>
          <p className="flex flex-wrap gap-x-3">
            {p.links.map((l) => (
              <Ext key={l.url} href={l.url}>
                {l.label}
              </Ext>
            ))}
            <Cmd run={`eval ${p.slug}`}>eval</Cmd>
            {p.featured ? <Cmd run={`open ${p.slug}`}>case study</Cmd> : null}
          </p>
        </div>
      )
    },
  },
  {
    name: 'eval',
    summary: 'results table for a project',
    run: ([arg]) => {
      const p = findProject(arg)
      if (!p) return <ProjectNotFound arg={arg} />
      return (
        <div>
          <Heading>{`eval ${p.slug}`}</Heading>
          <EvalTable project={p} />
        </div>
      )
    },
  },
  {
    name: 'open',
    summary: 'open a case study page',
    run: ([arg]) => {
      const p = findProject(arg)
      if (!p || !p.featured) return <ProjectNotFound arg={arg} />
      setMode('graphical')
      window.location.href = `/work/${p.slug}`
      return <p className={muted}>{`opening /work/${p.slug} ...`}</p>
    },
  },
  {
    name: 'experience',
    summary: 'research roles',
    run: () => (
      <div className="space-y-2">
        <Heading>experience</Heading>
        {experience.map((e) => (
          <div key={`${e.org}-${e.role}`}>
            <p>
              {e.status === 'ongoing' ? <span className="text-alert">{'[LIVE] '}</span> : null}
              <span className="text-signal font-bold">{e.role}</span>
              <span>{`  @ ${e.org}`}</span>
              <span className={muted}>{`  ${e.period}`}</span>
            </p>
            <p className={muted}>{e.detail}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'education',
    summary: 'degree and school',
    run: () => (
      <div>
        <Heading>education</Heading>
        {education.map((e) => (
          <div key={e.qualification} className="grid gap-x-3 pb-1 sm:grid-cols-[minmax(0,22rem)_1fr] sm:pb-0">
            <span>
              <span className="text-signal">{e.qualification}</span>
              <span className={muted}>{`, ${e.institution}`}</span>
            </span>
            <span>
              <span className="font-bold">{e.result}</span>
              <span className={muted}>{`  ${e.period}`}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'skills',
    summary: 'the stack, by stage',
    run: () => (
      <div>
        <Heading>skills</Heading>
        {skillGroups.map((g) => (
          <Row key={g.stage} k={g.stage.toLowerCase()}>
            {g.items.map((i, n) => (
              <span key={i.name}>
                <span className={i.level === 'working' ? 'text-signal' : undefined}>{i.name}</span>
                {n < g.items.length - 1 ? <span className={muted}>, </span> : null}
              </span>
            ))}
          </Row>
        ))}
        <p className={`${muted} mt-1`}>yellow: used to ship something other people ran</p>
      </div>
    ),
  },
  {
    name: 'achievements',
    summary: 'rankings and awards',
    run: () => (
      <div>
        <Heading>achievements</Heading>
        {achievements.map((a) => (
          <p key={a.title}>
            <span className="text-alert">{`[${a.year}] `}</span>
            <span className="text-signal font-bold">{a.title}</span>
            <span className={muted}>{`  ${a.detail}`}</span>
            {a.url ? (
              <>
                {' '}
                <Ext href={a.url}>proof</Ext>
              </>
            ) : null}
          </p>
        ))}
      </div>
    ),
  },
  {
    name: 'certs',
    summary: 'coursework certificates',
    run: () => (
      <div>
        <Heading>certificates</Heading>
        {certifications.map((c) => (
          <p key={c.title}>
            <Ext href={c.url}>{c.title}</Ext>
            <span className={muted}>{`  ${c.issuer}`}</span>
          </p>
        ))}
      </div>
    ),
  },
  {
    name: 'limitations',
    summary: 'where my experience runs out',
    run: () => (
      <div>
        <p className="text-alert font-bold">{'WARN  reading limitations.log'}</p>
        {limitations.map((l) => (
          <p key={l.claim}>
            <span className="text-signal">{'warn  '}</span>
            <span className="font-bold">{l.claim}</span>
            <span className={muted}>{`  ${l.detail}`}</span>
          </p>
        ))}
      </div>
    ),
  },
  {
    name: 'contact',
    summary: 'email and socials',
    run: () => (
      <div>
        <Heading>contact</Heading>
        <Row k="email">
          <Ext href={`mailto:${site.email}`}>{site.email}</Ext>
        </Row>
        <Row k="github">
          <Ext href={site.links.github}>{site.links.github.replace('https://', '')}</Ext>
        </Row>
        <Row k="linkedin">
          <Ext href={site.links.linkedin}>{site.links.linkedin.replace('https://www.', '')}</Ext>
        </Row>
        <Row k="leetcode">
          <Ext href={site.links.leetcode}>{site.links.leetcode.replace('https://', '')}</Ext>
        </Row>
      </div>
    ),
  },
  {
    name: 'resume',
    summary: 'download the resume PDF',
    run: () => {
      const a = document.createElement('a')
      a.href = site.resume
      a.download = 'rishi-garg-resume.pdf'
      a.click()
      return (
        <p>
          <span className="text-signal">downloading</span> rishi-garg-resume.pdf{' '}
          <span className={muted}>(if nothing happened,</span> <Ext href={site.resume}>open it</Ext>
          <span className={muted}>)</span>
        </p>
      )
    },
  },
  {
    name: 'neofetch',
    summary: 'system summary',
    run: () => <Neofetch />,
  },
  {
    name: 'gui',
    summary: 'switch to the graphical site',
    run: () => {
      setMode('graphical')
      return <p className={muted}>switching to graphical mode ...</p>
    },
  },
  {
    name: 'history',
    summary: 'commands you ran',
    run: (_, shell) => (
      <div>
        {shell.history.map((h, i) => (
          <p key={`${i}-${h}`}>
            <span className={muted}>{String(i + 1).padStart(3, ' ')}</span> {h}
          </p>
        ))}
      </div>
    ),
  },
  {
    name: 'clear',
    summary: 'clear the screen',
    run: (_, shell) => {
      shell.clear()
      return null
    },
  },
  alias('exit', 'gui'),
  alias('about', 'whoami'),
  alias('projects', 'ls'),
  alias('stack', 'skills'),
  {
    name: 'echo',
    summary: '',
    hidden: true,
    run: (args) => <p>{args.join(' ')}</p>,
  },
  {
    name: 'date',
    summary: '',
    hidden: true,
    run: () => <p>{new Date().toString()}</p>,
  },
  {
    name: 'sudo',
    summary: '',
    hidden: true,
    run: (args) =>
      args.join(' ').toLowerCase().startsWith('hire') ? (
        <div className="border-alert bg-alert-soft border-2 p-3">
          <p className="text-alert font-bold tracking-widest">{'[sudo] ACCESS GRANTED'}</p>
          <p>Good call. Rishi reads every email.</p>
          <p>
            <Ext href={`mailto:${site.email}?subject=Let%27s%20work%20together`}>{site.email}</Ext>
            <span className={muted}> or </span>
            <Cmd run="resume" />
          </p>
        </div>
      ) : (
        <p>
          <span className="text-alert">rishi is not in the sudoers file.</span>{' '}
          <span className={muted}>This incident will be reported. Try</span> <Cmd run="sudo hire rishi" />
        </p>
      ),
  },
  {
    name: 'rm',
    summary: '',
    hidden: true,
    run: () => <p className="text-alert">{'rm: permission denied. Nice try.'}</p>,
  },
]

export const commandNames = commands.map((c) => c.name)

export function Neofetch() {
  const rows: [string, ReactNode][] = [
    ['OS', 'B.Tech Software Engineering, DTU (2025 to 2029)'],
    ['Host', site.location],
    ['Lab', 'Vision and Interpretability Lab (VAIL)'],
    ['Kernel', 'representation learning, multimodal systems'],
    ['Uptime', 'second year'],
    ['Shell', 'python, pytorch, c++'],
    ['CGPA', '9.70, second in the department'],
    ['GPU', 'one T4 and a lot of patience'],
    ['Latest', 'Top 20, NeurIPS 2026 RealPDE, Track 2'],
    ['Email', <Ext key="e" href={`mailto:${site.email}`}>{site.email}</Ext>],
    ['GitHub', <Ext key="g" href={site.links.github}>{site.githubUser}</Ext>],
    [
      'Status',
      <span key="s" className="inline-flex items-center gap-2">
        <span className="live-dot" aria-hidden />
        open to internships and research collaboration
      </span>,
    ],
  ]
  return (
    <div className="space-y-0.5">
      <p>
        <span className="text-signal font-bold">rishi</span>
        <span>@</span>
        <span className="text-alert font-bold">vail</span>
      </p>
      <p className={muted}>{'-'.repeat(22)}</p>
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-x-2">
          <span className="text-signal font-bold">{`${k}:`}</span>
          <span>{v}</span>
        </div>
      ))}
      <p className="mt-2 flex gap-0" aria-hidden>
        {['#0a0a0a', '#ff2e2e', '#ffd400', '#f5f1e6', '#7d7768', '#ff8a00'].map((c) => (
          <span key={c} className="inline-block h-3 w-6" style={{ background: c }} />
        ))}
      </p>
    </div>
  )
}
