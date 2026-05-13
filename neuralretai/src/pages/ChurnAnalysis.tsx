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
  LabelList
} from 'recharts';
import { 
  UserMinus, 
  AlertTriangle, 
  Search, 
  Download, 
  ArrowRight,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import StatCard from '../components/dashboard/StatCard';

const churnRiskData = [
  { range: '0-20%', count: 850, color: '#10b981' },
  { range: '20-40%', count: 420, color: '#34d399' },
  { range: '40-60%', count: 280, color: '#fbbf24' },
  { range: '60-80%', count: 180, color: '#f59e0b' },
  { range: '80-100%', count: 95, color: '#ef4444' },
];

const shapData = [
  { feature: 'Last Purchase Days', impact: 0.28 },
  { feature: 'Total Order Value', impact: -0.15 },
  { feature: 'App Open Freq', impact: -0.12 },
  { feature: 'Promo Engagement', impact: 0.08 },
  { feature: 'Cust. Service Calls', impact: 0.18 },
  { feature: 'Subscription Status', impact: -0.22 },
];

const topAtRisk = [
  { id: 'CUST-8821', name: 'James Wilson', score: '94%', lifetime: '$2,450', reason: 'High Support Activity' },
  { id: 'CUST-1042', name: 'Sarah Chen', score: '88%', lifetime: '$12,800', reason: 'Recency Drop' },
  { id: 'CUST-4491', name: 'Marcus Jones', score: '82%', lifetime: '$920', reason: 'Failed Payment' },
  { id: 'CUST-2930', name: 'Elena Rodriguez', score: '79%', lifetime: '$4,100', reason: 'Low Engagement' },
  { id: 'CUST-7712', name: 'David Smith', score: '75%', lifetime: '$3,150', reason: 'Competitor Switch' },
];

export default function ChurnAnalysis() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">Churn Prediction Engine</h2>
          <p className="text-sm text-gray-400">Individual risk scoring with SHAP explainability</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            <Download className="w-4 h-4" />
            Export High-Risk Cohort
          </button>
          <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20">
            Trigger Retention Campaign
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Model Performance (AUC)" 
          value="0.942" 
          subValue="XGBoost Classifier"
          trend={{ value: "0.01", isPositive: true }}
          icon={ShieldAlert}
          color="blue"
        />
        <StatCard 
          label="Predicted Churners" 
          value="275" 
          subValue="Next 30 days"
          trend={{ value: "12%", isPositive: false }}
          icon={UserMinus}
          color="rose"
        />
        <StatCard 
          label="Retention Lift" 
          value="+15.4%" 
          subValue="Using AI Recs"
          trend={{ value: "4.2%", isPositive: true }}
          icon={Zap}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="glass-card p-6">
          <div className="mb-8">
            <h3 className="text-lg font-bold font-display">Risk Score Distribution</h3>
            <p className="text-sm text-gray-400">Count of customers by predicted churn probability</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={churnRiskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
                <XAxis dataKey="range" stroke="#666" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {churnRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                  <LabelList dataKey="count" position="top" fill="#666" fontSize={10} offset={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global SHAP Importance */}
        <div className="glass-card p-6">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold font-display">Global Feature Impact</h3>
              <p className="text-sm text-gray-400">Mean SHAP absolute values (model drivers)</p>
            </div>
            <div className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-gray-500">
              SHAP_V2_KERNEL
            </div>
          </div>
          <div className="space-y-5">
            {shapData.map((item) => (
              <div key={item.feature} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">{item.feature}</span>
                  <span className={item.impact > 0 ? "text-rose-400" : "text-emerald-400 font-bold"}>
                    {item.impact > 0 ? '+' : ''}{item.impact}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="flex-1 flex justify-end">
                    <div 
                      className="h-full bg-emerald-500 rounded-l-full" 
                      style={{ width: item.impact < 0 ? `${Math.abs(item.impact) * 200}%` : '0%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <div 
                      className="h-full bg-rose-500 rounded-r-full" 
                      style={{ width: item.impact > 0 ? `${item.impact * 200}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-[10px] uppercase font-mono text-gray-700 pt-2">
              <span>Prevents Churn</span>
              <span>Drives Churn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top At-Risk Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-display">Top Customers at Risk</h3>
            <p className="text-sm text-gray-400">Prioritized by Churn Score and Lifetime Value</p>
          </div>
          <div className="flex bg-white/5 rounded-xl px-3 py-2 border border-white/5">
            <Search className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
            <input type="text" placeholder="Search customer ID..." className="bg-transparent border-none outline-none text-xs w-40" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Churn Score</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Lifetime Value</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Primary Logic</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topAtRisk.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                        {cust.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{cust.name}</p>
                        <p className="text-[10px] text-gray-500 font-mono">{cust.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            parseInt(cust.score) > 85 ? "bg-rose-500" : "bg-amber-500"
                          )} 
                          style={{ width: cust.score }}
                        />
                      </div>
                      <span className="text-sm font-bold font-mono">{cust.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-mono text-gray-400">{cust.lifetime}</td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-medium text-gray-400">
                      {cust.reason}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors text-gray-500 group-hover:text-white">
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
