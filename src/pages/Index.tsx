import { HeroSection } from "@/components/dashboard/HeroSection";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { LocationMap } from "@/components/dashboard/LocationMap";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 animate-fade-in-up"
    >
      <HeroSection />
      <QuickStats />
      <LocationMap />
    </motion.div>
  );
};

export default Index;
