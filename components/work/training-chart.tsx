'use client'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import history from '@/content/ptjepa-training.json'

const series = [
  { key: 'total', label: 'total', color: 'var(--chart-1)' },
  { key: 'jepa', label: 'JEPA', color: 'var(--chart-2)' },
  { key: 'contrastive', label: 'contrastive', color: 'var(--chart-3)' },
  { key: 'unmix', label: 'unmixing', color: 'var(--chart-5)' },
] as const

/**
 * The only chart on this site, and the reason it lands.
 *
 * Every point comes from epoch_history.csv produced by the actual run, copied
 * into the repository unchanged. No other project here retained training logs,
 * so no other project gets a chart. One real curve is worth more than six
 * invented ones.
 */
export function TrainingChart() {
  return (
    <figure>
      <div className="h-[340px] w-full sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 8, right: 12, bottom: 4, left: -18 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="epoch"
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
              label={{
                value: 'epoch',
                position: 'insideBottomRight',
                offset: -2,
                fontSize: 11,
                fill: 'var(--muted-foreground)',
              }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={54}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--popover)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontSize: 12,
              }}
              labelStyle={{ color: 'var(--muted-foreground)' }}
              labelFormatter={(value) => `epoch ${value}`}
            />
            <Legend
              verticalAlign="top"
              height={30}
              iconType="plainline"
              wrapperStyle={{ fontSize: 12 }}
            />

            {/*
             * The JEPA term stops improving around epoch 8. That is the real
             * bottleneck of this run, documented in the results file, so the
             * chart marks it instead of leaving the reader to spot it.
             */}
            <ReferenceLine
              x={8}
              stroke="var(--muted-foreground)"
              strokeDasharray="4 4"
              label={{
                value: 'JEPA plateaus',
                position: 'insideTopRight',
                fontSize: 10,
                fill: 'var(--muted-foreground)',
              }}
            />

            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={1.75}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <figcaption className="text-muted-foreground mx-auto mt-4 max-w-xl text-center text-xs leading-relaxed">
        Training loss across all 50 epochs, plotted from{' '}
        <span className="tabular">epoch_history.csv</span> as written by the run. Total loss falls
        77%, and almost all of that comes from the contrastive term, which drops 96%. The JEPA term
        flattens near epoch 8: ViT-B/32 yields only 49 patches at this resolution, so the masked
        prediction task runs out of spatial detail to learn from.
      </figcaption>
    </figure>
  )
}
