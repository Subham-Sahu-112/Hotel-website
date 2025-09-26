import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import Vendor from "./pages/vendor/vendor";
import VendorRegister from "./pages/register/VendorRegister";
import CustomerRegister from "./pages/register/CustomerRegister";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vender-register" element={<VendorRegister />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vender/*" element={<Vendor />} />
      </Routes>
    </Router>
  );
}

export default App;
