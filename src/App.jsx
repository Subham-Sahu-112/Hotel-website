import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import Vendor from "./pages/vendor/vendor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendor/*" element={<Vendor />} />
      </Routes>
    </Router>
  );
}

export default App;
