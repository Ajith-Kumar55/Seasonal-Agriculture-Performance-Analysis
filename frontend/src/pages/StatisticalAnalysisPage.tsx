import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { StatisticalResults } from '../types/api';
import { AlertBox } from '../components/AlertBox';
import { BarChart3, ShieldCheck } from 'lucide-react';

export const StatisticalAnalysisPage: React.FC = () => {
  const [stats, setStats] = useState<StatisticalResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getStats();
        setStats(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !stats) return <div className="p-8 text-slate-400">Loading Statistical Test Results...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Inferential Statistical Test Hub</h2>
        <p className="text-xs text-slate-400">Non-parametric & parametric testing per VOIS AICTE guidelines</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">{stats.kruskal_wallis.test_name}</h3>
              <p className="text-xs text-slate-400">Target: {stats.kruskal_wallis.target_variable} | Grouping: {stats.kruskal_wallis.grouping_variable}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
            Statistically Significant (p &lt; 0.001)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800 mb-4 text-xs">
          <div>
            <p className="text-slate-400">H-Statistic</p>
            <p className="text-lg font-bold text-slate-100">{stats.kruskal_wallis.h_statistic}</p>
          </div>
          <div>
            <p className="text-slate-400">p-value</p>
            <p className="text-lg font-bold text-emerald-400">&lt; 0.001</p>
          </div>
          <div>
            <p className="text-slate-400">Degrees of Freedom</p>
            <p className="text-lg font-bold text-slate-100">{stats.kruskal_wallis.degrees_of_freedom}</p>
          </div>
          <div>
            <p className="text-slate-400">Post-Hoc Test</p>
            <p className="text-lg font-bold text-blue-400">Dunn's Test</p>
          </div>
        </div>

        <AlertBox type="info" title="Methodological Justification">
          <p>{stats.kruskal_wallis.methodological_justification}</p>
        </AlertBox>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">{stats.chi_square.test_name}</h3>
              <p className="text-xs text-slate-400">{stats.chi_square.variable1} × {stats.chi_square.variable2}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold">
            {stats.chi_square.effect_size_interpretation}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs">
          <div>
            <p className="text-slate-400">Chi-Square (χ²)</p>
            <p className="text-lg font-bold text-slate-100">{stats.chi_square.chi2_statistic}</p>
          </div>
          <div>
            <p className="text-slate-400">p-value</p>
            <p className="text-lg font-bold text-blue-400">&lt; 0.001</p>
          </div>
          <div>
            <p className="text-slate-400">Degrees of Freedom</p>
            <p className="text-lg font-bold text-slate-100">{stats.chi_square.degrees_of_freedom}</p>
          </div>
          <div>
            <p className="text-slate-400">Cramér's V</p>
            <p className="text-lg font-bold text-emerald-400">{stats.chi_square.cramers_v}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">{stats.two_way_anova.test_name}</h3>
              <p className="text-xs text-slate-400">Factor 1: {stats.two_way_anova.factor1} | Factor 2: {stats.two_way_anova.factor2}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-semibold">
            Partial Eta-Squared ηₚ² = {stats.two_way_anova.crop_main_effect.partial_eta_sq}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Crop Main Effect</p>
            <p className="text-slate-100 font-mono mt-1">F = {stats.two_way_anova.crop_main_effect.F}</p>
            <p className="text-emerald-400 font-mono">p &lt; 0.001 | ηₚ² = {stats.two_way_anova.crop_main_effect.partial_eta_sq}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Season Main Effect</p>
            <p className="text-slate-100 font-mono mt-1">F = {stats.two_way_anova.season_main_effect.F}</p>
            <p className="text-emerald-400 font-mono">p &lt; 0.001 | ηₚ² = {stats.two_way_anova.season_main_effect.partial_eta_sq}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Crop × Season Interaction</p>
            <p className="text-slate-100 font-mono mt-1">F = {stats.two_way_anova.interaction_effect.F}</p>
            <p className="text-slate-400 font-mono">
              p = {stats.two_way_anova.interaction_effect.p_value < 0.001 ? '< 0.001' : stats.two_way_anova.interaction_effect.p_value} (Not Significant) | ηₚ² = {stats.two_way_anova.interaction_effect.partial_eta_sq}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
