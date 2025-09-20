import { useState } from "react";
import { 
  BarChart3, 
  Droplets, 
  TrendingUp, 
  Info, 
  Bell,
  Activity
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: BarChart3,
    description: "Overview & Map"
  },
  { 
    title: "Parameters", 
    url: "/parameters", 
    icon: Droplets,
    description: "Water Quality Metrics"
  },
  { 
    title: "Forecast", 
    url: "/forecast", 
    icon: TrendingUp,
    description: "Predictions & Trends"
  },
  { 
    title: "About", 
    url: "/about", 
    icon: Info,
    description: "Project Information"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (active: boolean) =>
    `group relative overflow-hidden transition-all duration-300 ${
      active 
        ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-soft border-primary/20" 
        : "hover:bg-accent/50 hover:text-accent-foreground"
    }`;

  return (
    <Sidebar
      className="border-r border-sidebar-border/50 bg-sidebar/95 backdrop-blur-md transition-all duration-300"
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-4 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                GangaGuard
              </h1>
              <p className="text-xs text-muted-foreground">Water Quality Monitor</p>
            </motion.div>
          )}
        </div>

        {/* Live Status Indicator */}
        <div className="mb-6 px-4">
          <div className="flex items-center gap-2 p-3 rounded-lg glass-card">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-success animate-pulse" />
              {!isCollapsed && (
                <div>
                  <p className="text-sm font-medium text-success">Live Monitoring</p>
                  <p className="text-xs text-muted-foreground">Data updates every 30 seconds</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <SidebarMenuButton 
                      asChild 
                      className={getNavClassName(isActive(item.url))}
                    >
                      <NavLink to={item.url} end={item.url === "/"}>
                        <div className="flex items-center gap-3 p-2 w-full">
                          <item.icon className={`h-5 w-5 transition-colors ${
                            isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                          }`} />
                          {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {item.description}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Active indicator */}
                        {isActive(item.url) && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Alert Section */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-auto p-4"
          >
            <div className="p-4 rounded-lg bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Active Alerts</span>
              </div>
              <p className="text-xs text-muted-foreground">
                2 locations showing elevated parameters
              </p>
            </div>
          </motion.div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}