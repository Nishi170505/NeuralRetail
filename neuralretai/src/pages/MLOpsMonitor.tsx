import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Activity, 
  Database, 
  Cpu, 
  Server, 
  Globe, 
  ShieldCheck, 
  Clock,
  ExternalLink,
  ChevronRight,
  Terminal
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import StatCard from '../components/dashboard/StatCard';

const driftData = [
  { time: '00:00', psi: 0.05 },
  { time: '04:00', psi: 0.08 },
  { time: '08:00', psi: 0.12 },
  { time: '12:00', psi: 0.22 },
  { time: '16:00', psi: 0.18 },
  { time: '20:00', psi: 0.14 },
];

const latencyData = [
  { env: 'PROD (P99)', value: 120, color: '#E84E1B' },
  { env: 'STAGE (P99)', value: 145, color: '#F7941D' },
  { env: 'DEV (P99)', value: 180, color: '#333' },
];

const activeModels = [
  { name: 'demand_forecaster_v4', status: 'Healthy', type: 'Prophet+LSTM', version: '2.1.0', load: '1.2ms' },
  { name: 'churn_classifier_xgb', status: 'Drift Detected', type: 'XGBoost', version: '1.4.2', load: '0.8ms' },
  { name: 'cust_segmenter_kmeans', status: 'Healthy', type: 'K-Means', version: '0.9.1', load: '24ms' },
  { name: 'price_elasticity_causal', status: 'Stale', type: 'DoWhy', version: '1.1.0', load: '150ms' },
];

export default function MLOpsMonitor() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">MLOps Infrastructure Monitor</h2>
          <p className="text-sm text-gray-400">Real-time tracking of model drift, resource health, and pipeline status</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Open MLflow Registry
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            <Terminal className="w-4 h-4" />
            View Logs
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Inference Thruput" value="1.5k" subValue="req/sec" trend={{ value: "12%", isPositive: true }} icon={Globe} color="blue" />
        <StatCard label="P99 Latency" value="122ms" subValue="Stable" trend={{ value: "5ms", isPositive: true }} icon={Clock} color="green" />
        <StatCard label="Storage (S3/Delta)" value="4.2TB" subValue="Last 30d" trend={{ value: "0.8TB", isPositive: false }} icon={Database} color="amber" />
        <StatCard label="Active Runs" value="14" subValue="Airflow + Spark" trend={{ value: "2", isPositive: true }} icon={Activity} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drift Monitoring */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold font-display">Feature Drift Index (PSI)</h3>
              <p className="text-sm text-gray-400">Tracking population stability across input layers</p>
            </div>
            <div className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-bold text-rose-400 animate-pulse">
               ALERT: DRIFT AT 12:00
            </div>
          </div>
          
          <div className="h-[280px]">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={driftData}>
                <defs>
                  <linearGradient id="colorPsi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={0.22 > 0.2 ? "#ef4444" : "#E84E1B"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E84E1B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
                <XAxis dataKey="time" stroke="#666" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="psi" 
                  stroke="#E84E1B" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPsi)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/5">
             <div className="flex items-center gap-4">
               <ShieldCheck className="w-5 h-5 text-emerald-400" />
               <span className="text-xs text-gray-400">Auto-retrain triggered successfully at 12:05 UTC</span>
             </div>
             <button className="text-xs font-bold uppercase text-primary hover:underline">View Report</button>
          </div>
        </div>

        {/* Latency / Env Stats */}
        <div className="glass-card p-6 flex flex-col">
          <div className="mb-8">
            <h3 className="text-lg font-bold font-display">Environment Latency</h3>
            <p className="text-sm text-gray-400">Comparative P99 profiling (ms)</p>
          </div>
          
          <div className="flex-1 min-h-[220px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="env" type="category" stroke="#666" fontSize={10} axisLine={false} tickLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {latencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 space-y-4 pt-6 border-t border-white/5">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs text-gray-500">
                 <Cpu className="w-4 h-4" />
                 <span>CPU Utilization (Cluster)</span>
               </div>
               <span className="text-xs font-bold">42%</span>
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs text-gray-500">
                 <Server className="w-4 h-4" />
                 <span>Memory Usage (Redis)</span>
               </div>
               <span className="text-xs font-bold">12.4GB</span>
             </div>
          </div>
        </div>
      </div>

      {/* Model Inventory */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold font-display">Model Registry Status</h3>
          <p className="text-sm text-gray-400">Current production artifacts and lineage</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Model Name</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Algorithm</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Version</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Avg Latency</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Lineage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeModels.map((model) => (
                <tr key={model.name} className="hover:bg-white/5 transition-all group">
                  <td className="px-6 py-5">
                    <span className="text-sm font-mono text-white font-bold">{model.name}</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-400">{model.type}</td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-gray-500">
                      v{model.version}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className={cn(
                         "w-1.5 h-1.5 rounded-full shadow-sm shadow-current",
                         model.status === 'Healthy' ? "bg-emerald-500 text-emerald-500" : 
                         model.status === 'Drift Detected' ? "bg-rose-500 text-rose-500 animate-pulse" :
                         "bg-gray-500 text-gray-500"
                       )} />
                       <span className={cn(
                         "text-xs font-bold uppercase tracking-wide",
                         model.status === 'Healthy' ? "text-emerald-400" : 
                         model.status === 'Drift Detected' ? "text-rose-400" :
                         "text-gray-500"
                       )}>
                         {model.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-mono text-gray-500">{model.load}</td>
                  <td className="px-6 py-5">
                     <button className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors">
                       Map
                       <ChevronRight className="w-3 h-3" />
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
