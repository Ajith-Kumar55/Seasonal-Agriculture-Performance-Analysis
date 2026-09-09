# Seasonal Agriculture Performance Analysis

**VOIS AICTE Internship Major Project**

**Author:** Ajithkumar HM

---

## 🚀 Live Demo

🌐 **Live Application:**  
https://seasonal-agriculture-frontend.onrender.com

🔗 **GitHub Repository:**  
https://github.com/Ajith-Kumar55/Seasonal-Agriculture-Performance-Analysis

---

## 📌 Project Overview

This project is a comprehensive **Data Analytics Project** submitted for the **VOIS AICTE Internship Major Project**.

The primary objective of this study is to perform a rigorous empirical analysis of seasonal agricultural performance across Indian farming cycles, evaluating agronomic productivity, financial returns, water-use efficiency, environmental relationships, and inferential statistical differences across growing seasons and crop species.

An interactive full-stack web dashboard built using **React, TypeScript, Vite, Tailwind CSS, Recharts, FastAPI, and Scikit-Learn** serves as the interactive presentation layer for the completed data analytics study.

The dashboard enables users to explore dataset observations, statistical analysis, agricultural performance indicators, and machine-learning-based crop yield predictions.

---

## 🎯 Problem Statement & Objectives

### Problem Statement

Agricultural productivity and farm profitability vary across cropping seasons due to differences in rainfall, temperature, input costs, irrigation practices, and other environmental and operational conditions.

Understanding these observed variations can support evidence-based agricultural analysis and help stakeholders evaluate seasonal performance, resource utilization, and financial outcomes.

### Core Objectives

1. **Understand & Inspect Data**  
   Conduct a thorough audit of raw agricultural dataset attributes, distributions, and missing observation patterns.

2. **Data Preparation & Cleaning**  
   Apply deterministic yield reconstruction and season/crop-grouped median imputations while preserving the original data structure.

3. **Analyze Seasonal Variation**  
   Evaluate variation in crop yield, revenue, operating cost, net profit, and weather parameters across Kharif, Rabi, and Zaid seasons.

4. **Investigate Environmental Relationships**  
   Assess relationships between rainfall, temperature, atmospheric humidity, soil moisture, and agricultural outcomes using correlation techniques.

5. **Compare Relevant Groups**  
   Analyze agricultural performance across 8 crop species, 3 growing seasons, 4 irrigation modalities, and regional clusters.

6. **Identify Significant Differences**  
   Conduct inferential hypothesis testing using Kruskal-Wallis, Chi-Square, and Two-Way Factorial ANOVA.

7. **Apply Statistical & Visualization Techniques**  
   Employ descriptive statistics, effect-size estimation, correlation analysis, heatmaps, and interactive visualizations.

8. **Machine Learning Predictive Modeling**  
   Develop and evaluate Linear Regression, Random Forest, and Gradient Boosting models as an additional analytical component for estimating crop yield.

9. **Interpret Findings & Develop Recommendations**  
   Translate statistical findings into evidence-based recommendations for farmers, agricultural extension services, policy makers, and other stakeholders.

---

## 📊 Dataset Description

The analysis is conducted on the supplied agricultural performance dataset containing:

- **Total Records:** `4,000`
- **Total Attributes:** `28`
- **Crop Species:** 8
  - Wheat
  - Rice
  - Maize
  - Cotton
  - Pulses
  - Groundnut
  - Chilli
  - Sugarcane
- **Cropping Seasons:** 3
  - Kharif
  - Rabi
  - Zaid
- **Geographic Coverage:** 8 States and 10 Districts
- **Irrigation Modalities:** 4
  - Drip
  - Flood
  - Rainfed
  - Sprinkler

---

## 🧹 Data Cleaning & Preprocessing Methodology

The notebook and backend data service execute transparent data preparation steps.

### 1. Deterministic Yield Reconstruction

`32` missing values in `Yield_Tonnes_Ha` were reconstructed using:

**Yield (t/ha) = Production (Tonnes) / Farm Area (Hectares)**

### 2. Season-Grouped Median Imputation

`48` missing values in `Rainfall_mm` were imputed using the median rainfall of the corresponding season.

### 3. Season & Crop-Grouped Median Imputation

`40` missing values in `Soil_Moisture_pct` were imputed using the median of the corresponding Season × Crop group.

### 4. Derived Per-Hectare Metrics

The analysis derives:

- Revenue per Hectare
- Cost per Hectare
- Profit per Hectare
- Relative Yield Index (RYI)
- Profitability Status

These metrics support comparison across farms of different sizes.

---

## 📈 Analysis Performed

The project covers the following analytical domains:

1. **Exploratory Data Analysis (EDA)**
   - Summary statistics
   - Distribution analysis
   - Skewness analysis
   - Missing-value analysis

2. **Crop Performance Analysis**
   - Yield
   - Revenue
   - Cost
   - Profitability
   - Relative Yield Index

3. **Seasonal Analysis**
   - Kharif
   - Rabi
   - Zaid

4. **Regional Analysis**
   - Regional agricultural performance
   - Yield comparison
   - Profit-per-hectare comparison

5. **Profitability Analysis**
   - Operating loss rate
   - Revenue
   - Cost
   - Profit per hectare

6. **Water & Irrigation Analysis**
   - Water efficiency
   - Water consumption
   - Irrigation modality comparison

7. **Environmental Analysis**
   - Rainfall
   - Temperature
   - Humidity
   - Soil moisture
   - Soil type

8. **Correlation Analysis**
   - Pearson correlation
   - Spearman rank correlation

9. **Inferential Statistical Tests**
   - Kruskal-Wallis
   - Chi-Square
   - Two-Way Factorial ANOVA

10. **Machine Learning Yield Prediction**
    - Linear Regression
    - Random Forest Regressor
    - Gradient Boosting Regressor

---

## 🔬 Inferential Statistical Hypothesis Testing

Statistical tests were selected according to the characteristics of the dataset and the analytical objectives.

### 1. Kruskal-Wallis Test

The Kruskal-Wallis test evaluates differences in seasonal net profit distributions.

**Result:**

- H = `101.93`
- p < `0.001`
- Result: Statistically significant difference across seasons.

### 2. Chi-Square Test of Independence

The Chi-Square test evaluates the association between season and profitability status.

**Result:**

- χ² = `92.65`
- Degrees of freedom = `2`
- p < `0.001`
- Cramer's V = `0.1522`

The result indicates a statistically significant association between season and profitability status in the analyzed dataset.

### 3. Two-Way Factorial ANOVA — Log Yield

**Crop Main Effect**

- F = `1378.36`
- p < `0.001`

**Season Main Effect**

- F = `66.33`
- p < `0.001`

**Crop × Season Interaction**

- F = `0.72`
- p = `0.7544`
- Not statistically significant

### 4. Correlation Analysis

#### Pearson Correlation

**Fertilizer Usage vs Operating Cost**

- r = `0.5476`
- p < `0.001`

This indicates a positive association between fertilizer usage and operating cost in the analyzed dataset. It does not establish a causal effect on net profit.

**Rainfall vs Soil Moisture**

- r = `0.5200`
- p < `0.001`

#### Spearman Correlation

**Atmospheric Humidity vs Disease/Pest Risk**

- ρ = `0.5517`
- p < `0.001`

**Seasonal Rainfall vs Crop Yield**

- ρ = `0.1295`
- p < `0.001`

These correlations describe observed associations and should not be interpreted as proof of causation.

---

## 🤖 Machine Learning Yield Prediction

Machine-learning regression models were developed as an **additional analytical component** of the project.

The models were trained using an 80/20 train-test split with `random_state=42`.

### Model Comparison

| Machine Learning Model | MAE | RMSE | R² Score | Rank |
|---|---:|---:|---:|---|
| **Gradient Boosting Regressor** | **0.7666** | **2.2181** | **0.9745** | 🥇 Best |
| Random Forest Regressor | 0.7735 | 2.6997 | 0.9622 | 🥈 Second |
| Linear Regression | 2.3194 | 6.0985 | 0.8071 | 🥉 Baseline |

### Cross-Validation

| Model | Mean R² | Standard Deviation |
|---|---:|---:|
| **Gradient Boosting Regressor** | **0.9712** | ±0.0015 |
| Random Forest Regressor | 0.9631 | ±0.0057 |
| Linear Regression | 0.8076 | ±0.0185 |

### Selected Model

The **Gradient Boosting Regressor** achieved the highest test-set R² and the lowest RMSE and MAE among the evaluated models.

The live dashboard uses Gradient Boosting for yield prediction and displays its feature-importance information.

---

## 💡 Key Empirical Findings

### 1. Seasonal Financial Performance

**Kharif Season**

- Mean profit per hectare: approximately `₹21,881.81`
- Loss rate: approximately `42.21%`

**Rabi Season**

- Mean profit per hectare: approximately `₹10,361.68`
- Loss rate: approximately `51.14%`

**Zaid Season**

- Mean profit per hectare: approximately `-₹2,636.52`
- Loss rate: approximately `64.48%`

Zaid records the highest observed operating loss rate among the three seasons.

### 2. Overall Profitability

Out of `4,000` observations:

- `1,966` farms were classified as operating at a loss.
- Overall loss rate: `49.15%`

### 3. Water Efficiency

The overall mean water efficiency is approximately:

`5.39 t/1,000 m³`

Observed water-efficiency differences across irrigation modalities were statistically significant in the analysis.

These results describe observed differences in the dataset and should not be interpreted as proof that one irrigation method universally causes higher agricultural performance.

---

## ⚠️ Crop Yield Scale Disclaimer & Limitations

### Crop Yield Scale Disclaimer

Sugarcane has a substantially higher observed yield value than several grain, pulse, oilseed, and spice crops because of differences in crop biomass and measurement scale.

Therefore, direct cross-crop comparisons of raw tonnes per hectare should be interpreted carefully.

The project uses the **Relative Yield Index (RYI)** as an additional comparison measure to reduce the effect of differences in crop-specific yield scales.

### Analytical Limitations

1. **Correlation vs. Causation**

   Statistical relationships indicate association or co-variation and do not establish direct causal mechanisms.

2. **Dataset Sample Scope**

   Findings reflect the specific `4,000` observations provided for the internship assignment.

3. **Regional Analysis**

   Regional clustering in the dashboard should be interpreted according to the project's defined regional assignment methodology.

4. **Machine Learning**

   The ML model is an analytical prediction component and should not be interpreted as a guarantee of future agricultural outcomes.

---

## 🌿 Evidence-Based Recommendations

### 1. Evaluate Irrigation Systems for Water-Efficiency Improvement

**Target Audience:** Farmers & Agricultural Extension

**Description:**

Compare irrigation practices based on observed water-efficiency outcomes and local farm conditions rather than assuming one method is universally superior.

**Rationale:**

Two-Way ANOVA indicates statistically significant differences in water efficiency across irrigation methods (p < 0.001).

**Expected Outcome:**

Supports evidence-based evaluation of irrigation practices and water-management decisions.

---

### 2. Implement Soil-Testing-Based Fertilizer Management

**Target Audience:** Policy Makers & Co-operatives

**Description:**

Promote soil testing before fertilizer application to support more targeted nutrient management and avoid unnecessary fertilizer use.

**Rationale:**

Fertilizer usage is positively associated with operating cost (Pearson r = 0.5476, p < 0.001), without establishing a causal effect on net profit.

**Expected Outcome:**

Supports more targeted fertilizer-management decisions and cost evaluation.

---

### 3. Evaluate Zaid Cropping Patterns and Water Requirements

**Target Audience:** Farmers & Policy Planners

**Description:**

Review crop selection and water requirements during the Zaid season using observed profitability and seasonal conditions.

**Rationale:**

Zaid records the highest observed operating loss rate among the three seasons (64.48%).

**Expected Outcome:**

Supports seasonal crop-planning and water-management decisions.

---

## 🔮 Future Scope

Possible future extensions include:

- Integration of multi-year agricultural datasets
- Satellite remote-sensing and NDVI data
- Real-time local mandi price feeds
- Additional regional agricultural datasets
- More advanced time-series forecasting
- Deployment of PostgreSQL for larger-scale data storage
- Additional explainability techniques for ML predictions

---

## 🛠️ Technologies Used

### Data Processing & Analytics

- Python
- Pandas
- NumPy
- SciPy
- Statsmodels
- Jupyter Notebook

### Machine Learning

- Scikit-Learn
- Linear Regression
- Random Forest
- Gradient Boosting
- ML Pipelines
- Column Transformers

### Backend

- FastAPI
- Uvicorn
- Pydantic
- Python

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide Icons

---

## 🏗️ Project Structure

```text
Seasonal_Agriculture_Performance_Analysis/
│
├── backend/
│   ├── app/
│   │   ├── api.py
│   │   ├── data_service.py
│   │   ├── ml_service.py
│   │   ├── stats_service.py
│   │   └── __init__.py
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
│
├── Seasonal_Agriculture_Performance_Analysis.ipynb
├── seasonal_agriculture_performance_dataset.csv
├── README.md
└── Seasonal_Agriculture_Performance_Analysis_VOIS_Final.pptx
```

---

## 💻 Running the Application Locally

### 1. Start FastAPI Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

### 2. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will display the local URL in the terminal.

---

## 🌐 Production Deployment

### Frontend

Live application:

```text
https://seasonal-agriculture-frontend.onrender.com
```

### Backend

Production API:

```text
https://seasonal-agriculture-api.onrender.com
```

API endpoint:

```text
https://seasonal-agriculture-api.onrender.com/api
```

---

## 🔐 Analytical Methodology

This project follows a **Strict Non-Causal Interpretation** approach.

The statistical analyses identify:

- observed differences
- statistical significance
- correlations
- associations
- predictive relationships

They do **not** independently establish that one agricultural factor directly causes another.

Recommendations are therefore framed as evidence-based evaluation or decision-support suggestions rather than guaranteed outcomes.

---

## 👨‍💻 Author

**Ajithkumar HM**

Computer Science & Engineering Student

Rajeev Institute of Technology (RIT), Hassan

VTU, Karnataka, India

**VOIS AICTE Internship Major Project**

---

## 📄 Project Files

The repository includes:

- Source code
- Dataset
- Jupyter Notebook
- Backend API
- Frontend dashboard
- Project documentation
- VOIS presentation

---

## ⭐ Project Highlights

- 📊 4,000 agricultural observations
- 🌾 8 crop species
- 🌦️ 3 cropping seasons
- 💧 4 irrigation modalities
- 📈 Interactive analytics dashboard
- 🔬 Statistical hypothesis testing
- 🤖 Machine learning yield prediction
- 💰 Profitability analysis
- 🌱 Environmental analysis
- 💧 Water-efficiency analysis
- 📋 Evidence-based recommendations
- 🔐 Strict non-causal analytical interpretation
- 🌐 Full-stack deployment

---

## 📌 Disclaimer

This project is an academic and analytical study developed as part of the **VOIS AICTE Internship Major Project**.

The findings are based on the supplied dataset and analytical methodology. Predictions and statistical results should be interpreted within the scope and limitations of the dataset.

---

## 📜 License

This project is developed for academic and internship purposes.
