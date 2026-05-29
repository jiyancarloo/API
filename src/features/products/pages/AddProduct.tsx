import CreateProductForm from "../components/ProductForm"
export default function AddProduct() {
  return (
    <>
      <div className="space-y-10">
        <div className="flex flex-col gap-1">
          <span className="text-3xl">New Product </span>
          <p className="text-sm text-gray-500">
            Complete all necessary information to successfully add a product
          </p>
        </div>
        <CreateProductForm />
      </div>
    </>
  )
}
