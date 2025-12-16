import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InvestmentInsights } from "@/components/dashboard/InvestmentInsights";
import { RenovationSimulator } from "@/components/dashboard/RenovationSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  Wallet,
  Star,
  MapPin,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  X,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Palette,
  FileText,
  Bot,
} from "lucide-react";

const mockListings = [
  { id: 1, title: "Luxury Villa", location: "New Cairo", price: "$850,000", status: "active" },
  { id: 2, title: "Modern Apartment", location: "Maadi", price: "$2,500/mo", status: "rented" },
  { id: 3, title: "Commercial Space", location: "Nasr City", price: "$450,000", status: "sold" },
];

const mockBookings = [
  { id: 1, property: "Luxury Villa", client: "Ahmed Hassan", date: "Dec 20, 2024", status: "pending" },
  { id: 2, property: "Modern Apartment", client: "Sara Mohamed", date: "Dec 18, 2024", status: "accepted" },
  { id: 3, property: "Luxury Villa", client: "Karim Ali", date: "Dec 15, 2024", status: "completed" },
  { id: 4, property: "Commercial Space", client: "Omar Khalil", date: "Dec 12, 2024", status: "canceled" },
];

const mockTenants = [
  { id: 1, name: "Layla Ibrahim", property: "Modern Apartment", status: "active", since: "Jan 2024" },
  { id: 2, name: "Mohamed Samir", property: "Beach House", status: "ending_soon", since: "Mar 2023" },
];

const mockReviews = [
  { id: 1, client: "Ahmed Hassan", rating: 5, comment: "Excellent property! Well maintained.", date: "Dec 10, 2024" },
  { id: 2, client: "Sara Mohamed", rating: 4, comment: "Great location, responsive owner.", date: "Dec 5, 2024" },
];

export const OwnerDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout
      role="owner"
      userName="Mohamed Khalil"
      userEmail="mohamed@owner.com"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Mohamed!</h1>
            <p className="text-muted-foreground">Manage your property portfolio</p>
          </div>
          <Button className="gradient-gold text-primary" onClick={() => navigate("/add-property")}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </div>

        {/* Property Enhancement Actions */}
        <Card className="border-border bg-gradient-to-r from-[#001C38]/5 to-[#DCC288]/10">
          <CardHeader>
            <CardTitle className="text-lg">Enhance Your Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-[#DCC288] hover:bg-[#DCC288]/10"
                onClick={() => navigate("/dashboard/owner/designers-marketplace")}
              >
                <Palette className="h-6 w-6 text-[#DCC288]" />
                <span className="font-medium">Hire a Designer</span>
                <span className="text-xs text-muted-foreground">Browse marketplace</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-[#DCC288] hover:bg-[#DCC288]/10"
                onClick={() => navigate("/dashboard/owner/submit-design-offer")}
              >
                <FileText className="h-6 w-6 text-[#DCC288]" />
                <span className="font-medium">Post Design Request</span>
                <span className="text-xs text-muted-foreground">Get proposals</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2 hover:border-[#DCC288] hover:bg-[#DCC288]/10"
                onClick={() => navigate("/dashboard/owner/ai-assistant")}
              >
                <Bot className="h-6 w-6 text-[#DCC288]" />
                <span className="font-medium">Improve with AI</span>
                <span className="text-xs text-muted-foreground">Smart suggestions</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Home} label="Total Listings" value={8} />
          <StatCard
            icon={Calendar}
            label="Active Bookings"
            value={5}
            variant="gold"
            trend={{ value: "+2 this week", isPositive: true }}
          />
          <StatCard
            icon={Wallet}
            label="Total Earnings"
            value="$124,500"
            trend={{ value: "+12% this month", isPositive: true }}
          />
          <StatCard icon={Star} label="Overall Rating" value="4.8" />
        </div>

        {/* Earnings Summary */}
        <Card className="gradient-navy text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-sm opacity-80">This Month's Earnings</p>
                <p className="text-3xl font-bold">$18,450</p>
                <p className="text-sm opacity-80 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-4 w-4" />
                  +15% from last month
                </p>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-sm opacity-80">Rental Income</p>
                  <p className="text-xl font-semibold">$12,500</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Sales</p>
                  <p className="text-xl font-semibold">$5,950</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Pending</p>
                  <p className="text-xl font-semibold">$3,200</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Listings */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-accent" />
              My Listings
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-accent">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Home className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{listing.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {listing.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-accent">{listing.price}</span>
                  <Badge
                    className={
                      listing.status === "active"
                        ? "bg-green-500/10 text-green-600 border-green-500/30"
                        : listing.status === "rented"
                        ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                        : "bg-purple-500/10 text-purple-600 border-purple-500/30"
                    }
                  >
                    {listing.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bookings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>
              {["pending", "accepted", "completed", "canceled"].map((status) => (
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
                            Client: {booking.client} • {booking.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              status === "pending"
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                : status === "accepted"
                                ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                                : status === "completed"
                                ? "bg-green-500/10 text-green-600 border-green-500/30"
                                : "bg-red-500/10 text-red-600 border-red-500/30"
                            }
                          >
                            {status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                            {status === "accepted" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {status === "canceled" && <X className="h-3 w-3 mr-1" />}
                            {status}
                          </Badge>
                          {status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" className="gradient-gold text-primary">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline">
                                Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Tenants / Buyers */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Tenants / Buyers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {tenant.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{tenant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Property: {tenant.property} • Since {tenant.since}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    tenant.status === "active"
                      ? "bg-green-500/10 text-green-600 border-green-500/30"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/30"
                  }
                >
                  {tenant.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              Recent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{review.client}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-accent fill-accent" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Investment Recommendations */}
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Investment Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-500/10 rounded-lg text-center border border-green-500/30">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-green-600">Buy</p>
                <p className="text-xs text-muted-foreground mt-1">Market is favorable</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg text-center border border-blue-500/30">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-blue-600">Hold</p>
                <p className="text-xs text-muted-foreground mt-1">Wait for appreciation</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg text-center border border-accent/30">
                <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-semibold text-accent">Renovate</p>
                <p className="text-xs text-muted-foreground mt-1">Increase value</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg text-center border border-purple-500/30">
                <ArrowUpRight className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-purple-600">Sell</p>
                <p className="text-xs text-muted-foreground mt-1">Optimal timing</p>
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

export default OwnerDashboard;
