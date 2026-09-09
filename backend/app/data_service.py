import os
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_PATH = os.path.join(BASE_DIR, 'seasonal_agriculture_performance_dataset.csv')

_df_clean_cache = None

def get_cleaned_dataframe() -> pd.DataFrame:
    global _df_clean_cache
    if _df_clean_cache is not None:
        return _df_clean_cache.copy()

    df = pd.read_csv(DATA_PATH)
    
    # 1. Deterministic Exact Yield Reconstruction (32 missing rows)
    yield_missing = df['Yield_Tonnes_Ha'].isnull()
    df.loc[yield_missing, 'Yield_Tonnes_Ha'] = df.loc[yield_missing, 'Production_Tonnes'] / df.loc[yield_missing, 'Farm_Area_Hectares']

    # 2. Season-Grouped Median Imputation for Rainfall_mm (48 missing rows)
    df['Rainfall_mm'] = df.groupby('Season')['Rainfall_mm'].transform(lambda x: x.fillna(x.median()))

    # 3. Season & Crop-Grouped Median Imputation for Soil_Moisture_pct (40 missing rows)
    df['Soil_Moisture_pct'] = df.groupby(['Season', 'Crop'])['Soil_Moisture_pct'].transform(lambda x: x.fillna(x.median()))

    # 4. Derive Per-Hectare Financial Metrics
    df['Revenue_per_Hectare'] = df['Revenue_INR'] / df['Farm_Area_Hectares']
    df['Cost_per_Hectare'] = df['Total_Cost_INR'] / df['Farm_Area_Hectares']
    df['Profit_per_Hectare'] = df['Profit_INR'] / df['Farm_Area_Hectares']

    # 5. Derive Relative_Yield_Index (Farm Yield / Crop Baseline Mean Yield)
    crop_means = df.groupby('Crop')['Yield_Tonnes_Ha'].transform('mean')
    df['Relative_Yield_Index'] = df['Yield_Tonnes_Ha'] / crop_means

    # 6. Derive Profitability_Status
    def assign_profitability(profit):
        if profit < 0:
            return 'Loss'
        elif profit > 0:
            return 'Profit'
        else:
            return 'Break-even'

    df['Profitability_Status'] = df['Profit_INR'].apply(assign_profitability)

    # 7. Map State to Geographic Region
    region_map = {
        'Andhra Pradesh': 'South',
        'Telangana': 'South',
        'Karnataka': 'South',
        'Tamil Nadu': 'South',
        'Maharashtra': 'West',
        'Gujarat': 'West',
        'Punjab': 'North',
        'Madhya Pradesh': 'Central'
    }
    df['Region'] = df['State'].map(region_map).fillna('Central')

    _df_clean_cache = df
    return _df_clean_cache.copy()

def filter_dataframe(df, crop=None, season=None, irrigation=None, state=None, district=None, region=None):
    filtered = df.copy()
    if crop and crop != 'All':
        filtered = filtered[filtered['Crop'] == crop]
    if season and season != 'All':
        filtered = filtered[filtered['Season'] == season]
    if irrigation and irrigation != 'All':
        filtered = filtered[filtered['Irrigation_Method'] == irrigation]
    if state and state != 'All':
        filtered = filtered[filtered['State'] == state]
    if district and district != 'All':
        filtered = filtered[filtered['District'] == district]
    if region and region != 'All':
        filtered = filtered[filtered['Region'] == region]
    return filtered
