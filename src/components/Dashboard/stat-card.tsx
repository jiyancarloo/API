import { useDashboardStats } from "@/features/products/hooks/useDashboardStats"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatCards() {
  const { total, totalValue, avgPrice, categoriesCount } = useDashboardStats()

  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-gray-500">Total Products</p>
          <CardTitle>
            <p className="text-2xl">{total}</p>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-gray-500">Total Value</p>
          <CardTitle>
            <p className="text-3xl">${totalValue.toFixed(2)}</p>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-gray-500">Average Price</p>
          <CardTitle>
            <p className="text-2xl">${avgPrice.toFixed(2)}</p>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-gray-500">Categories</p>
          <CardTitle>
            <p className="text-2xl">{categoriesCount}</p>
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
