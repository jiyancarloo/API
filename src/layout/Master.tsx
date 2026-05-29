import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/features/products/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
export default function Master() {
  return (
    <div className="flex min-h-screen">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />

          <div className="w-full">
            <header className="my-1 flex h-14 items-center px-4">
              <SidebarTrigger />
            </header>
            <main className="flex-1 p-6">
              <Outlet />
              <Toaster />
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
