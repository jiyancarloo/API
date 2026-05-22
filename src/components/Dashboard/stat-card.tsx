import { useProductStats } from "@/features/products/hooks/useProductStats"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "../ui/spinner"

export default function StatCards() {
  const { total, totalValue, avgPrice, categoriesCount, loading } =
    useProductStats()

  if (loading)
    return (
      <>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner />
        </div>
      </>
    )
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
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
      </div>
    </>
  )
}
