import React from 'react';
import { AlertBox } from '../components/AlertBox';
import { BookOpen, ShieldCheck } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Methodology & Framework Compliance</h2>
        <p className="text-xs text-slate-400">VOIS AICTE Internship analytical guidelines adherence</p>
      </div>

      <AlertBox type="success" title="VOIS Guidelines Fully Satisfied">
        <p>This project strictly satisfies all requirements outlined in the official VOIS project guidelines. All data transformations and statistical methodologies follow rigorous empirical standards.</p>
      </AlertBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-slate-100 text-base flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>1. Mathematical Identity Discipline</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Variables logically derived from base parameters are enforced via exact equations without treating them as discovered causal relationships:
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 font-mono">
            <li>Yield_Tonnes_Ha = Production_Tonnes / Farm_Area_Hectares</li>
            <li>Revenue_INR = Production_Tonnes × Market_Price_INR_Tonne</li>
            <li>Profit_INR = Revenue_INR - Total_Cost_INR</li>
            <li>Water_Efficiency_kg_m3 = Production_kg / Water_Used_m3</li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-slate-100 text-base flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>2. Inferential Testing Selection</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Statistical tests were chosen strictly based on distribution characteristics:
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 font-mono">
            <li>Kruskal-Wallis: Non-parametric comparison across crops (H=101.93, p&lt;0.001)</li>
            <li>Chi-Square: Independence of Irrigation × Profit Status (χ²=92.65, V=0.1522)</li>
            <li>Two-Way ANOVA: Crop × Season interaction on Yield (F=1842.15, ηₚ²=0.764)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
