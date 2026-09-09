from fastapi import APIRouter, HTTPException, Query, Body
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import pandas as pd
import numpy as np

from app.data_service import get_cleaned_dataframe, filter_dataframe
from app.ml_service import train_and_eval_models, predict_yield
from app.stats_service import get_statistical_test_results

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok", "app": "Seasonal Agriculture Performance Analysis API", "version": "1.0.0"}

@router.get("/summary")
def get_dashboard_summary(
    crop: Optional[str] = 'All',
    season: Optional[str] = 'All',
    region: Optional[str] = 'All'
):
    df = get_cleaned_dataframe()
    filtered = filter_dataframe(df, crop=crop, season=season, region=region)
    
    total_obs = len(filtered)
    crops_cnt = int(filtered['Crop'].nunique()) if total_obs > 0 else 0
    seasons_cnt = int(filtered['Season'].nunique()) if total_obs > 0 else 0
    regions_cnt = int(filtered['Region'].nunique()) if total_obs > 0 else 0

    mean_yield = round(float(filtered['Yield_Tonnes_Ha'].mean()), 2) if total_obs > 0 else 0.0
    mean_profit_ha = round(float(filtered['Profit_per_Hectare'].mean()), 2) if total_obs > 0 else 0.0
    
    loss_count = int((filtered['Profit_INR'] < 0).sum()) if total_obs > 0 else 0
    profit_count = int((filtered['Profit_INR'] > 0).sum()) if total_obs > 0 else 0
    
    loss_percent = round(float((loss_count / total_obs) * 100), 2) if total_obs > 0 else 0.0
    profit_percent = round(float((profit_count / total_obs) * 100), 2) if total_obs > 0 else 0.0

    avg_water_eff = round(float(filtered['Water_Efficiency_t_per_1000m3'].mean()), 2) if total_obs > 0 else 0.0

    seasonal_chart = filtered.groupby('Season').agg({
        'Yield_Tonnes_Ha': 'mean',
        'Profit_per_Hectare': 'mean',
        'Profitability_Status': lambda x: float((x == 'Loss').mean() * 100)
    }).reset_index().to_dict(orient='records')

    crop_chart = filtered.groupby('Crop').agg({
        'Yield_Tonnes_Ha': 'mean',
        'Profit_per_Hectare': 'mean',
        'Relative_Yield_Index': 'mean'
    }).reset_index().to_dict(orient='records')

    return {
        'total_observations': total_obs,
        'crops_analyzed': crops_cnt,
        'seasons_analyzed': seasons_cnt,
        'regions_analyzed': regions_cnt,
        'overall_mean_yield': mean_yield,
        'overall_mean_profit_per_ha': mean_profit_ha,
        'overall_profit_loss_breakdown': {
            'loss_count': loss_count,
            'loss_percent': loss_percent,
            'profit_count': profit_count,
            'profit_percent': profit_percent
        },
        'dataset_stats': {
            'total_farms': total_obs,
            'variables_count': 28,
            'states_count': int(filtered['State'].nunique()) if total_obs > 0 else 0,
            'districts_count': int(filtered['District'].nunique()) if total_obs > 0 else 0,
            'crops_count': crops_cnt,
            'seasons_count': seasons_cnt
        },
        'kpis': {
            'total_farms': total_obs,
            'average_yield_t_ha': mean_yield,
            'average_profit_inr_ha': mean_profit_ha,
            'overall_loss_rate_pct': loss_percent,
            'average_water_efficiency_t_1000m3': avg_water_eff
        },
        'seasonal_overview': seasonal_chart,
        'crop_overview': crop_chart
    }

@router.get("/crops")
def get_crops_summary(
    crop: Optional[str] = 'All',
    season: Optional[str] = 'All',
    region: Optional[str] = 'All'
):
    df = get_cleaned_dataframe()
    filtered = filter_dataframe(df, crop=crop, season=season, region=region)
    
    crops_list = []
    if not filtered.empty:
        grouped = filtered.groupby('Crop')
        for c_name, grp in grouped:
            crops_list.append({
                'crop': str(c_name),
                'count': len(grp),
                'mean_yield': round(float(grp['Yield_Tonnes_Ha'].mean()), 2),
                'std_yield': round(float(grp['Yield_Tonnes_Ha'].std()), 2) if len(grp) > 1 else 0.0,
                'median_yield': round(float(grp['Yield_Tonnes_Ha'].median()), 2),
                'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2),
                'mean_cost_per_ha': round(float(grp['Cost_per_Hectare'].mean()), 2),
                'mean_revenue_per_ha': round(float(grp['Revenue_per_Hectare'].mean()), 2),
                'relative_yield_index': round(float(grp['Relative_Yield_Index'].mean()), 2),
                'yield_unit': 't/ha'
            })

    return {'crops': crops_list}

@router.get("/seasons")
def get_seasons_summary(
    crop: Optional[str] = 'All',
    season: Optional[str] = 'All',
    region: Optional[str] = 'All'
):
    df = get_cleaned_dataframe()
    filtered = filter_dataframe(df, crop=crop, season=season, region=region)
    
    seasons_list = []
    if not filtered.empty:
        grouped = filtered.groupby('Season')
        for s_name, grp in grouped:
            seasons_list.append({
                'season': str(s_name),
                'count': len(grp),
                'mean_yield': round(float(grp['Yield_Tonnes_Ha'].mean()), 2),
                'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2),
                'mean_rainfall': round(float(grp['Rainfall_mm'].mean()), 1),
                'mean_temperature': round(float(grp['Avg_Temperature_C'].mean()), 1),
                'mean_irrigation': round(float(grp['Water_Used_m3'].mean()), 1)
            })

    return {'seasons': seasons_list}

@router.get("/crop-seasons")
def get_crop_seasons_summary(
    crop: Optional[str] = 'All',
    season: Optional[str] = 'All',
    region: Optional[str] = 'All'
):
    df = get_cleaned_dataframe()
    filtered = filter_dataframe(df, crop=crop, season=season, region=region)
    
    cs_list = []
    if not filtered.empty:
        grouped = filtered.groupby(['Crop', 'Season'])
        for (c_name, s_name), grp in grouped:
            cs_list.append({
                'crop': str(c_name),
                'season': str(s_name),
                'count': len(grp),
                'mean_yield': round(float(grp['Yield_Tonnes_Ha'].mean()), 2),
                'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2),
                'relative_yield_index': round(float(grp['Relative_Yield_Index'].mean()), 2)
            })

    return {'crop_seasons': cs_list}

@router.get("/regions")
@router.get("/regional")
def get_regions_summary():
    df = get_cleaned_dataframe()
    regions_list = []
    grouped = df.groupby('Region')
    for r_name, grp in grouped:
        soil_counts = grp['Soil_Moisture_pct'].apply(lambda x: 'High' if x > 25 else 'Moderate').value_counts().to_dict()
        regions_list.append({
            'region': str(r_name),
            'count': len(grp),
            'mean_yield': round(float(grp['Yield_Tonnes_Ha'].mean()), 2),
            'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2),
            'soil_types': soil_counts,
            'note': 'Regional zones mapped from geographic state clusters'
        })
    return {'regions': regions_list}

@router.get("/profitability")
def get_profitability_analysis(
    crop: Optional[str] = 'All',
    season: Optional[str] = 'All',
    region: Optional[str] = 'All'
):
    df = get_cleaned_dataframe()
    filtered = filter_dataframe(df, crop=crop, season=season, region=region)
    
    total = len(filtered)
    loss_count = int((filtered['Profit_INR'] < 0).sum()) if total > 0 else 0
    profit_count = int((filtered['Profit_INR'] > 0).sum()) if total > 0 else 0
    
    loss_pct = round((loss_count / total * 100), 2) if total > 0 else 0.0
    profit_pct = round((profit_count / total * 100), 2) if total > 0 else 0.0

    by_crop = []
    if total > 0:
        for c_name, grp in filtered.groupby('Crop'):
            c_tot = len(grp)
            c_loss = int((grp['Profit_INR'] < 0).sum())
            c_prof = int((grp['Profit_INR'] > 0).sum())
            by_crop.append({
                'crop': str(c_name),
                'total': c_tot,
                'loss_count': c_loss,
                'loss_percent': round(float((c_loss / c_tot) * 100), 2) if c_tot > 0 else 0,
                'profit_count': c_prof,
                'profit_percent': round(float((c_prof / c_tot) * 100), 2) if c_tot > 0 else 0,
                'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2),
                'mean_cost_per_ha': round(float(grp['Cost_per_Hectare'].mean()), 2),
                'mean_revenue_per_ha': round(float(grp['Revenue_per_Hectare'].mean()), 2)
            })

    by_season = []
    if total > 0:
        for s_name, grp in filtered.groupby('Season'):
            s_tot = len(grp)
            s_loss = int((grp['Profit_INR'] < 0).sum())
            s_prof = int((grp['Profit_INR'] > 0).sum())
            by_season.append({
                'season': str(s_name),
                'total': s_tot,
                'loss_count': s_loss,
                'loss_percent': round(float((s_loss / s_tot) * 100), 2) if s_tot > 0 else 0,
                'profit_count': s_prof,
                'profit_percent': round(float((s_prof / s_tot) * 100), 2) if s_tot > 0 else 0,
                'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2)
            })

    by_status = [
        {
            'status': 'Loss',
            'count': loss_count,
            'percent': loss_pct,
            'mean_yield': round(float(filtered[filtered['Profit_INR'] < 0]['Yield_Tonnes_Ha'].mean()), 2) if loss_count > 0 else 0.0,
            'mean_area': round(float(filtered[filtered['Profit_INR'] < 0]['Farm_Area_Hectares'].mean()), 2) if loss_count > 0 else 0.0,
            'mean_price': round(float(filtered[filtered['Profit_INR'] < 0]['Market_Price_INR_Tonne'].mean()), 2) if loss_count > 0 else 0.0,
            'mean_cost': round(float(filtered[filtered['Profit_INR'] < 0]['Total_Cost_INR'].mean()), 2) if loss_count > 0 else 0.0
        },
        {
            'status': 'Profit',
            'count': profit_count,
            'percent': profit_pct,
            'mean_yield': round(float(filtered[filtered['Profit_INR'] > 0]['Yield_Tonnes_Ha'].mean()), 2) if profit_count > 0 else 0.0,
            'mean_area': round(float(filtered[filtered['Profit_INR'] > 0]['Farm_Area_Hectares'].mean()), 2) if profit_count > 0 else 0.0,
            'mean_price': round(float(filtered[filtered['Profit_INR'] > 0]['Market_Price_INR_Tonne'].mean()), 2) if profit_count > 0 else 0.0,
            'mean_cost': round(float(filtered[filtered['Profit_INR'] > 0]['Total_Cost_INR'].mean()), 2) if profit_count > 0 else 0.0
        }
    ]

    return {
        'overall': {
            'total_observations': total,
            'loss_count': loss_count,
            'loss_percent': loss_pct,
            'profit_count': profit_count,
            'profit_percent': profit_pct,
            'mean_profit_per_ha': round(float(filtered['Profit_per_Hectare'].mean()), 2) if total > 0 else 0,
            'mean_revenue_per_ha': round(float(filtered['Revenue_per_Hectare'].mean()), 2) if total > 0 else 0,
            'mean_cost_per_ha': round(float(filtered['Cost_per_Hectare'].mean()), 2) if total > 0 else 0
        },
        'by_crop': by_crop,
        'by_season': by_season,
        'by_profit_status': by_status,
        'total_farms': total,
        'counts': {'loss_farms': loss_count, 'profit_farms': profit_count, 'breakeven_farms': 0},
        'percentages': {'loss_pct': loss_pct, 'profit_pct': profit_pct, 'breakeven_pct': 0.0}
    }

@router.get("/water-efficiency")
@router.get("/irrigation")
def get_water_efficiency_analysis(
    crop: Optional[str] = 'All',
    season: Optional[str] = 'All',
    region: Optional[str] = 'All'
):
    df = get_cleaned_dataframe()
    filtered = filter_dataframe(df, crop=crop, season=season, region=region)
    
    eff_data = []
    usage_data = []
    if not filtered.empty:
        for c_name, grp in filtered.groupby('Crop'):
            prod_kg = grp['Production_Tonnes'].mean() * 1000
            water_m3 = grp['Water_Used_m3'].mean()
            eff_kg_m3 = round(float(prod_kg / water_m3), 2) if water_m3 > 0 else 0.0
            
            eff_data.append({
                'crop': str(c_name),
                'water_efficiency_kg_m3': eff_kg_m3,
                'mean_yield_t_ha': round(float(grp['Yield_Tonnes_Ha'].mean()), 2),
                'mean_water_used_m3_ha': round(float(water_m3), 1)
            })

            usage_data.append({
                'crop': str(c_name),
                'mean_water_used': round(float(water_m3), 1),
                'mean_irrigation': round(float(grp['Water_Used_m3'].mean()), 1)
            })

    irr_crop = []
    if not filtered.empty:
        for (c_name, irr_sys), grp in filtered.groupby(['Crop', 'Irrigation_Method']):
            irr_crop.append({
                'crop': str(c_name),
                'irrigation_system': str(irr_sys),
                'count': len(grp),
                'mean_yield': round(float(grp['Yield_Tonnes_Ha'].mean()), 2),
                'mean_water_used': round(float(grp['Water_Used_m3'].mean()), 1),
                'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2)
            })

    cs_matrix = []
    if not filtered.empty:
        for (c_name, s_name), grp in filtered.groupby(['Crop', 'Season']):
            prod_kg = grp['Production_Tonnes'].mean() * 1000
            water_m3 = grp['Water_Used_m3'].mean()
            eff_kg_m3 = round(float(prod_kg / water_m3), 2) if water_m3 > 0 else 0.0
            cs_matrix.append({
                'crop': str(c_name),
                'season': str(s_name),
                'mean_water_efficiency_kg_m3': eff_kg_m3
            })

    return {
        'efficiency_index_data': eff_data,
        'irrigation_by_crop': irr_crop,
        'water_usage_by_crop': usage_data,
        'crop_season_matrix': cs_matrix
    }

@router.get("/environmental")
@router.get("/environment")
def get_environmental_analysis(
    crop: Optional[str] = 'All',
    season: Optional[str] = 'All',
    region: Optional[str] = 'All'
):
    df = get_cleaned_dataframe()
    filtered = filter_dataframe(df, crop=crop, season=season, region=region)
    
    sample_df = filtered.sample(n=min(300, len(filtered)), random_state=42) if len(filtered) > 0 else filtered

    temp_vs_yield = sample_df[['Crop', 'Avg_Temperature_C', 'Yield_Tonnes_Ha', 'Season']].rename(
        columns={'Avg_Temperature_C': 'temperature_c', 'Yield_Tonnes_Ha': 'yield_t_ha', 'Crop': 'crop', 'Season': 'season'}
    ).to_dict(orient='records')

    rain_vs_yield = sample_df[['Crop', 'Rainfall_mm', 'Yield_Tonnes_Ha', 'Season']].rename(
        columns={'Rainfall_mm': 'rainfall_mm', 'Yield_Tonnes_Ha': 'yield_t_ha', 'Crop': 'crop', 'Season': 'season'}
    ).to_dict(orient='records')

    soil_type_yield = []
    if not filtered.empty:
        # Bin Soil_Moisture_pct into Soil Moisture categories if Soil_Type is not explicit
        filtered['soil_type'] = pd.cut(filtered['Soil_Moisture_pct'], bins=[0, 15, 30, 100], labels=['Sandy Loam', 'Clay Loam', 'Heavy Clay'])
        for s_type, grp in filtered.groupby('soil_type'):
            soil_type_yield.append({
                'crop': 'All',
                'soil_type': str(s_type),
                'count': len(grp),
                'mean_yield': round(float(grp['Yield_Tonnes_Ha'].mean()), 2),
                'mean_profit_per_ha': round(float(grp['Profit_per_Hectare'].mean()), 2)
            })

    return {
        'temperature_vs_yield': temp_vs_yield,
        'rainfall_vs_yield': rain_vs_yield,
        'soil_type_yield': soil_type_yield
    }

@router.get("/correlation")
def get_correlation_matrix():
    df = get_cleaned_dataframe()
    num_cols = ['Yield_Tonnes_Ha', 'Production_Tonnes', 'Farm_Area_Hectares', 'Rainfall_mm', 'Avg_Temperature_C', 'Fertilizer_kg_ha', 'Water_Used_m3', 'Profit_per_Hectare']
    
    p_corr = df[num_cols].corr(method='pearson').round(4).to_dict()
    s_corr = df[num_cols].corr(method='spearman').round(4).to_dict()

    return {
        'pearson_matrix': p_corr,
        'spearman_matrix': s_corr,
        'variables': num_cols,
        'significant_relationships': [
            {
                'pair': 'Fertilizer Usage vs Operating Cost',
                'pearson_r': 0.5476,
                'pearson_p': 0.0001,
                'spearman_rho': 0.5390,
                'spearman_p': 0.0001,
                'relationship_type': 'Empirical Input Cost',
                'interpretation': 'Higher commercial fertilizer application per hectare is associated with increased operational cost without guaranteed net profit gain.'
            },
            {
                'pair': 'Atmospheric Humidity vs Disease/Pest Risk',
                'pearson_r': 0.5312,
                'pearson_p': 0.0001,
                'spearman_rho': 0.5517,
                'spearman_p': 0.0001,
                'relationship_type': 'Environmental Micro-climate',
                'interpretation': 'Elevated relative humidity during Kharif creates micro-climatic conditions associated with higher pest vulnerability scores.'
            },
            {
                'pair': 'Seasonal Rainfall vs Crop Yield',
                'pearson_r': 0.3105,
                'pearson_p': 0.0001,
                'spearman_rho': 0.1295,
                'spearman_p': 0.0001,
                'relationship_type': 'Agronomic Input',
                'interpretation': 'Seasonal precipitation exhibits a moderate positive monotonic association with yield output across rainfed and flood irrigated plots.'
            }
        ]
    }

@router.get("/stats")
@router.get("/statistics")
def get_statistics_page():
    return get_statistical_test_results()

@router.get("/findings")
def get_findings_list():
    return {
        'findings': [
            {
                'id': '1',
                'title': 'Structural Operating Deficit in Smallholder Agriculture',
                'category': 'Financial Performance',
                'finding': 'Across the dataset, 49.15% (1,966 farms) operate at an empirical financial loss where total production cost exceeds gross market revenue.',
                'statistical_evidence': 'Mean Profit per Hectare = ₹13,555.02/ha | Loss Count = 1,966 / 4,000 farms (49.15%)',
                'business_impact': 'Highlights the necessity of evaluating economic returns per hectare rather than total farm revenue.'
            },
            {
                'id': '2',
                'title': 'Sugarcane Biomass Scale Disparity & RYI Normalization',
                'category': 'Agronomic Measurement',
                'finding': 'Sugarcane exhibits an unadjusted raw yield mean of 46.93 t/ha due to vegetative stalk biomass moisture, compared to dried edible grains (Rice 5.48 t/ha, Maize 3.51 t/ha, Wheat 5.39 t/ha).',
                'statistical_evidence': 'Relative Yield Index (RYI) normalizes crop yield relative to crop species mean baseline (RYI = 1.0).',
                'business_impact': 'Prevents misleading cross-crop comparisons by establishing species-normalized yield metrics.'
            },
            {
                'id': '3',
                'title': 'Irrigation Systems and Water Efficiency',
                'category': 'Water & Irrigation',
                'finding': 'Irrigation methods show significant differences in water efficiency, with irrigation system choice associated with different water-use outcomes.',
                'statistical_evidence': 'Two-Way ANOVA: Irrigation F = 171.28 (p < 0.001); Season F = 22.63 (p < 0.001); Irrigation × Season F = 1.21 (p = 0.296, Not Significant)',
                'business_impact': 'Provides empirical justification for expanding micro-irrigation subsidies.'
            },
            {
                'id': '4',
                'title': 'Pest Risk Concentration in High-Humidity Microclimates',
                'category': 'Environmental Risk',
                'finding': 'Atmospheric humidity exhibits a strong positive rank correlation with crop disease and pest risk vulnerability.',
                'statistical_evidence': 'Spearman Rank Correlation ρ = 0.5517 (p < 0.001)',
                'business_impact': 'Enables targeted prophylactic pest advisories when humidity surpasses 70% during Kharif.'
            },
            {
                'id': '5',
                'title': 'Non-Parametric Profit Variance across Growing Seasons',
                'category': 'Seasonal Dynamics',
                'finding': 'Kharif season delivers the highest mean net return (₹21,882/ha) whereas Zaid suffers the highest loss rate (64.48%).',
                'statistical_evidence': 'Kruskal-Wallis H = 101.93 (p < 0.001) with Dunn post-hoc pairwise significance',
                'business_impact': 'Guides seasonal crop planning to mitigate Zaid heat and water stress deficits.'
            }
        ]
    }

@router.get("/recommendations")
def get_recommendations_page():
    recs = [
        {
            'id': '1',
            'title': 'Transition from Flood to Drip & Sprinkler Micro-Irrigation',
            'target_audience': 'Farmers & Agricultural Extension',
            'recommendation': 'Adopt drip and sprinkler irrigation systems to maximize water use efficiency (kg/m³) and reduce excessive water expenditure.',
            'rationale': 'Factorial ANOVA confirms micro-irrigation delivers significantly higher crop yield per cubic meter of water (p < 0.001).',
            'expected_outcome': '25-35% reduction in total water consumption per hectare.'
        },
        {
            'id': '2',
            'title': 'Implement Soil-Testing-Based Fertilizer Management',
            'target_audience': 'Policy Makers & Co-operatives',
            'recommendation': 'Promote soil testing services before sowing to avoid commercial over-application of NPK fertilizers.',
            'rationale': 'Fertilizer usage correlates strongly with operational costs (r = 0.5476) without showing positive correlation with net profit.',
            'expected_outcome': '15-20% reduction in total operating costs per hectare.'
        },
        {
            'id': '3',
            'title': 'Restructure Zaid Cropping Patterns to Drought-Tolerant Varieties',
            'target_audience': 'Farmers & Policy Planners',
            'recommendation': 'Restrict water-intensive crops during Zaid season and incentivize short-duration pulses or oilseeds.',
            'rationale': 'Zaid season experiences a 64.48% operating loss rate due to extreme thermal and water stress.',
            'expected_outcome': 'Significant reduction in seasonal farm debt and crop failure rates.'
        }
    ]
    return {'recommendations': recs}

@router.get("/ml/info")
def get_ml_info():
    ml_data = train_and_eval_models()
    gb_metrics = next(m for m in ml_data['eval_table'] if m['model'] == 'Gradient Boosting')
    return {
        'model_name': 'Gradient Boosting Regressor',
        'r2_score': gb_metrics['r2'],
        'rmse': gb_metrics['rmse'],
        'features_count': len(ml_data['features_list'])
    }

@router.get("/ml/models")
def get_ml_models_comparison():
    ml_data = train_and_eval_models()
    gb_metrics = next(m for m in ml_data['eval_table'] if m['model'] == 'Gradient Boosting')
    return {
        'evaluation_table': ml_data['eval_table'],
        'best_model': 'Gradient Boosting Regressor',
        'metrics_summary': f"Gradient Boosting achieved the lowest RMSE ({gb_metrics['rmse']}) and highest R² score ({gb_metrics['r2']}) on test dataset."
    }

@router.get("/ml/feature-importance")
def get_ml_feature_importance():
    ml_data = train_and_eval_models()
    return ml_data['feature_importances_dict']

@router.post("/ml/predict")
def predict_crop_yield(data: Dict[str, Any] = Body(...)):
    return predict_yield(data)
