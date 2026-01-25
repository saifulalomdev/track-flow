import { Globe, LayoutDashboard, Link2, Settings } from "lucide-react";

export const adminNavItems = [
  { name: 'Dashboard', href: '/dashboard', Icon: LayoutDashboard },
  { name: 'My Websites', href: '/dashboard/sites', Icon: Globe },
  { name: 'Link Builder', href: '/dashboard/utm', Icon: Link2 },
  { name: 'Settings', href: '/dashboard/settings', Icon: Settings },
];