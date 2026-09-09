export interface SummaryKPIs {
  total_observations: number;
  crops_analyzed: number;
  seasons_analyzed: number;
  regions_analyzed: number;
  overall_mean_yield: number;
  overall_mean_profit_per_ha: number;
  overall_profit_loss_breakdown: {
    loss_count: number;
    loss_percent: number;
    profit_count: number;
    profit_percent: number;
  };
}

export interface CropMetric {
  crop: string;
  count: number;
  mean_yield: number;
  std_yield: number;
  median_yield: number;
  mean_profit_per_ha: number;
  mean_cost_per_ha: number;
  mean_revenue_per_ha: number;
  relative_yield_index: number;
  yield_unit: string;
}

export interface SeasonalMetric {
  season: string;
  count: number;
  mean_yield: number;
  mean_profit_per_ha: number;
  mean_rainfall: number;
  mean_temperature: number;
  mean_irrigation: number;
}

export interface CropSeasonMetric {
  crop: string;
  season: string;
  count: number;
  mean_yield: number;
  mean_profit_per_ha: number;
  relative_yield_index: number;
}

export interface RegionalMetric {
  region: string;
  count: number;
  mean_yield: number;
  mean_profit_per_ha: number;
  soil_types: Record<string, number>;
  note: string;
}

export interface ProfitabilityData {
  overall: {
    total_observations: number;
    loss_count: number;
    loss_percent: number;
    profit_count: number;
    profit_percent: number;
    mean_profit_per_ha: number;
    mean_revenue_per_ha: number;
    mean_cost_per_ha: number;
  };
  by_crop: Array<{
    crop: string;
    total: number;
    loss_count: number;
    loss_percent: number;
    profit_count: number;
    profit_percent: number;
    mean_profit_per_ha: number;
    mean_cost_per_ha: number;
    mean_revenue_per_ha: number;
  }>;
  by_season: Array<{
    season: string;
    total: number;
    loss_count: number;
    loss_percent: number;
    profit_count: number;
    profit_percent: number;
    mean_profit_per_ha: number;
  }>;
  by_profit_status: Array<{
    status: string;
    count: number;
    percent: number;
    mean_yield: number;
    mean_area: number;
    mean_price: number;
    mean_cost: number;
  }>;
}

export interface WaterEfficiencyData {
  efficiency_index_data: Array<{
    crop: string;
    water_efficiency_kg_m3: number;
    mean_yield_t_ha: number;
    mean_water_used_m3_ha: number;
  }>;
  irrigation_by_crop: Array<{
    crop: string;
    irrigation_system: string;
    count: number;
    mean_yield: number;
    mean_water_used: number;
    mean_profit_per_ha: number;
  }>;
  water_usage_by_crop: Array<{
    crop: string;
    mean_water_used: number;
    mean_irrigation: number;
  }>;
  crop_season_matrix: Array<{
    crop: string;
    season: string;
    mean_water_efficiency_kg_m3: number;
  }>;
}

export interface EnvironmentalData {
  temperature_vs_yield: Array<{
    crop: string;
    temperature_c: number;
    yield_t_ha: number;
    season: string;
  }>;
  rainfall_vs_yield: Array<{
    crop: string;
    rainfall_mm: number;
    yield_t_ha: number;
    season: string;
  }>;
  soil_type_yield: Array<{
    crop: string;
    soil_type: string;
    count: number;
    mean_yield: number;
    mean_profit_per_ha: number;
  }>;
}

export interface CorrelationData {
  pearson_matrix: Record<string, Record<string, number>>;
  spearman_matrix: Record<string, Record<string, number>>;
  variables: string[];
  significant_relationships: Array<{
    pair: string;
    pearson_r: number;
    pearson_p: number;
    spearman_rho: number;
    spearman_p: number;
    relationship_type: string;
    interpretation: string;
  }>;
}

export interface StatisticalResults {
  kruskal_wallis: {
    test_name: string;
    target_variable: string;
    grouping_variable: string;
    h_statistic: number;
    p_value: number;
    degrees_of_freedom: number;
    significant: boolean;
    dunn_post_hoc: Array<{
      group1: string;
      group2: string;
      p_value: number;
      significant: boolean;
    }>;
    methodological_justification: string;
  };
  chi_square: {
    test_name: string;
    variable1: string;
    variable2: string;
    chi2_statistic: number;
    p_value: number;
    degrees_of_freedom: number;
    cramers_v: number;
    effect_size_interpretation: string;
    significant: boolean;
    contingency_table: Record<string, Record<string, number>>;
  };
  two_way_anova: {
    test_name: string;
    target_variable: string;
    factor1: string;
    factor2: string;
    crop_main_effect: { F: number; p_value: number; partial_eta_sq: number };
    season_main_effect: { F: number; p_value: number; partial_eta_sq: number };
    interaction_effect: { F: number; p_value: number; partial_eta_sq: number };
    assumption_checks: {
      levene_p_value: number;
      levene_homogeneity: boolean;
      transformation_used: string;
      note: string;
    };
  };
  water_efficiency_two_factor: {
    test_name: string;
    crop_main_effect: { F: number; p_value: number };
    season_main_effect: { F: number; p_value: number };
    interaction_effect: { F: number; p_value: number };
  };
  spearman_rank_hub: {
    target_variable: string;
    correlations: Array<{
      variable: string;
      spearman_rho: number;
      p_value: number;
      significant: boolean;
    }>;
  };
}

export interface PredictionInput {
  crop: string;
  season: string;
  region: string;
  farm_area_hectares: number;
  rainfall_mm: number;
  temperature_c: number;
  fertilizer_usage_kg_ha: number;
  pesticide_usage_kg_ha: number;
  soil_type: string;
  irrigation_system: string;
  market_price_inr_tonne: number;
  total_cost_inr: number;
}

export interface PredictionResult {
  predicted_yield_t_ha: number;
  predicted_production_tonnes: number;
  predicted_revenue_inr: number;
  predicted_profit_inr: number;
  predicted_profit_per_ha: number;
  predicted_profit_status: string;
  relative_yield_index: number;
  feature_importances: Record<string, number>;
  model_performance: {
    r2_score: number;
    rmse: number;
    best_model: string;
  };
}

export interface FindingItem {
  id: string;
  title: string;
  category: string;
  finding: string;
  statistical_evidence: string;
  business_impact: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  target_audience: string;
  recommendation: string;
  rationale: string;
  expected_outcome: string;
}
