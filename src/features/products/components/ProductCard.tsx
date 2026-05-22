import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { useProduct } from "@/features/products/hooks/useProduct"

export default function ProductCard() {
  const { products, loading, error, params, setParams } = useProduct()

  if (loading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner />
      </div>
    )
  if (error) return <p>{error}</p>
  return (
    <>
      <div className="mb-3 flex justify-end">
        <Button
          size="lg"
          onClick={() => {
            setParams((prev) => ({
              ...prev,
              order: prev.order === "asc" ? "desc" : "asc",
            }))
          }}
        >
          Sort {params.order}
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <img
              src={product.images[0]}
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">{product.category}</Badge>
              </CardAction>
              <CardTitle className="text-xl">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="font-sans">
              {product.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
