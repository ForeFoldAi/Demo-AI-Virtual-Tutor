import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  MessageSquare,
  CheckCircle,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveClass {
  id: number;
  title: string;
  subject: string;
  tutor: string;
  scheduledAt: string;
  duration: number;
  students: number;
  status: "upcoming" | "live" | "completed";
}

const liveClasses: LiveClass[] = [
  {
    id: 1,
    title: "Advanced Calculus - Integration",
    subject: "Mathematics",
    tutor: "Dr. Smith",
    scheduledAt: "2024-01-18T15:00:00",
    duration: 60,
    students: 24,
    status: "live",
  },
  {
    id: 2,
    title: "Physics Lab - Optics",
    subject: "Science",
    tutor: "Prof. Johnson",
    scheduledAt: "2024-01-18T16:30:00",
    duration: 90,
    students: 18,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Essay Writing Workshop",
    subject: "English",
    tutor: "Ms. Davis",
    scheduledAt: "2024-01-19T10:00:00",
    duration: 45,
    students: 32,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    tutor: "Dr. Chen",
    scheduledAt: "2024-01-17T14:00:00",
    duration: 60,
    students: 28,
    status: "completed",
  },
  {
    id: 5,
    title: "World War II Analysis",
    subject: "History",
    tutor: "Prof. Williams",
    scheduledAt: "2024-01-16T11:00:00",
    duration: 75,
    students: 22,
    status: "completed",
  },
];

const chatMessages = [
  { user: "Alice", message: "Great explanation!", time: "2 min ago" },
  { user: "Bob", message: "Can you repeat that last part?", time: "1 min ago" },
  { user: "Carol", message: "Thanks for the example!", time: "Just now" },
];

export default function LiveClassesPage() {
  const [selectedClass, setSelectedClass] = useState<LiveClass | null>(
    liveClasses.find((c) => c.status === "live") || null
  );
  const [activeTab, setActiveTab] = useState("all");

  const filteredClasses = liveClasses.filter((c) => {
    if (activeTab === "all") return true;
    return c.status === activeTab;
  });

  const liveCount = liveClasses.filter((c) => c.status === "live").length;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Live Classes</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Join live sessions and interact with tutors.</p>
        </div>
        {liveCount > 0 && (
          <Badge className="bg-red-500 animate-pulse w-fit">
            <Circle className="mr-1 h-2 w-2 fill-current" />
            {liveCount} Live Now
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {selectedClass && selectedClass.status === "live" && (
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500">
                    <Circle className="mr-1 h-2 w-2 fill-current animate-pulse" />
                    LIVE
                  </Badge>
                </div>
                <div className="text-center text-white">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">{selectedClass.title}</p>
                  <p className="text-sm opacity-75">{selectedClass.tutor}</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white" />
                    <span className="text-white text-sm">{selectedClass.students} attending</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button variant="destructive" size="sm">
                      Leave Class
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedClass.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedClass.subject} • {selectedClass.tutor}
                    </p>
                  </div>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    {selectedClass.duration} min
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Class Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full sm:w-auto flex overflow-x-auto">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                  <TabsTrigger value="live" className="text-xs sm:text-sm">Live</TabsTrigger>
                  <TabsTrigger value="upcoming" className="text-xs sm:text-sm">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  <div className="space-y-3">
                    {filteredClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border bg-card hover-elevate transition-all cursor-pointer",
                          selectedClass?.id === cls.id && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedClass(cls)}
                        data-testid={`class-card-${cls.id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "p-3 rounded-lg",
                              cls.status === "live"
                                ? "bg-red-500"
                                : cls.status === "upcoming"
                                ? "bg-primary"
                                : "bg-muted"
                            )}
                          >
                            <Video
                              className={cn(
                                "h-5 w-5",
                                cls.status === "completed"
                                  ? "text-muted-foreground"
                                  : "text-white"
                              )}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{cls.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {cls.subject} • {cls.tutor}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(cls.scheduledAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(cls.scheduledAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cls.status === "live" && (
                            <Button variant="destructive" size="sm">
                              <Play className="mr-1 h-4 w-4" />
                              Join
                            </Button>
                          )}
                          {cls.status === "upcoming" && (
                            <Button size="sm" variant="outline">
                              Remind Me
                            </Button>
                          )}
                          {cls.status === "completed" && (
                            <Badge variant="secondary">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Attended
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedClass?.status === "live" ? (
                <>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {msg.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background"
                      />
                      <Button size="sm">Send</Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Join a live class to chat</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedClass?.status === "live" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Students attending</span>
                    <Badge variant="secondary">{selectedClass.students}</Badge>
                  </div>
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(5, selectedClass.students) }).map((_, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {selectedClass.students > 5 && (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                        +{selectedClass.students - 5}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No active class</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
