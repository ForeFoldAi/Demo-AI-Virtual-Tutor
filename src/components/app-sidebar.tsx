import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  Video,
  FileText,
  BarChart3,
  Settings,
  Users,
  GraduationCap,
  Calendar,
  ClipboardList,
  Building2,
  Shield,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/schema";

const studentMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI Learning Studio", url: "/ai-learning-studio", icon: Bot },
  { title: "Live Classes", url: "/live-classes", icon: Video },
  { title: "Assignments", url: "/assignments", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const tutorMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Classes", url: "/my-classes", icon: Calendar },
  { title: "Students", url: "/students", icon: Users },
  { title: "Assignments", url: "/assignments", icon: ClipboardList },
  { title: "AI Learning Studio", url: "/ai-learning-studio", icon: Bot },
  { title: "Settings", url: "/settings", icon: Settings },
];

const schoolAdminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: GraduationCap },
  { title: "Tutors", url: "/tutors", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const masterAdminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Schools", url: "/schools", icon: Building2 },
  { title: "Syllabus", url: "/syllabus", icon: BookOpen },
  { title: "Platform", url: "/platform", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

const roleLabels: Record<string, string> = {
  student: "Student",
  tutor: "Tutor",
  school_admin: "School Admin",
  master_admin: "Master Admin",
};

const roleColors: Record<string, string> = {
  student: "bg-primary",
  tutor: "bg-accent",
  school_admin: "bg-muted-foreground",
  master_admin: "bg-destructive",
};

export function AppSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuthStore();

  const getMenuItems = () => {
    if (!user) return studentMenuItems;
    
    switch (user.role) {
      case UserRole.TUTOR:
        return tutorMenuItems;
      case UserRole.SCHOOL_ADMIN:
        return schoolAdminMenuItems;
      case UserRole.MASTER_ADMIN:
        return masterAdminMenuItems;
      default:
        return studentMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold">AI Tutor</span>
            <span className="text-xs text-muted-foreground">Smart Learning</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {user && (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {user.fullName?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium">{user.fullName}</span>
              <Badge
                variant="secondary"
                className={`w-fit text-xs ${roleColors[user.role]} text-white`}
              >
                {roleLabels[user.role] || "User"}
              </Badge>
            </div>
            <button
              onClick={logout}
              className="p-2 hover-elevate rounded-md text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
