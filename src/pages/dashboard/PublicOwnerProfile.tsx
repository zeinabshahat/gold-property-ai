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
  Home,
  Building,
  Phone,
  Mail,
} from "lucide-react";

const mockProperties = [
  { id: 1, title: "Luxury Villa", location: "New Cairo", price: "$850,000", status: "For Sale", image: "/placeholder.svg" },
  { id: 2, title: "Modern Apartment", location: "Maadi", price: "$2,500/mo", status: "For Rent", image: "/placeholder.svg" },
  { id: 3, title: "Beachfront House", location: "North Coast", price: "$1.2M", status: "For Sale", image: "/placeholder.svg" },
  { id: 4, title: "Penthouse Suite", location: "Zamalek", price: "$4,500/mo", status: "For Rent", image: "/placeholder.svg" },
];

const mockReviews = [
  {
    id: 1,
    client: "Ahmed Hassan",
    rating: 5,
    comment: "Excellent landlord! Very responsive and properties are well-maintained.",
    date: "Dec 10, 2024",
  },
  {
    id: 2,
    client: "Sara Mohamed",
    rating: 5,
    comment: "Great experience renting from Mohamed. Highly recommended!",
    date: "Dec 5, 2024",
  },
  {
    id: 3,
    client: "Karim Ali",
    rating: 4,
    comment: "Professional and fair. The property was exactly as described.",
    date: "Nov 28, 2024",
  },
];

export const PublicOwnerProfile = () => {
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
                MK
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Mohamed Khalil
                    </h1>
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified Owner
                    </Badge>
                  </div>
                  <p className="text-lg text-accent font-medium mt-1">
                    Property Owner
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
                    Contact Owner
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-accent fill-accent" />
                    <span className="font-bold text-foreground">4.8</span>
                  </div>
                  <span className="text-muted-foreground">(32 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-accent" />
                  <span className="text-foreground font-medium">8</span>
                  <span className="text-muted-foreground">listed properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Member since 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProperties.map((property) => (
                <Card
                  key={property.id}
                  className="border-border overflow-hidden hover-gold cursor-pointer group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        property.status === "For Sale"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {property.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </p>
                    <p className="text-lg font-bold text-accent mt-2">{property.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="border-border">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">About the Owner</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mohamed Khalil is a trusted property owner with a portfolio of premium 
                  residential and commercial properties across Cairo and the North Coast. 
                  With over 10 years of experience in real estate, Mohamed is known for 
                  maintaining high-quality properties and providing excellent service to 
                  tenants and buyers alike.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  All properties are carefully selected and maintained to the highest 
                  standards. Mohamed believes in transparent communication and fair 
                  dealings with all clients.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+20 123 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">mohamed@owner.com</p>
                    </div>
                  </div>
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

export default PublicOwnerProfile;
