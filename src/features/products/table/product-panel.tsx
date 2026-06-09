import type { Product } from "../types/product.types"
type ProductPanelProps = {
  product: Product | null
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductInventoryStatus } from "../utils/product.utils"
import { Progress } from "@/components/ui/progress"

export default function ProductPanel({ product }: ProductPanelProps) {
  if (!product) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Select a product to view details
      </div>
    )
  }

  const status = getProductInventoryStatus(product.stock)
  const stockPercentage = Math.min(100, product.stock)
  return (
    <>
      <div className="justify-content-center flex items-center gap-2 border-b p-6">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-40 w-40 rounded-xl object-cover"
        />

        <div className="mt-4">
          <h2 className="text-xl font-semibold">{product.title}</h2>

          <span>{product.category}</span>
        </div>
      </div>

      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardDescription>Inventory</CardDescription>

          <CardTitle>{product.stock} units</CardTitle>
        </CardHeader>

        <CardContent>
          <Progress value={stockPercentage} />
        </CardContent>
      </Card>

      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardDescription>Pricing</CardDescription>

          <CardTitle>${product.price}</CardTitle>
        </CardHeader>
      </Card>

      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardTitle>Organization</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category</span>

            <span>{product.category}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Brand</span>

            <span>{product.brand}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
