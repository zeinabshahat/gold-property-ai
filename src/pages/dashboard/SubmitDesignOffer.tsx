import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, FileText, Clock, DollarSign, User, Calendar, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const openRequests = [
  {
    id: "1",
    title: "Modern Villa Interior Design",
    propertyType: "Villa",
    size: "450 sqm",
    budget: "$15,000 - $25,000",
    style: "Modern & Minimalist",
    timeline: "3 months",
    postedBy: "Ahmed M.",
    postedDate: "2 days ago",
    proposals: 5,
  },
  {
    id: "2",
    title: "Luxury Apartment Renovation",
    propertyType: "Apartment",
    size: "180 sqm",
    budget: "$8,000 - $12,000",
    style: "Contemporary",
    timeline: "2 months",
    postedBy: "Sara K.",
    postedDate: "5 days ago",
    proposals: 8,
  },
  {
    id: "3",
    title: "Office Space Design",
    propertyType: "Commercial",
    size: "300 sqm",
    budget: "$20,000 - $30,000",
    style: "Industrial & Modern",
    timeline: "4 months",
    postedBy: "Tech Corp",
    postedDate: "1 week ago",
    proposals: 12,
  },
];

const SubmitDesignOffer = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    propertyType: "",
    propertySize: "",
    budgetMin: "",
    budgetMax: "",
    designStyle: "",
    timeline: "",
    description: "",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => file.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Design Request Submitted!",
      description: "Designers will review your request and submit their proposals.",
    });
  };

  return (
    <DashboardLayout role="owner" userName="Property Owner">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Design Requests</h1>
          <p className="text-muted-foreground mt-1">Post a design request and receive offers from talented designers</p>
        </div>

        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="submit">Submit Request</TabsTrigger>
            <TabsTrigger value="browse">Browse Requests</TabsTrigger>
          </TabsList>

          {/* Submit Request Tab */}
          <TabsContent value="submit" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Submit a Design Request
                </CardTitle>
                <CardDescription>
                  Fill in the details below and designers will submit their proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Property Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                          <SelectItem value="commercial">Commercial Space</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="propertySize">Property Size (sqm)</Label>
                      <Input
                        id="propertySize"
                        type="number"
                        placeholder="e.g., 150"
                        value={formData.propertySize}
                        onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-2">
                    <Label>Budget Range ($)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Min"
                          className="pl-9"
                          value={formData.budgetMin}
                          onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Max"
                          className="pl-9"
                          value={formData.budgetMax}
                          onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Design Style & Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Design Style</Label>
                      <Select
                        value={formData.designStyle}
                        onValueChange={(value) => setFormData({ ...formData, designStyle: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="scandinavian">Scandinavian</SelectItem>
                          <SelectItem value="contemporary">Contemporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timeline</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="2-months">2 Months</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="4-months">4+ Months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your vision, requirements, and any specific needs..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>Upload Images or Floor Plans</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium">Drop files here or click to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports: JPG, PNG, PDF (Max 10MB each)
                        </p>
                      </label>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {uploadedFiles.map((file, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <Image className="h-3 w-3" />
                            {file}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-[#001C38] hover:bg-[#001C38]/90 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Post Design Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Browse Requests Tab (Designer View Concept) */}
          <TabsContent value="browse" className="mt-6">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Designer View:</span> Browse open design requests and submit your proposals
              </p>
            </div>
            <div className="grid gap-4">
              {openRequests.map((request) => (
                <Card key={request.id} className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg text-foreground">{request.title}</h3>
                          <Badge className="bg-[#DCC288]/20 text-[#001C38] border border-[#DCC288]">
                            {request.proposals} proposals
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-primary" />
                            <span>{request.propertyType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Image className="h-4 w-4 text-primary" />
                            <span>{request.size}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span>{request.budget}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{request.timeline}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{request.postedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{request.postedDate}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="bg-[#001C38] hover:bg-[#001C38]/90 text-white whitespace-nowrap">
                        Submit Proposal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SubmitDesignOffer;
