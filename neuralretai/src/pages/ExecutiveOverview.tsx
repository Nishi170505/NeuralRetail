import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell,
  PieChart, 
  Pie
} from 'recharts';
import { 
  ArrowUpRight, 
  Target, 
  ShieldCheck, 
  Zap, 
  Users, 
  Package, 
  RefreshCcw 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import StatCard from '../components/dashboard/StatCard';
import { motion } from 'motion/react';

const revenueData = [
  { month: 'Jan', revenue: 1.2, target: 1.1 },
  { month: 'Feb', revenue: 1.3, target: 1.2 },
  { month: 'Mar', revenue: 1.1, target: 1.3 },
  { month: 'Apr', revenue: 1.5, target: 1.4 },
  { month: 'May', revenue: 1.8, target: 1.6 },
  { month: 'Jun', revenue: 1.7, target: 1.7 },
];

const segmentData = [
  { name: 'Loyal', value: 40, color: '#E84E1B' },
  { name: 'At Risk', value: 25, color: '#F7941D' },
  { name: 'New', value: 20, color: '#FBBA13' },
  { name: 'Churned', value: 15, color: '#333333' },
];

export default function ExecutiveOverview() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Executive Summary
          </h2>
          <p className="mt-2 text-gray-400 max-w-2xl text-sm md:text-base">
            Operational intelligence for Amdox retail clients. Monitor demand shifts, 
            inventory distribution, and customer retention at scale.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-2 text-sm font-medium text-primary-light">
            <RefreshCcw className="w-4 h-4" />
            <span>Updated: 5m ago</span>
          </div>
          <button className="px-4 py-2 bg-white text-black font-semibold rounded-xl text-sm hover:bg-gray-100 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Demand MAPE" 
          value="8.4%" 
          subValue="vs 12% target"
          trend={{ value: "2.1%", isPositive: true }}
          icon={Target}
          color="primary"
          delay={0}
        />
        <StatCard 
          label="Churn Risk AUC" 
          value="0.94" 
          subValue="Current Model (XGB)"
          trend={{ value: "0.02", isPositive: true }}
          icon={ShieldCheck}
          color="blue"
          delay={1}
        />
        <StatCard 
          label="Stockout Mitigation" 
          value="42%" 
          subValue="Since deployment"
          trend={{ value: "12%", isPositive: true }}
          icon={Zap}
          color="amber"
          delay={2}
        />
        <StatCard 
          label="Monthly Transactions" 
          value="18.2M" 
          subValue="+1.2M this month"
          trend={{ value: "8%", isPositive: true }}
          icon={Users}
          color="green"
          delay={3}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Target */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold font-display">Revenue Intelligence</h3>
              <p className="text-sm text-gray-400">Actual vs targeted GMV performance ($M)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-gray-400">Actual</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 border border-dashed border-gray-500 rounded-full" />
                <span className="text-gray-400">Target</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E84E1B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E84E1B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `$${val}M`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#E84E1B" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#666" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segmentation Pie */}
        <div className="glass-card p-6 flex flex-col">
          <div className="mb-8">
            <h3 className="text-lg font-bold font-display">Segment Mix</h3>
            <p className="text-sm text-gray-400">Distribution of customer health</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold font-display">1.2M</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Customers</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {segmentData.map((segment) => (
                <div key={segment.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }} />
                    <span className="text-sm text-gray-300">{segment.name}</span>
                  </div>
                  <span className="text-sm font-medium">{segment.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inventory & MLOps Status Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold font-display">Critical Inventory Risk</h3>
            <button className="text-xs text-primary-light hover:underline">View All Health</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU Group</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Demand Prob.</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Projected S.O.</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Rel. Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { sku: 'Electronics-A1', prob: '88%', so: '2.4 days', risk: 'High', color: 'text-rose-400' },
                  { sku: 'Home-C23', prob: '45%', so: '0 days', risk: 'Stable', color: 'text-emerald-400' },
                  { sku: 'Beauty-B9', prob: '92%', so: '5.1 days', risk: 'Critical', color: 'text-rose-500' },
                  { sku: 'Sports-L2', prob: '12%', so: '12 days', risk: 'Overstock', color: 'text-amber-400' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{item.sku}</td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{item.prob}</td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{item.so}</td>
                    <td className={cn("px-6 py-4 text-xs font-bold uppercase", item.color)}>
                      {item.risk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold font-display mb-6">Model Retraining Status</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <RefreshCcw className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Demand Model (Prophet-LSTM)</span>
                  <span className="text-xs text-emerald-400 uppercase font-bold">In Production</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%]" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
                  <span>Last Train: 12h ago</span>
                  <span>Accuracy: 91.6%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <RefreshCcw className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Churn Classifier (XGBoost)</span>
                  <span className="text-xs text-blue-400 uppercase font-bold">Challenger Ready</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[78%]" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
                  <span>Last Train: 2d ago</span>
                  <span>Accuracy: 88.2%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <RefreshCcw className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Price Elasticity (DoWhy)</span>
                  <span className="text-xs text-primary uppercase font-bold">Calculating...</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="h-full bg-primary w-[30%]" 
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
                  <span>In Progress</span>
                  <span>Queue Pos: 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
