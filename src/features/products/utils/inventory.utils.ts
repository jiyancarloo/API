import type { Product } from "../types/product.types"

export function getInventoryHealth(products: Product[]) {
  const healthy = products.filter((p) => p.stock >= 20).length

  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 20).length

  const noStock = products.filter((p) => p.stock === 0).length

  const totalInventory = products.length

  const healthyPercentage =
    totalInventory > 0 ? (healthy / totalInventory) * 100 : 0

  const lowStockPercentage =
    totalInventory > 0 ? (lowStock / totalInventory) * 100 : 0

  const noStockPercentage =
    totalInventory > 0 ? (noStock / totalInventory) * 100 : 0

  return {
    healthy,
    lowStock,
    noStock,
    totalInventory,

    healthyPercentage,
    lowStockPercentage,
    noStockPercentage,
  }
}

export function getRecentProducts(products: Product[]) {
  return products.slice(0, 5)
}

export function getLowStockProducts(products: Product[]) {
  return products
    .filter((p) => p.stock < 20)
    .map((product) => ({
      ...product,
      severity: product.stock <= 5 ? "critical" : "low",
    }))
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 15)
}
