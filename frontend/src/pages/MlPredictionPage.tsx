import React, { useState } from 'react';
import { api } from '../api/client';
import type { PredictionInput, PredictionResult } from '../types/api';
import { ChartCard } from '../components/ChartCard';
import { Cpu, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const MlPredictionPage: React.FC = () => {
  const [formData, setFormData] = useState<PredictionInput>({
    crop: 'Rice',
    season: 'Kharif',
    region: 'South',
    farm_area_hectares: 5.0,
    rainfall_mm: 1200,
    temperature_c: 28,
    fertilizer_usage_kg_ha: 150,
    pesticide_usage_kg_ha: 3.5,
    soil_type: 'Clay',
    irrigation_system: 'Canal',
    market_price_inr_tonne: 22000,
    total_cost_inr: 180000
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.predictYield(formData);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const featureImportanceData = result?.feature_importances
    ? Object.entries(result.feature_importances).map(([key, val]) => ({
        feature: key.replace(/_/g, ' '),
        importance: val
      })).sort((a, b) => b.importance - a.importance)
    : [];

  const crops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Pulses', 'Groundnut', 'Chilli', 'Sugarcane'];
  const seasons = ['Kharif', 'Rabi', 'Zaid'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Machine Learning Yield & Profit Predictor</h2>
        <p className="text-xs text-slate-400">Gradient Boosting Regressor (R² = 0.9745) Real-Time Inference</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 lg:col-span-1">
          <h3 className="font-semibold text-slate-100 text-sm mb-4 flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Farm Parameters Input</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400">Crop Species:</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
              >
                {crops.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400">Season:</label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
                >
                  {seasons.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400">Region:</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
                >
                  {['North', 'South', 'East', 'West', 'Central'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400">Farm Area (ha):</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.farm_area_hectares}
                  onChange={(e) => setFormData({ ...formData, farm_area_hectares: parseFloat(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400">Rainfall (mm):</label>
                <input
                  type="number"
                  value={formData.rainfall_mm}
                  onChange={(e) => setFormData({ ...formData, rainfall_mm: parseFloat(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400">Fertilizer (kg/ha):</label>
                <input
                  type="number"
                  value={formData.fertilizer_usage_kg_ha}
                  onChange={(e) => setFormData({ ...formData, fertilizer_usage_kg_ha: parseFloat(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400">Market Price (₹/t):</label>
                <input
                  type="number"
                  value={formData.market_price_inr_tonne}
                  onChange={(e) => setFormData({ ...formData, market_price_inr_tonne: parseFloat(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400">Total Operating Cost (₹):</label>
              <input
                type="number"
                value={formData.total_cost_inr}
                onChange={(e) => setFormData({ ...formData, total_cost_inr: parseFloat(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Cpu className="w-4 h-4" />
              <span>{loading ? 'Executing ML Pipeline...' : 'Predict Yield & Financials'}</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <p className="text-xs text-slate-400">Predicted Yield</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{result.predicted_yield_t_ha.toFixed(2)} t/ha</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">RYI: {result.relative_yield_index.toFixed(2)}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <p className="text-xs text-slate-400">Total Production</p>
                  <p className="text-xl font-bold text-slate-100 mt-1">{result.predicted_production_tonnes.toFixed(1)} Tonnes</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <p className="text-xs text-slate-400">Profit / Hectare</p>
                  <p className={`text-xl font-bold mt-1 ${result.predicted_profit_per_ha >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ₹{result.predicted_profit_per_ha.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <p className="text-xs text-slate-400">Operating Status</p>
                  <span className={`inline-block px-2.5 py-1 mt-1 rounded-full text-xs font-semibold ${
                    result.predicted_profit_status === 'Profit'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {result.predicted_profit_status}
                  </span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <p className="text-xs text-slate-400">Expected Revenue</p>
                  <p className="text-xl font-bold text-blue-400 mt-1">₹{result.predicted_revenue_inr.toLocaleString()}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <p className="text-xs text-slate-400">Model Accuracy</p>
                  <p className="text-xl font-bold text-purple-400 mt-1">R² = {result.model_performance.r2_score}</p>
                </div>
              </div>

              <ChartCard title="Random Forest Feature Importance Weights" subtitle="Predictive weight contribution per feature">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={featureImportanceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis type="category" dataKey="feature" stroke="#94a3b8" width={140} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                    <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
              <Cpu className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-slate-200">Ready for Machine Learning Inference</p>
              <p className="text-xs text-slate-400 mt-1">Adjust farm parameters on the left and click "Predict Yield & Financials".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
