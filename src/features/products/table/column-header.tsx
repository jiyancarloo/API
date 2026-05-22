import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"
import type { ProductParams } from "@/features/products/types/product.types"

type Props = {
  title: string
  sortKey: string
  params: ProductParams
  setParams: React.Dispatch<React.SetStateAction<ProductParams>>
}

export function ColumnHeader({ title, sortKey, params, setParams }: Props) {
  const isSorted = params.sortBy === sortKey

  const isAsc = params.order === "asc"

  const handleSort = () => {
    setParams((prev) => ({
      ...prev,

      sortBy: sortKey,

      order: prev.sortBy === sortKey && prev.order === "asc" ? "desc" : "asc",
      skip: 0,
    }))
  }
  return (
    <Button
      variant="ghost"
      onClick={handleSort}
      className="hover:bg-transparent"
    >
      {title}

      {!isSorted ? (
        <ArrowUpDown className="h-3 w-3" />
      ) : isAsc ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )}
    </Button>
  )
}
