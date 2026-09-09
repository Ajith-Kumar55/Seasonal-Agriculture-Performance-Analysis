import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { WaterEfficiencyData } from '../types/api';
import { ChartCard } from '../components/ChartCard';
import { AlertBox } from '../components/AlertBox';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  crop: string;
  season: string;
  region: string;
}

export const WaterIrrigationPage: React.FC<Props> = ({ crop, season, region }) => {
  const [data, setData] = useState<WaterEfficiencyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getWaterEfficiency({ crop, season, region });
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [crop, season, region]);

  if (loading || !data) return <div className="p-8 text-slate-400">Loading Water Efficiency Data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Water Efficiency & Irrigation Analysis</h2>
        <p className="text-xs text-slate-400">Two-Factor Water Efficiency Index (kg/m³) and irrigation system impact</p>
      </div>

      <AlertBox type="info" title="Two-Factor Water Efficiency Derivation">
        <p>Water Efficiency Index is calculated as: <strong>Water Efficiency (kg/m³) = Production (kg) / Water Used (m³)</strong>. Two-Factor ANOVA confirms significant differences across crops (p &lt; 0.001) and irrigation modalities.</p>
      </AlertBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Water Efficiency Index by Crop (kg/m³)" subtitle="Kilograms of crop yield per cubic meter of water used">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.efficiency_index_data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="crop" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="water_efficiency_kg_m3" fill="#06b6d4" name="Efficiency (kg/m³)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mean Water Consumption by Crop (m³/ha)" subtitle="Volume of water utilized per hectare">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.water_usage_by_crop}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="crop" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="mean_water_used" fill="#3b82f6" name="Water Used (m³/ha)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
