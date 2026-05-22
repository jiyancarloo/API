import { useQuery } from "@tanstack/react-query"
import type { Category } from "../types/product.types"
import { getCategories } from "@/features/products/api/use.category"

export function useCategories() {
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],

    queryFn: getCategories,
  })

  return {
    categories: data ?? [],
    loading: isLoading,
    error,
  }
}
