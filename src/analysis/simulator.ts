import type {
  AnalysisResult, SurfaceMetrics, MoistureData, WeatherData,
  ForecastMetrics, AIInsight, TossRecommendation, MatchStrategy,
  PitchEvolutionPoint, HistoricalMatch, HeatmapZone,
} from './types';

// Seeded pseudo-random so results look consistent per image name
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function rng(seed: number, min: number, max: number) {
  const r = seededRandom(seed)();
  return Math.round(min + r * (max - min));
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed)() * arr.length)];
}

export function generateAnalysis(imageName: string, imageUrl: string): AnalysisResult {
  const seed = imageName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = (min: number, max: number, offset = 0) => rng(seed + offset, min, max);

  // ── Surface ──────────────────────────────────────────────────────────────
  const crackDensity = r(30, 85, 1);
  const crackLevel = crackDensity < 45 ? 'Low' : crackDensity < 65 ? 'Medium' : 'High';
  const grassCoverage = r(15, 75, 2);
  const surfaceRoughness = r(40, 90, 3);
  const wearLevel = r(35, 80, 4);

  const surface: SurfaceMetrics = {
    crackDensityIndex: crackDensity,
    crackLevel: crackLevel as SurfaceMetrics['crackLevel'],
    grassCoverage,
    surfaceRoughness,
    wearLevel,
  };

  // ── Moisture ─────────────────────────────────────────────────────────────
  const moistureScore = r(20, 75, 5);
  const moistureStatus =
    moistureScore < 35 ? 'Drying Fast' : moistureScore < 55 ? 'Stable' : 'High Moisture';
  const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM', '3AM', '6AM+1'];
  const forecast24h = hours.map((hour, i) => ({
    hour,
    moisture: Math.max(5, moistureScore - i * r(1, 4, 10 + i) + (i > 5 ? r(2, 8, 20 + i) : 0)),
    dew: Math.max(3, moistureScore + r(-5, 8, 30 + i) - i * 2),
  }));

  const moisture: MoistureData = {
    currentScore: moistureScore,
    status: moistureStatus as MoistureData['status'],
    forecast24h,
  };

  // ── Weather ───────────────────────────────────────────────────────────────
  const temp = r(24, 38, 6);
  const humidity = r(35, 85, 7);
  const windSpeed = r(8, 32, 8);
  const rainProb = r(5, 45, 9);
  const uvIndex = r(4, 10, 10);
  const weatherImpact = Math.round(
    (humidity * 0.3 + rainProb * 0.3 + (temp - 20) * 1.5 + windSpeed * 0.4) / 2
  );
  const conditions = ['Partly Cloudy', 'Clear', 'Overcast', 'Humid & Hazy', 'Sunny'];

  const weather: WeatherData = {
    temperature: temp,
    humidity,
    windSpeed,
    rainProbability: rainProb,
    uvIndex,
    impactScore: Math.min(100, weatherImpact),
    condition: pick(conditions, seed + 11),
  };

  // ── Forecast ─────────────────────────────────────────────────────────────
  const spinPotential = Math.min(95, crackDensity + r(-10, 15, 12));
  const seamMovement = Math.max(10, 80 - grassCoverage + r(-10, 10, 13));
  const bounceConsistency = Math.max(20, 100 - wearLevel - r(0, 15, 14));
  const battingFriendliness = Math.max(15, 100 - crackDensity - r(0, 10, 15));
  const bowlingFriendliness = Math.min(95, crackDensity + r(5, 20, 16));
  const confidence = r(78, 96, 17);

  const forecast: ForecastMetrics = {
    spinPotential,
    seamMovement,
    bounceConsistency,
    battingFriendliness,
    bowlingFriendliness,
    confidenceScore: confidence,
  };

  // ── AI Insights ───────────────────────────────────────────────────────────
  const insights: AIInsight[] = [
    {
      id: 'ins-1',
      category: 'surface',
      severity: crackDensity > 65 ? 'critical' : crackDensity > 45 ? 'warning' : 'info',
      title: 'Crack Pattern Analysis',
      text: `Crack density has reached ${crackDensity}% across the good-length area. ${crackDensity > 65
          ? 'Combined with low moisture levels, the pitch is expected to assist spinners significantly during the second innings. Expect sharp turn and variable bounce.'
          : crackDensity > 45
            ? 'Moderate cracking detected. Spinners will find increasing purchase as the match progresses, especially post-lunch on Day 2.'
            : 'Surface cracks are minimal. The pitch should play true for the first two sessions with minimal deviation.'
        }`,
      confidence: r(82, 95, 18),
    },
    {
      id: 'ins-2',
      category: 'moisture',
      severity: moistureScore > 55 ? 'warning' : 'info',
      title: 'Moisture Intelligence Report',
      text: `Sub-surface moisture at ${moistureScore}% — classified as "${moistureStatus}". ${moistureScore > 55
          ? 'High moisture content will assist seam bowlers in the first session. The ball is likely to swing and seam appreciably. Batting first carries risk.'
          : moistureScore < 35
            ? 'Rapid drying conditions detected. The pitch will deteriorate faster than average, accelerating spin-friendly conditions by the 3rd session.'
            : 'Moisture levels are stable. Expect consistent conditions through the first innings with gradual deterioration.'
        }`,
      confidence: r(80, 93, 19),
    },
    {
      id: 'ins-3',
      category: 'weather',
      severity: rainProb > 35 ? 'warning' : 'info',
      title: 'Weather Impact Assessment',
      text: `Current conditions: ${weather.condition}, ${temp}°C, ${humidity}% humidity. Weather impact score: ${weather.impactScore}/100. ${rainProb > 35
          ? `Rain probability at ${rainProb}% — interruptions likely. Damp conditions post-rain will significantly assist seam movement. Toss decision becomes critical.`
          : humidity > 70
            ? `High humidity (${humidity}%) will aid swing bowling in the first hour. Overcast conditions may persist through the morning session.`
            : `Conditions are favorable for batting. Low humidity and clear skies suggest the pitch will play true.`
        }`,
      confidence: r(75, 90, 20),
    },
    {
      id: 'ins-4',
      category: 'strategy',
      severity: 'info',
      title: 'Bowling Strategy Recommendation',
      text: `Based on pitch analysis, ${spinPotential > 65
          ? `off-spin and leg-spin bowlers should be introduced by the 15th over. The rough outside off-stump is already developing. Recommend 4-5 overs of spin in the powerplay to exploit early grip.`
          : seamMovement > 60
            ? `seam-first attack is recommended. The pitch offers lateral movement and variable bounce. New-ball bowlers should target the top of off-stump with a full length.`
            : `a balanced attack mixing seam and spin is optimal. Introduce spinners in the 12–15 over window to exploit the dry patches developing around the good-length area.`
        }`,
      confidence: r(83, 94, 21),
    },
    {
      id: 'ins-5',
      category: 'forecast',
      severity: bounceConsistency < 40 ? 'critical' : 'info',
      title: 'Bounce Consistency Forecast',
      text: `Bounce stability index: ${bounceConsistency}/100. ${bounceConsistency < 40
          ? 'CRITICAL: Highly variable bounce detected. Batters will struggle to judge deliveries. Short-pitched bowling could be extremely effective. Helmets and extra protection advised.'
          : bounceConsistency < 60
            ? 'Moderate bounce variation expected. Some deliveries will keep low while others rise sharply. Batters should play close to the body and avoid driving on the up.'
            : 'Bounce is consistent and predictable. Batters can play their natural game. Expect a high-scoring match if batting conditions hold.'
        }`,
      confidence: r(79, 92, 22),
    },
  ];

  // ── Toss Recommendation ───────────────────────────────────────────────────
  const batFirst = battingFriendliness > 50 && moistureScore < 50;
  const toss: TossRecommendation = {
    decision: batFirst ? 'Bat First' : 'Bowl First',
    confidence: r(72, 94, 23),
    explanation: batFirst
      ? `The pitch offers good batting conditions in the first session. Cracks are not yet severe enough to cause major issues. Putting runs on the board is the optimal strategy.`
      : `Moisture and seam movement favor bowling first. The pitch will deteriorate significantly, making the second innings challenging for batting.`,
    riskLevel: confidence > 85 ? 'Low' : confidence > 75 ? 'Medium' : 'High',
    reasoning: batFirst
      ? [
        `Batting-friendly surface (${battingFriendliness}/100)`,
        `Moisture levels manageable at ${moistureScore}%`,
        `Bounce consistency at ${bounceConsistency}/100 — predictable`,
        `Pitch expected to deteriorate in 2nd innings`,
      ]
      : [
        `High seam movement potential (${seamMovement}/100)`,
        `Moisture assists swing bowling (${moistureScore}%)`,
        `Crack density will worsen for 2nd innings batting`,
        `Spin threat increases significantly after 30 overs`,
      ],
  };

  // ── Match Strategy ────────────────────────────────────────────────────────
  const strategy: MatchStrategy = {
    powerplay: spinPotential > 60
      ? `Attack with pace in overs 1–6. Target top of off-stump. Introduce 1 over of spin to exploit early grip. Set attacking fields with 3 slips and a gully.`
      : `Full-length seam attack in the powerplay. Swing bowling will be effective. Keep 2 slips and a gully. Target the corridor outside off-stump.`,
    middleOvers: `Rotate spinners from both ends in overs 7–15. ${spinPotential > 65 ? 'Rough outside off-stump is developing — target it aggressively.' : 'Mix pace and spin to maintain pressure.'
      } Set defensive fields with a sweeper on the boundary.`,
    deathOvers: `${bounceConsistency < 50
        ? 'Exploit variable bounce with short-pitched deliveries. Yorkers will be difficult to execute on this surface.'
        : 'Yorker-heavy attack at the death. Full-length deliveries will be effective given consistent bounce.'
      } Keep fine leg and deep square leg in position.`,
    spinVsPaceMix: `Recommended ratio: ${spinPotential > 65 ? '60% spin / 40% pace' : spinPotential > 45 ? '45% spin / 55% pace' : '30% spin / 70% pace'
      }. ${spinPotential > 60 ? 'Spinners should bowl in tandem from both ends in the middle overs.' : 'Pace bowlers to lead the attack with spin as a support option.'}`,
    battingApproach: `${battingFriendliness > 60
        ? 'Positive batting approach recommended. Play your natural game in the first 10 overs. Target the gaps and rotate strike.'
        : battingFriendliness > 40
          ? 'Cautious start advised. Play close to the body for the first 5 overs. Accelerate once set.'
          : 'Survival mode in the first session. Bat time, not runs. Avoid driving on the up. Sweep and cut are safer scoring options.'
      }`,
  };

  // ── Pitch Evolution ───────────────────────────────────────────────────────
  const evolution: PitchEvolutionPoint[] = [
    { label: 'Start', overs: 0, crackGrowth: crackDensity * 0.3, moistureLoss: 0, spinIncrease: spinPotential * 0.2, bounceVariation: 100 - bounceConsistency },
    { label: 'After 20 Overs', overs: 20, crackGrowth: crackDensity * 0.55, moistureLoss: moistureScore * 0.3, spinIncrease: spinPotential * 0.45, bounceVariation: (100 - bounceConsistency) * 1.3 },
    { label: 'After 40 Overs', overs: 40, crackGrowth: crackDensity * 0.78, moistureLoss: moistureScore * 0.6, spinIncrease: spinPotential * 0.7, bounceVariation: (100 - bounceConsistency) * 1.6 },
    { label: '2nd Innings', overs: 60, crackGrowth: Math.min(100, crackDensity * 1.1), moistureLoss: moistureScore * 0.85, spinIncrease: Math.min(100, spinPotential * 1.15), bounceVariation: Math.min(100, (100 - bounceConsistency) * 2) },
    { label: 'Final Session', overs: 80, crackGrowth: Math.min(100, crackDensity * 1.25), moistureLoss: moistureScore * 0.95, spinIncrease: Math.min(100, spinPotential * 1.3), bounceVariation: Math.min(100, (100 - bounceConsistency) * 2.4) },
  ].map(p => ({
    ...p,
    crackGrowth: Math.round(p.crackGrowth),
    moistureLoss: Math.round(p.moistureLoss),
    spinIncrease: Math.round(p.spinIncrease),
    bounceVariation: Math.round(p.bounceVariation),
  }));

  // ── Historical Comparison ─────────────────────────────────────────────────
  const venues = [
    { venue: 'Chennai (Chepauk)', year: 2023, pitchType: 'Spin-Friendly', matchResult: 'Low-scoring thriller', avgScore: 142 },
    { venue: 'Bengaluru (Chinnaswamy)', year: 2024, pitchType: 'Batting Paradise', matchResult: 'High-scoring contest', avgScore: 198 },
    { venue: 'Mumbai (Wankhede)', year: 2023, pitchType: 'Balanced', matchResult: 'Competitive match', avgScore: 168 },
    { venue: 'Ahmedabad (Narendra Modi)', year: 2024, pitchType: 'Pace-Friendly', matchResult: 'Seam-dominated', avgScore: 155 },
    { venue: 'Kolkata (Eden Gardens)', year: 2022, pitchType: 'Spin-Seam Mix', matchResult: 'Toss-critical match', avgScore: 161 },
  ];

  const historical: HistoricalMatch[] = venues.map((v, i) => ({
    ...v,
    similarity: Math.max(55, Math.min(97, r(58, 95, 40 + i))),
  })).sort((a, b) => b.similarity - a.similarity);

  // ── Heatmap ───────────────────────────────────────────────────────────────
  const zoneNames = ['Short', 'Back of Length', 'Good Length', 'Full', 'Yorker'];
  const heatmap: HeatmapZone[] = [];
  zoneNames.forEach((zone, row) => {
    ['Off', 'Middle', 'Leg'].forEach((col, colIdx) => {
      const baseIntensity = row === 2 ? 0.7 : row === 1 ? 0.5 : row === 3 ? 0.4 : 0.2;
      const intensity = Math.min(1, baseIntensity + (seededRandom(seed + row * 10 + colIdx)() - 0.5) * 0.3);
      heatmap.push({
        zone,
        row,
        col: colIdx,
        intensity: Math.round(intensity * 100) / 100,
        label: col,
        tooltip: `${zone} – ${col} stump: ${Math.round(intensity * 100)}% wear intensity`,
      });
    });
  });

  return {
    imageUrl,
    imageName,
    analyzedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    surface,
    moisture,
    weather,
    forecast,
    insights,
    toss,
    strategy,
    evolution,
    historical,
    heatmap,
  };
}

// Simulate multi-step analysis with progress callbacks
export async function runAnalysis(
  imageName: string,
  imageUrl: string,
  onProgress: (progress: number, step: string) => void
): Promise<AnalysisResult> {
  const steps = [
    { label: 'Loading image into CV pipeline...', duration: 600 },
    { label: 'Running crack detection model (YOLOv8)...', duration: 800 },
    { label: 'Estimating grass coverage...', duration: 500 },
    { label: 'Analyzing surface roughness & wear...', duration: 700 },
    { label: 'Fetching weather intelligence...', duration: 600 },
    { label: 'Computing moisture estimation...', duration: 500 },
    { label: 'Running ensemble forecast model...', duration: 900 },
    { label: 'Generating strategic insights...', duration: 700 },
    { label: 'Comparing with historical pitches...', duration: 500 },
    { label: 'Finalizing analysis report...', duration: 400 },
  ];

  let progress = 0;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    onProgress(progress, step.label);
    await new Promise(r => setTimeout(r, step.duration));
    progress = Math.round(((i + 1) / steps.length) * 100);
  }

  onProgress(100, 'Analysis complete!');
  return generateAnalysis(imageName, imageUrl);
}
