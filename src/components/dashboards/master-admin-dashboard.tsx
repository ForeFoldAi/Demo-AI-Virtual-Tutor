import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Building2,
  BookOpen,
  Server,
  ChevronRight,
  Activity,
  Shield,
  Globe,
} from "lucide-react";
import type { User } from "@/types/schema";

interface MasterAdminDashboardProps {
  user: User;
}

const platformStats = [
  { label: "Total Users", value: "12,456", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Active Schools", value: "48", change: "+3", icon: Building2, color: "text-accent" },
  { label: "Total Subjects", value: "156", change: "+8", icon: BookOpen, color: "text-green-500" },
  { label: "Server Uptime", value: "99.9%", change: "", icon: Server, color: "text-orange-500" },
];

const recentActivity = [
  { action: "New school registered", school: "Greenwood Academy", time: "2 hours ago" },
  { action: "Syllabus updated", school: "Mathematics Grade 10", time: "4 hours ago" },
  { action: "New admin added", school: "Lincoln High School", time: "Yesterday" },
  { action: "User report generated", school: "Platform Analytics", time: "2 days ago" },
];

const schoolPerformance = [
  { name: "Greenwood Academy", students: 456, performance: 88 },
  { name: "Lincoln High School", students: 312, performance: 82 },
  { name: "Riverside Institute", students: 289, performance: 79 },
  { name: "Summit Academy", students: 234, performance: 85 },
];

export default function MasterAdminDashboard({ user: _user }: MasterAdminDashboardProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Platform Overview</h1>
          <p className="text-muted-foreground">Manage the entire AI Tutor platform.</p>
        </div>
        <Badge variant="outline" className="w-fit">
          <Shield className="mr-1 h-3 w-3" />
          Master Admin
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    {stat.change && (
                      <Badge variant="secondary" className="text-xs text-green-500">
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              School Performance
            </CardTitle>
            <CardDescription>Performance metrics by school</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {schoolPerformance.map((school, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{school.name}</p>
                    <p className="text-xs text-muted-foreground">{school.students} students</p>
                  </div>
                  <Badge variant={school.performance >= 85 ? "default" : "secondary"}>
                    {school.performance}%
                  </Badge>
                </div>
                <Progress value={school.performance} className="h-2" />
              </div>
            ))}
            <Button asChild variant="ghost" className="w-full">
              <Link href="/schools">
                View All Schools
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.school}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" asChild>
              <Link href="/users">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" asChild>
              <Link href="/schools">
                <Building2 className="h-6 w-6" />
                <span>Manage Schools</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" asChild>
              <Link href="/syllabus">
                <BookOpen className="h-6 w-6" />
                <span>Manage Syllabus</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" asChild>
              <Link href="/platform">
                <Server className="h-6 w-6" />
                <span>Platform Settings</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
