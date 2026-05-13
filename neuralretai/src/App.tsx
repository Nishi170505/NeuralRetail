import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './components/layout/Shell';
import ExecutiveOverview from './pages/ExecutiveOverview';
import DemandForecasting from './pages/DemandForecasting';
import CustomerSegmentation from './pages/CustomerSegmentation';
import ChurnAnalysis from './pages/ChurnAnalysis';
import InventoryHealth from './pages/InventoryHealth';
import MLOpsMonitor from './pages/MLOpsMonitor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<ExecutiveOverview />} />
          <Route path="/demand" element={<DemandForecasting />} />
          <Route path="/segmentation" element={<CustomerSegmentation />} />
          <Route path="/churn" element={<ChurnAnalysis />} />
          <Route path="/inventory" element={<InventoryHealth />} />
          <Route path="/mlops" element={<MLOpsMonitor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
