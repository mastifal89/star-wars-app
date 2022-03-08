import { Route, Routes } from "react-router-dom"
import { DashBoard } from "../components/dashboard/DashBoard";
import { DetailScreen } from "../components/details/DetailScreen";

export const DashboardRoutes = () => {
  return (
    <Routes>
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/details" element={<DetailScreen />} />
    </Routes>
  )
}
