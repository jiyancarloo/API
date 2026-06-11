import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NavLink } from "react-router-dom"
import { LayoutDashboard, Cuboid } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const navLinks = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard absoluteStrokeWidth />,
    },
    {
      title: "Products",
      path: "/products",
      icon: <Cuboid />,
    },
  ]
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                {/* Logo Container */}
                <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl transition-all duration-500">
                  <img
                    src="/icon.png"
                    alt="API Test"
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                {/* Text */}
                <div className="grid flex-1 leading-tight transition-all duration-500 group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-sans text-sm font-medium">
                    Inventory Management
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    v 2.0 Pro Max
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink to={item.path}>
                      {({ isActive }) => (
                        <SidebarMenuButton
                          className={
                            isActive
                              ? "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                              : "hover:bg-muted"
                          }
                        >
                          {item.icon}

                          {!collapsed && (
                            <span className="tracking ml-2 font-sans">
                              {item.title}
                            </span>
                          )}
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </TooltipTrigger>

                  {collapsed && (
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  )}
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
