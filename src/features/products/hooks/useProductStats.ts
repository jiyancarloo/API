import { getProducts } from "@/features/products/api/use.product"
import { useQuery } from "@tanstack/react-query"

export function useProductStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["product-stats"],
    queryFn: () =>
      getProducts({
        limit: 100,
        skip: 0,
        sortBy: "",
      }),
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0

  const totalValue = products.reduce((sum, p) => sum + p.price, 0)
  const avgPrice = products.length > 0 ? totalValue / products.length : 0

  const categoriesCount = new Set(products.map((p) => p.category)).size

  return {
    total,
    totalValue,
    avgPrice,
    categoriesCount,
    loading: isLoading,
  }
}
