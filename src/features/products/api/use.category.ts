import type { Category } from "../types/product.types"

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch("https://dummyjson.com/products/categories")

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return response.json()
}
