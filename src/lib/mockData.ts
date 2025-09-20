// Mock data for GangaGuard water quality monitoring

export interface WaterQualityReading {
  timestamp: string;
  dissolvedOxygen: number;
  bod: number;
  nitrate: number;
  coliform: number;
  pH: number;
  temperature: number;
  turbidity: number;
}

export interface Location {
  id: string;
  name: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}

export const locations: Location[] = [
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    description: 'Holy city on the banks of Ganga, major monitoring point'
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    state: 'Uttarakhand',
    coordinates: { lat: 29.9457, lng: 78.1642 },
    description: 'Sacred city where Ganga enters the plains'
  },
  {
    id: 'kanpur',
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    coordinates: { lat: 26.4499, lng: 80.3319 },
    description: 'Industrial city, critical pollution monitoring site'
  },
  {
    id: 'patna',
    name: 'Patna',
    state: 'Bihar',
    coordinates: { lat: 25.5941, lng: 85.1376 },
    description: 'Capital city monitoring agricultural runoff effects'
  }
];

export const waterQualityStandards = {
  dissolvedOxygen: { min: 6, max: 8, unit: 'mg/L', ideal: '6-8' },
  bod: { min: 0, max: 3, unit: 'mg/L', ideal: '0-3' },
  nitrate: { min: 0, max: 10, unit: 'mg/L', ideal: '0-10' },
  coliform: { min: 0, max: 500, unit: 'MPN/100ml', ideal: '0-500' },
  pH: { min: 6.5, max: 8.5, unit: 'pH', ideal: '6.5-8.5' },
  temperature: { min: 15, max: 30, unit: '°C', ideal: '15-30' },
  turbidity: { min: 0, max: 5, unit: 'NTU', ideal: '0-5' }
};

export const generateMockReading = (baseValues?: Partial<WaterQualityReading>): WaterQualityReading => {
  const randomVariation = (base: number, variance: number = 0.2) => 
    base + (Math.random() - 0.5) * base * variance;

  return {
    timestamp: new Date().toISOString(),
    dissolvedOxygen: randomVariation(baseValues?.dissolvedOxygen || 6.8, 0.3),
    bod: randomVariation(baseValues?.bod || 4.2, 0.4),
    nitrate: randomVariation(baseValues?.nitrate || 8.7, 0.3),
    coliform: randomVariation(baseValues?.coliform || 890, 0.5),
    pH: randomVariation(baseValues?.pH || 7.3, 0.1),
    temperature: randomVariation(baseValues?.temperature || 26.7, 0.2),
    turbidity: randomVariation(baseValues?.turbidity || 3.5, 0.4)
  };
};

export const generateHistoricalData = (days: number = 10): WaterQualityReading[] => {
  const data: WaterQualityReading[] = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      ...generateMockReading(),
      timestamp: date.toISOString()
    });
  }
  
  return data;
};

export const generateForecastData = (days: number = 3): WaterQualityReading[] => {
  const data: WaterQualityReading[] = [];
  
  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    data.push({
      ...generateMockReading(),
      timestamp: date.toISOString()
    });
  }
  
  return data;
};

export const getParameterStatus = (parameter: keyof WaterQualityReading, value: number): 'optimal' | 'good' | 'moderate' | 'poor' | 'critical' => {
  const standards = waterQualityStandards[parameter as keyof typeof waterQualityStandards];
  if (!standards) return 'moderate';

  const { min, max } = standards;
  
  if (value >= min && value <= max) return 'optimal';
  if (value >= min * 0.8 && value <= max * 1.2) return 'good';
  if (value >= min * 0.6 && value <= max * 1.5) return 'moderate';
  if (value >= min * 0.4 && value <= max * 2) return 'poor';
  return 'critical';
};

export const getOverallQualityScore = (reading: WaterQualityReading): number => {
  const parameters = ['dissolvedOxygen', 'bod', 'nitrate', 'coliform', 'pH', 'temperature', 'turbidity'] as const;
  
  let totalScore = 0;
  
  parameters.forEach(param => {
    const status = getParameterStatus(param, reading[param]);
    const score = {
      optimal: 100,
      good: 80,
      moderate: 60,
      poor: 40,
      critical: 20
    }[status];
    
    totalScore += score;
  });
  
  return Math.round(totalScore / parameters.length);
};