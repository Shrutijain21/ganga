import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { locations, generateMockReading, getParameterStatus, waterQualityStandards } from "@/lib/mockData";

const Parameters = () => {
  const [selectedLocation, setSelectedLocation] = useState("varanasi");
  
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);
  const reading = generateMockReading();

  const parameters = [
    { key: 'dissolvedOxygen', name: 'Dissolved Oxygen', icon: Droplets, color: 'blue' },
    { key: 'bod', name: 'BOD', icon: TrendingDown, color: 'orange' },
    { key: 'nitrate', name: 'Nitrate', icon: TrendingUp, color: 'green' },
    { key: 'coliform', name: 'Coliform', icon: AlertTriangle, color: 'red' },
    { key: 'pH', name: 'pH Level', icon: CheckCircle, color: 'purple' },
    { key: 'temperature', name: 'Temperature', icon: TrendingUp, color: 'yellow' },
    { key: 'turbidity', name: 'Turbidity', icon: Droplets, color: 'cyan' },
  ] as const;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return CheckCircle;
      case 'good': return CheckCircle;
      case 'moderate': return TrendingUp;
      case 'poor': return TrendingDown;
      case 'critical': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'optimal': return 'default';
      case 'good': return 'secondary';
      case 'moderate': return 'outline';
      case 'poor': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

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
          Water Quality Parameters
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Detailed analysis of all water quality metrics across monitoring stations
        </p>
      </motion.div>

      {/* Location Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Select Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a location" />
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
              </div>
              
              {selectedLocationData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <h3 className="font-semibold text-lg">{selectedLocationData.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLocationData.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Coordinates: {selectedLocationData.coordinates.lat}, {selectedLocationData.coordinates.lng}
                  </p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Parameter Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Parameter Overview - {selectedLocationData?.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {parameters.map((param, index) => {
            const value = reading[param.key];
            const status = getParameterStatus(param.key, value);
            const standards = waterQualityStandards[param.key];
            const StatusIcon = getStatusIcon(status);
            const ParamIcon = param.icon;

            return (
              <motion.div
                key={param.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="glass-card hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <ParamIcon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant={getStatusBadgeVariant(status)} className="flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        {param.name}
                      </h3>
                      
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {typeof value === 'number' ? value.toFixed(1) : value}
                          <span className="text-sm font-normal text-muted-foreground ml-1">
                            {standards?.unit}
                          </span>
                        </p>
                        
                        {standards && (
                          <div className="text-xs space-y-1">
                            <p className="text-muted-foreground">
                              <span className="font-medium">Ideal range:</span> {standards.ideal} {standards.unit}
                            </p>
                            
                            {/* Status indicator */}
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              status === 'optimal' ? 'bg-status-optimal/10 text-status-optimal' :
                              status === 'good' ? 'bg-status-good/10 text-status-good' :
                              status === 'moderate' ? 'bg-status-moderate/10 text-status-moderate' :
                              status === 'poor' ? 'bg-status-poor/10 text-status-poor' :
                              'bg-status-critical/10 text-status-critical'
                            }`}>
                              {status === 'optimal' && 'Within ideal range'}
                              {status === 'good' && 'Good quality'}
                              {status === 'moderate' && 'Moderate quality'}
                              {status === 'poor' && 'Poor quality'}
                              {status === 'critical' && 'Critical levels'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Parameters;