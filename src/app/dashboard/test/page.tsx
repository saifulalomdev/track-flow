"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Globe, 
  Wand2, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Websites", href: "/dashboard/sites", icon: Globe },
  { name: "Smart UTM", href: "/dashboard/utm", icon: Wand2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r border-white/10">
      {/* Workspace Switcher / Logo Area */}
      <div className="p-6">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5 border border-white/10">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold text-black">
            T
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-white">TrackFlow Center</p>
            <p className="text-[10px] text-muted-foreground uppercase">Pro Account</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 shrink-0",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
              )} />
              {item.name}
              {isActive && <ChevronRight className="ml-auto h-3 w-3" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Account Section */}
      
    </div>
  );
}