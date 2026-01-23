import { Globe, LayoutDashboard, Link2, Settings } from "lucide-react";

export const adminNavItems = [
  { name: 'Dashboard', href: '/admin', Icon: LayoutDashboard },
  { name: 'My Websites', href: '/admin/sites', Icon: Globe },
  { name: 'UTM Builder', href: '/admin/utm', Icon: Link2 },
  { name: 'Settings', href: '/admin/settings', Icon: Settings },
];