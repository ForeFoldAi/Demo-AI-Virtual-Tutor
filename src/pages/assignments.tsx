import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Clock,
  CheckCircle,
  ChevronRight,
  Calendar,
  Timer,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  duration: number;
  totalMarks: number;
  status: "pending" | "in_progress" | "submitted" | "graded";
  score?: number;
  questions: number;
}

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Algebra Quiz - Chapter 5",
    subject: "Mathematics",
    dueDate: "2024-01-20",
    duration: 30,
    totalMarks: 50,
    status: "pending",
    questions: 20,
  },
  {
    id: 2,
    title: "Lab Report - Photosynthesis",
    subject: "Science",
    dueDate: "2024-01-22",
    duration: 60,
    totalMarks: 100,
    status: "pending",
    questions: 5,
  },
  {
    id: 3,
    title: "Essay Writing - Literature Review",
    subject: "English",
    dueDate: "2024-01-25",
    duration: 90,
    totalMarks: 100,
    status: "in_progress",
    questions: 3,
  },
  {
    id: 4,
    title: "Programming Exercise - Arrays",
    subject: "Computer Science",
    dueDate: "2024-01-18",
    duration: 45,
    totalMarks: 75,
    status: "graded",
    score: 68,
    questions: 10,
  },
  {
    id: 5,
    title: "History Test - World War II",
    subject: "History",
    dueDate: "2024-01-15",
    duration: 60,
    totalMarks: 100,
    status: "graded",
    score: 92,
    questions: 25,
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    icon: Timer,
  },
  submitted: {
    label: "Submitted",
    color: "bg-purple-500",
    textColor: "text-purple-600",
    icon: CheckCircle,
  },
  graded: {
    label: "Graded",
    color: "bg-green-500",
    textColor: "text-green-600",
    icon: Award,
  },
};

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredAssignments = assignments.filter((a) => {
    if (activeTab === "all") return true;
    return a.status === activeTab;
  });

  const pendingCount = assignments.filter((a) => a.status === "pending").length;
  const gradedCount = assignments.filter((a) => a.status === "graded").length;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Assignments</h1>
          <p className="text-sm sm:text-base text-muted-foreground">View and complete your assignments.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="py-1.5 text-xs sm:text-sm">
            <Clock className="mr-1 h-3 w-3" />
            {pendingCount} Pending
          </Badge>
          <Badge variant="outline" className="py-1.5 text-xs sm:text-sm">
            <CheckCircle className="mr-1 h-3 w-3" />
            {gradedCount} Graded
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto flex overflow-x-auto">
          <TabsTrigger value="all" data-testid="tab-all">
            All
          </TabsTrigger>
          <TabsTrigger value="pending" data-testid="tab-pending">
            Pending
          </TabsTrigger>
          <TabsTrigger value="in_progress" data-testid="tab-in-progress">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="graded" data-testid="tab-graded">
            Graded
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredAssignments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No assignments found.</p>
                </CardContent>
              </Card>
            ) : (
              filteredAssignments.map((assignment) => {
                const config = statusConfig[assignment.status];
                const StatusIcon = config.icon;

                return (
                  <Card
                    key={assignment.id}
                    className="hover-elevate transition-all"
                    data-testid={`assignment-card-${assignment.id}`}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className={cn("p-2 sm:p-3 rounded-lg", config.color, "self-start")}>
                          <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                            <h3 className="font-semibold text-sm sm:text-base">{assignment.title}</h3>
                            <Badge variant="outline" className="w-fit text-xs">{assignment.subject}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-3 w-3 sm:h-4 sm:w-4" />
                              {assignment.duration} mins
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                              {assignment.questions} questions
                            </span>
                          </div>
                          {assignment.status === "graded" && assignment.score !== undefined && (
                            <div className="flex items-center gap-3 mt-3">
                              <Progress
                                value={(assignment.score / assignment.totalMarks) * 100}
                                className="w-24 sm:w-32 h-2"
                              />
                              <span
                                className={cn(
                                  "text-xs sm:text-sm font-medium",
                                  assignment.score / assignment.totalMarks >= 0.8
                                    ? "text-green-600"
                                    : assignment.score / assignment.totalMarks >= 0.6
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                )}
                              >
                                {assignment.score}/{assignment.totalMarks}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={cn(config.color, "text-xs")}>{config.label}</Badge>
                          {(assignment.status === "pending" ||
                            assignment.status === "in_progress") && (
                            <Button size="sm" data-testid={`button-start-${assignment.id}`}>
                              {assignment.status === "in_progress" ? "Continue" : "Start"}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          )}
                          {assignment.status === "graded" && (
                            <Button variant="outline" size="sm">
                              View Results
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
