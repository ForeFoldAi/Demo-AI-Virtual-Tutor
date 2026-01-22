import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, MoreVertical, Mail, Users, Calendar, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Tutor {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  students: number;
  rating: number;
  classes: number;
  status: "active" | "inactive";
}

const tutors: Tutor[] = [
  {
    id: "1",
    name: "Dr. Smith",
    email: "smith@example.com",
    subjects: ["Mathematics", "Physics"],
    students: 156,
    rating: 4.8,
    classes: 24,
    status: "active",
  },
  {
    id: "2",
    name: "Prof. Johnson",
    email: "johnson@example.com",
    subjects: ["Science", "Chemistry"],
    students: 134,
    rating: 4.6,
    classes: 18,
    status: "active",
  },
  {
    id: "3",
    name: "Ms. Davis",
    email: "davis@example.com",
    subjects: ["English", "Literature"],
    students: 98,
    rating: 4.9,
    classes: 22,
    status: "active",
  },
  {
    id: "4",
    name: "Dr. Chen",
    email: "chen@example.com",
    subjects: ["Computer Science"],
    students: 112,
    rating: 4.7,
    classes: 20,
    status: "active",
  },
];

export default function TutorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutors = tutors.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tutors</h1>
          <p className="text-muted-foreground">Manage tutor profiles and assignments.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tutors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
              data-testid="input-search-tutors"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button>Add Tutor</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredTutors.map((tutor) => (
          <Card key={tutor.id} className="hover-elevate transition-all" data-testid={`tutor-card-${tutor.id}`}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                    {tutor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{tutor.name}</h3>
                  <Badge
                    variant={tutor.status === "active" ? "default" : "secondary"}
                    className={tutor.status === "active" ? "bg-green-500" : ""}
                  >
                    {tutor.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tutor.email}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {tutor.subjects.map((subject, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t mt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{tutor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-3 w-3 text-primary" />
                      <span className="text-sm font-medium">{tutor.students}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="h-3 w-3 text-accent" />
                      <span className="text-sm font-medium">{tutor.classes}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Classes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
