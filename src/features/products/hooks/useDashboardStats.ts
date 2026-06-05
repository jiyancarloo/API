import { getProducts } from "@/features/products/api/use.product"
import { useQuery } from "@tanstack/react-query"

export function useDashboardStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["product-stats"],
    queryFn: () =>
      getProducts({
        limit: 200,
        skip: 0,
        sortBy: "",
      }),
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0
  const totalValue = products.reduce((sum, p) => sum + p.price, 0)
  const avgPrice = products.length > 0 ? totalValue / products.length : 0
  const categoriesCount = new Set(products.map((p) => p.category)).size

  const recentProducts = products.slice(0, 5)

  const healthy = products.filter((p) => p.stock >= 20).length

  const lowStock = products.filter((p) => p.stock < 20).length

  const noStock = products.filter((p) => p.stock === 0).length

  const totalInventory = healthy + lowStock + noStock

  const healthyPercentage = (healthy / totalInventory) * 100
  const lowStockPercentage = (lowStock / totalInventory) * 100
  const noStockPercentage = (noStock / totalInventory) * 100

  const lowStockProducts = products
    .filter((p) => p.stock < 20)
    .map((product) => ({
      ...product,
      severity: product.stock <= 5 ? "critical" : "low",
    }))
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5)

  const categoryDistribution = products.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const categoryChartData = Object.entries(categoryDistribution)
    .map(([category, count]) => ({
      category,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  const topCategories = categoryChartData.slice(0, 5)
  const remainingCategories = categoryChartData.slice(5)
  const othersCount = remainingCategories.reduce(
    (sum, item) => sum + item.count,
    0
  )

  const finalCategoryChartData =
    othersCount > 0
      ? [
          ...topCategories,
          {
            category: "Others",
            count: othersCount,
          },
        ]
      : topCategories

  return {
    total,
    totalValue,
    avgPrice,
    categoriesCount,
    loading: isLoading,
    healthy,
    lowStock,
    noStock,
    healthyPercentage,
    lowStockPercentage,
    noStockPercentage,
    totalInventory,
    categoryChartData,
    recentProducts,
    finalCategoryChartData,
    lowStockProducts,
  }
}
