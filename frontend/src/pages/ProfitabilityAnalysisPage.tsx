import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { ProfitabilityData } from '../types/api';
import { ChartCard } from '../components/ChartCard';
import { AlertBox } from '../components/AlertBox';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface Props {
  crop: string;
  season: string;
  region: string;
}

export const ProfitabilityAnalysisPage: React.FC<Props> = ({ crop, season, region }) => {
  const [data, setData] = useState<ProfitabilityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getProfitability({ crop, season, region });
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [crop, season, region]);

  if (loading || !data) return <div className="p-8 text-slate-400">Loading Profitability Data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Financial & Profitability Breakdown</h2>
        <p className="text-xs text-slate-400">Derived per-hectare metrics and operating deficit analysis</p>
      </div>

      <AlertBox type="warning" title="Structural Operating Deficit Identified">
        <p>Across the dataset, <strong>49.15% (1,966 farms)</strong> operated at a net loss because total operating costs exceeded market revenues. Financial performance must be analyzed on a <strong>per-hectare basis</strong> to prevent area scale distortions.</p>
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Loss Rate (%) by Crop Species" subtitle="Percentage of loss-making farms per crop">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.by_crop}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="crop" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="loss_percent" fill="#f43f5e" name="Loss Rate (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost vs Revenue per Hectare by Crop" subtitle="Detailed per-hectare economic breakdown">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.by_crop}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="crop" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Legend />
              <Bar dataKey="mean_cost_per_ha" fill="#f43f5e" name="Cost (₹/ha)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mean_revenue_per_ha" fill="#10b981" name="Revenue (₹/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
