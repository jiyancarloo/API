import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import ProductForm from "./ProductForm"

import { useCreateProduct } from "../hooks/useCreateProduct"
import type { CreateProductPayload } from "../types/product.types"

export function ProductDialog() {
  const { mutateAsync, isPending } = useCreateProduct()
  const [open, setOpen] = useState(false)

  const handleCreate = async (data: CreateProductPayload) => {
    try {
      const product = await mutateAsync(data)

      toast.success("Product Added", {
        description: `${product.title} Added Succesfully`,
      })

      setOpen(false)
    } catch {
      toast.error("Failed to add product")
    }
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon-lg">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="text-xl leading-tight font-medium">
            New Product
          </DialogTitle>

          <DialogDescription>
            Complete form below to add a product
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          mode="create"
          onSubmit={handleCreate}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
