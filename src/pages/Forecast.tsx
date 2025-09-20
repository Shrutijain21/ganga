import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { locations, generateHistoricalData, generateForecastData, getParameterStatus } from "@/lib/mockData";

const Forecast = () => {
  const [selectedLocation, setSelectedLocation] = useState("varanasi");
  const [selectedParameter, setSelectedParameter] = useState("dissolvedOxygen");
  
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);
  const historicalData = generateHistoricalData(10);
  const forecastData = generateForecastData(3);
  
  const allData = [...historicalData, ...forecastData].map((item, index) => ({
    ...item,
    date: new Date(item.timestamp).toLocaleDateString(),
    isForecast: index >= historicalData.length
  }));

  const parameters = [
    { key: 'dissolvedOxygen', name: 'Dissolved Oxygen', unit: 'mg/L' },
    { key: 'bod', name: 'BOD', unit: 'mg/L' },
    { key: 'nitrate', name: 'Nitrate', unit: 'mg/L' },
    { key: 'coliform', name: 'Coliform', unit: 'MPN/100ml' },
    { key: 'pH', name: 'pH Level', unit: 'pH' },
    { key: 'temperature', name: 'Temperature', unit: '°C' },
    { key: 'turbidity', name: 'Turbidity', unit: 'NTU' },
  ] as const;

  const selectedParam = parameters.find(p => p.key === selectedParameter);
  const latestValue = allData[allData.length - 4]?.[selectedParameter] || 0;
  const forecastValue = allData[allData.length - 1]?.[selectedParameter] || 0;
  const trend = forecastValue > latestValue ? 'Rising' : 'Declining';
  const trendIcon = forecastValue > latestValue ? '📈' : '📉';

  // Calculate risk days (mock data)
  const riskDays = Math.floor(Math.random() * 3) + 1;
  const avgForecast = forecastData.reduce((sum, item) => sum + item[selectedParameter], 0) / forecastData.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          Water Quality Forecast
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          3-day predictive analysis and trends for water quality parameters
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Location Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{location.name}</span>
                      <span className="text-muted-foreground">({location.state})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedLocationData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                <h3 className="font-semibold">{selectedLocationData.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedLocationData.description}</p>
                <p className="text-xs text-muted-foreground">
                  Coordinates: {selectedLocationData.coordinates.lat}, {selectedLocationData.coordinates.lng}
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Parameter Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedParameter} onValueChange={setSelectedParameter}>
              <SelectTrigger>
                <SelectValue placeholder="Water Quality Parameter" />
              </SelectTrigger>
              <SelectContent>
                {parameters.map((param) => (
                  <SelectItem key={param.key} value={param.key}>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span>{param.name}</span>
                      <span className="text-muted-foreground">({param.unit})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedParam && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                <h3 className="font-semibold">{selectedParam.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Essential for aquatic life, indicates water health
                </p>
                <p className="text-xs text-muted-foreground">
                  Unit: {selectedParam.unit} • Ideal range: 6-8 {selectedParam.unit}
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Forecast Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Forecast Insights - {selectedParam?.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <TrendingUp className="h-8 w-8 text-primary mx-auto" />
              </div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Trend</h3>
              <p className="text-xl font-bold">{trendIcon} {trend}</p>
              <p className="text-xs text-muted-foreground">
                9.4% change predicted
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <Target className="h-8 w-8 text-success mx-auto" />
              </div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Avg Forecast</h3>
              <p className="text-xl font-bold text-success">
                {avgForecast.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedParam?.unit}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <AlertTriangle className="h-8 w-8 text-warning mx-auto" />
              </div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Risk Days</h3>
              <p className="text-xl font-bold text-warning">
                {riskDays}/3
              </p>
              <p className="text-xs text-muted-foreground">
                Moderate Risk
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <Calendar className="h-8 w-8 text-primary mx-auto" />
              </div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Forecast Period</h3>
              <p className="text-xl font-bold text-primary">3 Days</p>
              <p className="text-xs text-muted-foreground">
                20/9/2025 - 25/9/2025
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Forecast Alert */}
        <Card className="glass-card bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-warning mb-1">Forecast Alert</h3>
                <p className="text-sm text-muted-foreground">
                  {riskDays} day(s) predicted to have {selectedParam?.name} outside ideal range. 
                  Monitor conditions closely and consider preventive measures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Historical Data & 3-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={allData}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value.toFixed(2)} ${selectedParam?.unit}`,
                      props.payload.isForecast ? 'Forecast' : 'Actual'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedParameter}
                    stroke="hsl(var(--primary))"
                    fill="url(#actualGradient)"
                    strokeWidth={2}
                    connectNulls={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span>Historical Data (10 days)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-warning" />
                <span>Forecast Data (3 days)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              Current Reading - {selectedParam?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-success mb-2">
                  {latestValue.toFixed(1)} {selectedParam?.unit}
                </p>
                <p className="text-sm text-muted-foreground">
                  Essential for aquatic life, indicates water health
                </p>
              </div>
              <Badge variant="secondary" className="text-success">
                Optimal
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Forecast;