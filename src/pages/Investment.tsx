import { TrendingUp, DollarSign, Bell, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";

const Investment = () => {
  const portfolio = [
    {
      id: 1,
      image: property1,
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      purchasePrice: "$4,200,000",
      currentValue: "$4,500,000",
      profit: "+$300,000",
      profitPercent: "+7.1%",
      yearPurchased: 2023,
      status: "Owned",
    },
    {
      id: 2,
      image: property2,
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      purchasePrice: "$3,000,000",
      currentValue: "$3,200,000",
      profit: "+$200,000",
      profitPercent: "+6.7%",
      yearPurchased: 2022,
      status: "Owned",
    },
    {
      id: 3,
      image: property3,
      title: "Waterfront Condo",
      location: "Miami Beach, FL",
      purchasePrice: "$2,100,000",
      currentValue: "$2,100,000",
      profit: "$0",
      profitPercent: "0%",
      yearPurchased: 2024,
      status: "Watching",
    },
  ];
  
  const alerts = [
    {
      id: 1,
      type: "opportunity",
      message: "Property in Miami Beach dropped 5% below fair value",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "profit",
      message: "Your Beverly Hills property value increased by $50,000",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "market",
      message: "Manhattan real estate market showing 8% growth trend",
      time: "2 days ago",
    },
  ];
  
  const totalInvestment = 9300000;
  const totalCurrentValue = 9800000;
  const totalProfit = 500000;
  const profitPercent = ((totalProfit / totalInvestment) * 100).toFixed(1);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">Portfolio Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Investment <span className="text-gradient-gold">Manager</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track your properties, monitor profits, and get smart alerts for investment opportunities
              </p>
            </div>
            
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 shadow-luxury hover-gold bg-gradient-navy text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white/80">Total Investment</h3>
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
                <p className="text-3xl font-bold mb-1">${(totalInvestment / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-white/70">{portfolio.filter(p => p.status === "Owned").length} properties owned</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Value</h3>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">${(totalCurrentValue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-500 font-semibold">Portfolio value</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold gradient-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-primary/80">Total Profit</h3>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">+${(totalProfit / 1000).toFixed(0)}K</p>
                <p className="text-sm text-primary font-semibold">+{profitPercent}% ROI</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Watching</h3>
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">{portfolio.filter(p => p.status === "Watching").length}</p>
                <p className="text-sm text-muted-foreground">Properties tracked</p>
              </Card>
            </div>
            
            {/* Properties Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Your Properties</h2>
                <Button className="gradient-gold text-primary font-semibold hover:shadow-gold transition-smooth">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolio.map((property) => (
                  <Card key={property.id} className="overflow-hidden shadow-luxury hover-gold group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={property.status === "Owned" ? "bg-green-500" : "bg-blue-500"}>
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-primary mb-1">{property.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{property.location}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Purchase Price</span>
                          <span className="font-semibold text-foreground">{property.purchasePrice}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Current Value</span>
                          <span className="font-semibold text-foreground">{property.currentValue}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-border">
                          <span className="text-sm font-medium text-muted-foreground">Profit</span>
                          <div className="text-right">
                            <span className={`font-bold ${property.profit.includes('+') ? 'text-green-500' : 'text-muted-foreground'}`}>
                              {property.profit}
                            </span>
                            <span className={`text-sm ml-2 ${property.profit.includes('+') ? 'text-green-500' : 'text-muted-foreground'}`}>
                              ({property.profitPercent})
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground hover:border-accent transition-smooth">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Smart Alerts */}
            <Card className="p-6 shadow-luxury">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Bell className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Smart Alerts</h2>
                </div>
                <Badge variant="outline" className="text-accent border-accent">
                  {alerts.length} New
                </Badge>
              </div>
              
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start space-x-4 p-4 bg-muted rounded-lg hover:bg-accent/5 transition-smooth cursor-pointer"
                  >
                    <div className={`p-2 rounded-full ${
                      alert.type === "opportunity" ? "bg-blue-500/10" :
                      alert.type === "profit" ? "bg-green-500/10" :
                      "bg-accent/10"
                    }`}>
                      {alert.type === "opportunity" && <TrendingUp className="h-5 w-5 text-blue-500" />}
                      {alert.type === "profit" && <DollarSign className="h-5 w-5 text-green-500" />}
                      {alert.type === "market" && <Bell className="h-5 w-5 text-accent" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">{alert.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investment;
