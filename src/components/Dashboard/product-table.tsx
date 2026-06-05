import { useState } from "react"
import type { Product } from "@/features/products/types/product.types"
import { useProduct } from "@/features/products/hooks/useProduct"
import { AppPagination } from "@/features/products/table/table-pagination"
import { DataTable } from "@/features/products/table/data-table"
import { getColumns } from "@/features/products/table/columns"
import EditProductDialog from "@/features/products/components/ProductEditDialog"
import DeleteProductDialog from "@/features/products/components/ProductDeleteDialog"

export default function TableView() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const [isEditOpen, setIsEditOpen] = useState(false)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    setParams,
    params,
  } = useProduct()

  const handleEditClick = (products: Product) => {
    setSelectedProduct(products)
    setIsEditOpen(true)
  }

  const handleDeleteClick = (products: Product) => {
    setSelectedProduct(products)
    setIsDeleteOpen(true)
  }
  const columns = getColumns(
    params,
    setParams,
    handleEditClick,
    handleDeleteClick
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <div className="flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={products}
          params={params}
          setParams={setParams}
        />
        <AppPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={params.limit ?? 10}
          onPageChange={goToPage}
          onPageSizeChange={(size) => {
            setParams((prev) => ({
              ...prev,
              limit: size,
              skip: 0,
            }))
          }}
        />

        {selectedProduct && (
          <EditProductDialog
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            product={selectedProduct}
          />
        )}

        {selectedProduct && (
          <DeleteProductDialog
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            product={selectedProduct}
          />
        )}
      </div>
    </>
  )
}
