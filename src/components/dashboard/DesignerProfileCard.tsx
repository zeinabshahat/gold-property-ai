import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Edit,
  Award,
  Star,
  Briefcase,
  Users,
  CheckCircle,
} from "lucide-react";

export interface DesignerProfile {
  name: string;
  title: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  bio: string;
  specializations: string[];
  stats: {
    rating: number;
    reviews: number;
    projects: number;
    yearsExperience: number;
  };
  certifications: string[];
}

interface DesignerProfileCardProps {
  profile: DesignerProfile;
  showEditButton?: boolean;
  compact?: boolean;
}

export const DesignerProfileCard = ({
  profile,
  showEditButton = true,
  compact = false,
}: DesignerProfileCardProps) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/dashboard/designer/edit-profile");
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border-2 border-accent/20">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback className="bg-accent text-accent-foreground">
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.title}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-border overflow-hidden">
      <div className="h-24 gradient-navy" />
      <CardContent className="relative pt-0 pb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar */}
          <div className="-mt-12 lg:-mt-10">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-accent text-accent-foreground">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                  <Badge className="bg-accent/10 text-accent border-accent/30">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground">{profile.title}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              </div>
              {showEditButton && (
                <Button variant="outline" size="sm" onClick={handleEditProfile}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              {profile.bio}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {profile.website}
              </div>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-2">
              {profile.specializations.map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>

            {/* Profile Stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <span className="font-bold text-foreground">{profile.stats.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    ({profile.stats.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                <div>
                  <span className="font-bold text-foreground">{profile.stats.projects}</span>
                  <span className="text-sm text-muted-foreground ml-1">Projects</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <div>
                  <span className="font-bold text-foreground">{profile.stats.yearsExperience}+</span>
                  <span className="text-sm text-muted-foreground ml-1">Years Experience</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="outline"
                  className="text-xs bg-green-500/10 text-green-600 border-green-500/30"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
