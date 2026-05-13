import React, { useState } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { 
  Users, 
  Filter, 
  Maximize2, 
  Target, 
  ChevronRight,
  TrendingUp,
  Fingerprint
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const scatterData = Array.from({ length: 100 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 1000,
  cluster: i % 4,
}));

const clusters = [
  { id: 0, name: 'Champions', color: '#E84E1B', count: '12k', val: '$4.2M' },
  { id: 1, name: 'At Risk', color: '#F7941D', count: '8.4k', val: '$1.8M' },
  { id: 2, name: 'Hibernating', color: '#333333', count: '15k', val: '$0.5M' },
  { id: 3, name: 'Big Spenders', color: '#3b82f6', count: '4k', val: '$3.1M' },
];

const radarData = [
  { subject: 'Recency', A: 120, B: 110, fullMark: 150 },
  { subject: 'Frequency', A: 98, B: 130, fullMark: 150 },
  { subject: 'Monetary', A: 86, B: 130, fullMark: 150 },
  { subject: 'Engagement', A: 99, B: 100, fullMark: 150 },
  { subject: 'Support', A: 85, B: 90, fullMark: 150 },
  { subject: 'Volatility', A: 65, B: 85, fullMark: 150 },
];

export default function CustomerSegmentation() {
  const [selectedCluster, setSelectedCluster] = useState(clusters[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">Behavioural Segmentation</h2>
          <p className="text-sm text-gray-400">Silhouette-optimized K-Means clustering (K=4)</p>
        </div>
        <div className="flex bg-card/50 border border-white/5 rounded-2xl overflow-hidden p-1 shadow-inner">
          {['K-Means', 'DBSCAN', 'RFM'].map(algo => (
            <button 
              key={algo}
              className={cn(
                "px-4 py-1.5 text-xs font-semibold rounded-xl transition-all",
                algo === 'K-Means' ? "bg-primary text-white" : "text-gray-500 hover:text-gray-300"
              )}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cluster Map */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold font-display italic">Feature Space Mapping</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Axes: Spend vs Recency</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis type="number" dataKey="x" name="recency" stroke="#666" hide />
                <YAxis type="number" dataKey="y" name="monetary" stroke="#666" hide />
                <ZAxis type="number" dataKey="z" range={[50, 400]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2D2D2D', borderRadius: '12px' }}
                />
                <Scatter name="Customers" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={clusters[entry.cluster].color} 
                      fillOpacity={0.6}
                      stroke={clusters[entry.cluster].color}
                      strokeWidth={1}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-white/5">
            {clusters.map((c) => (
              <button 
                key={c.id}
                onClick={() => setSelectedCluster(c)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all",
                  selectedCluster.id === c.id ? "bg-white/10 border-white/20" : "bg-transparent border-transparent opacity-50 hover:opacity-100"
                )}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-xs font-bold uppercase tracking-wider">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-card p-6 flex flex-col space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-surface border border-white/5 shadow-inner">
                  <Fingerprint className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display uppercase tracking-tight">{selectedCluster.name}</h3>
              </div>
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Customers in this segment show high recency and frequency but moderate monetary value. High growth potential with loyalty incentives.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/2 rounded-xl p-4 border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Population</p>
              <p className="text-xl font-bold tracking-tight">{selectedCluster.count}</p>
            </div>
            <div className="bg-white/2 rounded-xl p-4 border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Est. Revenue</p>
              <p className="text-xl font-bold tracking-tight">{selectedCluster.val}</p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#2d2d2d" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar
                    name="Cluster Centroid"
                    dataKey="A"
                    stroke={selectedCluster.color}
                    fill={selectedCluster.color}
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2D2D2D', borderRadius: '12px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
            <Target className="w-4 h-4" />
            Launch Segment Campaign
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
