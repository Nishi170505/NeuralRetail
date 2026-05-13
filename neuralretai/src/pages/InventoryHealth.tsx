import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Package, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Truck,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import StatCard from '../components/dashboard/StatCard';

const leadTimeData = [
  { day: 'Mon', supplierA: 2.1, supplierB: 3.5 },
  { day: 'Tue', supplierA: 2.4, supplierB: 3.2 },
  { day: 'Wed', supplierA: 4.8, supplierB: 3.8 },
  { day: 'Thu', supplierA: 2.2, supplierB: 3.1 },
  { day: 'Fri', supplierA: 2.1, supplierB: 4.2 },
  { day: 'Sat', supplierA: 1.9, supplierB: 3.9 },
  { day: 'Sun', supplierA: 2.3, supplierB: 3.4 },
];

const healthDistribution = [
  { status: 'Optimal', count: 1240, color: '#10b981' },
  { status: 'Low Stock', count: 180, color: '#f59e0b' },
  { status: 'Out of Stock', count: 45, color: '#ef4444' },
  { status: 'Excess', count: 310, color: '#3b82f6' },
];

const reorderPlan = [
  { sku: 'ELC-POWER-01', current: 120, min: 250, reco: 500, lead: '2.5 days', supplier: 'TechVolt Inc.' },
  { sku: 'HOM-CLEAN-X2', current: 45, min: 100, reco: 200, lead: '4.1 days', supplier: 'CleanCo Ltd.' },
  { sku: 'SPT-GYM-Y4', current: 12, min: 50, reco: 150, lead: '5.2 days', supplier: 'FitGlobal' },
  { sku: 'BEA-LIP-RED', current: 890, min: 400, reco: 0, lead: '1.2 days', supplier: 'GlowSup' },
];

export default function InventoryHealth() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">Inventory Health & PO Automation</h2>
          <p className="text-sm text-gray-400">EOQ optimization and stockout risk mitigation</p>
        </div>
        <div className="flex gap-3">
           <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-sm font-medium text-emerald-400">
            <Database className="w-4 h-4" />
            <span>SYNC: ERP-STAGE-1</span>
          </div>
          <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-sm">
            Approve Auto-POs
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Stockout Frequency" value="0.8%" trend={{ value: "2.4%", isPositive: true }} icon={AlertCircle} color="rose" />
        <StatCard label="Inventory Turnover" value="8.2x" trend={{ value: "1.1x", isPositive: true }} icon={TrendingUp} color="blue" />
        <StatCard label="Excess Capital" value="$128k" trend={{ value: "15%", isPositive: true }} icon={Database} color="amber" />
        <StatCard label="Auto-PO Accuracy" value="96.4%" trend={{ value: "0.8%", isPositive: true }} icon={CheckCircle2} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Status Matrix */}
        <div className="glass-card p-6">
          <div className="mb-8">
            <h3 className="text-lg font-bold font-display">Stock Status Matrix</h3>
            <p className="text-sm text-gray-400">Distribution of active SKUs by health tier</p>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="status" type="category" stroke="#666" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
             {healthDistribution.map(h => (
               <div key={h.status} className="p-3 bg-white/2 rounded-xl border border-white/5">
                 <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{h.status}</p>
                 <div className="flex items-baseline gap-2">
                   <span className="text-lg font-bold">{h.count}</span>
                   <span className="text-[10px] text-gray-400">SKUs</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Lead Time Variance */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold font-display">Supplier Lead Time Performance</h3>
              <p className="text-sm text-gray-400">Historical vs projected arrival variance (Days)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-gray-400">Stable</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-gray-400">Volatile</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
                <XAxis dataKey="day" stroke="#666" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}d`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="supplierB" stroke="#E84E1B" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="supplierA" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex items-center gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10">
             <Clock className="w-5 h-5 text-primary shrink-0" />
             <p className="text-xs text-gray-400 leading-relaxed">
               Risk Detected: <b>Supplier B (CleanCo Ltd.)</b> shows increasing variance (σ² +1.4). Projected arrival delayed by 18h for next batch. Safety stock recommendation increased by 12% to compensate.
             </p>
          </div>
        </div>
      </div>

      {/* PO Recommendation Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold font-display">Automated Reorder Queue</h3>
          <p className="text-sm text-gray-400">EOQ-driven purchase recommendations pending approval</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Asset SKU</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Inventory Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Recommendation</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Primary Supplier</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Est. Lead</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reorderPlan.map((item) => (
                <tr key={item.sku} className="hover:bg-white/5 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center">
                        <Package className={cn("w-4 h-4", item.current < item.min ? "text-rose-400" : "text-gray-500")} />
                      </div>
                      <span className="text-sm font-mono text-white">{item.sku}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-bold">{item.current}</span>
                       <span className="text-xs text-gray-500">/ {item.min} min</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                   {item.reco > 0 ? (
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-bold border border-emerald-500/20">
                        + {item.reco} Units
                      </span>
                   ) : (
                      <span className="text-xs text-gray-500 italic">No action</span>
                   )}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-400">{item.supplier}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Truck className="w-3.5 h-3.5" />
                      {item.lead}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
