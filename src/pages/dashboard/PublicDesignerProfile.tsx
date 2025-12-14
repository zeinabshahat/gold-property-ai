import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Star,
  CheckCircle,
  MapPin,
  MessageSquare,
  Share2,
  Heart,
  Briefcase,
  Palette,
  Award,
} from "lucide-react";

const mockPortfolio = [
  { id: 1, title: "Contemporary Living Room", category: "Residential", image: "/placeholder.svg" },
  { id: 2, title: "Minimalist Office", category: "Commercial", image: "/placeholder.svg" },
  { id: 3, title: "Luxury Bedroom Suite", category: "Residential", image: "/placeholder.svg" },
  { id: 4, title: "Restaurant Interior", category: "Hospitality", image: "/placeholder.svg" },
  { id: 5, title: "Boutique Hotel Lobby", category: "Hospitality", image: "/placeholder.svg" },
  { id: 6, title: "Modern Kitchen Design", category: "Residential", image: "/placeholder.svg" },
];

const mockReviews = [
  {
    id: 1,
    client: "Ahmed Hassan",
    rating: 5,
    comment: "Exceptional work! Nadia transformed our living space beyond our expectations.",
    date: "Dec 10, 2024",
  },
  {
    id: 2,
    client: "Sara Mohamed",
    rating: 5,
    comment: "Professional, creative, and easy to work with. Highly recommended!",
    date: "Dec 5, 2024",
  },
  {
    id: 3,
    client: "Omar Khalil",
    rating: 4,
    comment: "Great design sense and attention to detail. Would hire again.",
    date: "Nov 28, 2024",
  },
];

const mockSkills = [
  "Interior Design",
  "Space Planning",
  "3D Visualization",
  "Color Consultation",
  "Furniture Selection",
  "Lighting Design",
  "Kitchen Design",
  "Bathroom Design",
];

export const PublicDesignerProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Cover Image */}
      <div className="h-64 md:h-80 gradient-navy relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-card rounded-xl shadow-luxury p-6 md:p-8 border border-border">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32 ring-4 ring-background shadow-xl">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                NE
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Nadia El-Sayed
                    </h1>
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-lg text-accent font-medium mt-1">
                    Senior Interior Designer
                  </p>
                  <p className="text-muted-foreground flex items-center gap-1 mt-2">
                    <MapPin className="h-4 w-4" />
                    Cairo, Egypt
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button className="gradient-gold text-primary">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Designer
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-accent fill-accent" />
                    <span className="font-bold text-foreground">4.9</span>
                  </div>
                  <span className="text-muted-foreground">(48 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-accent" />
                  <span className="text-foreground font-medium">18</span>
                  <span className="text-muted-foreground">completed projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">8+ years experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPortfolio.map((project) => (
                <div
                  key={project.id}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border hover-gold cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-primary-foreground">
                      <Badge className="mb-2 bg-accent/80 text-accent-foreground">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="border-border">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">About Me</h2>
                <p className="text-muted-foreground leading-relaxed">
                  With over 8 years of experience in interior design, I specialize in creating 
                  spaces that are not only aesthetically pleasing but also functional and 
                  reflective of my clients' personalities. My approach combines modern design 
                  principles with timeless elegance, ensuring each project is unique and 
                  tailored to the specific needs of the space and its inhabitants.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  I have worked on a diverse range of projects, from luxury residential homes 
                  to boutique hotels and corporate offices. My passion lies in transforming 
                  ordinary spaces into extraordinary experiences through thoughtful design, 
                  quality materials, and attention to every detail.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent" />
                  Skills & Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {mockSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="px-4 py-2 text-sm border-accent/30 text-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {review.client.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{review.client}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-accent fill-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default PublicDesignerProfile;
