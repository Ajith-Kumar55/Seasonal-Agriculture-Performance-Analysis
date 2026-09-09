import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  crop: string;
  setCrop: (val: string) => void;
  season: string;
  setSeason: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  crop,
  setCrop,
  season,
  setSeason,
  region,
  setRegion,
  onReset
}) => {
  const crops = ['All', 'Wheat', 'Rice', 'Maize', 'Cotton', 'Pulses', 'Groundnut', 'Chilli', 'Sugarcane'];
  const seasons = ['All', 'Kharif', 'Rabi', 'Zaid'];
  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center space-x-2 text-slate-300 font-medium text-xs">
        <Filter className="w-4 h-4 text-emerald-400" />
        <span>Filter Dataset:</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <label className="text-slate-400">Crop:</label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-slate-400">Season:</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {seasons.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-slate-400">Region:</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {(crop !== 'All' || season !== 'All' || region !== 'All') && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-slate-400 hover:text-emerald-400 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
