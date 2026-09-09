import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { CropMetric } from '../types/api';
import { ChartCard } from '../components/ChartCard';
import { AlertBox } from '../components/AlertBox';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface Props {
  crop: string;
  season: string;
  region: string;
}

export const CropPerformancePage: React.FC<Props> = ({ crop, season, region }) => {
  const [crops, setCrops] = useState<CropMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getCrops({ crop, season, region });
        setCrops(res.crops);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [crop, season, region]);

  if (loading) return <div className="p-8 text-slate-400">Loading Crop Data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Crop Agronomic & Financial Performance</h2>
        <p className="text-xs text-slate-400">Yield, Cost, Revenue, and Relative Yield Index across all 8 Crop Species</p>
      </div>

      <AlertBox type="warning" title="Agronomic Yield Scale Disclaimer">
        <p>Sugarcane mean yield (<strong>46.93 t/ha</strong>) stems from vegetative stalk biomass moisture content, whereas grain, pulse, oilseed, and spice crops (Rice 2.44 t/ha, Maize 2.71 t/ha, Wheat 2.11 t/ha, Chilli 1.54 t/ha, Groundnut 1.32 t/ha, Cotton 1.22 t/ha, Pulses 0.92 t/ha) measure harvested economic products. To enable valid cross-crop comparisons, the <strong>Relative Yield Index (RYI)</strong> normalizes crop performance against each species mean baseline.</p>
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Relative Yield Index (RYI)" subtitle="Normalized yield performance across 8 crop species">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={crops}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="crop" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 1.5]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="relative_yield_index" fill="#3b82f6" name="RYI (Mean = 1.0)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost vs Revenue per Hectare (₹/ha)" subtitle="Per-hectare economic comparison across crop types">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={crops}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="crop" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Legend />
              <Bar dataKey="mean_cost_per_ha" fill="#f43f5e" name="Mean Cost (₹/ha)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mean_revenue_per_ha" fill="#10b981" name="Mean Revenue (₹/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-x-auto">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Empirical Crop Performance Summary Table (8 Crops)</h3>
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-3">Crop</th>
              <th className="p-3">Observations</th>
              <th className="p-3">Mean Yield</th>
              <th className="p-3">Median Yield</th>
              <th className="p-3">Cost / ha</th>
              <th className="p-3">Revenue / ha</th>
              <th className="p-3">Profit / ha</th>
              <th className="p-3">RYI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {crops.map((c) => (
              <tr key={c.crop} className="hover:bg-slate-800/50">
                <td className="p-3 font-medium text-slate-100">{c.crop}</td>
                <td className="p-3">{c.count}</td>
                <td className="p-3 font-semibold text-emerald-400">{c.mean_yield.toFixed(2)} t/ha</td>
                <td className="p-3">{c.median_yield.toFixed(2)} t/ha</td>
                <td className="p-3 text-rose-400">₹{c.mean_cost_per_ha.toLocaleString()}</td>
                <td className="p-3 text-blue-400">₹{c.mean_revenue_per_ha.toLocaleString()}</td>
                <td className={`p-3 font-bold ${c.mean_profit_per_ha >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ₹{c.mean_profit_per_ha.toLocaleString()}
                </td>
                <td className="p-3 font-mono">{c.relative_yield_index.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
