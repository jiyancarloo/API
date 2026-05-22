import { useForm } from "react-hook-form"

import { useCreateProduct } from "../hooks/useCreateProduct"

import type { CreateProductPayload } from "../types/product.types"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

export default function CreateProductForm() {
  const { mutate, isPending } = useCreateProduct()

  const form = useForm<CreateProductPayload>({
    defaultValues: {
      title: "",
      price: 0,
      category: "",
      stock: 0,
      description: "",
    },
  })

  const onSubmit = (data: CreateProductPayload) => {
    console.log(data)
    mutate(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Title" {...form.register("title")} />

      <Input
        type="number"
        placeholder="Price"
        {...form.register("price", {
          valueAsNumber: true,
        })}
      />

      <Input placeholder="Category" {...form.register("category")} />

      <Input
        type="number"
        placeholder="Stock"
        {...form.register("stock", {
          valueAsNumber: true,
        })}
      />

      <Input placeholder="Description" {...form.register("description")} />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </Button>
    </form>
  )
}
