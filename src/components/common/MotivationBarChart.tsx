"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface DataItem {
  label: string
  value: number
}

interface MotivationBarChartProps {
  data: DataItem[]
  label?: string
  color?: string
}

export default function MotivationBarChart({
  data,
  label = "Skor",
  color = "#5841EA",
}: MotivationBarChartProps) {
  const chartConfig = {
    value: {
      label: label,
      color: color,
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart 
        data={data} 
        margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          fontSize={12}
          fontWeight="medium"
          className="fill-slate-500"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          fontSize={12}
          fontWeight="medium"
          className="fill-slate-500"
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip
          cursor={{ fill: 'rgba(0,0,0,0.05)', radius: 4 }}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar 
          dataKey="value" 
          fill={color} 
          radius={[4, 4, 0, 0]} 
          maxBarSize={45}
        />
      </BarChart>
    </ChartContainer>
  )
}
