import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import ViewProducts from "@/pages/Product"

import Master from "@/layout/Master"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Master />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="products">
            <Route index element={<ViewProducts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
