"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Deliveries",
  },
  success: {
    label: "Success",
    color: "#3554FF",
  },
  failure: {
    label: "Failure",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AssignmentChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/assignments/metrics");
        const result = await response.json();
        if (response.ok && result.data) {
          setChartData(
            result.data.map((item: any) => ({
              date: item.date,
              success: item.success, // Use the success field directly
              failure: item.failure, // Use the failure field directly
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  const total = React.useMemo(
    () => ({
      success: chartData.reduce((acc, curr) => acc + (curr.success || 0), 0),
      failure: chartData.reduce((acc, curr) => acc + (curr.failure || 0), 0),
    }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Assignments</CardTitle>
          <CardDescription>Showing data of past 30 days</CardDescription>
        </div>
        <div className="flex">
          {["success", "failure"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Legend />
            <Bar
              dataKey="success"
              fill={chartConfig.success.color}
              name={chartConfig.success.label}
            />
            <Bar
              dataKey="failure"
              fill={chartConfig.failure.color}
              name={chartConfig.failure.label}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}