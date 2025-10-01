import { TrendingUp, MapPin, Home, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Analytics = () => {
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
                <span className="text-accent font-semibold">Market Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Analytics & <span className="text-gradient-gold">Market Trends</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Interactive charts showing property price trends and market insights powered by real-time data
              </p>
            </div>
            
            {/* Filters */}
            <Card className="p-6 shadow-luxury mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    Area
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      <SelectItem value="beverly">Beverly Hills</SelectItem>
                      <SelectItem value="manhattan">Manhattan</SelectItem>
                      <SelectItem value="miami">Miami Beach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center">
                    <Home className="h-4 w-4 mr-2 text-accent" />
                    Property Type
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-accent" />
                    Time Period
                  </label>
                  <Select defaultValue="12m">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">Last Month</SelectItem>
                      <SelectItem value="3m">Last 3 Months</SelectItem>
                      <SelectItem value="6m">Last 6 Months</SelectItem>
                      <SelectItem value="12m">Last Year</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Year Range</label>
                  <Select defaultValue="2024">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Average Price</h3>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">$2.8M</p>
                <p className="text-sm text-green-500 font-semibold">↑ 8.5% from last year</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Properties Sold</h3>
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">1,247</p>
                <p className="text-sm text-blue-500 font-semibold">↑ 12% from last year</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Avg Days on Market</h3>
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">45</p>
                <p className="text-sm text-accent font-semibold">↓ 5 days from last year</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Price per Sq Ft</h3>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">$850</p>
                <p className="text-sm text-green-500 font-semibold">↑ 6.2% from last year</p>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Price Trend Chart */}
              <Card className="p-6 shadow-luxury">
                <h3 className="text-xl font-bold text-primary mb-6">Price Trend Over Time</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[2.1, 2.3, 2.2, 2.5, 2.4, 2.6, 2.7, 2.8, 2.9, 3.0, 2.8, 2.8].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full gradient-gold rounded-t-lg transition-smooth hover:shadow-gold"
                        style={{ height: `${(value / 3.0) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground mt-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Property Type Distribution */}
              <Card className="p-6 shadow-luxury">
                <h3 className="text-xl font-bold text-primary mb-6">Property Type Distribution</h3>
                <div className="space-y-4">
                  {[
                    { type: "House", percentage: 45, color: "bg-accent" },
                    { type: "Apartment", percentage: 30, color: "bg-blue-500" },
                    { type: "Condo", percentage: 20, color: "bg-green-500" },
                    { type: "Villa", percentage: 5, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{item.type}</span>
                        <span className="text-sm font-bold text-primary">{item.percentage}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} transition-smooth`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Area Comparison */}
            <Card className="p-6 shadow-luxury">
              <h3 className="text-xl font-bold text-primary mb-6">Top Performing Areas</h3>
              <div className="space-y-4">
                {[
                  { area: "Beverly Hills, CA", avgPrice: "$4.5M", growth: "+12.5%", sales: 156 },
                  { area: "Manhattan, NY", avgPrice: "$3.8M", growth: "+10.2%", sales: 243 },
                  { area: "Miami Beach, FL", avgPrice: "$2.2M", growth: "+8.7%", sales: 189 },
                  { area: "Malibu, CA", avgPrice: "$5.1M", growth: "+7.3%", sales: 87 },
                ].map((area, index) => (
                  <div 
                    key={area.area}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent/5 transition-smooth"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-gold text-primary font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">{area.area}</h4>
                        <p className="text-sm text-muted-foreground">{area.sales} properties sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{area.avgPrice}</p>
                      <p className="text-sm text-green-500 font-semibold">{area.growth}</p>
                    </div>
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

export default Analytics;
