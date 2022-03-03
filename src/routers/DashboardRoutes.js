import { Route, Routes } from "react-router-dom"
import { DashBoard } from "../components/dashboard/DashBoard"

export const DashboardRoutes = () => {
  return (
    <Routes>
        <Route path="/dash" element={<DashBoard />} />
    </Routes>
  )
}
