import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  FileText,
  Languages,
  Loader2,
  Plus,
  MessageSquare,
  Trash2,
  Menu,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/utils";
import { mockAPI, USE_MOCK_API } from "@/lib/mock-api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const quickActions = [
  { label: "Explain simpler", icon: Lightbulb, prompt: "Can you explain that in simpler terms?" },
  { label: "Give example", icon: FileText, prompt: "Can you give me an example?" },
  { label: "Summarize", icon: MessageSquare, prompt: "Can you summarize the key points?" },
  { label: "Translate", icon: Languages, prompt: "Can you translate this to a different language?" },
];

const suggestedTopics = [
  "Help me understand quadratic equations",
  "Explain photosynthesis step by step",
  "What are the key themes in Shakespeare's Hamlet?",
  "How does Newton's third law work?",
];

export default function AITutorPage() {
  const { user } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation?.messages]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversation(newConversation);
    setMobileMenuOpen(false);
    inputRef.current?.focus();
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    let conversation = activeConversation;
    if (!conversation) {
      conversation = {
        id: Date.now().toString(),
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        messages: [],
      };
      setConversations((prev) => [conversation!, ...prev]);
      setActiveConversation(conversation);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
    };

    setActiveConversation(updatedConversation);
    setConversations((prev) =>
      prev.map((c) => (c.id === conversation!.id ? updatedConversation : c))
    );
    setInput("");
    setIsLoading(true);
    setIsStreaming(true);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    const conversationWithAssistant = {
      ...updatedConversation,
      messages: [...updatedConversation.messages, assistantMessage],
    };
    setActiveConversation(conversationWithAssistant);

    try {
      let fullContent = "";

      if (USE_MOCK_API) {
        // Use mock API for demo mode
        const stream = await mockAPI.chat(
          content,
          conversation.id,
          updatedConversation.messages.map((m) => ({
            role: m.role,
            content: m.content,
          }))
        );

        const reader = stream.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  fullContent += data.content;
                  setActiveConversation((prev) => {
                    if (!prev) return prev;
                    const messages = [...prev.messages];
                    messages[messages.length - 1] = {
                      ...messages[messages.length - 1],
                      content: fullContent,
                    };
                    return { ...prev, messages };
                  });
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      } else {
        // Original API call (not used in demo mode)
        const token = localStorage.getItem("auth-storage");
        let authToken = "";
        try {
          if (token) {
            const parsed = JSON.parse(token);
            authToken = parsed?.state?.token || "";
          }
        } catch {}

        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...(authToken ? { "Authorization": `Bearer ${authToken}` } : {}),
          },
          body: JSON.stringify({
            message: content,
            conversationId: conversation.id,
            history: updatedConversation.messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = decoder.decode(value);
            const lines = text.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.content) {
                    fullContent += data.content;
                    setActiveConversation((prev) => {
                      if (!prev) return prev;
                      const messages = [...prev.messages];
                      messages[messages.length - 1] = {
                        ...messages[messages.length - 1],
                        content: fullContent,
                      };
                      return { ...prev, messages };
                    });
                  }
                } catch (e) {
                  // Ignore parse errors
                }
              }
            }
          }
        }
      }

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversation!.id) {
            const messages = [...conversationWithAssistant.messages];
            messages[messages.length - 1] = {
              ...messages[messages.length - 1],
              content: fullContent,
            };
            return { ...c, messages };
          }
          return c;
        })
      );
    } catch (error) {
      console.error("Chat error:", error);
      setActiveConversation((prev) => {
        if (!prev) return prev;
        const messages = [...prev.messages];
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content: "I apologize, but I encountered an error. Please try again.",
        };
        return { ...prev, messages };
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversation?.id === id) {
      setActiveConversation(null);
    }
  };

  const ConversationList = ({ testIdSuffix = "" }: { testIdSuffix?: string }) => (
    <>
      <div className="p-3 sm:p-4 border-b">
        <Button
          onClick={createNewConversation}
          className="w-full"
          data-testid={`button-new-chat${testIdSuffix}`}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer hover-elevate transition-colors",
                activeConversation?.id === conv.id && "bg-primary/10 text-primary"
              )}
              onClick={() => {
                setActiveConversation(conv);
                setMobileMenuOpen(false);
              }}
              data-testid={`conversation-${conv.id}`}
            >
              <MessageSquare className="h-4 w-4 flex-shrink-0" />
              <span className="truncate flex-1">{conv.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover-elevate rounded transition-opacity"
                data-testid={`button-delete-conversation-${conv.id}`}
                aria-label={`Delete conversation: ${conv.title}`}
              >
                <Trash2 className="h-3 w-3 text-destructive" />
              </button>
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No conversations yet
            </p>
          )}
        </div>
      </ScrollArea>
    </>
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="w-64 border-r bg-muted/30 flex-col hidden md:flex">
        <ConversationList testIdSuffix="-desktop" />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="md:hidden border-b p-2 flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 flex flex-col">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Chat History
                </SheetTitle>
              </SheetHeader>
              <ConversationList testIdSuffix="-mobile" />
            </SheetContent>
          </Sheet>
          <span className="font-medium text-sm">
            {activeConversation?.title || "AI Tutor"}
          </span>
        </div>

        {!activeConversation || activeConversation.messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="max-w-xl w-full text-center space-y-4 sm:space-y-6">
              <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">AI Virtual Tutor</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Hello{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}! I'm your AI
                  tutor. Ask me anything about your studies.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>Powered by advanced AI</span>
              </div>
              <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                {suggestedTopics.map((topic, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-auto p-3 sm:p-4 text-left justify-start hover-elevate text-sm"
                    onClick={() => sendMessage(topic)}
                    data-testid={`suggested-topic-${i}`}
                  >
                    <span className="line-clamp-2">{topic}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 sm:gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-[hsl(var(--ai-purple-light))] text-foreground"
                    )}
                    data-testid={`message-${message.id}`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                      {isStreaming &&
                        message.role === "assistant" &&
                        message.id ===
                          activeConversation.messages[activeConversation.messages.length - 1]
                            .id && (
                          <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
                        )}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                        {user?.fullName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {activeConversation.messages.length > 0 &&
                activeConversation.messages[activeConversation.messages.length - 1].role ===
                  "assistant" &&
                !isStreaming && (
                  <div className="flex flex-wrap gap-2 ml-9 sm:ml-11">
                    {quickActions.map((action, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="h-7 sm:h-8 text-xs"
                        onClick={() => handleQuickAction(action.prompt)}
                        disabled={isLoading}
                        data-testid={`quick-action-${i}`}
                      >
                        <action.icon className="mr-1 h-3 w-3" />
                        <span className="hidden xs:inline">{action.label}</span>
                        <span className="xs:hidden">{action.label.split(" ")[0]}</span>
                      </Button>
                    ))}
                  </div>
                )}
            </div>
          </ScrollArea>
        )}

        <div className="border-t bg-background p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 text-base"
                data-testid="input-chat-message"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                data-testid="button-send-message"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
