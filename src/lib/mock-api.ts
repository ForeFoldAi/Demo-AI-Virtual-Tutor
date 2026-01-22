import type { User, UserRoleType } from "@/types/schema";
import { UserRole } from "@/types/schema";

// Demo users for different roles
const DEMO_USERS: Record<string, User> = {
  student: {
    id: "demo-student-1",
    username: "student",
    password: "password",
    email: "student@demo.com",
    fullName: "Demo Student",
    role: UserRole.STUDENT,
    avatar: null,
  },
  tutor: {
    id: "demo-tutor-1",
    username: "tutor",
    password: "password",
    email: "tutor@demo.com",
    fullName: "Demo Tutor",
    role: UserRole.TUTOR,
    avatar: null,
  },
  admin: {
    id: "demo-admin-1",
    username: "admin",
    password: "password",
    email: "admin@demo.com",
    fullName: "Demo School Admin",
    role: UserRole.SCHOOL_ADMIN,
    avatar: null,
  },
  master: {
    id: "demo-master-1",
    username: "master",
    password: "password",
    email: "master@demo.com",
    fullName: "Demo Master Admin",
    role: UserRole.MASTER_ADMIN,
    avatar: null,
  },
};

// Mock AI responses
const MOCK_AI_RESPONSES = [
  "That's a great question! Let me explain this concept step by step.",
  "I understand you're asking about this topic. Here's a comprehensive explanation that should help clarify things.",
  "Excellent question! This is an important concept to understand. Let me break it down for you.",
  "I'd be happy to help you understand this better. Here's what you need to know:",
  "This is a common question, and I'm glad you asked! Let me provide you with a detailed explanation.",
];

function getRandomResponse(): string {
  return MOCK_AI_RESPONSES[Math.floor(Math.random() * MOCK_AI_RESPONSES.length)];
}

function generateAIResponse(userMessage: string): string {
  const baseResponse = getRandomResponse();
  const contextualResponse = `\n\nBased on your question about "${userMessage.slice(0, 50)}...", here's a detailed explanation:\n\n` +
    `This topic involves several key concepts that work together. First, let's understand the fundamental principles. ` +
    `Then we can explore how these principles apply in different scenarios.\n\n` +
    `Key points to remember:\n` +
    `• Understanding the basics is crucial\n` +
    `• Practice helps reinforce learning\n` +
    `• Real-world applications make concepts clearer\n\n` +
    `Would you like me to elaborate on any specific aspect of this topic?`;
  
  return baseResponse + contextualResponse;
}

// Simulate network delay
function delay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock API functions
export const mockAPI = {
  async login(username: string, password: string): Promise<{ user: User; token: string }> {
    await delay(800);
    
    const user = Object.values(DEMO_USERS).find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    return {
      user: { ...user },
      token: `demo-token-${user.id}`,
    };
  },

  async signup(data: {
    username: string;
    email: string;
    fullName: string;
    password: string;
    role: UserRoleType;
  }): Promise<{ user: User; token: string }> {
    await delay(1000);

    // Check if username already exists
    if (Object.values(DEMO_USERS).some((u) => u.username.toLowerCase() === data.username.toLowerCase())) {
      throw new Error("Username already exists");
    }

    // Create new demo user
    const newUser: User = {
      id: `demo-${data.role}-${Date.now()}`,
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      avatar: null,
      password: data.password,
    };

    return {
      user: newUser,
      token: `demo-token-${newUser.id}`,
    };
  },

  async chat(message: string, _conversationId: string, _history: Array<{ role: string; content: string }>): Promise<ReadableStream> {
    await delay(300);

    const response = generateAIResponse(message);
    const chunks = response.split(" ");
    
    // Create a readable stream that simulates streaming
    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < chunks.length; i++) {
          await delay(50); // Simulate typing delay
          const chunk = chunks[i] + (i < chunks.length - 1 ? " " : "");
          const data = `data: ${JSON.stringify({ content: chunk })}\n\n`;
          controller.enqueue(new TextEncoder().encode(data));
        }
        controller.close();
      },
    });

    return stream;
  },

  async fetchData<T>(url: string): Promise<T> {
    await delay(500);
    
    // Return empty arrays or null for data endpoints
    if (url.includes("/api/")) {
      return [] as unknown as T;
    }
    
    return null as unknown as T;
  },
};

// Check if we should use mock API (always true for demo mode)
export const USE_MOCK_API = true;
