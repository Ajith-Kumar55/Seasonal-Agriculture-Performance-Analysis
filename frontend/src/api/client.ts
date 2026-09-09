import type {
  SummaryKPIs,
  CropMetric,
  SeasonalMetric,
  CropSeasonMetric,
  RegionalMetric,
  ProfitabilityData,
  WaterEfficiencyData,
  EnvironmentalData,
  CorrelationData,
  StatisticalResults,
  PredictionInput,
  PredictionResult,
  FindingItem,
  RecommendationItem
} from '../types/api';

const BASE_URL = 'https://seasonal-agriculture-api.onrender.com/api';

async function fetchJson<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val && val !== 'All') {
        url.searchParams.append(key, val);
      }
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  getSummary: (params?: Record<string, string>) => fetchJson<SummaryKPIs>('/summary', params),
  getCrops: async (params?: Record<string, string>): Promise<{ crops: CropMetric[] }> => {
    const res: any = await fetchJson('/crops', params);
    return { crops: Array.isArray(res) ? res : (res.crops || []) };
  },
  getSeasons: async (params?: Record<string, string>): Promise<{ seasons: SeasonalMetric[] }> => {
    const res: any = await fetchJson('/seasons', params);
    return { seasons: Array.isArray(res) ? res : (res.seasons || []) };
  },
  getCropSeasons: async (params?: Record<string, string>): Promise<{ crop_seasons: CropSeasonMetric[] }> => {
    const res: any = await fetchJson('/crop-seasons', params);
    return { crop_seasons: Array.isArray(res) ? res : (res.crop_seasons || []) };
  },
  getRegions: async (): Promise<{ regions: RegionalMetric[] }> => {
    const res: any = await fetchJson('/regions');
    return { regions: Array.isArray(res) ? res : (res.regions || []) };
  },
  getProfitability: (params?: Record<string, string>) => fetchJson<ProfitabilityData>('/profitability', params),
  getWaterEfficiency: (params?: Record<string, string>) => fetchJson<WaterEfficiencyData>('/water-efficiency', params),
  getEnvironmental: (params?: Record<string, string>) => fetchJson<EnvironmentalData>('/environmental', params),
  getCorrelation: (params?: Record<string, string>) => fetchJson<CorrelationData>('/correlation', params),
  getStats: () => fetchJson<StatisticalResults>('/stats'),
  getFindings: async (): Promise<{ findings: FindingItem[] }> => {
    const res: any = await fetchJson('/findings');
    return { findings: Array.isArray(res) ? res : (res.findings || []) };
  },
  getRecommendations: async (): Promise<{ recommendations: RecommendationItem[] }> => {
    const res: any = await fetchJson('/recommendations');
    return { recommendations: Array.isArray(res) ? res : (res.recommendations || []) };
  },
  predictYield: async (input: PredictionInput): Promise<PredictionResult> => {
    const res = await fetch(`${BASE_URL}/ml/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (!res.ok) {
      throw new Error(`Prediction Error ${res.status}: ${res.statusText}`);
    }
    return res.json();
  },
  getMlInfo: () => fetchJson<any>('/ml/info')
};
