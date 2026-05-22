import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"

type PaginationProps = {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function AppPagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const PAGE_SIZES = [5, 10, 15, 20]
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className="flex items-center justify-end">
      {/* ROWS PER PAGE */}
      <div className="flex items-center gap-2">
        <p className="text-sm">Rows per page : </p>

        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-25">
            <SelectValue />
          </SelectTrigger>

          <SelectContent position="popper">
            {PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        {/* PAGINATION BUTTONS */}
        <span className="w-full">
          <p className="px-6 text-sm">
            Page {currentPage} of {totalPages}
          </p>
        </span>
        <Pagination>
          <PaginationContent>
            {/* FIRST */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon-lg"
                disabled={isFirstPage}
                onClick={() => onPageChange(1)}
              >
                <ChevronsLeft />
              </Button>
            </PaginationItem>

            {/* PREVIOUS */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon-lg"
                disabled={isFirstPage}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <ChevronLeft />
              </Button>
            </PaginationItem>

            {/* NEXT */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon-lg"
                disabled={isLastPage}
                onClick={() => onPageChange(currentPage + 1)}
              >
                <ChevronRight />
              </Button>
            </PaginationItem>

            {/* LAST */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon-lg"
                disabled={isLastPage}
                onClick={() => onPageChange(totalPages)}
              >
                <ChevronsRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
