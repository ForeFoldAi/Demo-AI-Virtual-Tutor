import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  BookOpen,
  Clock,
  TrendingUp,
  PlayCircle,
  FileText,
  ChevronRight,
  Sparkles,
  Calculator,
  FlaskConical,
  Globe,
  Palette,
  Code,
} from "lucide-react";
import type { User } from "@/types/schema";

interface StudentDashboardProps {
  user: User;
}

const subjectProgress = [
  { name: "Mathematics", progress: 72, icon: Calculator, color: "bg-blue-500" },
  { name: "Science", progress: 58, icon: FlaskConical, color: "bg-green-500" },
  { name: "English", progress: 85, icon: Globe, color: "bg-purple-500" },
  { name: "Art", progress: 45, icon: Palette, color: "bg-pink-500" },
  { name: "Computer Science", progress: 91, icon: Code, color: "bg-orange-500" },
];

const upcomingAssignments = [
  { title: "Algebra Quiz", subject: "Mathematics", dueIn: "2 days" },
  { title: "Lab Report", subject: "Science", dueIn: "4 days" },
  { title: "Essay Writing", subject: "English", dueIn: "1 week" },
];

const upcomingClasses = [
  { title: "Advanced Calculus", tutor: "Dr. Smith", time: "Today, 3:00 PM" },
  { title: "Physics Lab", tutor: "Prof. Johnson", time: "Tomorrow, 10:00 AM" },
];

export default function StudentDashboard({ user }: StudentDashboardProps) {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Welcome back, {user.fullName?.split(" ")[0]}!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Continue your learning journey and track your progress.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  Continue Learning
                </CardTitle>
                <CardDescription className="mt-1">
                  Pick up where you left off
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                In Progress
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <p className="font-medium">Quadratic Equations</p>
                    <p className="text-sm text-muted-foreground">Mathematics - Chapter 5</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={65} className="w-24 sm:w-32 h-2" />
                      <span className="text-xs text-muted-foreground">65%</span>
                    </div>
                  </div>
                  <Button asChild data-testid="button-continue-learning" className="w-full sm:w-auto">
                    <Link href="/ai-learning-studio">Continue</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bot className="h-5 w-5 text-accent" />
              AI Tutor
            </CardTitle>
            <CardDescription>Get instant help with any topic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">Available 24/7</span>
            </div>
            <Button
              asChild
              className="w-full bg-accent text-accent-foreground"
              data-testid="button-ai-tutor"
            >
              <Link href="/ai-learning-studio">
                <Bot className="mr-2 h-4 w-4" />
                Start Learning
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <BookOpen className="h-5 w-5" />
              Subject Progress
            </CardTitle>
            <CardDescription className="text-sm">Track your progress across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectProgress.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover-elevate"
                  data-testid={`subject-progress-${subject.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className={`p-2 rounded-lg ${subject.color}`}>
                    <subject.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-medium truncate">{subject.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {subject.progress}%
                      </span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="ghost" className="w-full mt-4">
              <Link href="/ai-learning-studio">
                View All Subjects
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5" />
                Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((assignment, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg hover-elevate transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {assignment.dueIn}
                  </Badge>
                </div>
              ))}
              <Button asChild variant="ghost" className="w-full" size="sm">
                <Link href="/assignments">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5" />
                Weekly Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-muted-foreground">Hours Studied</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-green-500">5</p>
                  <p className="text-xs text-muted-foreground">Topics Completed</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-accent">24</p>
                  <p className="text-xs text-muted-foreground">AI Sessions</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-orange-500">3</p>
                  <p className="text-xs text-muted-foreground">Quizzes Passed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Live Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingClasses.map((cls, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border bg-card hover-elevate transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    Live
                  </Badge>
                </div>
                <h3 className="font-medium mb-1">{cls.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{cls.tutor}</p>
                <p className="text-xs text-primary font-medium">{cls.time}</p>
              </div>
            ))}
            <div className="p-4 rounded-lg border border-dashed flex items-center justify-center">
              <Button asChild variant="ghost">
                <Link href="/live-classes">
                  View Schedule
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
