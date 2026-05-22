export type ProductParams = {
  sortBy: string
  limit: number
  skip: number
  order?: "asc" | "desc"
  q?: string
  category?: string
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

export type ProductResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type Category = {
  slug: string
  name: string
  url: string
}

export type CreateProductPayload = {
  title: string
  category: string
  description: string
  price: number
  stock: number
}
