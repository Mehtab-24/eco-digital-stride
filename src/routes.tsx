// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarbonFootprint from "./pages/CarbonFootprint"; // Personal footprint
import CarbonCalculator from "./pages/CarbonCalculator"; // Digital footprint
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/carbon-footprint" element={<CarbonFootprint />} />
    <Route path="/calculator" element={<CarbonCalculator />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);