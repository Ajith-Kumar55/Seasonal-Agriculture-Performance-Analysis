import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { CorrelationData } from '../types/api';
import { AlertBox } from '../components/AlertBox';
import { GitCompare } from 'lucide-react';

export const CorrelationAnalysisPage: React.FC = () => {
  const [data, setData] = useState<CorrelationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getCorrelation();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !data) return <div className="p-8 text-slate-400">Loading Correlation Data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Pearson & Spearman Correlation Analysis</h2>
        <p className="text-xs text-slate-400">Empirical relationship evaluation across agronomic and economic parameters</p>
      </div>

      <AlertBox type="important" title="Non-Causal Interpretation Guideline">
        <p>In strict accordance with VOIS AICTE guidelines, correlation coefficients quantify statistical co-variation only. Mathematical identities (e.g. Production = Area × Yield, Revenue = Production × Price) are intentionally excluded from empirical correlation conclusions to avoid trivial tautologies.</p>
      </AlertBox>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-x-auto">
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center space-x-2">
          <GitCompare className="w-4 h-4 text-emerald-400" />
          <span>Empirical Non-Tautological Correlations</span>
        </h3>
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-3">Variable Pair</th>
              <th className="p-3">Pearson r</th>
              <th className="p-3">Pearson p</th>
              <th className="p-3">Spearman ρ</th>
              <th className="p-3">Spearman p</th>
              <th className="p-3">Type</th>
              <th className="p-3">Interpretation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {data.significant_relationships.map((rel, idx) => (
              <tr key={idx} className="hover:bg-slate-800/50">
                <td className="p-3 font-semibold text-slate-100">{rel.pair}</td>
                <td className="p-3 font-mono">{rel.pearson_r.toFixed(4)}</td>
                <td className="p-3 font-mono text-slate-400">{rel.pearson_p < 0.001 ? '< 0.001' : rel.pearson_p.toFixed(4)}</td>
                <td className="p-3 font-mono">{rel.spearman_rho.toFixed(4)}</td>
                <td className="p-3 font-mono text-slate-400">{rel.spearman_p < 0.001 ? '< 0.001' : rel.spearman_p.toFixed(4)}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px]">
                    {rel.relationship_type}
                  </span>
                </td>
                <td className="p-3 text-slate-300 max-w-md">{rel.interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
