import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Camera,
  Save,
  X,
  Plus,
  MapPin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Award,
  User,
} from "lucide-react";

const initialProfile = {
  name: "Nadia El-Sayed",
  title: "Senior Interior Designer",
  avatar: "",
  location: "Cairo, Egypt",
  email: "nadia@designer.com",
  phone: "+20 100 123 4567",
  website: "www.nadiadesigns.com",
  bio: "Award-winning interior designer with 8+ years of experience specializing in luxury residential and commercial spaces. Passionate about creating functional, beautiful environments that reflect each client's unique personality.",
  specializations: ["Luxury Residential", "Modern Minimalist", "Commercial Spaces", "Renovation"],
  certifications: ["NCIDQ Certified", "LEED AP", "ASID Member"],
  yearsExperience: "8",
  hourlyRate: "150",
  projectMinBudget: "5000",
};

export const DesignerProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addSpecialization = () => {
    if (newSpecialization.trim() && !profile.specializations.includes(newSpecialization.trim())) {
      setProfile((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()],
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (spec: string) => {
    setProfile((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((s) => s !== spec),
    }));
  };

  const addCertification = () => {
    if (newCertification.trim() && !profile.certifications.includes(newCertification.trim())) {
      setProfile((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <DashboardLayout
      role="designer"
      userName={profile.name}
      userEmail={profile.email}
    >
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
            <p className="text-muted-foreground">
              Update your profile information and settings
            </p>
          </div>
          <Button onClick={handleSave} disabled={isLoading} className="gradient-gold text-primary">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Avatar Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-accent" />
              Profile Photo
            </CardTitle>
            <CardDescription>
              Upload a professional photo to make your profile stand out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-accent/20">
                  <AvatarImage src={avatarPreview || profile.avatar} />
                  <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                    {profile.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarClick}
                  className="absolute inset-0 flex items-center justify-center bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="h-8 w-8 text-primary-foreground" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleAvatarClick}>
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  {avatarPreview && (
                    <Button variant="outline" onClick={removeAvatar}>
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended: Square image, at least 400x400 pixels. Max 5MB.
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-accent" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Senior Interior Designer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell clients about yourself, your experience, and design philosophy..."
                className="min-h-[120px]"
              />
              <p className="text-sm text-muted-foreground">
                {profile.bio.length}/500 characters
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={profile.yearsExperience}
                  onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                  placeholder="8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-accent" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+20 100 123 4567"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">
                <Globe className="h-4 w-4 inline mr-1" />
                Website
              </Label>
              <Input
                id="website"
                value={profile.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="www.yourwebsite.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-accent" />
              Pricing & Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                  placeholder="150"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectMinBudget">Minimum Project Budget (USD)</Label>
                <Input
                  id="projectMinBudget"
                  type="number"
                  value={profile.projectMinBudget}
                  onChange={(e) => handleInputChange("projectMinBudget", e.target.value)}
                  placeholder="5000"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-accent" />
              Specializations
            </CardTitle>
            <CardDescription>
              Add your areas of expertise to help clients find you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profile.specializations.map((spec) => (
                <Badge
                  key={spec}
                  variant="secondary"
                  className="px-3 py-1 text-sm flex items-center gap-1"
                >
                  {spec}
                  <button
                    onClick={() => removeSpecialization(spec)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Separator />
            <div className="flex gap-2">
              <Input
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Add a specialization..."
                onKeyPress={(e) => e.key === "Enter" && addSpecialization()}
              />
              <Button variant="outline" onClick={addSpecialization}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Certifications & Awards
            </CardTitle>
            <CardDescription>
              Showcase your professional certifications and achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="outline"
                  className="px-3 py-1 text-sm flex items-center gap-1 bg-green-500/10 text-green-600 border-green-500/30"
                >
                  <Award className="h-3 w-3 mr-1" />
                  {cert}
                  <button
                    onClick={() => removeCertification(cert)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Separator />
            <div className="flex gap-2">
              <Input
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Add a certification..."
                onKeyPress={(e) => e.key === "Enter" && addCertification()}
              />
              <Button variant="outline" onClick={addCertification}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} disabled={isLoading} size="lg" className="gradient-gold text-primary">
            <Save className="h-5 w-5 mr-2" />
            {isLoading ? "Saving Changes..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DesignerProfile;