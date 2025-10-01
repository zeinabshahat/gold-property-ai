import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white border-t border-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-accent" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">Smart Real Estate</span>
                <span className="text-xs text-accent">عقارات بذكاء</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Your smart gateway to fair property value. AI-powered real estate solutions for modern investors.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gradient-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/calculator" className="hover:text-accent transition-smooth">Smart Calculator</Link></li>
              <li><Link to="/comparison" className="hover:text-accent transition-smooth">Property Comparison</Link></li>
              <li><Link to="/analytics" className="hover:text-accent transition-smooth">Market Analytics</Link></li>
              <li><Link to="/investment" className="hover:text-accent transition-smooth">Investment Manager</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-gradient-gold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent transition-smooth">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gradient-gold">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@smartrealestate.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>123 Real Estate St, City</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex items-center space-x-3 mt-4">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-smooth">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-smooth">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-smooth">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-smooth">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-secondary text-center text-sm text-white/70">
          <p>© 2025 Smart Real Estate. All rights reserved. Built with intelligence and trust.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
