import type { ColumnDef } from "@tanstack/react-table"
import type { Product, ProductParams } from "../types/product.types"
import { Badge } from "@/components/ui/badge"
import { TriangleAlert, CircleCheck, MoreHorizontal } from "lucide-react"
import { ColumnHeader } from "./column-header"
import { HeaderDrawer } from "./header-drawer"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export const getColumns = (
  params: ProductParams,
  setParams: React.Dispatch<React.SetStateAction<ProductParams>>,
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "title",
    header: () => (
      <ColumnHeader
        title="Product"
        sortKey="title"
        params={params}
        setParams={setParams}
      />
    ),
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
      return (
        <>
          <HeaderDrawer product={product}>
            <Button variant="link">{product.title}</Button>
          </HeaderDrawer>
        </>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <ColumnHeader
        title="Price"
        sortKey="price"
        params={params}
        setParams={setParams}
      />
    ),
    cell: ({ row }) => `$${row.original.price}`,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "availability ",
    header: "Availability",
    cell: ({ row }) => {
      const stock = row.original.stock
      const isLowStock = stock <= 10
      return (
        <>
          <Badge variant={isLowStock ? "destructive" : "default"}>
            {isLowStock ? (
              <>
                Low in Stock
                <TriangleAlert />
              </>
            ) : (
              <>
                In Stock
                <CircleCheck />
              </>
            )}
          </Badge>
        </>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  onEdit(product)
                }}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  onDelete(product)
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
  /* {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags.map((tag, i) => (
          <Badge variant="outline" key={i}>
            {tag}
          </Badge>
        ))}
      </div>
    ),
  }, */
]
