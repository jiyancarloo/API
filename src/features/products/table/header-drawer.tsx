import type { Product } from "../types/product.types"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

type Props = {
  product: Product
  children: React.ReactNode
}

export function HeaderDrawer({ product, children }: Props) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerClose asChild className="absolute top-6 right-6">
          <Button variant="ghost">
            <X />
          </Button>
        </DrawerClose>
        <DrawerHeader className="mt-6">
          <DrawerTitle className="text-2xl">{product.title}</DrawerTitle>
          <DrawerDescription>See full description below.</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4">
          {/* Product image */}
          <img
            src={product.images?.[0]}
            alt={product.description}
            className="aspect-square rounded-md"
          />
          <Separator />
          <span className="">{product.description}</span>
          <Separator />

          <div className="grid gap-2 lg:grid-cols-2">
            {/* Price */}
            <div>
              <span className="font-semibold">Price:</span>
              <span className="ml-2">{`$ ${product.price}`}</span>
            </div>

            {/* Brand */}
            <div>
              <span className="font-semibold">Brand:</span>
              <span className="ml-2">{product.brand ?? "N/A"}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">Tags:</span>
            <div className="flex gap-2 lg:flex-wrap">
              {product.tags.map((tag, i) => (
                <Badge variant="secondary" key={i}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
