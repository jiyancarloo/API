import { useDashboardStats } from "@/features/products/hooks/useDashboardStats"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "../ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Badge } from "../ui/badge"
import { TriangleAlert, Info } from "lucide-react"
import { Button } from "../ui/button"
export default function LowProductStats() {
  const { lowStockProducts } = useDashboardStats()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stocks Alert</CardTitle>
        <CardAction>
          <Button variant="link" size="xs" className="text-gray-500">
            view all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {lowStockProducts.map((low) => (
          <Item variant="outline" key={low.id} size="sm">
            <ItemMedia variant="icon">
              {low.severity === "critical" ? (
                <TriangleAlert className="h-14 w-14" />
              ) : (
                <Info className="h-14 w-14" />
              )}
            </ItemMedia>
            <ItemContent className="line-clamp-1">
              <ItemTitle>{low.title}</ItemTitle>
              <ItemDescription>
                {low.severity === "critical"
                  ? "Need's urgent attenion"
                  : "Monitor and address soon"}
              </ItemDescription>
            </ItemContent>
            <Badge variant="destructive">{low.stock} stocks</Badge>
          </Item>
        ))}
      </CardContent>
    </Card>
  )
}
