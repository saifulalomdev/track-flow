import { Link, Navigate, Outlet } from "react-router";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Sidebar, SidebarFooter, SidebarHeader, SidebarInset, useSidebar } from "~/components/layout/side-bar";
import NavUser from "~/components/dashboard/nav-user";
import { DashboardHeader } from "~/components/layout/dashboard-header";
import { Button } from "~/components/ui/button";
import { PlanUsageStats } from "~/components/dashboard/plan-usage-stats";
import { LogOut, Settings } from "lucide-react";

export default function DashboardLayout() {
  const { close } = useSidebar();

  return (
    <>
      <SignedOut>
        <Navigate to="/sign-in" />
      </SignedOut>

      <SignedIn>
        <Sidebar>
          <SidebarHeader>
            <NavUser />
          </SidebarHeader>
          <SidebarFooter>
            <PlanUsageStats current={300} limit={500} label='Usage' />

            <Link onClick={close} to="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings /> Settings
              </Button>
            </Link>

            <SignOutButton redirectUrl="/">
              <Button variant="ghost" className="w-full text-destructive justify-start">
                <LogOut /> Sign out
              </Button>
            </SignOutButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <DashboardHeader />
          <div className='p-4 lg:p-6'>
            <Outlet />
          </div>
        </SidebarInset>

      </SignedIn>
    </>

  );
}