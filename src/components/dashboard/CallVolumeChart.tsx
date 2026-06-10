import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { Call } from "@/types/database";

interface DayBucket {
  key: string;
  label: string;
  count: number;
}

function buildDailyBuckets(calls: Call[], days = 30): DayBucket[] {
  const buckets: DayBucket[] = [];
  const index: Record<string, number> = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    index[key] = buckets.length;
    buckets.push({
      key,
      label: d.toLocaleDateString([], { month: "short", day: "numeric" }),
      count: 0,
    });
  }

  for (const call of calls) {
    const key = new Date(call.started_at).toISOString().slice(0, 10);
    const i = index[key];
    if (i !== undefined) buckets[i].count += 1;
  }

  return buckets;
}

interface CallVolumeChartProps {
  calls: Call[];
}

export function CallVolumeChart({ calls }: CallVolumeChartProps) {
  const data = buildDailyBuckets(calls);

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <h3 className="mb-4 text-sm font-semibold text-ink">Call volume · last 30 days</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "rgb(var(--ink-muted))" }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis hide allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "rgb(var(--surface-raised))",
              border: "1px solid rgb(var(--line))",
              borderRadius: 10,
              fontSize: 12,
              color: "rgb(var(--ink))",
            }}
            labelStyle={{ color: "rgb(var(--ink-muted))" }}
            cursor={{ fill: "rgb(var(--ink) / 0.06)" }}
            formatter={(value: number) => [value, "Calls"]}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]}>
            {data.map((d) => (
              <Cell key={d.key} fill="rgb(var(--chart-1))" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
