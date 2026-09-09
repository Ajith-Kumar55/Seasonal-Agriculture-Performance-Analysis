import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { SeasonalMetric } from '../types/api';
import { ChartCard } from '../components/ChartCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface Props {
  crop: string;
  season: string;
  region: string;
}

export const SeasonalAnalysisPage: React.FC<Props> = ({ crop, season, region }) => {
  const [seasons, setSeasons] = useState<SeasonalMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const sRes = await api.getSeasons({ crop, season, region });
        setSeasons(sRes.seasons);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [crop, season, region]);

  if (loading) return <div className="p-8 text-slate-400">Loading Seasonal Data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Seasonal Performance Profile</h2>
        <p className="text-xs text-slate-400">Agricultural behavior across Kharif, Rabi, and Zaid seasons</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Mean Yield by Season (t/ha)" subtitle="Agronomic productivity by growing season">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={seasons}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="season" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="mean_yield" fill="#10b981" name="Mean Yield (t/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Weather & Water Inputs by Season" subtitle="Mean Rainfall (mm) and Temperature (°C)">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={seasons}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="season" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Legend />
              <Bar dataKey="mean_rainfall" fill="#3b82f6" name="Mean Rainfall (mm)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mean_temperature" fill="#f59e0b" name="Mean Temp (°C)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
