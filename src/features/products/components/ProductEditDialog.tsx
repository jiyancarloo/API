import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import ProductForm from "./ProductForm"
import type { CreateProductPayload, Product } from "../types/product.types"
import { useUpdateProduct } from "../hooks/useUpdateProduct"

type EditProductDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export default function EditProductDialog({
  open,
  onOpenChange,
  product,
}: EditProductDialogProps) {
  const { mutateAsync, isPending } = useUpdateProduct()

  const handleUpdate = async (data: CreateProductPayload) => {
    toast.promise(mutateAsync({ id: product.id, data }), {
      loading: "Please wait to complete",
      success: {
        message: "Product Edited",
        description: `${product.title} edited successfully`,
      },
      error: "Error editing product",
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="">
          <DialogTitle className="text-xl leading-tight font-medium">
            Update Product
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          mode="edit"
          onSubmit={handleUpdate}
          isPending={isPending}
          initialValues={{
            title: product.title,
            description: product.description,
            category: product.category,
            brand: product.brand,
            price: product.price,
            stock: product.stock,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
