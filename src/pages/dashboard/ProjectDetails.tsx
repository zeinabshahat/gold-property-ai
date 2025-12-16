import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Palette,
  Home,
  Clock,
  User,
  FileText,
  Image,
  Upload,
  Send,
  CheckCircle,
  Briefcase,
} from "lucide-react";

// Mock project data - in real app would come from API
const mockProjectDetails = {
  id: 1,
  title: "Modern Apartment Renovation",
  propertyType: "Apartment",
  size: "150 sqm",
  budget: "$10,000 - $15,000",
  style: "Modern",
  deadline: "Jan 15, 2025",
  location: "New Cairo, Egypt",
  description: "Looking for a complete interior redesign of a 3-bedroom apartment with focus on open-plan living. The apartment is newly purchased and needs complete renovation from scratch.",
  requirements: [
    "Open-plan living and dining area design",
    "Modern kitchen with island",
    "3 bedrooms including master suite",
    "2 bathrooms renovation",
    "Balcony integration with living space",
    "Smart home integration suggestions",
  ],
  clientName: "Ahmed Hassan",
  postedDate: "Dec 12, 2024",
  proposals: 5,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  floorPlan: "/placeholder.svg",
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [proposedPrice, setProposedPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOffer = () => {
    if (!proposedPrice || !deliveryTime || !proposalDescription) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Offer Submitted Successfully!",
        description: "The client will review your proposal and get back to you.",
      });
      navigate("/dashboard/designer/available-projects");
    }, 1500);
  };

  return (
    <DashboardLayout
      role="designer"
      userName="Nadia El-Sayed"
      userEmail="nadia@designer.com"
    >
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/designer/available-projects")}
            className="w-fit"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{mockProjectDetails.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {mockProjectDetails.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {mockProjectDetails.postedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {mockProjectDetails.clientName}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-accent/10 text-accent border-accent/30">
                    {mockProjectDetails.proposals} proposals
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockProjectDetails.description}</p>
              </CardContent>
            </Card>

            {/* Project Details Grid */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-accent" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="p-2 rounded-lg bg-background">
                      <Home className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Property Type</p>
                      <p className="font-semibold text-foreground">{mockProjectDetails.propertyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="p-2 rounded-lg bg-background">
                      <Briefcase className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Size</p>
                      <p className="font-semibold text-foreground">{mockProjectDetails.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="p-2 rounded-lg bg-background">
                      <Palette className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Preferred Style</p>
                      <p className="font-semibold text-foreground">{mockProjectDetails.style}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="p-2 rounded-lg bg-background">
                      <Calendar className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="font-semibold text-foreground">{mockProjectDetails.deadline}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Requirements */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-accent" />
                  Client Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockProjectDetails.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Uploaded Images */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Image className="h-5 w-5 text-accent" />
                  Property Images & Floor Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockProjectDetails.images.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden border border-border bg-muted"
                    >
                      <img
                        src={img}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-dashed border-accent/50 bg-accent/5 flex items-center justify-center">
                    <div className="text-center p-4">
                      <FileText className="h-8 w-8 mx-auto text-accent mb-2" />
                      <p className="text-xs text-muted-foreground">Floor Plan</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Submit Offer */}
          <div className="space-y-6">
            {/* Budget Card */}
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Project Budget</p>
                  <p className="text-2xl font-bold text-accent">{mockProjectDetails.budget}</p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Offer Form */}
            <Card className="border-border sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-accent" />
                  Submit Your Offer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Proposed Price *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      placeholder="12,000"
                      value={proposedPrice}
                      onChange={(e) => setProposedPrice(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery">Delivery Duration *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="delivery"
                      placeholder="e.g., 4 weeks"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proposal">Proposal Description *</Label>
                  <Textarea
                    id="proposal"
                    placeholder="Describe your approach, experience with similar projects, and what makes you the right designer for this project..."
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    rows={5}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Upload portfolio samples or PDFs
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                  onClick={handleSubmitOffer}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Offer
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
