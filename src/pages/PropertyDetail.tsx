import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, Maximize2, Bed, Bath, Heart, Share2, GitCompare, 
  Calendar, CheckCircle, DollarSign, Home, Sparkles 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkUser();
    fetchProperty();
  }, [id]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      checkFavorite(user.id);
    }
  };

  const checkFavorite = async (userId: string) => {
    const { data } = await (supabase.from("favorites") as any)
      .select("*")
      .eq("user_id", userId)
      .eq("property_id", id)
      .maybeSingle();
    setIsFavorite(!!data);
  };

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase.from("properties") as any)
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProperty(data);

      // Fetch similar properties
      if (data) {
        const { data: similar } = await (supabase.from("properties") as any)
          .select("*")
          .eq("type", data.type)
          .neq("id", id)
          .limit(3);
        setSimilarProperties(similar || []);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link copied to clipboard",
      });
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      if (isFavorite) {
        await (supabase.from("favorites") as any)
          .delete()
          .eq("user_id", user.id)
          .eq("property_id", id);
        setIsFavorite(false);
        toast({ title: "Removed from favorites" });
      } else {
        await (supabase.from("favorites") as any)
          .insert({ user_id: user.id, property_id: id });
        setIsFavorite(true);
        toast({ title: "Added to favorites" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCompare = () => {
    const compareList = JSON.parse(localStorage.getItem("compareList") || "[]");
    if (!compareList.includes(id)) {
      compareList.push(id);
      localStorage.setItem("compareList", JSON.stringify(compareList));
      toast({
        title: "Added to comparison",
        description: "Property added to comparison list",
      });
    }
  };

  const handleBooking = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Loading property details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Property not found</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="md:col-span-2 h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={property.images?.[0] || "/placeholder.svg"}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
            {property.images?.slice(1, 5).map((img: string, index: number) => (
              <div key={index} className="h-48 rounded-xl overflow-hidden">
                <img src={img} alt={`${property.name} ${index + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="mb-2 bg-accent text-accent-foreground">
                      {property.status === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                    <h1 className="text-4xl font-bold text-primary mb-2">{property.name}</h1>
                    <p className="text-lg text-muted-foreground flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      {property.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleFavorite}
                      className={isFavorite ? "text-accent" : ""}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-accent" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleCompare}>
                      <GitCompare className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-lg">
                  <div className="flex items-center">
                    <Maximize2 className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-semibold">{property.area} sqm</span>
                  </div>
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-semibold">{property.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-semibold">{property.bathrooms} Baths</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description || "No description available."}
                </p>
              </div>

              <Separator />

              {/* Features & Amenities */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.has_pool && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                      <span>Swimming Pool</span>
                    </div>
                  )}
                  {property.has_garden && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                      <span>Garden</span>
                    </div>
                  )}
                  {property.has_garage && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                      <span>Garage</span>
                    </div>
                  )}
                  {property.electricity && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                      <span>Electricity</span>
                    </div>
                  )}
                  {property.finishing && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                      <span>Finishing: {property.finishing}</span>
                    </div>
                  )}
                  {property.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Location</h2>
                <div className="h-96 bg-muted rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">Map will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="shadow-luxury">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Price</p>
                    <p className="text-4xl font-bold text-gradient-gold mb-4">
                      ${property.price?.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="mb-2">{property.type}</Badge>
                  </div>
                  
                  <Button onClick={handleBooking} className="w-full mb-3 gradient-gold text-primary font-semibold">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Viewing
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Contact Agent
                  </Button>
                </CardContent>
              </Card>

              {/* Owner Info */}
              {property.owner_name && (
                <Card className="shadow-luxury">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-4">Owner Information</h3>
                    <div className="space-y-2">
                      <p className="font-semibold">{property.owner_name}</p>
                      {property.owner_contact && (
                        <p className="text-sm text-muted-foreground">{property.owner_contact}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-primary mb-8">
                Similar <span className="text-gradient-gold">Properties</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((prop) => (
                  <Card
                    key={prop.id}
                    className="overflow-hidden hover:shadow-gold transition-smooth cursor-pointer"
                    onClick={() => navigate(`/property/${prop.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={prop.images?.[0] || "/placeholder.svg"}
                        alt={prop.name}
                        className="w-full h-full object-cover hover:scale-110 transition-smooth"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-primary mb-2">{prop.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{prop.location}</p>
                      <p className="text-xl font-bold text-gradient-gold">
                        ${prop.price?.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
