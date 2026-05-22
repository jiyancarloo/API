import type { ProductParams } from "@/features/products/types/product.types"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon, ListFilterPlus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/features/products/hooks/useCategory"

type Props<TData> = {
  table: Table<TData>
  params: ProductParams

  setParams: React.Dispatch<React.SetStateAction<ProductParams>>
}
export function DataTableToolBar<TData>({
  table,
  params,
  setParams,
}: Props<TData>) {
  const { categories } = useCategories()

  return (
    <>
      <div className="flex items-center justify-end gap-4 px-4">
        <InputGroup className="w-70">
          <InputGroupInput
            id="inline-start-input"
            placeholder="Search..."
            value={params.q}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                q: e.target.value,
                skip: 0,
              }))
            }
            className=""
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        <Select
          value={params.category}
          onValueChange={(value) =>
            setParams((prev) => ({
              ...prev,

              category: value === "all" ? "" : value,

              q: "",
              skip: 0,
            }))
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter Category"></SelectValue>
          </SelectTrigger>

          <SelectContent className="overflow-y-auto">
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-lg">
              <ListFilterPlus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((columns) => columns.getCanHide())
              .map((columns) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={columns.id}
                    checked={columns.getIsVisible()}
                    onCheckedChange={(value) =>
                      columns.toggleVisibility(!!value)
                    }
                    className="capitalize"
                  >
                    {columns.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
