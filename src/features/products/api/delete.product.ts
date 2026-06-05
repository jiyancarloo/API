export const deleteProduct = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "delete",
  })
  if (!response.ok) {
    throw new Error("Failed to delete product")
  }

  return response.json()
}
