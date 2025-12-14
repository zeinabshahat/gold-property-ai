import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Home, 
  Building2, 
  Palette, 
  Search, 
  Settings, 
  Eye, 
  EyeOff, 
  Key, 
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Slider images
import sliderOwner from "@/assets/auth-slider-owner.jpg";
import sliderCustomer from "@/assets/auth-slider-customer.jpg";
import sliderDesigner from "@/assets/auth-slider-designer.jpg";

// Role slides for register page
const roleSlides = [
  {
    id: "owner",
    image: sliderOwner,
    title: "Property Owner",
    subtitle: "List, manage, and sell your properties easily.",
    icon: Key,
  },
  {
    id: "customer",
    image: sliderCustomer,
    title: "Customer",
    subtitle: "Discover, explore, and find your perfect home.",
    icon: Search,
  },
  {
    id: "designer",
    image: sliderDesigner,
    title: "Interior Designer",
    subtitle: "Showcase your designs and connect with property owners.",
    icon: Palette,
  },
];

// Services for login page
const services = [
  { icon: Home, title: "Property Listing", subtitle: "List & manage properties" },
  { icon: Search, title: "Buying & Renting", subtitle: "Find your dream home" },
  { icon: Palette, title: "Interior Design", subtitle: "Professional design services" },
  { icon: Settings, title: "Property Management", subtitle: "Complete management solutions" },
];

// Role options for registration
const roleOptions = [
  { id: "owner", label: "Property Owner", icon: Key, description: "List and manage your properties" },
  { id: "customer", label: "Customer", icon: Search, description: "Browse and book properties" },
  { id: "designer", label: "Interior Designer", icon: Palette, description: "Design and staging services" },
];

const ADMIN_SECRET_CODE = "ADMIN2024";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [adminCode, setAdminCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-slide for register page
  useEffect(() => {
    if (!isLogin) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % roleSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLogin]);

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
        // Validate passwords match
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % roleSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + roleSlides.length) % roleSlides.length);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dynamic based on login/register */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        {isLogin ? (
          // Login: Services Panel
          <div className="w-full h-full gradient-navy flex flex-col justify-center items-center p-12 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-lg">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Our Services
              </h2>
              <p className="text-primary-foreground/70 mb-10">
                Discover what we offer to help you find your perfect property
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-background/95 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Register: Image Slider
          <div className="w-full h-full relative">
            {/* Slider Images */}
            {roleSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              </div>
            ))}
            
            {/* Slide Content */}
            <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const IconComponent = roleSlides[currentSlide].icon;
                    return (
                      <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                    );
                  })()}
                  <h2 className="text-3xl font-bold text-primary-foreground">
                    {roleSlides[currentSlide].title}
                  </h2>
                </div>
                <p className="text-lg text-primary-foreground/80 mb-8">
                  {roleSlides[currentSlide].subtitle}
                </p>
                
                {/* Slider indicators */}
                <div className="flex items-center gap-3">
                  {roleSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-accent"
                          : "w-4 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center shadow-gold">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-foreground mb-2">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isLogin ? "Sign in to your account" : "Join us and start your journey"}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-border focus:border-accent focus:ring-accent"
                    required={!isLogin}
                  />
                </div>

                {/* Role Selection Cards */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">I am a...</label>
                  <div className="grid grid-cols-1 gap-3">
                    {roleOptions.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4 ${
                          selectedRole === role.id
                            ? "border-accent bg-accent/5 shadow-gold"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          selectedRole === role.id ? "bg-accent/20" : "bg-muted"
                        }`}>
                          <role.icon className={`w-5 h-5 ${selectedRole === role.id ? "text-accent" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${selectedRole === role.id ? "text-foreground" : "text-foreground"}`}>
                            {role.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {isLogin ? "Your Email" : "Email"}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 border-border focus:border-accent focus:ring-accent"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="h-12 pr-12 border-border focus:border-accent focus:ring-accent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="h-12 pr-12 border-border focus:border-accent focus:ring-accent"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <button type="button" className="text-sm text-accent hover:underline font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </Button>

            {/* Social Login (Login only) */}
            {isLogin && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">Instant Login</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-border hover:border-accent hover:bg-accent/5"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-border hover:border-accent hover:bg-accent/5"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continue with Facebook
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Switch between Login/Register */}
          <p className="text-center text-muted-foreground mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent hover:underline font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
