import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteProduct } from "../hooks/useDeleteProduct"
import type { Product } from "../types/product.types"
import { toast } from "sonner"

type DeleteProductDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export default function DeleteProductDialog({
  open,
  onOpenChange,
  product,
}: DeleteProductDialogProps) {
  const { mutateAsync, isPending } = useDeleteProduct()

  const handleDelete = async () => {
    toast.promise(mutateAsync(product.id), {
      loading: "Deleting Product...",

      success: {
        message: "Product Deleted",
        description: `${product.title} deleted successfully`,
      },

      error: "Failed to delete product",
    })

    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {product.title}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} variant="outline">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
