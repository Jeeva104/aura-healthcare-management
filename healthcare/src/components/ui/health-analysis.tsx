
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

const chartData = [
  { month: "January", glucose: 186, cholesterol: 110 },
  { month: "February", glucose: 195, cholesterol: 120 },
  { month: "March", glucose: 173, cholesterol: 115 },
  { month: "April", glucose: 160, cholesterol: 105 },
  { month: "May", glucose: 155, cholesterol: 100 },
  { month: "June", glucose: 150, cholesterol: 95 },
]

const chartConfig = {
  glucose: {
    label: "Glucose (mg/dL)",
    color: "hsl(var(--primary))",
  },
  cholesterol: {
    label: "Cholesterol (mg/dL)",
    color: "hsl(var(--accent))",
  },
}

export function HealthAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Health Snapshot & Analysis</CardTitle>
        <CardDescription>An AI-powered analysis of your recent health data.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2 font-headline">Key Metrics Overview</h3>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="glucose" fill="var(--color-glucose)" radius={4} />
              <Bar dataKey="cholesterol" fill="var(--color-cholesterol)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">Detailed Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Your recent reports indicate a positive downward trend in both glucose and cholesterol levels over the past six months. This suggests that recent lifestyle changes may be effective. However, January and February levels were elevated, so continued monitoring is recommended.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">Hospital Suggestions</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center p-2 rounded-lg border">
                <div>
                  <p className="font-semibold">City Clinic</p>
                  <p className="text-xs text-muted-foreground">Top-rated for cardiology.</p>
                </div>
                <Button variant="outline" size="sm">View Details <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
               <div className="flex justify-between items-center p-2 rounded-lg border">
                <div>
                  <p className="font-semibold">Wellness Center</p>
                  <p className="text-xs text-muted-foreground">Specialists in preventative care.</p>
                </div>
                <Button variant="outline" size="sm">View Details <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
           <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">Recommended Insurance Plans</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start p-3 rounded-lg border">
                <div className="flex-1">
                  <p className="font-semibold">HealthGuard Plus</p>
                  <p className="text-xs text-muted-foreground mb-1">Comprehensive coverage for chronic conditions.</p>
                  <p className="text-xs text-primary/80">
                    <span className="font-semibold">Reason:</span> Recommended due to elevated glucose levels, offering lower co-pays on relevant medications.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-4 self-center">Get Quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
              <div className="flex justify-between items-start p-3 rounded-lg border">
                 <div className="flex-1">
                  <p className="font-semibold">Wellness Pro</p>
                  <p className="text-xs text-muted-foreground mb-1">Focus on preventative care and wellness benefits.</p>
                   <p className="text-xs text-primary/80">
                    <span className="font-semibold">Reason:</span> Good for continued monitoring, includes annual check-ups and nutritionist visits at no extra cost.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-4 self-center">Get Quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
