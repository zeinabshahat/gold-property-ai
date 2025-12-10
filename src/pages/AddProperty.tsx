import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Home, MapPin, DollarSign, Maximize2, Bed, Bath, Link, Building, ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import LocationPicker from "@/components/LocationPicker";

interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  address: string;
  city: string;
  categoryId: string;
  tour360Url: string;
  rooms: string;
  bathrooms: string;
  area: string;
  locationLat: string;
  locationLang: string;
  district: string;
}

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    categoryId: "",
    tour360Url: "",
    rooms: "",
    bathrooms: "",
    area: "",
    locationLat: "",
    locationLang: "",
    district: "",
  });

  const handleChange = (field: keyof PropertyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.address || !formData.city || !formData.categoryId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const propertyData = {
        name: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: `${formData.address}, ${formData.district ? formData.district + ", " : ""}${formData.city}`,
        category: formData.categoryId,
        type: "apartment", // Default type
        status: "sale", // Default status
        bedrooms: formData.rooms ? parseInt(formData.rooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: formData.area ? parseFloat(formData.area) : 0,
        latitude: formData.locationLat ? parseFloat(formData.locationLat) : null,
        longitude: formData.locationLang ? parseFloat(formData.locationLang) : null,
        images: images,
        features: formData.tour360Url ? [`360 Tour: ${formData.tour360Url}`] : [],
      };

      const { error } = await (supabase.from("properties") as any).insert(propertyData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property added successfully!",
      });

      navigate("/properties");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Add <span className="text-gradient-gold">Property</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              List your property on our platform
            </p>
          </div>

          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Required Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">
                    Required Information
                  </h3>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter property title"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter detailed description of the property"
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="Enter street address"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <Label htmlFor="categoryId">Category *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => handleChange("categoryId", value)}
                    >
                      <SelectTrigger id="categoryId">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Images */}
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <ImageIcon className="h-4 w-4" />
                      Property Images
                    </Label>
                    <ImageUpload images={images} onImagesChange={setImages} maxImages={10} />
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">
                    Optional Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 360 Tour URL */}
                    <div className="md:col-span-2">
                      <Label htmlFor="tour360Url">360° Tour URL</Label>
                      <div className="relative">
                        <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="tour360Url"
                          placeholder="Enter 360 tour URL"
                          value={formData.tour360Url}
                          onChange={(e) => handleChange("tour360Url", e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    {/* Rooms */}
                    <div>
                      <Label htmlFor="rooms">Rooms</Label>
                      <div className="relative">
                        <Bed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="rooms"
                          type="number"
                          placeholder="Number of rooms"
                          value={formData.rooms}
                          onChange={(e) => handleChange("rooms", e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <div className="relative">
                        <Bath className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="bathrooms"
                          type="number"
                          placeholder="Number of bathrooms"
                          value={formData.bathrooms}
                          onChange={(e) => handleChange("bathrooms", e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    {/* Area */}
                    <div>
                      <Label htmlFor="area">Area (sqm)</Label>
                      <div className="relative">
                        <Maximize2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="area"
                          type="number"
                          placeholder="Area in square meters"
                          value={formData.area}
                          onChange={(e) => handleChange("area", e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    {/* District */}
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        placeholder="Enter district"
                        value={formData.district}
                        onChange={(e) => handleChange("district", e.target.value)}
                      />
                    </div>

                    {/* Location Map Picker */}
                    <div className="md:col-span-2">
                      <Label className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" />
                        Property Location
                      </Label>
                      <LocationPicker
                        latitude={formData.locationLat}
                        longitude={formData.locationLang}
                        onLocationChange={(lat, lng) => {
                          handleChange("locationLat", lat);
                          handleChange("locationLang", lng);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 gradient-gold text-primary font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Adding Property..." : "Add Property"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddProperty;
