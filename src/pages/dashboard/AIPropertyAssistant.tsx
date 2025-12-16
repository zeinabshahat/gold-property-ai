import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  User, 
  Send, 
  Upload, 
  Image, 
  Video, 
  Sparkles, 
  TrendingUp, 
  DollarSign,
  Lightbulb,
  Loader2,
  Mic,
  MicOff,
  Square
} from "lucide-react";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
  suggestions?: Suggestion[];
  isLoading?: boolean;
}

interface Suggestion {
  title: string;
  description: string;
  impact: string;
  costRange: string;
  icon: "renovation" | "value" | "design";
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Hello! I'm your AI Renovation Assistant. 🏠✨\n\nUpload photos, a 360° video, or record a voice message describing your apartment, and I'll suggest renovations that can increase its market value.\n\nYou can also type specific questions about improvements you'd like to make!",
  },
];

const mockSuggestions: Suggestion[] = [
  {
    title: "Kitchen Modernization",
    description: "Upgrade countertops to quartz, add modern cabinet handles, and install under-cabinet lighting.",
    impact: "+8-12% property value",
    costRange: "$3,500 - $7,000",
    icon: "renovation",
  },
  {
    title: "Smart Home Integration",
    description: "Install smart thermostat, lighting controls, and security system for modern appeal.",
    impact: "+3-5% property value",
    costRange: "$1,200 - $2,500",
    icon: "design",
  },
  {
    title: "Bathroom Refresh",
    description: "Update fixtures, add frameless shower door, and install modern vanity.",
    impact: "+5-8% property value",
    costRange: "$2,000 - $4,500",
    icon: "renovation",
  },
];

const AIPropertyAssistant = () => {
  const location = useLocation();
  const isCustomerView = location.pathname.includes("/customer/");
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Based on your description, I've analyzed potential improvements for your property. Here are my top recommendations to maximize your property's value:",
        suggestions: mockSuggestions,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (type: "image" | "video") => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: type === "image" 
        ? "📷 Uploaded property images for analysis"
        : "🎥 Uploaded 360° video tour",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `I've analyzed your ${type === "image" ? "property images" : "360° video tour"}. Here's what I found and my recommendations for value enhancement:`,
        suggestions: mockSuggestions,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 3000);
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      // Stop recording and simulate transcription
      setIsRecording(false);
      
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: `🎤 Voice message (${formatTime(recordingTime)}): "I have a 120 sqm apartment with outdated kitchen and bathroom. Looking for renovation ideas to increase value before selling."`,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "I've transcribed and analyzed your voice description. For a 120 sqm apartment with outdated kitchen and bathroom, here are my strategic renovation recommendations to maximize your sale price:",
          suggestions: mockSuggestions,
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2500);
    } else {
      setIsRecording(true);
    }
  };

  const getIconForSuggestion = (icon: string) => {
    switch (icon) {
      case "renovation":
        return <Sparkles className="h-5 w-5 text-accent" />;
      case "value":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "design":
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <DashboardLayout role={isCustomerView ? "customer" : "owner"} userName={isCustomerView ? "Ahmed Hassan" : "Property Owner"}>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Bot className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">AI Renovation Assistant</h1>
            <p className="text-sm text-muted-foreground">Get smart renovation suggestions to increase property value</p>
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 border-border/50 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "ai" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-accent" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* Suggestions Cards */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-3">
                        {message.suggestions.map((suggestion, index) => (
                          <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-muted">
                                  {getIconForSuggestion(suggestion.icon)}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      {suggestion.impact}
                                    </Badge>
                                    <Badge variant="outline" className="border-accent text-primary">
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      {suggestion.costRange}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            {/* Upload & Voice Options */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload("image")}
                className="text-sm"
              >
                <Image className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload("video")}
                className="text-sm"
              >
                <Video className="h-4 w-4 mr-2" />
                Upload 360° Video
              </Button>
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={handleVoiceRecord}
                className={`text-sm ${isRecording ? "animate-pulse" : ""}`}
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop Recording ({formatTime(recordingTime)})
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Message
                  </>
                )}
              </Button>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="mb-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                <span className="text-sm text-destructive font-medium">
                  Recording... Describe your apartment and renovation goals
                </span>
              </div>
            )}

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Describe your property or ask for specific suggestions..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
                disabled={isRecording}
              />
              <Button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping || isRecording}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIPropertyAssistant;
