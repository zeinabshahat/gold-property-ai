import { GitCompare, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";

const Comparison = () => {
  const properties = [
    {
      id: 1,
      image: property1,
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$4,500,000",
      size: "4,500 sq ft",
      bedrooms: 5,
      bathrooms: 4,
      yearBuilt: 2021,
      fairValue: "$4,450,000",
      valueRating: "Fair Price",
    },
    {
      id: 2,
      image: property2,
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      price: "$3,200,000",
      size: "3,000 sq ft",
      bedrooms: 3,
      bathrooms: 3,
      yearBuilt: 2020,
      fairValue: "$3,500,000",
      valueRating: "Great Deal",
    },
    {
      id: 3,
      image: property3,
      title: "Waterfront Condo",
      location: "Miami Beach, FL",
      price: "$2,100,000",
      size: "2,200 sq ft",
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2019,
      fairValue: "$2,000,000",
      valueRating: "Slightly High",
    },
  ];
  
  const comparisonRows = [
    { label: "Location", key: "location" },
    { label: "Price", key: "price" },
    { label: "Size", key: "size" },
    { label: "Bedrooms", key: "bedrooms" },
    { label: "Bathrooms", key: "bathrooms" },
    { label: "Year Built", key: "yearBuilt" },
    { label: "Fair Value", key: "fairValue" },
    { label: "Value Rating", key: "valueRating" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <GitCompare className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">Side-by-Side Analysis</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Property <span className="text-gradient-gold">Comparison</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compare multiple properties with intelligent insights to make the best investment decision
              </p>
            </div>
            
            {/* Comparison Table */}
            <Card className="shadow-luxury overflow-hidden">
              {/* Property Headers */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-b border-border">
                <div className="p-6 bg-muted border-r border-border">
                  <Button variant="outline" className="w-full" size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Add Property
                  </Button>
                </div>
                
                {properties.map((property) => (
                  <div key={property.id} className="p-6 bg-card relative group border-r border-border last:border-r-0">
                    <button className="absolute top-4 right-4 p-1 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-smooth">
                      <X className="h-4 w-4" />
                    </button>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-bold text-lg text-primary mb-1">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                  </div>
                ))}
              </div>
              
              {/* Comparison Rows */}
              {comparisonRows.map((row, index) => (
                <div
                  key={row.key}
                  className={`grid grid-cols-1 md:grid-cols-4 gap-0 border-b border-border last:border-b-0 ${
                    index % 2 === 0 ? "bg-muted/50" : "bg-card"
                  }`}
                >
                  <div className="p-4 font-semibold text-primary bg-muted border-r border-border">
                    {row.label}
                  </div>
                  
                  {properties.map((property) => {
                    const value = property[row.key as keyof typeof property];
                    const isHighlight = row.key === "valueRating";
                    const isGoodDeal = value === "Great Deal";
                    const isFairPrice = value === "Fair Price";
                    
                    return (
                      <div
                        key={property.id}
                        className="p-4 border-r border-border last:border-r-0"
                      >
                        {isHighlight ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              isGoodDeal
                                ? "bg-green-500/10 text-green-600"
                                : isFairPrice
                                ? "bg-blue-500/10 text-blue-600"
                                : "bg-orange-500/10 text-orange-600"
                            }`}
                          >
                            {value}
                          </span>
                        ) : row.key === "fairValue" ? (
                          <span className="font-bold text-accent">{value}</span>
                        ) : (
                          <span className="text-foreground">{value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              
              {/* Action Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-muted">
                <div className="p-4 border-r border-border"></div>
                {properties.map((property) => (
                  <div key={property.id} className="p-4 border-r border-border last:border-r-0">
                    <Button className="w-full gradient-gold text-primary font-semibold hover:shadow-gold transition-smooth">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Insights Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 shadow-luxury">
                <h3 className="font-bold text-primary mb-2">Best Value</h3>
                <p className="text-muted-foreground mb-3">
                  Downtown Penthouse offers the best value at $300k below fair market price
                </p>
                <span className="text-accent font-semibold">Great investment opportunity</span>
              </Card>
              
              <Card className="p-6 shadow-luxury">
                <h3 className="font-bold text-primary mb-2">Price per Sq Ft</h3>
                <p className="text-muted-foreground mb-3">
                  Modern Luxury Villa has the lowest price per square foot at $1,000/sq ft
                </p>
                <span className="text-accent font-semibold">Most space for your money</span>
              </Card>
              
              <Card className="p-6 shadow-luxury">
                <h3 className="font-bold text-primary mb-2">Newest Property</h3>
                <p className="text-muted-foreground mb-3">
                  Modern Luxury Villa is the newest (2021) with latest amenities and design
                </p>
                <span className="text-accent font-semibold">Modern living standards</span>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Comparison;
