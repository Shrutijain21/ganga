import { motion } from "framer-motion";
import { Droplets, MapPin, TrendingUp, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12 text-white shadow-glow mb-8"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="water-wave" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              GangaGuard Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
              Real-time water quality monitoring for the Ganga River
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-white/20">
                <Droplets className="h-4 w-4" />
              </div>
              <span>Live Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-white/20">
                <MapPin className="h-4 w-4" />
              </div>
              <span>4 Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-white/20">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span>Real-time Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-white/20">
                <Shield className="h-4 w-4" />
              </div>
              <span>Environmental Protection</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-glow">
              <Droplets className="h-16 w-16 md:h-20 md:w-20 text-white animate-pulse" />
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="h-2 w-2 rounded-full bg-white" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                x: [0, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-2 -left-6 h-6 w-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}