import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import Vendor from "./pages/vendor/vendor";
import VendorRegister from "./pages/register/VendorRegister";
import CustomerRegister from "./pages/register/CustomerRegister";
import Login from "./pages/register/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateListing from "./pages/vendor/Create-listing/CreateListing";
import AllHotels from "./pages/all-hotels/AllHotels";
import HotelView from "./pages/Hotel-View/HotelView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vender-register" element={<VendorRegister />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vender/*" element={<Vendor />} />
        <Route path="/add-listings" element={<CreateListing />} />
        <Route path="/all-hotels" element={<AllHotels />} />
        <Route path="/hotel/:id" element={<HotelView />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
