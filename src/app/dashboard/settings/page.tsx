import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, User, Zap, Activity } from "lucide-react";

export default function SettingsPage() {
  // Dummy data representing what would come from your Database + Stripe
  const userData = {
    name: "Arif Rahman",
    email: "arif@coaching-center.bd",
    plan: "Pro Plan", // This would be dynamic based on your 'planId'
    status: "Active",
    nextBilling: "Feb 25, 2026",
    usage: {
      students: 450,
      limit: 1000,
      pings: "85k",
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your coaching center account and subscription.</p>
      </div>

      <div className="grid gap-6">
        {/* PROFILE SECTION */}
        <Card className="border-white/10 bg-background/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Update your personal and business details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={userData.name} className="bg-background" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue={userData.email} disabled className="bg-muted" />
            </div>
          </CardContent>
          <CardFooter className="border-t border-white/5 pt-6">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* SUBSCRIPTION SECTION */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <CardTitle>Subscription Plan</CardTitle>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/20">
                {userData.status}
              </Badge>
            </div>
            <CardDescription>You are currently on the <strong>{userData.plan}</strong>.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Usage Stats - The "Senior" Flex */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Students Managed</span>
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{userData.usage.students} / {userData.usage.limit}</div>
                <div className="w-full bg-muted h-1.5 mt-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-background border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Monthly Traffic</span>
                  <Zap className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{userData.usage.pings} pings</div>
                <p className="text-xs text-muted-foreground mt-2">Resets on {userData.nextBilling}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/5 pt-6">
            <p className="text-sm text-muted-foreground">
              Your next invoice is for **$29.00** on **{userData.nextBilling}**.
            </p>
            {/* In a real app, this triggers the Stripe Customer Portal */}
            <Button variant="outline">Manage Billing</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}