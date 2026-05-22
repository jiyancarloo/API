import type { ProductParams, ProductResponse } from "../types/product.types"

export const getProducts = async (
  params: ProductParams
): Promise<ProductResponse> => {
  let baseUrl = "https://dummyjson.com/products"

  // SEARCH
  if (params.q) {
    baseUrl += "/search"
  }

  // CATEGORY
  else if (params.category) {
    baseUrl += `/category/${params.category}`
  }

  const url = new URL(baseUrl)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (key === "category") return

      url.searchParams.set(key, String(value))
    }
  })

  console.log(url.toString())

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to Fetch Products")
  }

  return response.json()
}
