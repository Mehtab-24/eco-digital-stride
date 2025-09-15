import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CarbonCalculator from "./pages/CarbonCalculator";
import CarbonFootprint from "./pages/CarbonFootprint";
import NotFound from "./pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/carbon-calculator" element={<CarbonCalculator />} />
    <Route path="/carbon-footprint" element={<CarbonFootprint />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);