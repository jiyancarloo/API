import { Outlet } from "react-router-dom"
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/features/products/components/app-sidebar"

export default function Master() {
  return (
    <div className="flex min-h-screen">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <header className="flex h-14 items-center border-b px-4">
              <SidebarTrigger />
            </header>
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
