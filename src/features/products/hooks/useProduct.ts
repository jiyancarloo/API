import type { ProductParams } from "@/features/products/types/product.types"
import { useState } from "react"
import { getProducts } from "@/features/products/api/use.product"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "./useDebounce"

export function useProduct() {
  const [params, setParams] = useState<ProductParams>({
    limit: 10,
    skip: 0,
    sortBy: "title",
    order: "asc",
    category: "",
    q: "",
  })

  const debouncedSearch = useDebounce(params.q, 500)

  const queryParams = {
    ...params,
    q: debouncedSearch,
  }
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams),
  })

  const total = data?.total ?? 0
  const currentPage = Math.floor(params.skip / params.limit) + 1
  const totalPages = Math.ceil(total / params.limit)

  const goToPage = (page: number) => {
    setParams((prev) => ({
      ...prev,
      skip: (page - 1) * prev.limit,
    }))
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setParams((prev) => ({ ...prev, skip: prev.skip + prev.limit }))
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setParams((prev) => ({ ...prev, skip: prev.skip - prev.limit }))
    }
  }

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    fetching: isFetching,
    error: error instanceof Error ? error.message : null,
    params,
    currentPage,
    totalPages,
    setParams,
    nextPage,
    prevPage,
    goToPage,
  }
}
