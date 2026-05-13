import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  UserMinus, 
  Package, 
  Activity, 
  Menu, 
  X,
  Bell,
  Cpu,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Executive' },
  { path: '/demand', icon: TrendingUp, label: 'Demand Forecasting' },
  { path: '/segmentation', icon: Users, label: 'Customer Segmentation' },
  { path: '/churn', icon: UserMinus, label: 'Churn Prediction' },
  { path: '/inventory', icon: Package, label: 'Inventory Health' },
  { path: '/mlops', icon: Activity, label: 'MLOps Monitor' },
];

export default function Shell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex text-white overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative z-30 h-screen transition-all duration-300 ease-in-out border-r border-white/10 bg-card/80 backdrop-blur-xl",
          isSidebarOpen ? "w-64" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/10 overflow-hidden shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className={cn(
                "font-display font-bold text-lg tracking-tight transition-opacity duration-200",
                isSidebarOpen ? "opacity-100" : "opacity-0"
              )}>
                NeuralRetail
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-gray-400 hover:text-white hover:bg-white/5",
                  isActive && "bg-primary/20 text-primary-light font-medium"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 shrink-0",
                  "group-hover:scale-110 transition-transform"
                )} />
                <span className={cn(
                  "whitespace-nowrap transition-opacity duration-200",
                  isSidebarOpen ? "opacity-100" : "opacity-0 md:hidden"
                )}>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* User Profile / Status */}
          <div className={cn(
            "p-6 border-t border-white/10 overflow-hidden transition-all duration-200",
            !isSidebarOpen && "md:p-4 text-center"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0 border border-white/10" />
              <div className={cn(
                "transition-opacity duration-200",
                isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
              )}>
                <p className="text-xs font-medium text-white truncate">Amdox Engineer</p>
                <p className="text-[10px] text-gray-500">Admin Role</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-sm font-medium text-gray-400 font-display">
              Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-1.5 hover:bg-white/5 rounded-lg text-gray-400">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border border-surface shadow-sm" />
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-primary-light">
              <Cpu className="w-3.5 h-3.5" />
              <span>SYSTEM: OPTIMAL</span>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
