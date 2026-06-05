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
  description: string

  category: string
  brand: string

  price: number
  stock: number

  images: string[]
  thumbnail: string
  tags: string[]

  availabilityStatus: string
}

export type CreateProductPayload = {
  title: string
  description: string

  category: string
  brand: string

  price: number
  stock: number
}
export type UpdateProductPayload = {
  id: number
  data: CreateProductPayload
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
