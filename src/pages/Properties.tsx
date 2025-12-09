import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MapPin, Home, DollarSign, Maximize2, Bed, Bath, Heart, GitCompare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [hasPool, setHasPool] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [hasGarage, setHasGarage] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = (supabase.from("properties") as any).select("*");

      // Apply filters
      if (propertyType) query = query.eq("type", propertyType);
      if (category) query = query.eq("category", category);
      if (location) query = query.ilike("location", `%${location}%`);
      if (minPrice) query = query.gte("price", parseFloat(minPrice));
      if (maxPrice) query = query.lte("price", parseFloat(maxPrice));
      if (minArea) query = query.gte("area", parseFloat(minArea));
      if (maxArea) query = query.lte("area", parseFloat(maxArea));
      if (status) query = query.eq("status", status);
      if (hasPool) query = query.eq("has_pool", true);
      if (hasGarden) query = query.eq("has_garden", true);
      if (hasGarage) query = query.eq("has_garage", true);

      // Apply sorting
      if (sortBy === "price-high") query = query.order("price", { ascending: false });
      else if (sortBy === "price-low") query = query.order("price", { ascending: true });
      else query = query.order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
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

  const handleSearch = () => {
    fetchProperties();
  };

  const handleReset = () => {
    setPropertyType("");
    setCategory("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setStatus("");
    setSortBy("newest");
    setHasPool(false);
    setHasGarden(false);
    setHasGarage(false);
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Explore <span className="text-gradient-gold">Properties</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find your dream property with our advanced search filters
            </p>
          </div>

          {/* Advanced Search Filters */}
          <Card className="mb-8 shadow-luxury">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Advanced Search</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Property Type */}
                <div>
                  <Label htmlFor="type">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Min Price */}
                <div>
                  <Label htmlFor="minPrice">Min Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <Label htmlFor="maxPrice">Max Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Min Area */}
                <div>
                  <Label htmlFor="minArea">Min Area (sqm)</Label>
                  <div className="relative">
                    <Maximize2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="minArea"
                      type="number"
                      placeholder="Min"
                      value={minArea}
                      onChange={(e) => setMinArea(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Max Area */}
                <div>
                  <Label htmlFor="maxArea">Max Area (sqm)</Label>
                  <div className="relative">
                    <Maximize2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxArea"
                      type="number"
                      placeholder="Max"
                      value={maxArea}
                      onChange={(e) => setMaxArea(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div className="md:col-span-2 lg:col-span-4">
                  <Label htmlFor="sortBy">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sortBy">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Features Checkboxes */}
              <div className="mb-6">
                <Label className="mb-3 block">Search by Features</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pool" checked={hasPool} onCheckedChange={(checked) => setHasPool(checked as boolean)} />
                    <label htmlFor="pool" className="text-sm font-medium cursor-pointer">Pool</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="garden" checked={hasGarden} onCheckedChange={(checked) => setHasGarden(checked as boolean)} />
                    <label htmlFor="garden" className="text-sm font-medium cursor-pointer">Garden</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="garage" checked={hasGarage} onCheckedChange={(checked) => setHasGarage(checked as boolean)} />
                    <label htmlFor="garage" className="text-sm font-medium cursor-pointer">Garage</label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleSearch} className="gradient-gold text-primary font-semibold">
                  <Search className="mr-2 h-4 w-4" />
                  Search Properties
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Property Listing */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {properties.length} Properties Found
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-gold transition-smooth cursor-pointer group"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.images?.[0] || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      {property.status === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-primary mb-1">{property.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gradient-gold">
                        ${property.price?.toLocaleString()}
                      </span>
                      <Badge variant="outline">{property.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Maximize2 className="h-4 w-4 mr-1" />
                        {property.area} sqm
                      </div>
                      {property.bedrooms && (
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms}
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
