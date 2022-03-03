import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoutes } from './PrivateRoutes';
import { DashboardRoutes } from './DashboardRoutes';
import { Login } from '../components/login/Login';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
                />
                <Route path="/*" element={
                        <PrivateRoutes>
                            <DashboardRoutes />
                        </PrivateRoutes>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}