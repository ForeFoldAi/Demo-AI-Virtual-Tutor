import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Users,
  FileText,
  Clock,
  ChevronRight,
  Video,
  Plus,
} from "lucide-react";
import type { User } from "@/types/schema";

interface TutorDashboardProps {
  user: User;
}

const todayClasses = [
  { title: "Advanced Calculus", time: "10:00 AM - 11:00 AM", students: 24, status: "upcoming" },
  { title: "Linear Algebra", time: "2:00 PM - 3:00 PM", students: 18, status: "upcoming" },
  { title: "Statistics 101", time: "4:00 PM - 5:00 PM", students: 32, status: "upcoming" },
];

const pendingSubmissions = [
  { student: "Alice Johnson", assignment: "Algebra Quiz", submitted: "2 hours ago" },
  { student: "Bob Smith", assignment: "Calculus Homework", submitted: "4 hours ago" },
  { student: "Carol White", assignment: "Statistics Project", submitted: "Yesterday" },
];

const recentStudents = [
  { name: "Alice Johnson", progress: 85, lastActive: "1 hour ago" },
  { name: "Bob Smith", progress: 72, lastActive: "3 hours ago" },
  { name: "Carol White", progress: 91, lastActive: "Today" },
  { name: "David Brown", progress: 68, lastActive: "Yesterday" },
];

export default function TutorDashboard({ user }: TutorDashboardProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Welcome, {user.fullName?.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Manage your classes and student progress.</p>
        </div>
        <Button data-testid="button-create-class">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Class
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Classes This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <FileText className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-sm text-muted-foreground">Teaching Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((cls, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover-elevate transition-all"
              >
                <div className="space-y-1">
                  <p className="font-medium">{cls.title}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cls.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {cls.students} students
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            ))}
            <Button asChild variant="ghost" className="w-full">
              <Link href="/my-classes">
                View Full Schedule
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Submissions
            </CardTitle>
            <CardDescription>Assignments waiting for review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingSubmissions.map((submission, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover-elevate transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {submission.student.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{submission.student}</p>
                    <p className="text-xs text-muted-foreground">{submission.assignment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{submission.submitted}</span>
                  <Button size="sm" variant="ghost">
                    Review
                  </Button>
                </div>
              </div>
            ))}
            <Button asChild variant="ghost" className="w-full">
              <Link href="/assignments">
                View All Submissions
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Student Activity
          </CardTitle>
          <CardDescription>Track your students' engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentStudents.map((student, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border bg-card hover-elevate transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <Badge
                    variant={student.progress >= 80 ? "default" : "secondary"}
                    className={student.progress >= 80 ? "bg-green-500" : ""}
                  >
                    {student.progress}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button asChild variant="ghost" className="w-full mt-4">
            <Link href="/students">
              View All Students
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
