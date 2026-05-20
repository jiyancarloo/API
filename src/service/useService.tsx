type SortField = string

export type ProductParams = {
  limit: number
  skip: number
  sortBy?: SortField
  category?: string
  order?: "asc" | "desc"
  q?: string
}

export type Product = {
  id: number
  title: string
  price: number
  stock: number
  description: string
  images: string[]
  category: string
  tags: string[]
  availabilityStatus: string
  brand: string
}

type ProductResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export const getProducts = async (
  params: ProductParams
): Promise<ProductResponse> => {
  const baseUrl = params.q
    ? "https://dummyjson.com/products/search"
    : "https://dummyjson.com/products"

  const url = new URL(baseUrl)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
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
