import { TrendingUp, DollarSign, BarChart3, MapPin, Sparkles } from "lucide-react";
import { StatCard } from "./StatCard";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const InvestmentInsights = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Sparkles className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Investment Insights</h2>
          <p className="text-sm text-muted-foreground">Smart property valuation & market analysis</p>
        </div>
      </div>

      {/* Smart Valuation */}
      <Card className="border-border shadow-luxury">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-accent" />
            Smart Property Valuation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Estimated Fair Value</p>
              <p className="text-2xl font-bold text-foreground">$485,000</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Price Range</p>
              <p className="text-lg font-semibold text-foreground">$450K - $520K</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Confidence</p>
              <p className="text-2xl font-bold text-accent">87%</p>
            </div>
          </div>

          {/* Price Trend Chart Placeholder */}
          <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center border border-dashed border-border">
            <div className="text-center">
              <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Historical Price Trend Chart</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard
          icon={TrendingUp}
          label="Expected ROI"
          value="12.5%"
          trend={{ value: "2.3% vs last year", isPositive: true }}
          variant="gold"
        />
        <StatCard
          icon={DollarSign}
          label="Rental Yield"
          value="5.8%"
          trend={{ value: "Stable", isPositive: true }}
        />
        <StatCard
          icon={MapPin}
          label="Area Growth Score"
          value="8.2/10"
          trend={{ value: "High demand", isPositive: true }}
        />
      </div>

      {/* Market Indicators */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Market Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Demand Level</span>
              <span className="font-medium text-foreground">High</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Stability</span>
              <span className="font-medium text-foreground">Stable</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Investment Safety</span>
              <span className="font-medium text-foreground">Moderate-High</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-accent" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/30">
              ✓ Buy
            </Badge>
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/30">
              ◐ Hold for 2+ years
            </Badge>
            <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/30">
              ↑ Renovate to increase value
            </Badge>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Based on current market trends, this property shows strong potential for appreciation. 
            Consider renovation to maximize ROI within 2-3 years.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
