import type { UpdateProductPayload } from "../types/product.types"

export const updateProduct = async ({ id, data }: UpdateProductPayload) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response) {
    throw new Error("Failed to update")
  }

  return response.json()
}
