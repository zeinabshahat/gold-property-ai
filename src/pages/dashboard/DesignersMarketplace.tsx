import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, Filter, MessageCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const designers = [
  {
    id: "1",
    name: "Sarah Mitchell",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    specialization: "Modern & Minimalist",
    bio: "Award-winning interior designer with 10+ years of experience in luxury residential projects.",
    rating: 4.9,
    reviews: 128,
    projects: 85,
    priceRange: "$$$",
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    specialization: "Classic & Traditional",
    bio: "Specializing in elegant traditional designs with a modern touch for Middle Eastern homes.",
    rating: 4.8,
    reviews: 96,
    projects: 62,
    priceRange: "$$",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    specialization: "Luxury & Contemporary",
    bio: "Creating bespoke luxury interiors for high-end properties and penthouses.",
    rating: 5.0,
    reviews: 74,
    projects: 45,
    priceRange: "$$$$",
  },
  {
    id: "4",
    name: "Omar Khalil",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    specialization: "Industrial & Urban",
    bio: "Expert in converting spaces into stylish urban lofts with industrial aesthetics.",
    rating: 4.7,
    reviews: 58,
    projects: 38,
    priceRange: "$$",
  },
  {
    id: "5",
    name: "Layla Mansour",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    specialization: "Scandinavian & Cozy",
    bio: "Bringing warmth and functionality with Scandinavian-inspired interior designs.",
    rating: 4.9,
    reviews: 112,
    projects: 78,
    priceRange: "$$$",
  },
  {
    id: "6",
    name: "James Chen",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    specialization: "Asian Fusion",
    bio: "Blending Eastern aesthetics with Western functionality for unique living spaces.",
    rating: 4.6,
    reviews: 45,
    projects: 29,
    priceRange: "$$",
  },
];

const DesignersMarketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [styleFilter, setStyleFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");

  const filteredDesigners = designers.filter((designer) => {
    const matchesSearch = designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = styleFilter === "all" || designer.specialization.toLowerCase().includes(styleFilter.toLowerCase());
    const matchesBudget = budgetFilter === "all" || designer.priceRange === budgetFilter;
    return matchesSearch && matchesStyle && matchesBudget;
  });

  return (
    <DashboardLayout role="owner" userName="Property Owner">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Designers Marketplace</h1>
            <p className="text-muted-foreground mt-1">Find and hire talented interior designers for your property</p>
          </div>
          <Button 
            onClick={() => navigate("/dashboard/owner/submit-design-offer")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Post a Design Request
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search designers by name or style..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={styleFilter} onValueChange={setStyleFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="$">$ - Budget</SelectItem>
                    <SelectItem value="$$">$$ - Moderate</SelectItem>
                    <SelectItem value="$$$">$$$ - Premium</SelectItem>
                    <SelectItem value="$$$$">$$$$ - Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.map((designer) => (
            <Card key={designer.id} className="border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/30 overflow-hidden group">
              <CardContent className="p-0">
                {/* Designer Header */}
                <div className="relative h-32 bg-gradient-to-br from-[#001C38] to-[#001C38]/80">
                  <div className="absolute -bottom-10 left-4">
                    <img
                      src={designer.image}
                      alt={designer.name}
                      className="w-20 h-20 rounded-full border-4 border-background object-cover"
                    />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-[#DCC288] text-[#001C38] hover:bg-[#DCC288]/90">
                    {designer.priceRange}
                  </Badge>
                </div>

                {/* Designer Info */}
                <div className="pt-12 px-4 pb-4">
                  <h3 className="font-semibold text-lg text-foreground">{designer.name}</h3>
                  <p className="text-sm text-primary font-medium">{designer.specialization}</p>
                  
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{designer.bio}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#DCC288] text-[#DCC288]" />
                      <span className="font-medium">{designer.rating}</span>
                      <span className="text-muted-foreground">({designer.reviews})</span>
                    </div>
                    <div className="text-muted-foreground">
                      {designer.projects} projects
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/profile/designer/${designer.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-[#001C38] hover:bg-[#001C38]/90 text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDesigners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No designers found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DesignersMarketplace;
