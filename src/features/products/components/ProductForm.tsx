import { useForm } from "react-hook-form"

import type { CreateProductPayload } from "../types/product.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useCategories } from "../hooks/useCategory"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"

type ProductFormProps = {
  mode: "create" | "edit"
  onSubmit: (data: CreateProductPayload) => Promise<void> | void
  isPending: boolean
  initialValues?: Partial<CreateProductPayload>
}

export default function ProductForm({
  mode,
  onSubmit,
  isPending,
  initialValues,
}: ProductFormProps) {
  const form = useForm<CreateProductPayload>({
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",

      brand: initialValues?.brand ?? "",
      category: initialValues?.category ?? "",

      price: initialValues?.price ?? 0,
      stock: initialValues?.stock ?? 0,
    },
  })

  useEffect(() => {
    form.reset({
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",

      brand: initialValues?.brand ?? "",
      category: initialValues?.category ?? "",

      price: initialValues?.price ?? 0,
      stock: initialValues?.stock ?? 0,
    })
  }, [initialValues, form])

  const { categories } = useCategories()

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Product Name</FieldLabel>
            <Input
              id="name"
              autoComplete="off"
              {...form.register("title")}
              className="rounded-lg"
            />
          </Field>
        </FieldGroup>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="username">Brand</FieldLabel>
            <Input
              id="username"
              autoComplete="off"
              {...form.register("brand")}
              className="rounded-lg"
            />
          </Field>
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select
              value={form.watch("category")}
              onValueChange={(value) => form.setValue("category", value)}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="username">Price</FieldLabel>
            <Input
              type="number"
              {...form.register("price", {
                valueAsNumber: true,
              })}
              className="rounded-lg"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Stocks</FieldLabel>
            <Input
              type="number"
              {...form.register("stock", {
                valueAsNumber: true,
              })}
              className="rounded-lg"
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="checkout-7j9-optional-comments">
            Description
          </FieldLabel>
          <Textarea
            placeholder=""
            className="rounded-lg"
            {...form.register("description")}
          />
        </Field>
        <Field orientation="horizontal" className="justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="rounded-lg"
            size="lg"
          >
            {isPending ? (
              mode === "edit" ? (
                <div className="flex items-center gap-2">
                  Updating
                  <Spinner />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Creating
                  <Spinner />
                </div>
              )
            ) : mode === "edit" ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
        </Field>
      </FieldSet>
    </form>
  )
}
