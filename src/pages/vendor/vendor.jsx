import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Properties from "./components/Properties";
import Bookings from "./components/Bookings";
import Pricing from "./components/Pricing";
import Payments from "./components/Payments";
import Reviews from "./components/Reviews";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import VendorHotelView from "../Hotel-View/VendorHotelView";

export default function Vendor() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<VendorHotelView />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            
            {/* Fallback for unmatched routes */}
            <Route path="*" element={<Navigate to="/vender/dashboard" replace />} />
        </Routes>
    )
}