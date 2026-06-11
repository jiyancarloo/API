import type { ColumnDef } from "@tanstack/react-table"
import type { Product, ProductParams } from "../types/product.types"
import { MoreHorizontal } from "lucide-react"
import { ColumnHeader } from "./column-header"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

export const getColumns = (
  params: ProductParams,
  setParams: React.Dispatch<React.SetStateAction<ProductParams>>,
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "select",
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
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
          <div className="flex items-center gap-3">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-12 w-12 rounded-md object-cover"
            />

            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-xs text-muted-foreground">{product.brand}</p>
            </div>
          </div>
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
    header: "Inventory",
    cell: ({ row }) => <span>{row.original.stock} units</span>,
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
]
