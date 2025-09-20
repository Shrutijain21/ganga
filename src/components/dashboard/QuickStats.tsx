import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getOverallQualityScore, generateMockReading } from "@/lib/mockData";

const mockReading = generateMockReading();
const overallScore = getOverallQualityScore(mockReading);

const stats = [
  {
    title: "Overall Quality",
    value: `${overallScore}%`,
    change: "+5.2%",
    trend: "up",
    status: overallScore >= 80 ? "optimal" : overallScore >= 60 ? "good" : "moderate",
    icon: overallScore >= 70 ? CheckCircle : AlertTriangle,
    description: "Parameters within ideal range"
  },
  {
    title: "Active Monitoring",
    value: "4",
    change: "All online",
    trend: "stable",
    status: "optimal",
    icon: CheckCircle,
    description: "Locations currently monitored"
  },
  {
    title: "Critical Alerts",
    value: "2",
    change: "-1 from yesterday",
    trend: "down",
    status: "warning",
    icon: AlertTriangle,
    description: "Parameters exceeding thresholds"
  },
  {
    title: "Data Accuracy",
    value: "99.7%",
    change: "+0.3%",
    trend: "up",
    status: "optimal",
    icon: TrendingUp,
    description: "Sensor reliability rating"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'optimal': return 'text-status-optimal';
    case 'good': return 'text-status-good';
    case 'moderate': return 'text-status-moderate';
    case 'warning': return 'text-warning';
    case 'poor': return 'text-status-poor';
    case 'critical': return 'text-status-critical';
    default: return 'text-muted-foreground';
  }
};

const getStatusBg = (status: string) => {
  switch (status) {
    case 'optimal': return 'bg-status-optimal/10';
    case 'good': return 'bg-status-good/10';
    case 'moderate': return 'bg-status-moderate/10';
    case 'warning': return 'bg-warning/10';
    case 'poor': return 'bg-status-poor/10';
    case 'critical': return 'bg-status-critical/10';
    default: return 'bg-muted/10';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return TrendingDown;
    default: return CheckCircle;
  }
};

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const TrendIcon = getTrendIcon(stat.trend);
        
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="glass-card hover:shadow-soft transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${getStatusBg(stat.status)}`}>
                    <IconComponent className={`h-5 w-5 ${getStatusColor(stat.status)}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendIcon className={`h-3 w-3 ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-destructive' : 
                      'text-muted-foreground'
                    }`} />
                    <span className="text-muted-foreground">{stat.change}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}