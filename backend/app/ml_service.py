import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score
from app.data_service import get_cleaned_dataframe

_ml_cache = None

def train_and_eval_models():
    global _ml_cache
    if _ml_cache is not None:
        return _ml_cache

    df = get_cleaned_dataframe()
    
    features_ml = ['State', 'District', 'Crop', 'Season', 'Irrigation_Method',
                   'Farm_Area_Hectares', 'Rainfall_mm', 'Avg_Temperature_C', 'Humidity_pct',
                   'Sunlight_Hours_Day', 'Soil_pH', 'Soil_Moisture_pct', 'Nitrogen_kg_ha',
                   'Phosphorus_kg_ha', 'Potassium_kg_ha', 'Fertilizer_kg_ha', 'Pesticide_Litre_ha',
                   'Seed_Quality_Score', 'Water_Used_m3', 'Disease_Pest_Risk_pct']

    X = df[features_ml]
    y = df['Yield_Tonnes_Ha']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    cat_cols = ['State', 'District', 'Crop', 'Season', 'Irrigation_Method']
    num_cols = [c for c in features_ml if c not in cat_cols]

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), num_cols),
            ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'), cat_cols)
        ]
    )

    models_dict = {
        'Linear Regression': LinearRegression(),
        'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
        'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, random_state=42)
    }

    eval_results = []
    trained_pipelines = {}

    for name, model in models_dict.items():
        pipe = Pipeline(steps=[('preprocessor', preprocessor), ('model', model)])
        pipe.fit(X_train, y_train)
        preds = pipe.predict(X_test)
        
        mae = mean_absolute_error(y_test, preds)
        rmse = root_mean_squared_error(y_test, preds)
        r2 = r2_score(y_test, preds)
        
        eval_results.append({
            'model': name,
            'mae': round(float(mae), 4),
            'rmse': round(float(rmse), 4),
            'r2': round(float(r2), 4),
            'is_best': name == 'Gradient Boosting'
        })
        trained_pipelines[name] = pipe

    # Feature Importance for Gradient Boosting / Random Forest
    gb_pipe = trained_pipelines['Gradient Boosting']
    feature_names = num_cols + list(gb_pipe.named_steps['preprocessor'].named_transformers_['cat'].get_feature_names_out(cat_cols))
    importances = gb_pipe.named_steps['model'].feature_importances_
    
    feature_imp_list = [
        {'feature': feat, 'importance': round(float(imp), 4)}
        for feat, imp in sorted(zip(feature_names, importances), key=lambda x: x[1], reverse=True)[:10]
    ]

    feature_imp_dict = {
        item['feature']: item['importance'] for item in feature_imp_list
    }

    _ml_cache = {
        'eval_table': eval_results,
        'pipelines': trained_pipelines,
        'feature_importances': feature_imp_list,
        'feature_importances_dict': feature_imp_dict,
        'features_list': features_ml
    }
    return _ml_cache

def build_ml_input_row(data: dict) -> pd.DataFrame:
    df = get_cleaned_dataframe()
    features_ml = ['State', 'District', 'Crop', 'Season', 'Irrigation_Method',
                   'Farm_Area_Hectares', 'Rainfall_mm', 'Avg_Temperature_C', 'Humidity_pct',
                   'Sunlight_Hours_Day', 'Soil_pH', 'Soil_Moisture_pct', 'Nitrogen_kg_ha',
                   'Phosphorus_kg_ha', 'Potassium_kg_ha', 'Fertilizer_kg_ha', 'Pesticide_Litre_ha',
                   'Seed_Quality_Score', 'Water_Used_m3', 'Disease_Pest_Risk_pct']

    crop = data.get('crop') or data.get('Crop') or 'Rice'
    season = data.get('season') or data.get('Season') or 'Kharif'
    region = data.get('region') or data.get('Region')

    sub_df = df[(df['Crop'] == crop) & (df['Season'] == season)]
    if region and 'Region' in df.columns:
        sub_region = sub_df[sub_df['Region'] == region]
        if not sub_region.empty:
            sub_df = sub_region
    if sub_df.empty:
        sub_df = df[df['Crop'] == crop]
    if sub_df.empty:
        sub_df = df

    field_map = {
        'Crop': crop,
        'Season': season,
        'Farm_Area_Hectares': float(data.get('farm_area_hectares') or data.get('Farm_Area_Hectares') or 5.0),
        'Rainfall_mm': float(data.get('rainfall_mm') or data.get('Rainfall_mm') or 1000.0),
        'Avg_Temperature_C': float(data.get('temperature_c') or data.get('Avg_Temperature_C') or 28.0),
        'Fertilizer_kg_ha': float(data.get('fertilizer_usage_kg_ha') or data.get('Fertilizer_kg_ha') or 150.0),
        'Pesticide_Litre_ha': float(data.get('pesticide_usage_kg_ha') or data.get('Pesticide_Litre_ha') or 4.0),
    }

    irr_sys = data.get('irrigation_system') or data.get('Irrigation_Method')
    if irr_sys:
        field_map['Irrigation_Method'] = irr_sys

    row_dict = {}
    cat_cols = ['State', 'District', 'Crop', 'Season', 'Irrigation_Method']

    for feat in features_ml:
        if feat in field_map:
            row_dict[feat] = field_map[feat]
        elif feat in cat_cols:
            modes = sub_df[feat].mode()
            row_dict[feat] = str(modes[0]) if not modes.empty else str(df[feat].mode()[0])
        else:
            med = sub_df[feat].median()
            row_dict[feat] = float(med) if not pd.isna(med) else float(df[feat].median())

    df_row = pd.DataFrame([row_dict])[features_ml]
    return df_row

def predict_yield(input_dict: dict):
    ml_data = train_and_eval_models()
    pipe = ml_data['pipelines']['Gradient Boosting']
    
    df_input = build_ml_input_row(input_dict)
    pred_val = float(pipe.predict(df_input)[0])
    pred_val = max(0.0, round(pred_val, 2))
    
    df = get_cleaned_dataframe()
    crop = input_dict.get('crop') or input_dict.get('Crop') or 'Rice'
    area = float(input_dict.get('farm_area_hectares') or input_dict.get('Farm_Area_Hectares') or 5.0)
    price = float(input_dict.get('market_price_inr_tonne') or input_dict.get('Market_Price_INR_Tonne') or 22000.0)
    cost = float(input_dict.get('total_cost_inr') or input_dict.get('Total_Cost_INR') or 150000.0)

    prod = round(float(pred_val * area), 2)
    revenue = round(float(prod * price), 2)
    profit = round(float(revenue - cost), 2)
    profit_per_ha = round(float(profit / area), 2) if area > 0 else 0.0
    status = 'Profit' if profit > 0 else ('Loss' if profit < 0 else 'Break-even')

    crop_df = df[df['Crop'] == crop]
    crop_mean_yield = float(crop_df['Yield_Tonnes_Ha'].mean()) if not crop_df.empty else 5.0
    ryi = round(float(pred_val / crop_mean_yield), 2) if crop_mean_yield > 0 else 1.0

    gb_metrics = next(m for m in ml_data['eval_table'] if m['model'] == 'Gradient Boosting')

    return {
        'predicted_yield_t_ha': pred_val,
        'predicted_production_tonnes': prod,
        'predicted_revenue_inr': revenue,
        'predicted_profit_inr': profit,
        'predicted_profit_per_ha': profit_per_ha,
        'predicted_profit_status': status,
        'relative_yield_index': ryi,
        'feature_importances': ml_data['feature_importances_dict'],
        'model_performance': {
            'r2_score': gb_metrics['r2'],
            'rmse': gb_metrics['rmse'],
            'best_model': 'Gradient Boosting Regressor'
        }
    }
