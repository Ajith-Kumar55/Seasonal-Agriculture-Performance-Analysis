import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { RecommendationItem } from '../types/api';

const DEFAULT_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: '1',
    title: 'Evaluate Irrigation Systems for Water-Efficiency Improvement',
    target_audience: 'Farmers & Agricultural Extension',
    recommendation: 'Compare irrigation practices based on observed water-efficiency outcomes and local farm conditions rather than assuming one method is universally superior.',
    rationale: 'Two-Way ANOVA indicates statistically significant differences in water efficiency across irrigation methods (p < 0.001).',
    expected_outcome: 'Supports evidence-based evaluation of irrigation practices and water-management decisions.'
  },
  {
    id: '2',
    title: 'Implement Soil-Testing-Based Fertilizer Management',
    target_audience: 'Policy Makers & Co-operatives',
    recommendation: 'Promote soil testing before fertilizer application to support more targeted nutrient management and avoid unnecessary fertilizer use.',
    rationale: 'Fertilizer usage is positively associated with operating cost (Pearson r = 0.5476, p < 0.001), without establishing a causal effect on net profit.',
    expected_outcome: 'Supports more targeted fertilizer-management decisions and cost evaluation.'
  },
  {
    id: '3',
    title: 'Evaluate Zaid Cropping Patterns and Water Requirements',
    target_audience: 'Farmers & Policy Planners',
    recommendation: 'Review crop selection and water requirements during the Zaid season using observed profitability and seasonal conditions.',
    rationale: 'Zaid records the highest observed operating loss rate among the three seasons (64.48%).',
    expected_outcome: 'Supports seasonal crop-planning and water-management decisions.'
  }
];

export const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(DEFAULT_RECOMMENDATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getRecommendations();
        if (res.recommendations && res.recommendations.length > 0) {
          setRecommendations(res.recommendations);
        }
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
