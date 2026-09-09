import React from 'react';
import { Award } from 'lucide-react';

export const AboutProjectPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">About the Project</h2>
        <p className="text-xs text-slate-400">VOIS AICTE Internship Major Project Documentation</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Seasonal Agriculture Performance Analysis</h3>
            <p className="text-xs text-slate-400">VOIS AICTE Internship Major Project Deliverable</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400">Dataset Scope</span>
            <p className="text-slate-100 font-bold mt-1">4,000 Observations • 28 Columns</p>
          </div>
          <div>
            <span className="text-slate-400">Crops Analyzed</span>
            <p className="text-slate-100 font-bold mt-1">8 Crop Species (Rice, Wheat, Maize, Cotton, Pulses, Groundnut, Chilli, Sugarcane)</p>
          </div>
          <div>
            <span className="text-slate-400">Best ML Model</span>
            <p className="text-emerald-400 font-bold mt-1">Gradient Boosting (R² = 0.9745)</p>
          </div>
        </div>

        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
          <p>This web application acts as the interactive presentation layer for the completed agricultural performance study, communicating findings across agronomic, financial, and environmental dimensions.</p>
        </div>
      </div>
    </div>
  );
};
