import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';

import { OverviewPage } from './pages/OverviewPage';
import { CropPerformancePage } from './pages/CropPerformancePage';
import { SeasonalAnalysisPage } from './pages/SeasonalAnalysisPage';
import { RegionalAnalysisPage } from './pages/RegionalAnalysisPage';
import { ProfitabilityAnalysisPage } from './pages/ProfitabilityAnalysisPage';
import { WaterIrrigationPage } from './pages/WaterIrrigationPage';
import { EnvironmentalAnalysisPage } from './pages/EnvironmentalAnalysisPage';
import { CorrelationAnalysisPage } from './pages/CorrelationAnalysisPage';
import { StatisticalAnalysisPage } from './pages/StatisticalAnalysisPage';
import { MlPredictionPage } from './pages/MlPredictionPage';
import { KeyFindingsPage } from './pages/KeyFindingsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AboutProjectPage } from './pages/AboutProjectPage';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [crop, setCrop] = useState('All');
  const [season, setSeason] = useState('All');
  const [region, setRegion] = useState('All');

  const handleResetFilters = () => {
    setCrop('All');
    setSeason('All');
    setRegion('All');
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Executive Dashboard Overview';
      case 'crops': return 'Crop Agronomic & Financial Performance';
      case 'seasons': return 'Seasonal Dynamics & Weather Impact';
      case 'regions': return 'Regional Performance & Soil Zoning';
      case 'profitability': return 'Profitability & Net Return Analysis';
      case 'water': return 'Water Efficiency & Irrigation Systems';
      case 'environmental': return 'Environmental Factor Interactions';
      case 'correlation': return 'Pearson & Spearman Correlation Matrix';
      case 'stats': return 'Inferential Statistical Hypothesis Tests';
      case 'prediction': return 'Machine Learning Yield & Profit Predictor';
      case 'findings': return 'Empirical Key Findings Summary';
      case 'recommendations': return 'Actionable Policy & Farmer Recommendations';
      case 'methodology': return 'Methodology & Guidelines Compliance';
      case 'about': return 'About VOIS AICTE Internship Project';
      default: return 'Agricultural Performance Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewPage crop={crop} season={season} region={region} />;
      case 'crops': return <CropPerformancePage crop={crop} season={season} region={region} />;
      case 'seasons': return <SeasonalAnalysisPage crop={crop} season={season} region={region} />;
      case 'regions': return <RegionalAnalysisPage />;
      case 'profitability': return <ProfitabilityAnalysisPage crop={crop} season={season} region={region} />;
      case 'water': return <WaterIrrigationPage crop={crop} season={season} region={region} />;
      case 'environmental': return <EnvironmentalAnalysisPage crop={crop} season={season} region={region} />;
      case 'correlation': return <CorrelationAnalysisPage />;
      case 'stats': return <StatisticalAnalysisPage />;
      case 'prediction': return <MlPredictionPage />;
      case 'findings': return <KeyFindingsPage />;
      case 'recommendations': return <RecommendationsPage />;
      case 'methodology': return <MethodologyPage />;
      case 'about': return <AboutProjectPage />;
      default: return <OverviewPage crop={crop} season={season} region={region} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeTabTitle={getTitle()} />
        <main className="flex-1 overflow-y-auto p-6">
          {['overview', 'crops', 'seasons', 'profitability', 'water', 'environmental'].includes(activeTab) && (
            <FilterPanel
              crop={crop}
              setCrop={setCrop}
              season={season}
              setSeason={setSeason}
              region={region}
              setRegion={setRegion}
              onReset={handleResetFilters}
            />
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
