import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LoginPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f6f7fb] text-gray-800">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />
          {/* Main Dashboard */}
          
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
