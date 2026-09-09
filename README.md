# Seasonal Agriculture Performance Analysis

**VOIS AICTE Internship Major Project**

**Author:** Ajithkumar HM  
**Domain:** Data Analytics & Agriculture

## Live Demo

https://seasonal-agriculture-frontend.onrender.com

## GitHub Repository

https://github.com/Ajith-Kumar55/Seasonal-Agriculture-Performance-Analysis

---

## 1. Project Overview

Seasonal Agriculture Performance Analysis is a full-stack data analytics project developed as part of the VOIS AICTE Internship Major Project.

The project analyzes agricultural performance across Kharif, Rabi, and Zaid seasons using historical agricultural data.

The system studies crop productivity, profitability, operating cost, revenue, water-use efficiency, environmental relationships, regional performance, statistical differences, and machine-learning-based yield prediction.

The analytical results are presented through an interactive web dashboard built with React and supported by a FastAPI backend.

---

## 2. Problem Statement

Agricultural performance varies across seasons, crops, geographic regions, environmental conditions, irrigation practices, and input usage.

Analyzing these factors using agricultural data can help identify observed patterns in productivity, profitability, resource utilization, and environmental relationships.

This project provides an interactive analytical platform for exploring these patterns and supporting evidence-based agricultural decision-making.

The project uses a non-causal analytical approach. Observed relationships and statistical differences are not interpreted as proof of causation.

---

## 3. Objectives

- Analyze agricultural performance across different seasons.
- Compare performance across crop categories.
- Study yield, revenue, operating cost, and net profit.
- Analyze water-use efficiency across irrigation methods and seasons.
- Explore relationships between environmental variables and agricultural outcomes.
- Perform statistical hypothesis testing.
- Analyze regional agricultural performance.
- Develop a machine-learning model for yield prediction.
- Visualize analytical results through an interactive dashboard.
- Generate evidence-based recommendations from observed results.

---

## 4. Dataset

The dataset contains:

- 4,000 agricultural records
- 28 variables
- 8 crop categories
- 3 agricultural seasons

### Crop Categories

- Rice
- Wheat
- Maize
- Cotton
- Pulses
- Groundnut
- Chilli
- Sugarcane

### Seasons

- Kharif
- Rabi
- Zaid

### Major Variables

- Crop
- Season
- State
- District
- Area
- Production
- Yield
- Rainfall
- Temperature
- Humidity
- Soil Moisture
- Irrigation Method
- Water Usage
- Fertilizer Usage
- Pesticide Usage
- Disease/Pest Risk
- Revenue
- Operating Cost
- Net Profit

---

## 5. Data Preprocessing

The dataset was inspected for missing values and data-quality issues before analysis.

Missing observations were identified in:

- Rainfall
- Soil Moisture
- Yield

### Rainfall

Missing rainfall values were handled using season-level median imputation.

### Soil Moisture

Missing soil-moisture values were handled using season × crop-group median imputation.

### Yield

Where required, yield was reconstructed using:

Yield = Production / Area

The preprocessing process retained the available observations and prepared the dataset for statistical analysis and machine learning.

---

## 6. Data Analysis

The application provides the following analytical modules:

### Dashboard

Provides an overall view of major agricultural indicators and dataset information.

### Crop Performance

Compares agricultural performance across crop categories using yield, revenue, operating cost, net profit, and water-use efficiency.

### Seasonal Analysis

Compares Kharif, Rabi, and Zaid seasons using agricultural and financial indicators.

### Regional Analysis

Explores agricultural performance across the geographic regions represented in the dataset.

### Profitability Analysis

Analyzes revenue, operating cost, net profit, profitability classification, and loss-making observations.

### Water & Irrigation

Analyzes water usage and water-use efficiency across irrigation methods and seasons.

### Environmental Analysis

Explores relationships involving rainfall, temperature, humidity, soil moisture, disease/pest risk, and yield.

### Correlation Matrix

Provides Pearson and Spearman correlation analysis for relevant numerical variables.

### Statistical Tests

Presents statistical hypothesis-testing results.

### Recommendations

Provides evidence-based recommendations based on observed analytical results.

### ML Yield Prediction

Provides machine-learning-based agricultural yield prediction.

---

## 7. Key Findings

### Overall Performance

- Total records: 4,000
- Total variables: 28
- Mean yield: 5.26284 tonnes/ha
- Mean profit: ₹13,555.02/ha
- Loss-making observations: 1,966
- Observed loss rate: 49.15%

### Mean Profit by Season

| Season | Mean Profit/ha |
|---|---:|
| Kharif | ₹21,881.81 |
| Rabi | ₹10,361.68 |
| Zaid | -₹2,636.52 |

Zaid recorded the highest observed operating-loss rate at 64.48%.

These values describe the observed dataset and do not establish that season alone causes profitability differences.

---

## 8. Correlation Analysis

### Rainfall vs Soil Moisture

Pearson r = 0.5200

This indicates a moderate positive observed linear association.

### Rainfall vs Yield

Spearman ρ = 0.1295

This indicates a weak positive monotonic association.

### Humidity vs Disease/Pest Risk

Spearman ρ = 0.5517

This indicates a moderate positive monotonic association.

### Fertilizer Usage vs Operating Cost

Pearson r = 0.5476  
p < 0.001

This indicates a positive observed association between fertilizer usage and operating cost.

Correlation does not establish causation.

---

## 9. Statistical Analysis

The project uses:

- Pearson Correlation
- Spearman Correlation
- Kruskal-Wallis Test
- Chi-Square Test
- Cramér's V
- Two-Way ANOVA

### Kruskal-Wallis Test

Profit vs Season:

- H = 101.93
- p = 7.36 × 10⁻²³

The result indicates statistically significant differences in observed profit distributions across seasons.

### Chi-Square: Season vs Profitability

- χ² = 92.65
- p = 7.62 × 10⁻²¹
- Cramér's V = 0.1522

The result indicates a statistically significant association between season and profitability category.

### Chi-Square: Profitability vs Crop

- χ² = 669.75
- Cramér's V = 0.4092

The result indicates a statistically significant association between crop category and profitability classification.

---

## 10. Two-Way ANOVA — Yield

The analysis uses log-transformed yield values.

### Crop Effect

- F ≈ 1378.36
- p < 0.001
- η² ≈ 0.708

### Season Effect

- F ≈ 66.33
- p < 0.001

### Crop × Season Interaction

- F = 0.722
- p = 0.754

The crop and season effects were statistically significant, while the crop × season interaction was not statistically significant.

These results describe statistical differences in the observed dataset and do not establish causal effects.

---

## 11. Two-Way ANOVA — Water-Use Efficiency

The analysis uses log-transformed water-efficiency values.

### Irrigation Method Effect

- F ≈ 171.28
- p < 0.001

### Season Effect

- F ≈ 22.63
- p < 0.001

### Irrigation × Season Interaction

- F = 1.213
- p = 0.296

The analysis indicates statistically significant differences in observed water efficiency across irrigation methods and seasons.

The irrigation × season interaction was not statistically significant.

These results do not establish that a specific irrigation method causes higher water efficiency.

---

## 12. Machine Learning

The project includes machine-learning-based agricultural yield prediction.

### Selected Model

**Gradient Boosting Regressor**

### Model Performance

| Metric | Result |
|---|---:|
| R² | 0.9745 |
| RMSE | 2.2181 |
| MAE | 0.7666 |
| 5-Fold CV R² | 0.9712 ± 0.0015 |

The Gradient Boosting Regressor was selected based on the evaluated model performance.

### Feature Importance

The dashboard displays:

**Gradient Boosting Feature Importance Weights**

Feature importance represents the contribution of features to the trained model's predictive process. It does not establish causal influence.

---

## 13. Evidence-Based Recommendations

### Recommendation 1

**Target Audience:** Farmers & Agricultural Extension

**Title:** Evaluate Irrigation Systems for Water-Efficiency Improvement

**Recommendation:** Compare irrigation practices based on observed water-efficiency outcomes and local farm conditions rather than assuming one method is universally superior.

**Rationale:** Two-Way ANOVA indicates statistically significant differences in water efficiency across irrigation methods (p < 0.001).

**Expected Outcome:** Supports evidence-based evaluation of irrigation practices and water-management decisions.

### Recommendation 2

**Target Audience:** Policy Makers & Co-operatives

**Title:** Implement Soil-Testing-Based Fertilizer Management

**Recommendation:** Promote soil testing before fertilizer application to support more targeted nutrient management and avoid unnecessary fertilizer use.

**Rationale:** Fertilizer usage is positively associated with operating cost (Pearson r = 0.5476, p < 0.001), without establishing a causal effect on net profit.

**Expected Outcome:** Supports more targeted fertilizer-management decisions and cost evaluation.

### Recommendation 3

**Target Audience:** Farmers & Policy Planners

**Title:** Evaluate Zaid Cropping Patterns and Water Requirements

**Recommendation:** Review crop selection and water requirements during the Zaid season using observed profitability and seasonal conditions.

**Rationale:** Zaid records the highest observed operating loss rate among the three seasons (64.48%).

**Expected Outcome:** Supports seasonal crop-planning and water-management decisions.

---

## 14. Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts

### Backend

- Python
- FastAPI
- Uvicorn

### Data Analytics

- Pandas
- NumPy
- SciPy

### Machine Learning

- Scikit-Learn
- Gradient Boosting Regressor
- Joblib

### Development

- Jupyter Notebook
- Visual Studio Code
- Git
- GitHub

### Deployment

- Render

---

## 15. Project Structure

Seasonal_Agriculture_Performance_Analysis/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api.py
│   │   ├── data_service.py
│   │   ├── ml_service.py
│   │   └── stats_service.py
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   └── pages/
│   │       ├── CropPerformancePage.tsx
│   │       ├── SeasonalAnalysisPage.tsx
│   │       ├── RegionalAnalysisPage.tsx
│   │       ├── ProfitabilityAnalysisPage.tsx
│   │       ├── WaterIrrigationPage.tsx
│   │       ├── EnvironmentalAnalysisPage.tsx
│   │       ├── CorrelationMatrixPage.tsx
│   │       ├── StatisticalTestsPage.tsx
│   │       ├── RecommendationsPage.tsx
│   │       └── MlPredictionPage.tsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── ...
│
├── Seasonal_Agriculture_Performance_Analysis.ipynb
├── seasonal_agriculture_performance_dataset.csv
├── README.md
└── Seasonal_Agriculture_Performance_Analysis_VOIS_Final.pptx

---

## 16. System Workflow

Raw Agricultural Dataset
        ↓
Data Inspection
        ↓
Data Cleaning & Preprocessing
        ↓
Exploratory Data Analysis
        ↓
Crop Performance Analysis
        ↓
Seasonal Analysis
        ↓
Regional Analysis
        ↓
Profitability Analysis
        ↓
Water & Irrigation Analysis
        ↓
Environmental Analysis
        ↓
Correlation Analysis
        ↓
Statistical Testing
        ↓
Machine Learning
        ↓
Model Evaluation
        ↓
Evidence-Based Recommendations
        ↓
FastAPI Backend
        ↓
React Frontend
        ↓
Interactive Dashboard
        ↓
Cloud Deployment

---

## 17. Running the Project Locally

### Backend

Open a terminal in the project directory and run:

cd backend

Create a virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the backend:

uvicorn main:app --reload

Backend URL:

http://127.0.0.1:8000

API URL:

http://127.0.0.1:8000/api

### Frontend

Open another terminal and navigate to:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The Vite terminal will display the local frontend URL.

---

## 18. Production Deployment

### Frontend

https://seasonal-agriculture-frontend.onrender.com

### Backend

https://seasonal-agriculture-api.onrender.com

### API

https://seasonal-agriculture-api.onrender.com/api

The frontend communicates with the deployed FastAPI backend through the production API.

---

## 19. Notebook

The main analytical notebook is:

Seasonal_Agriculture_Performance_Analysis.ipynb

The notebook contains:

- Data loading
- Data inspection
- Data cleaning
- Exploratory analysis
- Crop analysis
- Seasonal analysis
- Regional analysis
- Profitability analysis
- Water and irrigation analysis
- Environmental analysis
- Correlation analysis
- Statistical testing
- Machine learning
- Model evaluation
- Analytical conclusions

---

## 20. Interpretation Guidelines

This project follows a strict non-causal analytical approach.

- Correlation is not treated as causation.
- Statistical differences are not automatically interpreted as causal effects.
- Machine-learning feature importance is not interpreted as causal influence.
- Observed seasonal differences do not prove that season alone causes profitability differences.
- Observed irrigation differences do not prove that a specific irrigation method causes higher efficiency.
- Recommendations are based on observed evidence and should be considered together with local agricultural conditions.

---

## 21. Future Scope

Possible future enhancements include:

- Integration with real-time agricultural datasets
- Weather API integration
- Real-time agricultural market-price information
- Satellite and remote-sensing data
- GIS-based agricultural mapping
- Larger continuously updated datasets
- Advanced forecasting models
- Farmer-specific analytical reports
- Mobile application integration
- Multilingual support
- Automated report generation

These are proposed future enhancements and are not claimed as currently implemented features.

---

## 22. Conclusion

Seasonal Agriculture Performance Analysis provides an integrated platform for analyzing agricultural performance using data analytics, statistical methods, machine learning, and interactive visualization.

The project combines a React frontend with a FastAPI backend to present crop, seasonal, regional, profitability, water, environmental, statistical, and predictive analysis in one application.

The system demonstrates how agricultural data can be transformed into meaningful analytical insights while maintaining a clear distinction between observed associations, statistical differences, and causal claims.

---

## 👨‍💻 Author

**Ajithkumar HM**

Computer Science and Engineering

VOIS AICTE Internship Major Project

**Project:** Seasonal Agriculture Performance Analysis

**Domain:** Data Analytics & Agriculture

---

## 📄 Project Information

**Project Type:** Academic / Internship Major Project

**Program:** VOIS AICTE Internship

**Domain:** Data Analytics & Agriculture

**Frontend:** React + TypeScript + Vite

**Backend:** FastAPI + Python

**Machine Learning:** Gradient Boosting Regressor

**Deployment:** Render

**Author:** Ajithkumar HM

**Live Demo:** https://seasonal-agriculture-frontend.onrender.com

**GitHub:** https://github.com/Ajith-Kumar55/Seasonal-Agriculture-Performance-Analysis