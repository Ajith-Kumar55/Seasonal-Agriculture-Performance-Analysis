import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { EnvironmentalData } from '../types/api';
import { ChartCard } from '../components/ChartCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  crop: string;
  season: string;
  region: string;
}

export const EnvironmentalAnalysisPage: React.FC<Props> = ({ crop, season, region }) => {
  const [data, setData] = useState<EnvironmentalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getEnvironmental({ crop, season, region });
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [crop, season, region]);

  if (loading || !data) return <div className="p-8 text-slate-400">Loading Environmental Data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Environmental Factors & Soil Dynamics</h2>
        <p className="text-xs text-slate-400">Soil type performance, rainfall, and temperature influences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Mean Yield by Soil Type (t/ha)" subtitle="Agronomic productivity across soil classifications">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.soil_type_yield}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="soil_type" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="mean_yield" fill="#d97706" name="Mean Yield (t/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mean Profit / ha by Soil Type (₹/ha)" subtitle="Financial returns across soil types">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.soil_type_yield}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="soil_type" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="mean_profit_per_ha" fill="#059669" name="Mean Profit (₹/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
