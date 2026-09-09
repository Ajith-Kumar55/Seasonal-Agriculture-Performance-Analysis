import React from 'react';
import { Database, Award, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTabTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTabTitle }) => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{activeTabTitle}</h2>
        <p className="text-xs text-slate-400">Empirical Agricultural Analytics & Decision Support System</p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs text-slate-300">
          <Database className="w-3.5 h-3.5 text-blue-400" />
          <span>4,000 Rows • 28 Columns</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Non-Causal Rules</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-400">
          <Award className="w-3.5 h-3.5" />
          <span>VOIS AICTE Standard</span>
        </div>
      </div>
    </header>
  );
};
