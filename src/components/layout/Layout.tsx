import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AlertBanner } from "@/components/ui/alert-banner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border/50 bg-background/95 backdrop-blur-md px-6"
          >
            <SidebarTrigger className="h-8 w-8" />
            
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  Water Quality Monitoring System
                </h2>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Live Data
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </motion.header>

          {/* Alert Banner */}
          <div className="px-6 pt-4">
            <AlertBanner />
          </div>

          {/* Main Content */}
          <main className="flex-1 px-6 pb-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}