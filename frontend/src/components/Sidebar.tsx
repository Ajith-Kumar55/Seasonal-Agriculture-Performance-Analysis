import React from 'react';
import {
  LayoutDashboard,
  Sprout,
  Sun,
  MapPin,
  CircleDollarSign,
  Droplets,
  CloudSun,
  GitCompare,
  BarChart3,
  Cpu,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  Info
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const groups = [
    {
      title: 'Overview',
      items: [
        { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Exploratory Analytics',
      items: [
        { id: 'crops', label: 'Crop Performance', icon: Sprout },
        { id: 'seasons', label: 'Seasonal Analysis', icon: Sun },
        { id: 'regions', label: 'Regional Analysis', icon: MapPin },
        { id: 'profitability', label: 'Profitability Analysis', icon: CircleDollarSign },
        { id: 'water', label: 'Water & Irrigation', icon: Droplets },
        { id: 'environmental', label: 'Environmental Analysis', icon: CloudSun },
        { id: 'correlation', label: 'Correlation Matrix', icon: GitCompare }
      ]
    },
    {
      title: 'Inferential Analytics',
      items: [
        { id: 'stats', label: 'Statistical Tests', icon: BarChart3 }
      ]
    },
    {
      title: 'Machine Learning',
      items: [
        { id: 'prediction', label: 'ML Yield Prediction', icon: Cpu }
      ]
    },
    {
      title: 'Strategy & Governance',
      items: [
        { id: 'findings', label: 'Key Findings', icon: CheckCircle2 },
        { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
        { id: 'methodology', label: 'Methodology', icon: BookOpen },
        { id: 'about', label: 'About Project', icon: Info }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 shrink-0 min-h-screen flex flex-col">
      <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
          <Sprout className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 text-sm leading-tight">Seasonal Ag Performance</h1>
          <p className="text-xs text-slate-400">VOIS AICTE Project</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-6 overflow-y-auto">
        {groups.map((group, idx) => (
          <div key={idx}>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800 text-xs text-slate-400">
        <p className="font-medium text-slate-300">VOIS Internship Major Project</p>
        <p className="text-slate-400">Dataset: 4,000 Records</p>
      </div>
    </aside>
  );
};
