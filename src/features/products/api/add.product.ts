import type { CreateProductPayload } from "../types/product.types"

export const createProduct = async (payload: CreateProductPayload) => {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",

    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Failed to add Product")
  }
  return response.json()
}
