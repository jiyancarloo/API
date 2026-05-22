import { useProduct } from "@/features/products/hooks/useProduct"
import { AppPagination } from "@/features/products/table/table-pagination"
import { DataTable } from "@/features/products/table/data-table"
import { getColumns } from "@/features/products/table/columns"

export default function TableView() {
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
  const columns = getColumns(params, setParams)

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
      </div>
    </>
  )
}
