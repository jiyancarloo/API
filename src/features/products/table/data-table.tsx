"use client"
import type { Product, ProductParams } from "../types/product.types"
import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableToolBar } from "./tool-bar-table"

type DataTableProps = {
  columns: ColumnDef<Product>[]

  data: Product[]

  params: ProductParams

  setParams: React.Dispatch<React.SetStateAction<ProductParams>>
}

export function DataTable({
  columns,
  data,
  params,
  setParams,
}: DataTableProps) {
  const [columnVisibility, setColumnVisiblity] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: { columnVisibility },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisiblity,
  })

  return (
    <>
      <div className="">
        <div className="mb-4">
          <DataTableToolBar
            table={table}
            params={params}
            setParams={setParams}
          />
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-gray-500">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
