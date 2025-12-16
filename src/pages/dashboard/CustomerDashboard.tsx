import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InvestmentInsights } from "@/components/dashboard/InvestmentInsights";
import { RenovationSimulator } from "@/components/dashboard/RenovationSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Calendar,
  Heart,
  MessageSquare,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Eye,
  ArrowRight,
  TrendingUp,
  DollarSign,
  BarChart3,
  Sparkles,
  Users,
  FileText,
} from "lucide-react";

const mockProperties = [
  { id: 1, title: "Modern Apartment", location: "New Cairo", status: "active", type: "purchased" },
  { id: 2, title: "Beach Villa", location: "North Coast", status: "completed", type: "rented" },
];

const mockBookings = [
  {
    id: 1,
    property: "Luxury Penthouse",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: 2,
    property: "Garden Villa",
    date: "Dec 18, 2024",
    time: "2:00 PM",
    status: "completed",
  },
  {
    id: 3,
    property: "City Apartment",
    date: "Dec 15, 2024",
    time: "11:00 AM",
    status: "canceled",
  },
];

const mockSavedProperties = [
  { id: 1, title: "Sunset Villa", price: "$450,000", location: "6th October", image: "/placeholder.svg" },
  { id: 2, title: "Marina Heights", price: "$320,000", location: "Alexandria", image: "/placeholder.svg" },
  { id: 3, title: "Palm Residence", price: "$580,000", location: "New Cairo", image: "/placeholder.svg" },
];

const mockRequests = [
  { id: 1, type: "Interior Design", property: "My Apartment", status: "in_progress" },
  { id: 2, type: "Property Visit", property: "Sunset Villa", status: "pending" },
  { id: 3, type: "Interior Design", property: "Beach House", status: "completed" },
];

const mockPayments = [
  { id: 1, description: "Booking Deposit - Luxury Penthouse", amount: "$2,500", date: "Dec 10, 2024" },
  { id: 2, description: "Design Service - Living Room", amount: "$1,200", date: "Dec 5, 2024" },
];

export const CustomerDashboard = () => {
  return (
    <DashboardLayout
      role="customer"
      userName="Ahmed Hassan"
      userEmail="ahmed@customer.com"
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Ahmed!</h1>
          <p className="text-muted-foreground">Manage your properties and bookings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Home} label="My Properties" value={2} />
          <StatCard icon={Calendar} label="Upcoming Bookings" value={3} variant="gold" />
          <StatCard icon={Heart} label="Saved Properties" value={12} />
          <StatCard icon={MessageSquare} label="Active Requests" value={2} />
        </div>

        {/* Enhancement Actions */}
        <Card className="border-accent/30 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Enhance Your Space
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Get professional design help or AI-powered renovation suggestions for your apartment.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button 
                className="h-auto py-4 flex flex-col items-center gap-2 bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = '/dashboard/customer/designers-marketplace'}
              >
                <Users className="h-6 w-6" />
                <span>Browse Designers</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-accent text-foreground hover:bg-accent/10"
                onClick={() => window.location.href = '/dashboard/customer/submit-design-offer'}
              >
                <FileText className="h-6 w-6" />
                <span>Post Design Request</span>
              </Button>
              <Button 
                className="h-auto py-4 flex flex-col items-center gap-2 gradient-gold text-primary"
                onClick={() => window.location.href = '/dashboard/customer/ai-assistant'}
              >
                <Sparkles className="h-6 w-6" />
                <span>Improve with AI</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Properties */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-accent" />
              My Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Home className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{property.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      property.status === "active"
                        ? "bg-green-500/10 text-green-600 border-green-500/30"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {property.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {property.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              My Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>
              {["upcoming", "completed", "canceled"].map((status) => (
                <TabsContent key={status} value={status} className="space-y-3">
                  {mockBookings
                    .filter((b) => b.status === status)
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">{booking.property}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date} at {booking.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              status === "upcoming"
                                ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                                : status === "completed"
                                ? "bg-green-500/10 text-green-600 border-green-500/30"
                                : "bg-red-500/10 text-red-600 border-red-500/30"
                            }
                          >
                            {status === "upcoming" && <Clock className="h-3 w-3 mr-1" />}
                            {status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {status === "canceled" && <X className="h-3 w-3 mr-1" />}
                            {status}
                          </Badge>
                          {status === "upcoming" && (
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Saved Properties */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              Saved Properties
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-accent">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSavedProperties.map((property) => (
                <div
                  key={property.id}
                  className="border border-border rounded-lg overflow-hidden group hover-gold"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    >
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-foreground">{property.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </p>
                    <p className="text-lg font-bold text-accent mt-2">{property.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Requests */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              My Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">{request.type}</p>
                  <p className="text-sm text-muted-foreground">Property: {request.property}</p>
                </div>
                <Badge
                  className={
                    request.status === "pending"
                      ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                      : request.status === "in_progress"
                      ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                      : "bg-green-500/10 text-green-600 border-green-500/30"
                  }
                >
                  {request.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">{payment.description}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <span className="font-semibold text-foreground">{payment.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Investment Scenarios */}
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Investment Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <Badge className="bg-green-500/10 text-green-600 mb-3">Conservative</Badge>
                <p className="text-2xl font-bold text-foreground">5-7%</p>
                <p className="text-sm text-muted-foreground">Expected annual return</p>
              </div>
              <div className="p-4 bg-card rounded-lg border-2 border-accent">
                <Badge className="bg-accent/10 text-accent mb-3">Balanced</Badge>
                <p className="text-2xl font-bold text-accent">10-15%</p>
                <p className="text-sm text-muted-foreground">Expected annual return</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <Badge className="bg-red-500/10 text-red-600 mb-3">Aggressive</Badge>
                <p className="text-2xl font-bold text-foreground">20-30%</p>
                <p className="text-sm text-muted-foreground">Expected annual return</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Renovation Simulator */}
        <RenovationSimulator />

        {/* Investment Insights */}
        <InvestmentInsights />
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
