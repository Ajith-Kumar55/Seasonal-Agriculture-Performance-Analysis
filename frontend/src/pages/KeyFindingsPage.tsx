import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { FindingItem } from '../types/api';
import { CheckCircle2 } from 'lucide-react';

export const KeyFindingsPage: React.FC = () => {
  const [findings, setFindings] = useState<FindingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getFindings();
        setFindings(res.findings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-8 text-slate-400">Loading Key Findings...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Key Empirical Findings</h2>
        <p className="text-xs text-slate-400">Core insights derived from dataset exploration and inferential testing</p>
      </div>

      <div className="space-y-4">
        {findings.map((f) => (
          <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">{f.category}</span>
                <h3 className="font-bold text-slate-100 text-base">{f.title}</h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{f.finding}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-medium">Statistical Evidence:</span>
                <p className="text-slate-200 mt-0.5">{f.statistical_evidence}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Business / Policy Impact:</span>
                <p className="text-slate-200 mt-0.5">{f.business_impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
