import { useState, useEffect } from "react";
import { AlertTriangle, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  location: string;
  parameter: string;
  value: number;
  threshold: number;
  message: string;
}

interface AlertBannerProps {
  alerts?: Alert[];
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    location: 'Varanasi',
    parameter: 'Coliform',
    value: 1276.5,
    threshold: 1000,
    message: 'High bacterial contamination detected'
  },
  {
    id: '2',
    type: 'warning',
    location: 'Kanpur',
    parameter: 'Nitrate',
    value: 15.7,
    threshold: 12,
    message: 'Elevated nitrate levels detected'
  }
];

export function AlertBanner({ alerts = mockAlerts }: AlertBannerProps) {
  const [currentAlerts, setCurrentAlerts] = useState<Alert[]>(alerts);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentAlerts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentAlerts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentAlerts.length]);

  const dismissAlert = (alertId: string) => {
    setCurrentAlerts(prev => prev.filter(alert => alert.id !== alertId));
    if (currentIndex >= currentAlerts.length - 1) {
      setCurrentIndex(0);
    }
  };

  if (currentAlerts.length === 0) return null;

  const currentAlert = currentAlerts[currentIndex];

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-r from-destructive/20 to-destructive/10',
          border: 'border-destructive/30',
          text: 'text-destructive',
          icon: AlertTriangle
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-warning/20 to-warning/10',
          border: 'border-warning/30',
          text: 'text-warning',
          icon: TrendingUp
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-primary/20 to-primary/10',
          border: 'border-primary/30',
          text: 'text-primary',
          icon: AlertTriangle
        };
    }
  };

  const styles = getAlertStyles(currentAlert.type);
  const IconComponent = styles.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentAlert.id}
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.4 
        }}
        className={`
          relative overflow-hidden rounded-lg border p-4 mb-4 
          ${styles.bg} ${styles.border}
          backdrop-blur-sm shadow-soft
        `}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-current to-transparent animate-pulse" />
        </div>

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`p-2 rounded-full ${styles.bg} ${styles.text}`}
            >
              <IconComponent className="h-5 w-5" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-semibold ${styles.text}`}>
                  {currentAlert.type === 'critical' ? '⚠️' : '📊'} 
                  {currentAlert.parameter} Alert at {currentAlert.location}
                </span>
                <span className="text-sm text-muted-foreground">
                  {currentAlert.value.toFixed(1)} 
                  (threshold: {currentAlert.threshold})
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {currentAlert.message}
              </p>
            </div>
          </div>

          {/* Alert counter */}
          {currentAlerts.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {currentIndex + 1} of {currentAlerts.length}
              </span>
              <div className="flex gap-1">
                {currentAlerts.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 w-6 rounded-full transition-colors ${
                      index === currentIndex ? styles.text.replace('text-', 'bg-') : 'bg-muted'
                    }`}
                    animate={index === currentIndex ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => dismissAlert(currentAlert.id)}
            className={`h-8 w-8 rounded-full ${styles.text} hover:bg-current/10`}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss alert</span>
          </Button>
        </div>

        {/* Progress bar for auto-rotation */}
        {currentAlerts.length > 1 && (
          <motion.div
            className={`absolute bottom-0 left-0 h-0.5 ${styles.text.replace('text-', 'bg-')}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: "linear" }}
            key={`progress-${currentAlert.id}`}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}