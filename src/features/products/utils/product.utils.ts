import type { Product } from "../types/product.types"

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
      variant: "destructive",
    }

  if (stock <= 5)
    return {
      label: "Critical Stock",
      variant: "destructive",
    }

  if (stock < 20)
    return {
      label: "Low Stock",
      variant: "secondary",
    }

  return {
    label: "Healthy Stock",
    variant: "default",
  }
}
