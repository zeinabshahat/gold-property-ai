import { MapPin, Home, Tag } from "lucide-react";
import { Card } from "./ui/card";

interface PropertyCardProps {
  image: string;
  type: string;
  purpose: "Rent" | "Sell";
  title: string;
  location: string;
  price?: string;
  size?: "large" | "medium" | "small";
}

const PropertyCard = ({ image, type, purpose, title, location, price, size = "medium" }: PropertyCardProps) => {
  const sizeClasses = {
    large: "col-span-3 row-span-2 h-[600px]",
    medium: "col-span-1 h-[290px]",
    small: "col-span-1 h-[290px]",
  };
  
  return (
    <Card className={`${sizeClasses[size]} relative overflow-hidden group cursor-pointer hover-gold shadow-luxury`}>
      {/* Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90 group-hover:opacity-95 transition-smooth" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Section - Type & Purpose */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Home className="h-3 w-3 text-accent" />
            <span className="text-xs font-medium text-foreground">{type}</span>
          </div>
          <div className={`px-3 py-1.5 rounded-full font-semibold text-xs ${
            purpose === "Rent" 
              ? "bg-blue-500/90 text-white" 
              : "gradient-gold text-primary"
          }`}>
            {purpose}
          </div>
        </div>
        
        {/* Bottom Section - Title & Location */}
        <div className="space-y-2">
          <h3 className="text-white font-bold text-xl md:text-2xl leading-tight group-hover:text-gradient-gold transition-smooth">
            {title}
          </h3>
          <div className="flex items-center space-x-2 text-white/90">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm">{location}</span>
          </div>
          {price && (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-white font-bold text-lg">{price}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
