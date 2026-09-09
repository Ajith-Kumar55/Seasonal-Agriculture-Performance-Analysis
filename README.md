# Seasonal Agriculture Performance Analysis

**VOIS AICTE Internship Major Project**

---

## 📌 Project Overview

This project is a comprehensive **Data Analytics Project** submitted for the **VOIS AICTE Internship Major Project**. The primary objective of this study is to perform a rigorous empirical analysis of seasonal agricultural performance across Indian farming cycles, evaluating agronomic productivity, financial returns, water use efficiency, environmental relationships, and inferential statistical differences across growing seasons and crop species.

An interactive full-stack web dashboard (React 19 + TypeScript + Vite + Tailwind CSS + Recharts frontend; FastAPI + Scikit-Learn Python backend) serves as the interactive presentation layer for the completed data analytics study, enabling dynamic exploration of dataset observations, inferential hypothesis tests, and machine learning yield predictions.

---

## 🎯 Problem Statement & Objectives

### Problem Statement
Agricultural productivity and farm profitability in India vary significantly across cropping seasons due to seasonal rainfall variations, thermal stress, input costs, and irrigation access. Understanding these seasonal variations and identifying evidence-based interventions is essential for improving farm profitability, mitigating financial losses, and optimizing resource utilization.

### Core Objectives
1. **Understand & Inspect Data**: Conduct a thorough audit of raw agricultural dataset attributes, distributions, and missing observation patterns.
2. **Data Preparation & Cleaning**: Apply deterministic yield reconstruction and season/crop-grouped median imputations without corrupting original data distributions.
3. **Analyze Seasonal Variation**: Evaluate variation in crop yield, revenue, operating cost, net profit, and weather parameters across Kharif, Rabi, and Zaid seasons.
4. **Investigate Environmental Relationships**: Assess co-variation between precipitation, temperature, atmospheric humidity, soil moisture, and agricultural outcomes using non-parametric correlation techniques.
5. **Compare Relevant Groups**: Analyze financial performance across 8 crop species, 3 growing seasons, 4 irrigation modalities, and geographic regions.
6. **Identify Significant Differences**: Conduct inferential hypothesis testing (Kruskal-Wallis, Chi-Square, Two-Way Factorial ANOVA) to confirm statistically significant group differences.
7. **Apply Statistical & Visualization Techniques**: Employ robust non-parametric tests, effect size estimations, correlation heatmaps, and interactive visual charts.
8. **Machine Learning Predictive Modeling**: Develop and evaluate regression models (Linear Regression, Random Forest, Gradient Boosting) as an additional analytical component to estimate crop yield and profit.
9. **Interpret Findings & Develop Recommendations**: Translate statistical outputs into actionable, evidence-based advisories for farmers, policy makers, and agricultural extension services.

---

## 📊 Dataset Description

The analysis is conducted on the supplied agricultural performance dataset containing:
- **Total Records**: `4,000` farm observations
- **Total Attributes**: `28` columns
- **Crop Species (8)**: `Wheat`, `Rice`, `Maize`, `Cotton`, `Pulses`, `Groundnut`, `Chilli`, `Sugarcane`
- **Cropping Seasons (3)**: `Kharif`, `Rabi`, `Zaid`
- **Geographic Coverage**: `8` States (`Andhra Pradesh`, `Telangana`, `Karnataka`, `Tamil Nadu`, `Maharashtra`, `Gujarat`, `Punjab`, `Madhya Pradesh`), `10` Districts
- **Irrigation Modalities (4)**: `Drip`, `Flood`, `Rainfed`, `Sprinkler`

---

## 🧹 Data Cleaning & Preprocessing Methodology

The notebook and data service execute three transparent data preparation steps:
1. **Deterministic Exact Yield Reconstruction**: `32` missing values in `Yield_Tonnes_Ha` were reconstructed using the exact formula $\text{Yield (t/ha)} = \frac{\text{Production (Tonnes)}}{\text{Farm Area (Hectares)}}$.
2. **Season-Grouped Median Imputation for Rainfall**: `48` missing values in `Rainfall_mm` were imputed using the median of the respective `Season` group.
3. **Season & Crop-Grouped Median Imputation for Soil Moisture**: `40` missing values in `Soil_Moisture_pct` were imputed using the median of the respective `[Season, Crop]` combination.
4. **Derived Per-Hectare Metrics**:
   - $\text{Revenue per Hectare (INR/ha)} = \frac{\text{Revenue (INR)}}{\text{Farm Area (ha)}}$
   - $\text{Cost per Hectare (INR/ha)} = \frac{\text{Total Cost (INR)}}{\text{Farm Area (ha)}}$
   - $\text{Profit per Hectare (INR/ha)} = \frac{\text{Profit (INR)}}{\text{Farm Area (ha)}}$
   - $\text{Relative Yield Index (RYI)} = \frac{\text{Farm Yield}}{\text{Crop Species Mean Baseline Yield}}$
   - $\text{Profitability Status} = \text{Loss} \text{ (if Profit < 0)} \mid \text{Profit} \text{ (if Profit > 0)}$

---

## 📈 Analysis Performed

The study covers ten comprehensive analytical domains:
1. **Exploratory Data Analysis (EDA)**: Summary statistics, distribution shapes, skewness audits, and missingness patterns.
2. **Crop Performance Analysis**: Productivity, revenue, cost structure, and RYI baseline comparison across all 8 crop species.
3. **Seasonal Analysis**: Comparative performance across Kharif, Rabi, and Zaid growing seasons.
4. **Regional Analysis**: Performance evaluation across geographic state/regional clusters.
5. **Profitability Analysis**: Operating loss rate analysis, net returns per hectare, and cost structure evaluation.
6. **Water & Irrigation Analysis**: Two-Factor Water Efficiency Index ($kg/m^3 \equiv t/1000m^3$) and consumption across irrigation modalities.
7. **Environmental Analysis**: Precipitation, thermal stress, humidity, and soil type relationships with agricultural output.
8. **Correlation Analysis**: Bivariate Pearson linear correlation and Spearman rank correlation matrices.
9. **Inferential Statistical Tests**: Hypothesis testing with non-parametric and parametric models.
10. **Machine Learning Yield Prediction**: Regression model benchmarking for real-time yield and financial estimation.

---

## 🔬 Inferential Statistical Hypothesis Testing

All statistical tests were selected based on distribution characteristics (Shapiro-Wilk normality rejection $p < 0.001$):

1. **Kruskal-Wallis Test for Seasonal Net Profit**:
   - **Hypothesis**: Median net financial profit ($\text{Profit\_INR}$) differs across Kharif, Rabi, and Zaid seasons.
   - **Result**: $H = 101.93, \quad p = 7.36 \times 10^{-23} < 0.001$ ($\text{Statistically Significant}$).
   - **Post-Hoc**: Dunn's pairwise test confirms Kharif net returns are significantly higher than Rabi and Zaid.

2. **Chi-Square Test of Independence (Season vs. Profitability Status)**:
   - **Hypothesis**: Farm loss proportion ($\text{Profit} < 0$ vs. $\text{Profit} > 0$) is associated with cropping season.
   - **Result**: $\chi^2 = 92.65, \quad \text{dof} = 2, \quad p = 7.62 \times 10^{-21} < 0.001, \quad \text{Cramér's } V = 0.1522$ ($\text{Moderate Association}$).

3. **Two-Way Factorial ANOVA (Log Yield ~ Crop * Season)**:
   - **Crop Main Effect**: $F = 1378.36, \quad p < 0.001, \quad \text{Partial } \eta^2 = 0.7082$ ($\text{Large Effect}$, accounts for 70.82% of yield variance).
   - **Season Main Effect**: $F = 66.33, \quad p < 0.001, \quad \text{Partial } \eta^2 = 0.0323$.
   - **Crop $\times$ Season Interaction**: $F = 0.72, \quad p = 0.7544$ ($\text{Not Statistically Significant}$).

4. **Bivariate Correlation Analysis**:
   - **Pearson Linear Correlation**:
     - Fertilizer Usage vs. Cost per Hectare: $r = 0.5476, \quad p < 0.001$ (Higher input application increases operating cost).
     - Rainfall vs. Soil Moisture: $r = 0.5200, \quad p < 0.001$ (Precipitation increases volumetric soil moisture).
   - **Spearman Rank Correlation**:
     - Atmospheric Humidity vs. Pest Risk: $\rho = 0.5517, \quad p < 0.001$ (Strong positive association between humidity and pest risk).
     - Seasonal Rainfall vs. Crop Yield: $\rho = 0.1295, \quad p < 0.001$ (Moderate positive monotonic association).

---

## 🤖 Machine Learning Yield & Profit Prediction

As an **additional analytical component**, regression pipelines were trained on an 80/20 train/test split (`random_state=42`) using 20 non-leaking features to estimate crop yield ($\text{t/ha}$):

### Holdout Test Set Evaluation (80/20 Split)
| Machine Learning Model | Test Set MAE | Test Set RMSE | Test Set $R^2$ Score | Rank / Performance |
| :--- | :---: | :---: | :---: | :---: |
| **Gradient Boosting Regressor** | **`0.7666`** | **`2.2181`** | **`0.9745`** | 🥇 **Best Performing Model** |
| **Random Forest Regressor** | `0.7735` | `2.6997` | `0.9622` | 🥈 Second Best Model |
| **Linear Regression** | `2.3194` | `6.0985` | `0.8071` | 🥉 Baseline Model |

### 5-Fold Cross-Validation Performance
| Machine Learning Model | Mean $R^2$ Score | Std Dev ($\sigma$) |
| :--- | :---: | :---: |
| **Gradient Boosting Regressor** | **`0.9712`** | `±0.0015` |
| **Random Forest Regressor** | `0.9631` | `±0.0057` |
| **Linear Regression** | `0.8076` | `±0.0185` |

*Feature Importance*: `Crop_Sugarcane` contributes 82.24% of predictive weight due to Sugarcane's distinct biomass scale, followed by `Soil_pH` (13.39%) and `Rainfall_mm` (2.27%).

---

## 💡 Key Empirical Findings (Verified Ground Truth)

1. **Seasonal Financial Disparity**:
   - **Kharif Season**: Achieves highest mean net profit per hectare ($\text{₹}21,881.81 / \text{ha}$) and lowest loss rate ($42.21\%$), supported by mean rainfall of $852.11 \text{ mm}$.
   - **Rabi Season**: Delivers moderate mean net profit ($\text{₹}10,361.68 / \text{ha}$) with a loss rate of $51.14\%$.
   - **Zaid Season**: Experiences net financial deficit ($-\text{₹}2,636.52 / \text{ha}$) and highest loss rate ($64.48\%$) due to elevated thermal stress ($31.04^\circ\text{C}$) and precipitation deficits ($299.12 \text{ mm}$).
2. **Structural Operating Deficit**:
   - Out of 4,000 observations, **`1,966` farms (`49.15%`)** operate at an empirical financial loss where operating costs exceed market revenues, highlighting the necessity of per-hectare return analysis.
3. **Water Efficiency Variation**:
   - Overall mean water efficiency is **`5.39 t/1,000 m`$^3$** ($\equiv \text{kg/m}^3$). Drip and sprinkler systems exhibit significantly higher water productivity ($kg/m^3$) than flood irrigation ($p < 0.001$).

---

## ⚠️ Crop Yield Scale Disclaimer & Limitations

### Crop Yield Scale Disclaimer
Sugarcane exhibits an unadjusted mean yield of **`46.93 t/ha`** due to high vegetative stalk biomass moisture content, whereas grain, pulse, oilseed, and spice crops measure dried edible products (Rice `2.44 t/ha`, Maize `2.71 t/ha`, Wheat `2.11 t/ha`, Chilli `1.54 t/ha`, Groundnut `1.32 t/ha`, Cotton `1.22 t/ha`, Pulses `0.92 t/ha`). Cross-crop yield comparisons must use the **Relative Yield Index (RYI)** to avoid biomass scale distortions.

### Analytical Limitations
1. **Correlation vs. Causation**: All statistical relationships indicate empirical co-variation or association ("associated with", "varies with") and do not establish direct causal mechanisms.
2. **Dataset Sample Scope**: Findings reflect the specific 4,000-observation dataset sample provided for the internship assignment.

---

## 🌿 Evidence-Based Recommendations

1. **Prioritize High-Value Crop Selection in Kharif**: Capitalize on high seasonal precipitation ($852.11 \text{ mm}$) during Kharif to maximize net returns ($\text{₹}21,881.81/\text{ha}$).
2. **Mitigate Zaid Thermal & Water Stress**: Restrict water-intensive cropping in Zaid ($64.48\%$ loss rate) and transition to short-duration, drought-tolerant pulse/oilseed varieties with drip irrigation.
3. **Promote Micro-Irrigation Expansion**: Transition from flood to drip/sprinkler modalities, which deliver significantly higher yield per unit of water ($p < 0.001$).
4. **Soil-Testing-Based Fertilizer Management**: Implement soil testing before application; fertilizer usage correlates with operating costs ($r = 0.5476$) without increasing net returns per hectare.

---

## 🔮 Future Scope
- Integration of multi-year longitudinal satellite remote sensing (NDVI) data.
- Expansion to real-time local mandi price feed integrations.

---

## 🛠️ Technologies Used

- **Data Processing & Analytics**: Python 3.9+, Pandas, NumPy, SciPy, Statsmodels
- **Machine Learning**: Scikit-Learn (Pipelines, ColumnTransformers, Regression Models)
- **Primary Analytics Environment**: Jupyter Notebook (`Seasonal_Agriculture_Performance_Analysis.ipynb`)
- **Backend Service**: FastAPI, Uvicorn, Pydantic
- **Frontend Dashboard**: React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, Lucide Icons

---

## 💻 Running the Application

### 1. Start FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*Backend runs on port 8000: `http://127.0.0.1:8000` (Swagger docs at `http://127.0.0.1:8000/docs`)*

### 2. Start Vite Frontend Dashboard
```bash
cd frontend
npm install
npm run dev
```
*Web dashboard runs on port 3000: `http://localhost:3000`*
