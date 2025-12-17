import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calculator, 
  Hammer, 
  TrendingUp, 
  Home, 
  Upload, 
  Target,
  Lightbulb,
  Wrench,
  Palette,
  ArrowRight,
  ArrowLeft,
  Image,
  Video,
  FileImage,
  CheckCircle,
  Zap,
  Droplets,
  Sofa,
  UtensilsCrossed,
  Bath,
  Layers,
  PaintBucket,
  LayoutGrid,
  Sparkles,
  Users,
  MessageSquare,
  Bot,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step = 'start' | 'details' | 'media' | 'goals' | 'results' | 'actions';

interface UploadedMedia {
  type: 'image' | 'video' | 'floorplan';
  name: string;
  preview: string;
}

export const RenovationSimulator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('start');
  
  // Apartment Details
  const [apartmentSize, setApartmentSize] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [condition, setCondition] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  
  // Media
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  
  // Goals & Budget
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState("");
  const [timeline, setTimeline] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const steps: { key: Step; label: string; icon: React.ElementType }[] = [
    { key: 'start', label: 'Start', icon: Calculator },
    { key: 'details', label: 'Details', icon: Home },
    { key: 'media', label: 'Media', icon: Upload },
    { key: 'goals', label: 'Goals', icon: Target },
    { key: 'results', label: 'Results', icon: Lightbulb },
    { key: 'actions', label: 'Actions', icon: ArrowRight },
  ];

  const renovationGoals = [
    { id: 'increase-value', label: 'Increase Property Value', icon: TrendingUp },
    { id: 'modernize', label: 'Modernize & Update', icon: Sparkles },
    { id: 'optimize-space', label: 'Optimize Space', icon: LayoutGrid },
    { id: 'energy-efficiency', label: 'Improve Energy Efficiency', icon: Zap },
    { id: 'rental-ready', label: 'Prepare for Rental', icon: Users },
    { id: 'personal-use', label: 'Personal Comfort', icon: Sofa },
  ];

  const handleFileUpload = (type: 'image' | 'video' | 'floorplan') => {
    // Simulate file upload
    const mockFiles: Record<string, UploadedMedia> = {
      image: { type: 'image', name: 'living_room.jpg', preview: '/placeholder.svg' },
      video: { type: 'video', name: '360_tour.mp4', preview: '/placeholder.svg' },
      floorplan: { type: 'floorplan', name: 'floor_plan.pdf', preview: '/placeholder.svg' },
    };
    setUploadedMedia([...uploadedMedia, mockFiles[type]]);
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(uploadedMedia.filter((_, i) => i !== index));
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const getStepIndex = (step: Step) => steps.findIndex(s => s.key === step);

  const nextStep = () => {
    const currentIndex = getStepIndex(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].key);
    }
  };

  const prevStep = () => {
    const currentIndex = getStepIndex(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key);
    }
  };

  // Simulated recommendations based on inputs
  const technicalRecommendations = [
    { 
      icon: Droplets, 
      title: "Plumbing Review", 
      description: "Plumbing upgrade is recommended to support modern fixtures and improve water efficiency.",
      priority: "high"
    },
    { 
      icon: Zap, 
      title: "Electrical System Review", 
      description: "Electrical system review is recommended to support modern lighting and appliances.",
      priority: "high"
    },
    { 
      icon: Lightbulb, 
      title: "Lighting Optimization", 
      description: "LED lighting installation is recommended to reduce energy costs and improve ambiance.",
      priority: "medium"
    },
    { 
      icon: Layers, 
      title: "Flooring Assessment", 
      description: "Flooring replacement or refinishing is recommended based on current condition.",
      priority: "medium"
    },
  ];

  const functionalRecommendations = [
    { 
      icon: UtensilsCrossed, 
      title: "Kitchen Remodeling", 
      description: "Kitchen modernization is recommended to increase property value and functionality. Plumbing improvements may be required before renovation.",
      priority: "high"
    },
    { 
      icon: Bath, 
      title: "Bathroom Upgrade", 
      description: "Bathroom renovation is recommended to improve comfort and add value.",
      priority: "high"
    },
    { 
      icon: LayoutGrid, 
      title: "Storage Optimization", 
      description: "Built-in storage solutions are recommended to maximize available space.",
      priority: "medium"
    },
    { 
      icon: Home, 
      title: "Space Reconfiguration", 
      description: "Open floor plan consideration is recommended to create a more modern living experience.",
      priority: "low"
    },
  ];

  const designRecommendations = [
    { 
      icon: PaintBucket, 
      title: "Color Palette Suggestions", 
      description: "Neutral color palette with accent walls is recommended to appeal to a broader audience.",
      priority: "medium"
    },
    { 
      icon: Sofa, 
      title: "Furniture Layout", 
      description: "Furniture arrangement optimization is recommended to improve flow and functionality.",
      priority: "low"
    },
    { 
      icon: Sparkles, 
      title: "Decoration Style", 
      description: "Modern minimalist style is recommended based on current market trends.",
      priority: "low"
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/30">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-accent/10 text-accent border-accent/30">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  // Render different steps
  const renderStartScreen = () => (
    <div className="text-center space-y-8 py-12">
      <div className="mx-auto w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
        <Calculator className="h-12 w-12 text-accent" />
      </div>
      
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">
          Renovation & Development Simulator
        </h1>
        <p className="text-lg text-muted-foreground">
          Get personalized recommendations to improve your property's value. 
          Our simulator evaluates your apartment's condition and suggests 
          improvements tailored to your goals and budget.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="border-border text-left">
          <CardContent className="pt-6">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
              <Wrench className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Technical Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Plumbing, electrical, and structural recommendations.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border text-left">
          <CardContent className="pt-6">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
              <Home className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Functional Improvements</h3>
            <p className="text-sm text-muted-foreground">
              Kitchen, bathroom, and space optimization suggestions.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border text-left">
          <CardContent className="pt-6">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
              <Palette className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Design & Aesthetics</h3>
            <p className="text-sm text-muted-foreground">
              Color palettes, furniture layout, and decoration style.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          Note: This simulator provides advisory recommendations only. 
          We connect you with professional Interior Designers for implementation.
        </p>
        <Button 
          onClick={nextStep}
          size="lg"
          className="gradient-gold text-primary hover:opacity-90"
        >
          Start Simulation
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderDetailsScreen = () => (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Apartment Details</h2>
        <p className="text-muted-foreground">
          Tell us about your property to receive accurate recommendations.
        </p>
      </div>

      <Card className="border-border">
        <CardContent className="pt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-muted">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size (sqm)</Label>
              <Input
                id="size"
                type="number"
                value={apartmentSize}
                onChange={(e) => setApartmentSize(e.target.value)}
                placeholder="e.g., 120"
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms">Number of Rooms</Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger className="bg-muted">
                  <SelectValue placeholder="Select rooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Room</SelectItem>
                  <SelectItem value="2">2 Rooms</SelectItem>
                  <SelectItem value="3">3 Rooms</SelectItem>
                  <SelectItem value="4">4 Rooms</SelectItem>
                  <SelectItem value="5+">5+ Rooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Number of Bathrooms</Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger className="bg-muted">
                  <SelectValue placeholder="Select bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bathroom</SelectItem>
                  <SelectItem value="2">2 Bathrooms</SelectItem>
                  <SelectItem value="3">3 Bathrooms</SelectItem>
                  <SelectItem value="4+">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Current Condition</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="bg-muted">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New / Recently Renovated</SelectItem>
                  <SelectItem value="good">Good Condition</SelectItem>
                  <SelectItem value="fair">Fair - Needs Minor Updates</SelectItem>
                  <SelectItem value="poor">Poor - Needs Major Renovation</SelectItem>
                  <SelectItem value="shell">Shell / Unfinished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built (Optional)</Label>
              <Input
                id="yearBuilt"
                type="number"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(e.target.value)}
                placeholder="e.g., 2010"
                className="bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="gradient-gold text-primary hover:opacity-90"
          disabled={!apartmentSize || !rooms || !condition || !propertyType}
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderMediaScreen = () => (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Upload Media</h2>
        <p className="text-muted-foreground">
          Upload photos, 360° videos, or floor plans for better recommendations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card 
          className="border-border border-dashed cursor-pointer hover:border-accent/50 transition-colors"
          onClick={() => handleFileUpload('image')}
        >
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Image className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Property Images</h3>
            <p className="text-sm text-muted-foreground">
              Upload photos of rooms
            </p>
            <Button variant="outline" className="mt-4" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border-border border-dashed cursor-pointer hover:border-accent/50 transition-colors"
          onClick={() => handleFileUpload('video')}
        >
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Video className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-medium text-foreground mb-1">360° Video</h3>
            <p className="text-sm text-muted-foreground">
              Upload virtual tour
            </p>
            <Button variant="outline" className="mt-4" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border-border border-dashed cursor-pointer hover:border-accent/50 transition-colors"
          onClick={() => handleFileUpload('floorplan')}
        >
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <FileImage className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Floor Plans</h3>
            <p className="text-sm text-muted-foreground">
              Upload layout drawings
            </p>
            <Button variant="outline" className="mt-4" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Plans
            </Button>
          </CardContent>
        </Card>
      </div>

      {uploadedMedia.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedMedia.map((media, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    {media.type === 'image' && <Image className="h-8 w-8 text-muted-foreground" />}
                    {media.type === 'video' && <Video className="h-8 w-8 text-muted-foreground" />}
                    {media.type === 'floorplan' && <FileImage className="h-8 w-8 text-muted-foreground" />}
                  </div>
                  <button
                    onClick={() => removeMedia(index)}
                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{media.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="gradient-gold text-primary hover:opacity-90"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderGoalsScreen = () => (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Renovation Goals & Budget</h2>
        <p className="text-muted-foreground">
          Select your renovation goals and set your budget range.
        </p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Renovation Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {renovationGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedGoals.includes(goal.id)
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedGoals.includes(goal.id) ? 'bg-accent/20' : 'bg-muted'
                  }`}>
                    <goal.icon className={`h-5 w-5 ${
                      selectedGoals.includes(goal.id) ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <span className={`font-medium ${
                    selectedGoals.includes(goal.id) ? 'text-accent' : 'text-foreground'
                  }`}>
                    {goal.label}
                  </span>
                  {selectedGoals.includes(goal.id) && (
                    <CheckCircle className="h-5 w-5 text-accent ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardContent className="pt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Budget Range</Label>
              <Select value={budgetRange} onValueChange={setBudgetRange}>
                <SelectTrigger className="bg-muted">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10k">Under $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="over-100k">Over $100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timeline</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger className="bg-muted">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">As Soon As Possible</SelectItem>
                  <SelectItem value="1-3-months">1-3 Months</SelectItem>
                  <SelectItem value="3-6-months">3-6 Months</SelectItem>
                  <SelectItem value="6-12-months">6-12 Months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any specific requirements, preferences, or concerns..."
              className="bg-muted min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="gradient-gold text-primary hover:opacity-90"
          disabled={selectedGoals.length === 0 || !budgetRange}
        >
          Generate Recommendations
          <Lightbulb className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderResultsScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Renovation Recommendations</h2>
        <p className="text-muted-foreground">
          Based on your {apartmentSize}sqm {propertyType} in {condition} condition
        </p>
      </div>

      {/* Technical Improvements */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Wrench className="h-5 w-5 text-red-500" />
            </div>
            Technical Improvements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {technicalRecommendations.map((rec, index) => (
            <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="p-2 bg-background rounded-lg h-fit">
                <rec.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                  {getPriorityBadge(rec.priority)}
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Functional Enhancements */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Home className="h-5 w-5 text-accent" />
            </div>
            Functional Enhancements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {functionalRecommendations.map((rec, index) => (
            <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="p-2 bg-background rounded-lg h-fit">
                <rec.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                  {getPriorityBadge(rec.priority)}
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Design & Aesthetics */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Palette className="h-5 w-5 text-purple-500" />
            </div>
            Design & Aesthetics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {designRecommendations.map((rec, index) => (
            <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
              <div className="p-2 bg-background rounded-lg h-fit">
                <rec.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                  {getPriorityBadge(rec.priority)}
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Estimated Value Increase</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based on the recommendations above, implementing all suggested improvements 
                could potentially increase your property value by 15-35%.
              </p>
              <p className="text-xs text-muted-foreground italic">
                * This is an advisory estimate only. Actual results may vary based on market conditions and implementation quality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Modify Inputs
        </Button>
        <Button 
          onClick={nextStep}
          className="gradient-gold text-primary hover:opacity-90"
        >
          Choose Next Steps
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderActionsScreen = () => (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">What Would You Like to Do Next?</h2>
        <p className="text-muted-foreground">
          Choose how you want to proceed with your renovation project.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card 
          className="border-border hover:border-accent/50 cursor-pointer transition-all group"
          onClick={() => navigate('/dashboard/designers-marketplace')}
        >
          <CardContent className="pt-8 pb-8 text-center">
            <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <Users className="h-10 w-10 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Hire a Designer</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Browse our marketplace of professional interior designers to implement your renovation.
            </p>
            <Button className="gradient-gold text-primary hover:opacity-90 w-full">
              Browse Designers
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border-border hover:border-accent/50 cursor-pointer transition-all group"
          onClick={() => navigate('/dashboard/submit-design-offer')}
        >
          <CardContent className="pt-8 pb-8 text-center">
            <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <MessageSquare className="h-10 w-10 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Post a Design Request</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Submit your project requirements and receive offers from interested designers.
            </p>
            <Button className="gradient-navy text-primary-foreground hover:opacity-90 w-full">
              Post Request
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border-border hover:border-accent/50 cursor-pointer transition-all group"
          onClick={() => navigate('/dashboard/ai-assistant')}
        >
          <CardContent className="pt-8 pb-8 text-center">
            <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <Bot className="h-10 w-10 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Continue with AI</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get more detailed AI-powered suggestions and explore renovation options further.
            </p>
            <Button variant="outline" className="w-full">
              Open AI Assistant
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Button variant="ghost" onClick={() => setCurrentStep('results')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'start':
        return renderStartScreen();
      case 'details':
        return renderDetailsScreen();
      case 'media':
        return renderMediaScreen();
      case 'goals':
        return renderGoalsScreen();
      case 'results':
        return renderResultsScreen();
      case 'actions':
        return renderActionsScreen();
      default:
        return renderStartScreen();
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps - Hidden on start and actions screens */}
      {currentStep !== 'start' && currentStep !== 'actions' && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.slice(1, -1).map((step, index) => {
            const isActive = step.key === currentStep;
            const isPast = getStepIndex(currentStep) > index + 1;
            
            return (
              <div key={step.key} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-accent text-primary'
                      : isPast
                      ? 'bg-accent/20 text-accent'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                </div>
                {index < steps.length - 3 && (
                  <div className={`w-8 h-0.5 mx-1 ${
                    isPast ? 'bg-accent' : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {renderCurrentStep()}
    </div>
  );
};
