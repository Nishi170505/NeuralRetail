import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

export default function StatCard({ 
  label, 
  value, 
  subValue, 
  trend, 
  icon: Icon, 
  color = "primary",
  delay = 0 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className="glass-card p-6 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div className={cn(
          "p-2.5 rounded-xl",
          color === "primary" ? "bg-primary/20 text-primary-light" : 
          color === "green" ? "bg-emerald-500/20 text-emerald-400" :
          color === "blue" ? "bg-blue-500/20 text-blue-400" :
          "bg-amber-500/20 text-amber-400"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend.isPositive ? "text-emerald-400" : "text-rose-400"
          )}>
            {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400">{label}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-display tracking-tight text-white">{value}</span>
          {subValue && <span className="text-xs text-gray-500">{subValue}</span>}
        </div>
      </div>
    </motion.div>
  );
}
