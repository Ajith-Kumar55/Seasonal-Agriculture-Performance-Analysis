import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { RegionalMetric } from '../types/api';
import { ChartCard } from '../components/ChartCard';
import { AlertBox } from '../components/AlertBox';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const RegionalAnalysisPage: React.FC = () => {
  const [regions, setRegions] = useState<RegionalMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getRegions();
        setRegions(res.regions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-8 text-slate-400">Loading Regional Data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Regional Agricultural Profile</h2>
        <p className="text-xs text-slate-400">Performance across North, South, East, West, and Central zones</p>
      </div>

      <AlertBox type="info" title="Synthetic Regional Assignment Note">
        <p>Regional zones were programmatically assigned based on rainfall and temperature clusters to enable geographic stratification in compliance with VOIS AICTE guidelines.</p>
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Mean Yield by Region (t/ha)" subtitle="Agronomic productivity by region">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={regions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="region" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="mean_yield" fill="#8b5cf6" name="Mean Yield (t/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mean Profit per Hectare by Region (₹/ha)" subtitle="Regional financial returns">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={regions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="region" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="mean_profit_per_ha" fill="#ec4899" name="Mean Profit (₹/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
