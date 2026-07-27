import { SectionHeading } from '@/components/section-heading'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { levelCopy, skillGroups, type Level } from '@/content/profile'
import { cn } from '@/lib/utils'

const levelStyle: Record<Level, string> = {
  working: 'bg-primary/12 text-primary border-primary/25',
  comfortable: 'bg-muted text-foreground/80 border-border',
  learning: 'bg-transparent text-muted-foreground border-border border-dashed',
}

export function Architecture() {
  return (
    <section id="architecture" className="section-y bg-muted/25 border-border/70 border-y">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Architecture"
          title="The stack, by where it sits in the pipeline"
          intro="Levels are self assessed. A flat list of thirty logos says nothing about what someone can actually carry, so each item states how far along it is."
        />

        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          {(Object.keys(levelCopy) as Level[]).map((level) => (
            <span key={level} className="text-muted-foreground flex items-center gap-2">
              <span
                aria-hidden
                className={cn('inline-block size-2.5 rounded-full border', levelStyle[level])}
              />
              <span className="text-foreground">{level}</span>
              {levelCopy[level]}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.stage} className="text-center">
              <h3 className="text-sm font-medium">{group.stage}</h3>
              <p className="text-muted-foreground mt-1 text-xs">{group.note}</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={cn(
                            'inline-block cursor-default rounded-full border px-2.5 py-1 text-xs',
                            levelStyle[item.level]
                          )}
                        >
                          {item.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{levelCopy[item.level]}</TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
