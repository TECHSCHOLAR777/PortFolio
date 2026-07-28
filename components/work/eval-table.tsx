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
 */
export function EvalTable({ rows, note }: { rows: EvalRow[]; note?: string }) {
  return (
    <div>
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-44">Metric</TableHead>
              <TableHead className="min-w-32">Value</TableHead>
              <TableHead className="min-w-44">Dataset</TableHead>
              <TableHead className="min-w-56">How it was measured</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const unmeasured = row.method.includes('not retained')
              return (
                <TableRow key={row.metric} className={cn(unmeasured && 'opacity-60')}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className="tabular">{row.value}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.dataset}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.method}</TableCell>
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
