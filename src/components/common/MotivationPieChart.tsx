"use client"

import { Label, Pie, PieChart, Cell } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface DataItem {
  category: string
  value: number
  fill: string
}

interface MotivationPieChartProps {
  data: DataItem[]
  centerLabel?: string
}

export default function MotivationPieChart({ data, centerLabel = "89%" }: MotivationPieChartProps) {
  const chartConfig = data.reduce((acc, item) => {
    acc[item.category] = {
      label: item.category,
      color: item.fill,
    }
    return acc
  }, {} as ChartConfig)

  return (
    <div className="flex flex-row items-center gap-2 w-full py-2 overflow-hidden">
      <div className="relative w-full max-w-[110px] aspect-square shrink-0">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius="70%"
              outerRadius="100%"
              strokeWidth={0}
              paddingAngle={2}
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-slate-900 dark:fill-white text-xl font-bold"
                        >
                          {centerLabel}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* LEGEND */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between w-full min-w-0 gap-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <div 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {item.category}
              </span>
            </div>
            <span 
              className="text-[11px] font-bold shrink-0"
              style={{ color: item.fill }}
            >
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
