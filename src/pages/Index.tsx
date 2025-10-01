import { ArrowRight, Brain, GitCompare, TrendingUp, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";
import property4 from "@/assets/property4.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Valuation",
      description: "Get instant, accurate property valuations powered by advanced AI algorithms",
    },
    {
      icon: GitCompare,
      title: "Smart Comparisons",
      description: "Compare properties side-by-side with intelligent market insights",
    },
    {
      icon: TrendingUp,
      title: "Investment Tools",
      description: "Track your portfolio and maximize returns with data-driven analytics",
    },
  ];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Investor",
      content: "Smart Real Estate helped me find undervalued properties and make informed investment decisions. The AI valuation is incredibly accurate!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "First-time Buyer",
      content: "The comparison tool made it so easy to evaluate different properties. I felt confident in my purchase decision thanks to the transparent data.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Real Estate Agent",
      content: "This platform has transformed how I work with clients. The analytics and portfolio management features are game-changers.",
      rating: 5,
    },
  ];
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent font-semibold text-sm border border-accent/30">
                AI-Powered Real Estate Intelligence
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Your Smart Gateway to{" "}
              <span className="text-gradient-gold">Fair Property Value</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Discover transparent property valuations, intelligent comparisons, and data-driven investment insights. Make smarter real estate decisions with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gradient-gold text-primary font-bold text-lg px-8 hover:shadow-gold transition-smooth">
                Get Your Property Value <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white backdrop-blur-sm hover:bg-white hover:text-primary transition-smooth">
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Featured <span className="text-gradient-gold">Properties</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties with AI-verified valuations
            </p>
          </div>
          
          {/* Custom Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <PropertyCard
              image={property1}
              type="House"
              purpose="Sell"
              title="Modern Luxury Villa"
              location="Beverly Hills, CA"
              price="$4,500,000"
              size="large"
            />
            <PropertyCard
              image={property2}
              type="Apartment"
              purpose="Rent"
              title="Downtown Penthouse"
              location="Manhattan, NY"
              price="$8,500/mo"
              size="medium"
            />
            <PropertyCard
              image={property3}
              type="Condo"
              purpose="Sell"
              title="Waterfront Condo"
              location="Miami Beach, FL"
              price="$2,100,000"
              size="small"
            />
            <PropertyCard
              image={property4}
              type="House"
              purpose="Rent"
              title="Beachfront Estate"
              location="Malibu, CA"
              price="$15,000/mo"
              size="small"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Why Choose <span className="text-gradient-gold">Smart Real Estate</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge AI technology and real-time market data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-2xl shadow-luxury hover:shadow-gold transition-smooth border border-border hover:border-accent group"
                >
                  <div className="mb-6 inline-flex p-4 rounded-xl bg-accent/10 group-hover:bg-accent transition-smooth">
                    <Icon className="h-8 w-8 text-accent group-hover:text-accent-foreground transition-smooth" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Trusted by <span className="text-gradient-gold">Thousands</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our clients say about their experience with Smart Real Estate
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl shadow-luxury hover-gold border border-border"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Get Your Property's <span className="text-gradient-gold">True Value</span> Now
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of smart investors who trust our AI-powered platform for accurate property valuations and investment insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="gradient-gold text-primary font-bold text-lg px-8 hover:shadow-gold transition-smooth">
                Start Free Valuation <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary transition-smooth">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
