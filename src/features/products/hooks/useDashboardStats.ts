import { getProducts } from "@/features/products/api/use.product"
import { useQuery } from "@tanstack/react-query"
import {
  getInventoryHealth,
  getLowStockProducts,
  getRecentProducts,
} from "../utils/inventory.utils"
import { getDashboardStats } from "../utils/product.utils"

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
  const stats = getDashboardStats(products)
  const inventory = getInventoryHealth(products)
  const recentProducts = getRecentProducts(products)
  const lowStockProducts = getLowStockProducts(products)

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
    loading: isLoading,
    categoryChartData,
    finalCategoryChartData,
    stats,
    inventory,
    lowStockProducts,
    recentProducts,
  }
}
