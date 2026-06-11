import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDashboardStats } from "../hooks/useDashboardStats"

export default function ProductStats() {
  const { stats } = useDashboardStats()
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>{stats.totalProducts}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>{stats.totalProducts}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  )
}
