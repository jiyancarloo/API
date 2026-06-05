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
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
export default function RecentProducts() {
  const { recentProducts } = useDashboardStats()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Products</CardTitle>
        <CardAction>
          <Button variant="link" size="xs" className="text-gray-500">
            view all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentProducts.map((recent) => (
          <Item variant="outline" key={recent.id} size="sm">
            <ItemMedia variant="image">
              <img src={recent.thumbnail} className="h-14 w-14" />
            </ItemMedia>
            <ItemContent className="line-clamp-1">
              <ItemTitle>{recent.title}</ItemTitle>
              <ItemDescription>{recent.category}</ItemDescription>
            </ItemContent>
            <ItemContent className="flex-none text-center">
              <ItemDescription>
                <Badge variant="ghost">{recent.stock} stocks </Badge>
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </CardContent>
    </Card>
  )
}
