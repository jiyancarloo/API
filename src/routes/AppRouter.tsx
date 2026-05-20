import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "@/pages/Dashboard"
import ViewProducts from "@/pages/Product"
import Master from "@/layout/Master"

export default function AppRouter() {
  const routes = [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/products",
      element: <ViewProducts />,
    },
  ]
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Master />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
