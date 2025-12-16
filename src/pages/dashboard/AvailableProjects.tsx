import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Palette,
  Home,
  Search,
  Filter,
  Clock,
  Eye,
  ArrowRight,
} from "lucide-react";

const mockProjects = [
  {
    id: 1,
    title: "Modern Apartment Renovation",
    propertyType: "Apartment",
    size: "150 sqm",
    budget: "$10,000 - $15,000",
    style: "Modern",
    deadline: "Jan 15, 2025",
    location: "New Cairo",
    description: "Looking for a complete interior redesign of a 3-bedroom apartment with focus on open-plan living.",
    postedDate: "2 days ago",
    proposals: 5,
  },
  {
    id: 2,
    title: "Luxury Villa Interior Design",
    propertyType: "Villa",
    size: "400 sqm",
    budget: "$50,000 - $80,000",
    style: "Luxury",
    deadline: "Feb 1, 2025",
    location: "6th October",
    description: "Complete interior design for a new villa including furniture selection and custom pieces.",
    postedDate: "1 day ago",
    proposals: 8,
  },
  {
    id: 3,
    title: "Office Space Redesign",
    propertyType: "Commercial",
    size: "200 sqm",
    budget: "$15,000 - $25,000",
    style: "Minimalist",
    deadline: "Jan 20, 2025",
    location: "Downtown Cairo",
    description: "Open-plan office redesign for a tech startup, focusing on collaborative spaces and modern aesthetics.",
    postedDate: "3 days ago",
    proposals: 3,
  },
  {
    id: 4,
    title: "Classic Bedroom Suite",
    propertyType: "Apartment",
    size: "45 sqm",
    budget: "$5,000 - $8,000",
    style: "Classic",
    deadline: "Jan 10, 2025",
    location: "Maadi",
    description: "Master bedroom and ensuite bathroom renovation with classic Egyptian-inspired design elements.",
    postedDate: "5 days ago",
    proposals: 12,
  },
  {
    id: 5,
    title: "Restaurant Interior Concept",
    propertyType: "Commercial",
    size: "180 sqm",
    budget: "$30,000 - $45,000",
    style: "Industrial",
    deadline: "Feb 15, 2025",
    location: "Zamalek",
    description: "Industrial-style restaurant interior with exposed brick, metal fixtures, and cozy dining areas.",
    postedDate: "1 week ago",
    proposals: 6,
  },
];

const AvailableProjects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [styleFilter, setStyleFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = budgetFilter === "all" || 
      (budgetFilter === "low" && project.budget.includes("5,000")) ||
      (budgetFilter === "medium" && (project.budget.includes("10,000") || project.budget.includes("15,000"))) ||
      (budgetFilter === "high" && (project.budget.includes("30,000") || project.budget.includes("50,000")));
    const matchesStyle = styleFilter === "all" || project.style.toLowerCase() === styleFilter;
    const matchesProperty = propertyFilter === "all" || project.propertyType.toLowerCase() === propertyFilter;
    
    return matchesSearch && matchesBudget && matchesStyle && matchesProperty;
  });

  return (
    <DashboardLayout
      role="designer"
      userName="Nadia El-Sayed"
      userEmail="nadia@designer.com"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Available Projects</h1>
            <p className="text-muted-foreground">Browse and apply to design projects from property owners</p>
          </div>
          <Badge className="bg-accent/10 text-accent border-accent/30 w-fit">
            {mockProjects.length} Active Projects
          </Badge>
        </div>

        {/* Filters */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="low">Under $10K</SelectItem>
                  <SelectItem value="medium">$10K - $30K</SelectItem>
                  <SelectItem value="high">Above $30K</SelectItem>
                </SelectContent>
              </Select>
              <Select value={styleFilter} onValueChange={setStyleFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <Palette className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Styles</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="border-border hover:shadow-lg transition-shadow group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                      <span className="text-muted-foreground/50">•</span>
                      <Clock className="h-3 w-3" />
                      {project.postedDate}
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary">
                    {project.proposals} proposals
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded bg-muted">
                      <Home className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Property</p>
                      <p className="font-medium text-foreground">{project.propertyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded bg-muted">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Size</p>
                      <p className="font-medium text-foreground">{project.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded bg-muted">
                      <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Style</p>
                      <p className="font-medium text-foreground">{project.style}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded bg-muted">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Deadline</p>
                      <p className="font-medium text-foreground">{project.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Budget & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-lg font-bold text-accent">{project.budget}</p>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate(`/dashboard/designer/project/${project.id}`)}
                  >
                    View Project
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="border-border">
            <CardContent className="p-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more projects</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AvailableProjects;
