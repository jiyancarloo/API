import { createProduct } from "../api/add.product"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
