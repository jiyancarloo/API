import { useDashboardStats } from "@/features/products/hooks/useDashboardStats"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "../ui/card"

export default function InventoryHealth() {
  const {
    healthy,
    lowStock,
    noStock,
    healthyPercentage,
    lowStockPercentage,
    noStockPercentage,
    totalInventory,
  } = useDashboardStats()

  const healthItems = [
    {
      label: "Healthy",
      value: healthy,
      percentage: healthyPercentage,
    },
    {
      label: "Low in Stock",
      value: lowStock,
      percentage: lowStockPercentage,
    },
    {
      label: "Out of Stock",
      value: noStock,
      percentage: noStockPercentage,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Inventory Health</CardTitle>
        <CardAction>{totalInventory} products analyzed</CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthItems.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between">
              <span>{item.label}</span>

              <span className="px-2 text-sm text-muted-foreground">
                {item.percentage.toFixed(0)}% ({item.value})
              </span>
            </div>

            <Progress value={item.percentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
