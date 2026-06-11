import { useDashboardStats } from "@/features/products/hooks/useDashboardStats"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatCards() {
  const { stats } = useDashboardStats()

  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-gray-500">Total Products</p>
          <CardTitle>
            <p className="text-2xl">{stats.totalProducts}</p>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-gray-500">Total Value</p>
          <CardTitle>
            <p className="text-3xl">${stats.totalValue.toFixed(2)}</p>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-gray-500">Average Price</p>
          <CardTitle>
            <p className="text-2xl">${stats.avgPrice.toFixed(2)}</p>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-gray-500">Categories</p>
          <CardTitle>
            <p className="text-2xl">{stats.categoriesCount}</p>
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
