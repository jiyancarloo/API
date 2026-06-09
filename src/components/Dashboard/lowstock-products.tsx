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
import { ScrollArea } from "@/components/ui/scroll-area"
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

      <CardContent>
        <ScrollArea className="h-117.5">
          <div className="space-y-3 pr-4">
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
                  <ItemTitle>
                    {low.title} {"-"}
                    <span className="text-muted-foreground">
                      {low.severity === "critical"
                        ? "Needs urgent attention"
                        : "Monitor and address soon"}
                    </span>
                  </ItemTitle>

                  <ItemDescription>{low.category}</ItemDescription>
                </ItemContent>

                <Badge variant="destructive">{low.stock} stocks</Badge>
              </Item>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
