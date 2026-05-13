import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';
import { 
  Search, 
  Filter, 
  Calculator, 
  ChevronRight, 
  TrendingUp, 
  CloudSun,
  Tags,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const generateData = (baseVal: number, trend: number, promo: boolean) => {
  const data = [];
  const start = new Date();
  for (let i = -10; i < 20; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const isFuture = i >= 0;
    const seasonality = Math.sin(i * 0.5) * 10;
    const promoEffect = (isFuture && promo) ? 25 : 0;
    const noise = (Math.random() - 0.5) * 5;
    const value = baseVal + (i * trend) + seasonality + noise + promoEffect;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      actual: isFuture ? null : Math.max(0, value),
      forecast: isFuture ? Math.max(0, value) : null,
      upper: isFuture ? Math.max(0, value + 15) : null,
      lower: isFuture ? Math.max(0, value - 15) : null,
    });
  }
  return data;
};

export default function DemandForecasting() {
  const [skuSearch, setSkuSearch] = useState('PROD-042 (Premium Headphones)');
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  const [hasPromo, setHasPromo] = useState(false);
  const [weatherShift, setWeatherShift] = useState(false);

  const forecastData = useMemo(() => {
    const trend = -0.5 + (priceAdjustment * -0.1);
    return generateData(120, trend, hasPromo);
  }, [priceAdjustment, hasPromo, weatherShift]);

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">Demand Intelligence</h2>
          <p className="text-sm text-gray-400">Bayesian SKU-level forecasting and what-if simulation</p>
        </div>
        
        <div className="flex bg-card/50 border border-white/5 rounded-2xl p-1.5 focus-within:ring-1 ring-primary/50 transition-all">
          <div className="flex items-center px-3 text-gray-500">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            value={skuSearch}
            onChange={(e) => setSkuSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-gray-200 min-w-[280px]"
            placeholder="Search by SKU, Category, or Brand..."
          />
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-primary mb-6 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Simulation Controls
            </h3>
            
            <div className="space-y-8">
              {/* Price Lever */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Price Adjustment</label>
                  <span className={cn(
                    "text-xs font-mono px-2 py-0.5 rounded bg-white/5",
                    priceAdjustment > 0 ? "text-rose-400" : "text-emerald-400"
                  )}>
                    {priceAdjustment > 0 ? '+' : ''}{priceAdjustment}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-30" 
                  max="30" 
                  value={priceAdjustment}
                  onChange={(e) => setPriceAdjustment(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
                  <span>-30%</span>
                  <span>0%</span>
                  <span>+30%</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => setHasPromo(!hasPromo)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl border transition-all",
                    hasPromo ? "bg-primary/10 border-primary text-primary-light" : "bg-white/2 border-white/5 text-gray-400 hover:border-white/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Tags className="w-4 h-4" />
                    <span className="text-sm font-medium">Holiday Promo</span>
                  </div>
                  <div className={cn(
                    "w-8 h-4 rounded-full relative transition-colors",
                    hasPromo ? "bg-primary" : "bg-gray-700"
                  )}>
                    <div className={cn(
                      "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                      hasPromo ? "left-4.5" : "left-0.5"
                    )} />
                  </div>
                </button>

                <button 
                  onClick={() => setWeatherShift(!weatherShift)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl border transition-all",
                    weatherShift ? "bg-blue-500/10 border-blue-500 text-blue-400" : "bg-white/2 border-white/5 text-gray-400 hover:border-white/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CloudSun className="w-4 h-4" />
                    <span className="text-sm font-medium">Weather Anomaly</span>
                  </div>
                  <div className={cn(
                    "w-8 h-4 rounded-full relative transition-colors",
                    weatherShift ? "bg-blue-500" : "bg-gray-700"
                  )}>
                    <div className={cn(
                      "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                      weatherShift ? "left-4.5" : "left-0.5"
                    )} />
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="flex items-center gap-2 text-primary-light mb-2">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">AI Recommendation</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Based on price elasticity (η = -1.2), a 5% decrease in price combined with the upcoming holiday promo will likely yield a 18% lift in volume.
              </p>
            </div>
          </div>
        </div>

        {/* Forecast Chart Panel */}
        <div className="lg:col-span-3 glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-lg font-bold font-display">Hybrid Prophetic Forecast</h3>
                <p className="text-sm text-gray-400">30-day look-ahead (90% Confidence Interval)</p>
              </div>
              <div className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-gray-500">
                MODEL: PROPHET+LSTM_V4
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-white/40" />
                <span className="text-gray-400 italic">Historical</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-gray-400">Forecast</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2d2d2d', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                {/* Confidence Interval */}
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  stroke="none" 
                  fill="#E84E1B" 
                  fillOpacity={0.1} 
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  stroke="none" 
                  fill="#E84E1B" 
                  fillOpacity={0.1} 
                />
                
                {/* Actual Data */}
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#999" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                
                {/* Forecast Data */}
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#E84E1B" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#E84E1B', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Expected Units</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display">4,281</span>
                <span className="text-xs text-emerald-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.4%
                </span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Safety Stock Rec.</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display">850</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-rose-500/10 text-rose-400 rounded border border-rose-500/20">
                  CRITICAL
                </span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Stockout Prob.</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display">12%</span>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
