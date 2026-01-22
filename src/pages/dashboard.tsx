import { useAuthStore } from "@/lib/auth-store";
import { UserRole } from "@/types/schema";
import StudentDashboard from "@/components/dashboards/student-dashboard";
import TutorDashboard from "@/components/dashboards/tutor-dashboard";
import SchoolAdminDashboard from "@/components/dashboards/school-admin-dashboard";
import MasterAdminDashboard from "@/components/dashboards/master-admin-dashboard";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case UserRole.TUTOR:
      return <TutorDashboard user={user} />;
    case UserRole.SCHOOL_ADMIN:
      return <SchoolAdminDashboard user={user} />;
    case UserRole.MASTER_ADMIN:
      return <MasterAdminDashboard user={user} />;
    default:
      return <StudentDashboard user={user} />;
  }
}
