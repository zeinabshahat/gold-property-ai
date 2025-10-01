import { useState } from "react";
import { Calculator as CalcIcon, Home, MapPin, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Calculator = () => {
  const [valuation, setValuation] = useState<number | null>(null);
  
  const handleCalculate = () => {
    // Simulate AI calculation
    const randomValue = Math.floor(Math.random() * (5000000 - 500000) + 500000);
    setValuation(randomValue);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">AI-Powered Valuation</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Smart Property <span className="text-gradient-gold">Calculator</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get instant, accurate property valuations using advanced AI algorithms and real-time market data
              </p>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="p-8 shadow-luxury">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <Home className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Property Details</h2>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input id="location" placeholder="Enter address or city" className="pl-10" />
                    </div>
                  </div>
                  
                  {/* Property Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Size */}
                  <div className="space-y-2">
                    <Label htmlFor="size">Size (sq ft)</Label>
                    <Input id="size" type="number" placeholder="2000" />
                  </div>
                  
                  {/* Bedrooms & Bathrooms */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input id="bedrooms" type="number" placeholder="3" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input id="bathrooms" type="number" placeholder="2" />
                    </div>
                  </div>
                  
                  {/* Finishing */}
                  <div className="space-y-2">
                    <Label htmlFor="finishing">Finishing Quality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select finishing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Year Built */}
                  <div className="space-y-2">
                    <Label htmlFor="year">Year Built</Label>
                    <Input id="year" type="number" placeholder="2020" />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-gold text-primary font-bold text-lg hover:shadow-gold transition-smooth">
                    <CalcIcon className="mr-2 h-5 w-5" />
                    Calculate Property Value
                  </Button>
                </form>
              </Card>
              
              {/* Results */}
              <Card className="p-8 shadow-luxury bg-gradient-navy text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-accent/20">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Valuation Results</h2>
                </div>
                
                {valuation ? (
                  <div className="space-y-8">
                    {/* Main Valuation */}
                    <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-sm text-white/70 mb-2">Estimated Property Value</p>
                      <h3 className="text-5xl font-bold text-gradient-gold mb-2">
                        ${valuation.toLocaleString()}
                      </h3>
                      <p className="text-sm text-white/70">Based on AI analysis and market data</p>
                    </div>
                    
                    {/* Value Range */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white/90">Value Range</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-white/70">Low Estimate</span>
                          <span className="font-bold text-accent">${(valuation * 0.9).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-white/70">High Estimate</span>
                          <span className="font-bold text-accent">${(valuation * 1.1).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Market Insights */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white/90">Market Insights</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white/70">Market Trend</span>
                          <span className="text-green-400 font-semibold">↑ 3.5% Growth</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white/70">Demand Level</span>
                          <span className="text-accent font-semibold">High</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-white/70">Confidence Score</span>
                          <span className="text-accent font-semibold">95%</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold">
                      Get Detailed Report
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center">
                    <CalcIcon className="h-20 w-20 text-accent/50 mb-4" />
                    <p className="text-white/70 text-lg">
                      Enter property details and click calculate to see your AI-powered valuation
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Calculator;
