import { Outlet, useLocation } from "react-router-dom"
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/features/products/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Separator } from "@/components/ui/separator"
export default function Master() {
  const location = useLocation()

  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/products": "Product",
  }

  const title = titles[location.pathname] || ""

  return (
    <div className="flex min-h-screen">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="w-full">
              <header className="flex h-14 items-center gap-3 border-b px-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="my-4" />
                <span className="px-1 text-base">{title}</span>
              </header>
              <main className="flex-1">
                <Outlet />
                <Toaster />
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
