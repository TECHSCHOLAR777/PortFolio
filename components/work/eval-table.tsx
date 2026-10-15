import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { EvalRow } from '@/content/projects'
import { cn } from '@/lib/utils'

/**
 * Numbers with their provenance attached.
 *
 * The previous build printed headline figures as bare strings with no dataset
 * and no method, which is what made them read as decoration. Rows whose
 * underlying artifact was not kept are dimmed rather than deleted, because an
 * acknowledged gap is worth more than a silent one.
 *
 * Phones and tablets get one card per row instead of the table: four columns of prose do
 * not fit a narrow screen, and a table you have to scroll sideways hides the
 * provenance that is the whole point of it.
 */
export function EvalTable({ rows, note }: { rows: EvalRow[]; note?: string }) {
  return (
    <div>
      <ul className="space-y-3 lg:hidden">
        {rows.map((row) => (
          <li
            key={row.metric}
            className={cn(
              'border-line bg-surface rounded-md border p-4',
              row.method.includes('not retained') && 'opacity-60',
            )}
          >
            <p className="text-muted-foreground text-xs">{row.metric}</p>
            <p className="tabular text-signal mt-1 text-lg">{row.value}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{row.dataset}</p>
            <p className="text-ink-subtle mt-1 text-xs leading-relaxed">{row.method}</p>
          </li>
        ))}
      </ul>

      <div className="border-border hidden overflow-x-auto rounded-md border lg:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-40">Metric</TableHead>
              <TableHead className="min-w-28">Value</TableHead>
              <TableHead className="min-w-40">Dataset</TableHead>
              <TableHead className="min-w-48">How it was measured</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const unmeasured = row.method.includes('not retained')
              return (
                <TableRow key={row.metric} className={cn(unmeasured && 'opacity-60')}>
                  <TableCell className="font-medium whitespace-normal">{row.metric}</TableCell>
                  <TableCell className="tabular">{row.value}</TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-normal">
                    {row.dataset}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-normal">
                    {row.method}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {note ? (
        <p className="text-muted-foreground border-line mx-auto mt-4 max-w-2xl border-l-2 pl-4 text-left text-xs leading-relaxed">
          {note}
        </p>
      ) : null}
    </div>
  )
}
