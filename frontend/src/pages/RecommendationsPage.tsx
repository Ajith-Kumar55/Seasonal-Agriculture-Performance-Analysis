import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { RecommendationItem } from '../types/api';

export const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getRecommendations();
        setRecommendations(res.recommendations);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-8 text-slate-400">Loading Recommendations...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Strategic Recommendations</h2>
        <p className="text-xs text-slate-400">Actionable guidance for farmers, policy makers, and agricultural extension</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((r) => (
          <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold">
                  Target: {r.target_audience}
                </span>
              </div>
              <h3 className="font-bold text-slate-100 text-base mb-2">{r.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{r.recommendation}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5">
              <p><strong className="text-slate-400">Rationale:</strong> <span className="text-slate-300">{r.rationale}</span></p>
              <p><strong className="text-emerald-400">Expected Outcome:</strong> <span className="text-slate-300">{r.expected_outcome}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
