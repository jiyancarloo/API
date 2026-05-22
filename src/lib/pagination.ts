export const generatePagination = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  pages.push(1)

  if (currentPage > 3) {
    pages.push("ellipsis-left")
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis-right")
  }

  pages.push(totalPages)

  return pages
}
