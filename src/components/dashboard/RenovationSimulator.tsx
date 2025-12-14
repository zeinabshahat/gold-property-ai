import { useState } from "react";
import { Calculator, Hammer, TrendingUp, DollarSign, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RenovationSimulator = () => {
  const [propertySize, setPropertySize] = useState("150");
  const [renovationLevel, setRenovationLevel] = useState("medium");
  const [showResults, setShowResults] = useState(false);

  const renovationCosts = {
    basic: 150,
    medium: 300,
    luxury: 600,
  };

  const valueMultipliers = {
    basic: 1.15,
    medium: 1.35,
    luxury: 1.6,
  };

  const size = parseInt(propertySize) || 150;
  const costPerSqm = renovationCosts[renovationLevel as keyof typeof renovationCosts];
  const multiplier = valueMultipliers[renovationLevel as keyof typeof valueMultipliers];
  
  const currentValue = size * 2500; // Base value $2500/sqm
  const renovationCost = size * costPerSqm;
  const newValue = currentValue * multiplier;
  const profit = newValue - currentValue - renovationCost;
  const roi = ((profit / renovationCost) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Calculator className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Renovation & Development Simulator</h2>
          <p className="text-sm text-muted-foreground">Calculate potential returns from property improvements</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="h-5 w-5 text-accent" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="size">Property Size (sqm)</Label>
              <Input
                id="size"
                type="number"
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
                placeholder="Enter property size"
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Renovation Level</Label>
              <Select value={renovationLevel} onValueChange={setRenovationLevel}>
                <SelectTrigger className="bg-muted">
                  <SelectValue placeholder="Select renovation level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-muted">Basic</Badge>
                      <span className="text-muted-foreground text-sm">~$150/sqm</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-accent/10 text-accent border-accent/30">Medium</Badge>
                      <span className="text-muted-foreground text-sm">~$300/sqm</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="luxury">
                    <div className="flex items-center gap-2">
                      <Badge className="gradient-gold text-primary">Luxury</Badge>
                      <span className="text-muted-foreground text-sm">~$600/sqm</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Estimated Cost</span>
                <span className="font-semibold text-foreground">
                  ${renovationCost.toLocaleString()}
                </span>
              </div>
              <Progress
                value={
                  renovationLevel === "basic"
                    ? 33
                    : renovationLevel === "medium"
                    ? 66
                    : 100
                }
                className="h-2"
              />
            </div>

            <Button
              onClick={() => setShowResults(true)}
              className="w-full gradient-navy text-primary-foreground hover:opacity-90"
            >
              <Hammer className="h-4 w-4 mr-2" />
              Calculate Results
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className={`border-border transition-all ${showResults ? "opacity-100" : "opacity-50"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
              Projected Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Before/After Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Before Renovation</p>
                <p className="text-xl font-bold text-foreground">
                  ${currentValue.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">After Renovation</p>
                <p className="text-xl font-bold text-accent">
                  ${newValue.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Profit & ROI */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Estimated Profit</span>
                </div>
                <p className={`text-xl font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${profit.toLocaleString()}
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">ROI Percentage</span>
                </div>
                <p className={`text-xl font-bold ${parseFloat(roi) >= 0 ? "text-accent" : "text-red-500"}`}>
                  {roi}%
                </p>
              </div>
            </div>

            {/* Visual Comparison Bar */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Value Comparison</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Before</span>
                  <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/50 rounded-full"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">After</span>
                  <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-gold rounded-full"
                      style={{ width: `${Math.min(100, 60 * multiplier)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm font-medium text-green-600 mb-1">Recommendation</p>
              <p className="text-sm text-muted-foreground">
                {parseFloat(roi) >= 50
                  ? "Excellent investment! High renovation ROI expected."
                  : parseFloat(roi) >= 25
                  ? "Good potential. Consider renovation for value increase."
                  : "Moderate returns. Evaluate market conditions before proceeding."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
