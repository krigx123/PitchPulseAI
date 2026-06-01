// ─── Core Analysis Types ────────────────────────────────────────────────────

export type AnalysisStatus = 'idle' | 'uploading' | 'scanning' | 'complete';

export interface SurfaceMetrics {
  crackDensityIndex: number;       // 0–100
  crackLevel: 'Low' | 'Medium' | 'High';
  grassCoverage: number;           // 0–100 %
  surfaceRoughness: number;        // 0–100
  wearLevel: number;               // 0–100
}

export interface MoistureData {
  currentScore: number;            // 0–100
  status: 'Drying Fast' | 'Stable' | 'High Moisture';
  forecast24h: Array<{ hour: string; moisture: number; dew: number }>;
}

export interface WeatherData {
  temperature: number;             // °C
  humidity: number;                // %
  windSpeed: number;               // km/h
  rainProbability: number;         // %
  uvIndex: number;                 // 0–11
  impactScore: number;             // 0–100
  condition: string;
}

export interface ForecastMetrics {
  spinPotential: number;           // 0–100
  seamMovement: number;            // 0–100
  bounceConsistency: number;       // 0–100
  battingFriendliness: number;     // 0–100
  bowlingFriendliness: number;     // 0–100
  confidenceScore: number;         // 0–100
}

export interface AIInsight {
  id: string;
  category: 'surface' | 'moisture' | 'weather' | 'strategy' | 'forecast';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  text: string;
  confidence: number;
}

export interface TossRecommendation {
  decision: 'Bat First' | 'Bowl First';
  confidence: number;
  explanation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  reasoning: string[];
}

export interface MatchStrategy {
  powerplay: string;
  middleOvers: string;
  deathOvers: string;
  spinVsPaceMix: string;
  battingApproach: string;
}

export interface PitchEvolutionPoint {
  label: string;
  overs: number;
  crackGrowth: number;
  moistureLoss: number;
  spinIncrease: number;
  bounceVariation: number;
}

export interface HistoricalMatch {
  venue: string;
  year: number;
  similarity: number;
  pitchType: string;
  matchResult: string;
  avgScore: number;
}

export interface HeatmapZone {
  zone: string;
  row: number;
  col: number;
  intensity: number;
  label: string;
  tooltip: string;
}

export interface AnalysisResult {
  imageUrl: string;
  imageName: string;
  analyzedAt: string;
  surface: SurfaceMetrics;
  moisture: MoistureData;
  weather: WeatherData;
  forecast: ForecastMetrics;
  insights: AIInsight[];
  toss: TossRecommendation;
  strategy: MatchStrategy;
  evolution: PitchEvolutionPoint[];
  historical: HistoricalMatch[];
  heatmap: HeatmapZone[];
}

export interface AnalysisState {
  status: AnalysisStatus;
  progress: number;
  currentStep: string;
  result: AnalysisResult | null;
  imagePreview: string | null;
}
