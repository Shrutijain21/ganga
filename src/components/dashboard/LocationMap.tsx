import { motion } from "framer-motion";
import { MapPin, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { locations, generateMockReading, getParameterStatus } from "@/lib/mockData";

// Mock map component since we don't have a real map library
export function LocationMap() {
  const locationData = locations.map(location => ({
    ...location,
    reading: generateMockReading(),
    lastUpdate: new Date()
  }));

  const getLocationStatus = (reading: any) => {
    const statuses = ['dissolvedOxygen', 'bod', 'nitrate', 'coliform'].map(param => 
      getParameterStatus(param as any, reading[param])
    );
    
    if (statuses.includes('critical')) return 'critical';
    if (statuses.includes('poor')) return 'poor';
    if (statuses.includes('moderate')) return 'moderate';
    if (statuses.includes('good')) return 'good';
    return 'optimal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-status-optimal';
      case 'good': return 'bg-status-good';
      case 'moderate': return 'bg-status-moderate';
      case 'poor': return 'bg-status-poor';
      case 'critical': return 'bg-status-critical';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Monitoring Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simplified map visualization */}
        <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-8 mb-6 overflow-hidden">
          {/* River path */}
          <svg
            viewBox="0 0 400 200"
            className="absolute inset-0 w-full h-full opacity-20"
          >
            <path
              d="M50 100 Q150 80 200 100 T350 120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary"
            />
          </svg>

          {/* Location markers */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {locationData.map((location, index) => {
              const status = getLocationStatus(location.reading);
              
              return (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-soft hover:shadow-glow transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(status)} animate-pulse`} />
                        <div className={`absolute inset-0 h-3 w-3 rounded-full ${getStatusColor(status)} animate-ping opacity-20`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{location.name}</h4>
                        <p className="text-xs text-muted-foreground">{location.state}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Last Update:</span>
                        <span className="text-muted-foreground">
                          {location.lastUpdate.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Status:</span>
                        <span className={`capitalize font-medium ${
                          status === 'optimal' ? 'text-status-optimal' :
                          status === 'good' ? 'text-status-good' :
                          status === 'moderate' ? 'text-status-moderate' :
                          status === 'poor' ? 'text-status-poor' :
                          'text-status-critical'
                        }`}>
                          {status}
                        </span>
                      </div>
                    </div>

                    {/* Hover details */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      className="mt-2 pt-2 border-t border-border/30 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">DO:</span>
                          <span className="ml-1 font-medium">
                            {location.reading.dissolvedOxygen.toFixed(1)}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">BOD:</span>
                          <span className="ml-1 font-medium">
                            {location.reading.bod.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { status: 'optimal', label: 'Optimal' },
            { status: 'good', label: 'Good' },
            { status: 'moderate', label: 'Moderate' },
            { status: 'poor', label: 'Poor' },
            { status: 'critical', label: 'Critical' }
          ].map(({ status, label }) => (
            <div key={status} className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}