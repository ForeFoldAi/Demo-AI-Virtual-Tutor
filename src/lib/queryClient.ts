import { QueryClient, QueryFunction } from "@tanstack/react-query";

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // No API calls - return immediate mock responses for UI display only
  if (url === "/api/auth/login" && method === "POST") {
    const loginData = data as { username: string; password: string };
    // Return mock user data without any API call
    const mockUser = {
      id: "demo-user-1",
      username: loginData.username || "demo",
      email: "demo@example.com",
      fullName: "Demo User",
      role: "student" as const,
      avatar: null,
    };
    return new Response(JSON.stringify({
      user: mockUser,
      token: "demo-token-no-api",
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  if (url === "/api/auth/signup" && method === "POST") {
    const signupData = data as {
      username: string;
      email: string;
      fullName: string;
      password: string;
      role: string;
    };
    // Return mock user data without any API call
    const mockUser = {
      id: "demo-user-1",
      username: signupData.username || "demo",
      email: signupData.email || "demo@example.com",
      fullName: signupData.fullName || "Demo User",
      role: signupData.role || "student",
      avatar: null,
    };
    return new Response(JSON.stringify({
      user: mockUser,
      token: "demo-token-no-api",
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // For other endpoints, return empty response
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  <T,>({ on401: _unauthorizedBehavior }: { on401: UnauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // No API calls - return empty data immediately for UI display only
    // Return empty arrays for list endpoints, null for single item endpoints
    const url = queryKey.join("/") as string;
    if (url.includes("/api/")) {
      return [] as unknown as T;
    }
    return null as unknown as T;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
