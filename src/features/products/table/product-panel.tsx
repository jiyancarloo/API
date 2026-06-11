import type { Product } from "../types/product.types"
type ProductPanelProps = {
  product: Product | null
}

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductInventoryStatus } from "../utils/product.utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function ProductPanel({ product }: ProductPanelProps) {
  if (!product) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Select a product to view details
      </div>
    )
  }

  const status = getProductInventoryStatus(product.stock)
  const StatusIcon = status.icon
  const stockPercentage = Math.min(100, product.stock)
  return (
    <>
      <div className="justify-content-center flex items-center gap-2 p-6">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-32 w-32 object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <span>{product.category}</span>
        </div>
      </div>
      <Separator />

      <div className="py-6">
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>

        <CardContent className="mt-4 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-semibold">{product.stock}</p>
              <p className="text-sm text-muted-foreground">Available Units</p>
            </div>
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
            >
              {status.label}
              <StatusIcon className="h-3 w-3" />
            </div>
          </div>

          <Progress value={stockPercentage} />
          <p className="text-sm text-muted-foreground">{status.description}</p>
        </CardContent>
      </div>

      <Separator />

      <div className="py-6">
        <CardHeader className="">
          <CardTitle>Pricing</CardTitle>
        </CardHeader>

        <CardContent className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Unit Price</span>

            <span>${product.price}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Inventory Value
            </span>

            <span>${(product.price * product.stock).toLocaleString()}</span>
          </div>
        </CardContent>
      </div>
      <Separator />

      <div className="py-6">
        <CardHeader>
          <CardTitle>Organization</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-3">
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-sm leading-relaxed">{product.category}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground"> Brand</p>

            <p className="text-sm leading-relaxed">{product.brand ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground"> Tags</p>

            <div className="flex flex-wrap justify-end gap-2">
              {product.tags.map((tag) => (
                <Badge variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </div>

      <Separator />
      <div className="py-6">
        <CardHeader>
          <CardDescription>Description</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed">{product.description}</p>
        </CardContent>
      </div>
    </>
  )
}
