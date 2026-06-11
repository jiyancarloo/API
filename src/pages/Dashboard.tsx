import StatCards from "@/components/Dashboard/stat-card"
import InventoryHealth from "@/components/Dashboard/inventory-health"
import CategoryChart from "@/components/Dashboard/category-chart"
import RecentProducts from "@/components/Dashboard/recent-products"
import LowProductStats from "@/components/Dashboard/lowstock-products"
export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        <section className="grid gap-3 sm:grid-cols-1 lg:grid-cols-4">
          <StatCards />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div>
            <InventoryHealth />
          </div>
          <div className="row-span-2 lg:col-span-2">
            <LowProductStats />
          </div>
          <div>
            <RecentProducts />
          </div>
        </section>

        <section className="grid">
          {" "}
          <CategoryChart />
        </section>
      </div>
    </>
  )
}
