import type { Product } from "../types/product.types"
import { TrendingUp, TrendingDown, TriangleAlert } from "lucide-react"
export function getDashboardStats(products: Product[]) {
  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price, 0)
  const avgPrice = products.length > 0 ? totalValue / products.length : 0
  const categoriesCount = new Set(products.map((p) => p.category)).size

  return {
    totalProducts,
    categoriesCount,
    totalValue,
    avgPrice,
  }
}
export function getProductInventoryStatus(stock: number) {
  if (stock === 0)
    return {
      label: "Out of Stock",
      icon: TriangleAlert,
      className: "bg-red-100 text-red-700 border-red-200",
      description:
        "This product is unavailable and requires immediate restocking.",
    }

  if (stock <= 5)
    return {
      label: "Critical Stock",
      icon: TrendingDown,
      className: "bg-orange-100 text-orange-700 border-orange-200",
      description:
        "Inventory is critically low. Replenishment is recommended immediately.",
    }

  if (stock < 20)
    return {
      label: "Low Stock",
      icon: TrendingDown,
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
      description: "Stock levels are running low. Monitor inventory closely.",
    }

  return {
    label: "Healthy Stock",
    icon: TrendingUp,
    className: "bg-green-100 text-green-700 border-green-200",
    description: "Inventory levels are healthy and sufficient for demand.",
  }
}
