import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Home, Building2, Calculator, BarChart3, Scale, Briefcase, Eye, EyeOff, User, Palette, Key, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const features = [
  { icon: Home, title: "Properties", description: "Real Estate & Housing" },
  { icon: Building2, title: "Investments", description: "Property Investments" },
  { icon: Calculator, title: "Calculator", description: "Mortgage & ROI Tools" },
  { icon: BarChart3, title: "Analytics", description: "Market Insights" },
  { icon: Scale, title: "Compare", description: "Property Comparison" },
  { icon: Briefcase, title: "Offers", description: "Exclusive Deals" },
];

const roles = [
  { id: "customer", label: "Customer", icon: User, description: "Browse and book properties" },
  { id: "owner", label: "Property Owner", icon: Key, description: "List and manage your properties" },
  { id: "designer", label: "Internal Designer", icon: Palette, description: "Design and staging services" },
  { id: "admin", label: "Admin", icon: Users, description: "Full system access" },
];

const ADMIN_SECRET_CODE = "ADMIN2024"; // In production, this should be validated server-side

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [adminCode, setAdminCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "You have successfully logged in." });
        navigate("/");
      } else {
        // Validate admin code if admin role selected
        if (selectedRole === "admin" && adminCode !== ADMIN_SECRET_CODE) {
          throw new Error("Invalid admin code. Please contact system administrator.");
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { 
              full_name: fullName,
              role: selectedRole,
            },
          },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-foreground mb-2">
            {isLogin ? "Welcome back" : "Create Account"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isLogin ? "New here? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Create an account" : "Login"}
            </button>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12"
                    required={!isLogin}
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-3">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedRole === role.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <role.icon className={`w-5 h-5 mb-2 ${selectedRole === role.id ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`font-medium text-sm ${selectedRole === role.id ? "text-primary" : "text-foreground"}`}>
                          {role.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin Code Input */}
                {selectedRole === "admin" && (
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Admin Secret Code</label>
                    <Input
                      type="password"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      placeholder="Enter admin code"
                      className="h-12"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Contact your system administrator for the code</p>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="h-12"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    Remember me?
                  </label>
                </div>
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Copyrights ©2024 Smart Real Estate. Built with{" "}
            <span className="text-accent">❤</span>
          </p>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex w-1/2 gradient-navy flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-xl z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background/95 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <feature.icon className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default Auth;
