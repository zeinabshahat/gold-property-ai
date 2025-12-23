import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InvestmentInsights } from "@/components/dashboard/InvestmentInsights";
import { RenovationSimulator } from "@/components/dashboard/RenovationSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Briefcase,
  CheckCircle,
  Star,
  DollarSign,
  Image,
  Clock,
  Eye,
  Plus,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Globe,
  Edit,
  Award,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockProposals = [
  { id: 1, title: "Modern Villa Interior", client: "Ahmed Hassan", price: "$12,500", status: "pending" },
  { id: 2, title: "Office Space Redesign", client: "Sarah Mohamed", price: "$8,000", status: "accepted" },
  { id: 3, title: "Apartment Renovation", client: "Karim Ali", price: "$5,500", status: "rejected" },
];

const mockProjects = [
  { id: 1, name: "Luxury Penthouse", client: "Omar Khalil", progress: 75, deadline: "Dec 25, 2024" },
  { id: 2, name: "Beach House Design", client: "Layla Ibrahim", progress: 40, deadline: "Jan 10, 2025" },
];

const designerProfile = {
  name: "Nadia El-Sayed",
  title: "Senior Interior Designer",
  avatar: "/placeholder.svg",
  location: "Cairo, Egypt",
  email: "nadia@designer.com",
  phone: "+20 100 123 4567",
  website: "www.nadiadesigns.com",
  bio: "Award-winning interior designer with 8+ years of experience specializing in luxury residential and commercial spaces. Passionate about creating functional, beautiful environments that reflect each client's unique personality.",
  specializations: ["Luxury Residential", "Modern Minimalist", "Commercial Spaces", "Renovation"],
  stats: {
    rating: 4.9,
    reviews: 127,
    projects: 85,
    yearsExperience: 8,
  },
  certifications: ["NCIDQ Certified", "LEED AP", "ASID Member"],
};

const mockPortfolio = [
  { id: 1, title: "Contemporary Living Room", category: "Residential", image: "/placeholder.svg" },
  { id: 2, title: "Minimalist Office", category: "Commercial", image: "/placeholder.svg" },
  { id: 3, title: "Luxury Bedroom Suite", category: "Residential", image: "/placeholder.svg" },
  { id: 4, title: "Restaurant Interior", category: "Hospitality", image: "/placeholder.svg" },
];

export const DesignerDashboard = () => {
  return (
    <DashboardLayout
      role="designer"
      userName="Nadia El-Sayed"
      userEmail="nadia@designer.com"
    >
      <div className="space-y-8">
        {/* Designer Profile Card */}
        <Card className="border-border overflow-hidden">
          <div className="h-24 gradient-navy" />
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Avatar */}
              <div className="-mt-12 lg:-mt-10">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage src={designerProfile.avatar} alt={designerProfile.name} />
                  <AvatarFallback className="text-2xl bg-accent text-accent-foreground">
                    {designerProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-foreground">{designerProfile.name}</h2>
                      <Badge className="bg-accent/10 text-accent border-accent/30">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{designerProfile.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {designerProfile.location}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  {designerProfile.bio}
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {designerProfile.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {designerProfile.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {designerProfile.website}
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2">
                  {designerProfile.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Profile Stats */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{designerProfile.stats.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">({designerProfile.stats.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-accent" />
                    <div>
                      <span className="font-bold text-foreground">{designerProfile.stats.projects}</span>
                      <span className="text-sm text-muted-foreground ml-1">Projects</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    <div>
                      <span className="font-bold text-foreground">{designerProfile.stats.yearsExperience}+</span>
                      <span className="text-sm text-muted-foreground ml-1">Years Experience</span>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {designerProfile.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Nadia!</h1>
          <p className="text-muted-foreground">Here's your design business overview</p>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={FileText} label="Total Proposals" value={24} />
          <StatCard icon={Briefcase} label="Active Projects" value={3} variant="gold" />
          <StatCard icon={CheckCircle} label="Completed" value={18} />
          <StatCard
            icon={Star}
            label="Overall Rating"
            value="4.9"
            trend={{ value: "12 reviews", isPositive: true }}
          />
        </div>

        {/* Wallet Summary */}
        <Card className="gradient-navy text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm opacity-80">Current Balance</p>
                <p className="text-3xl font-bold">$14,850</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-sm opacity-80">Pending</p>
                  <p className="text-xl font-semibold">$3,200</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Withdrawn</p>
                  <p className="text-xl font-semibold">$28,500</p>
                </div>
              </div>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Proposals */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              My Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="space-y-3">
                {mockProposals
                  .filter((p) => p.status === "pending")
                  .map((proposal) => (
                    <div
                      key={proposal.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">{proposal.title}</p>
                        <p className="text-sm text-muted-foreground">Client: {proposal.client}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-accent">{proposal.price}</span>
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="accepted" className="space-y-3">
                {mockProposals
                  .filter((p) => p.status === "accepted")
                  .map((proposal) => (
                    <div
                      key={proposal.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">{proposal.title}</p>
                        <p className="text-sm text-muted-foreground">Client: {proposal.client}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-accent">{proposal.price}</span>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accepted
                        </Badge>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="rejected" className="space-y-3">
                {mockProposals
                  .filter((p) => p.status === "rejected")
                  .map((proposal) => (
                    <div
                      key={proposal.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">{proposal.title}</p>
                        <p className="text-sm text-muted-foreground">Client: {proposal.client}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-muted-foreground line-through">
                          {proposal.price}
                        </span>
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-accent" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProjects.map((project) => (
              <div key={project.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">{project.name}</p>
                    <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                  </div>
                  <Badge variant="outline">{project.deadline}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Portfolio Manager */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-accent" />
              Portfolio Manager
            </CardTitle>
            <Button size="sm" className="gradient-gold text-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-border"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-primary-foreground">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm opacity-80">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Design Impact Section */}
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Design Impact on Property Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Avg. Value Increase</p>
                <p className="text-2xl font-bold text-accent">+28%</p>
              </div>
              <div className="p-4 bg-card rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Properties Improved</p>
                <p className="text-2xl font-bold text-foreground">18</p>
              </div>
              <div className="p-4 bg-card rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Value Added</p>
                <p className="text-2xl font-bold text-green-500">$1.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Insights */}
        <InvestmentInsights />
      </div>
    </DashboardLayout>
  );
};

export default DesignerDashboard;
