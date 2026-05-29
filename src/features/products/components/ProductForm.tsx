import { useForm } from "react-hook-form"
import { useCreateProduct } from "../hooks/useCreateProduct"
import type { CreateProductPayload } from "../types/product.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function CreateProductForm() {
  const { mutateAsync, isPending } = useCreateProduct()

  const form = useForm<CreateProductPayload>({
    defaultValues: {
      title: "",
      price: 0,
      category: "",
      stock: 0,
      description: "",
    },
  })

  const onSubmit = async (data: CreateProductPayload) => {
    toast.promise(mutateAsync(data), {
      loading: "Creating product...",

      success: (data) => ({
        message: "Product Added",

        description: `${data.title} added successfully`,

        action: {
          label: "View",

          onClick: () => {
            console.log("View Product")
          },
        },
      }),

      error: "Failed to create product",
    })
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm">Product Name</label>
          <Input
            className="rounded-lg"
            placeholder="Title"
            {...form.register("title")}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm">Price</label>
          <Input
            type="number"
            className="rounded-lg"
            placeholder="Price"
            {...form.register("price", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm">Category</label>
          <Input
            className="rounded-lg"
            placeholder="Category"
            {...form.register("category")}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm">Stocks</label>
          <Input
            type="number"
            className="rounded-lg"
            placeholder="Stock"
            {...form.register("stock", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="text-sm">Description</label>
          <Textarea
            className="rounded-lg"
            placeholder="Description"
            {...form.register("description")}
          />
        </div>
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          className="rounded-lg"
          size="lg"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Add Product"}
        </Button>
      </div>
    </form>
  )
}
