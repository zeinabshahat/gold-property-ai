import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Comparison from "./pages/Comparison";
import Analytics from "./pages/Analytics";
import Investment from "./pages/Investment";
import Offers from "./pages/Offers";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import DesignerDashboard from "./pages/dashboard/DesignerDashboard";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import OwnerDashboard from "./pages/dashboard/OwnerDashboard";
import PublicDesignerProfile from "./pages/dashboard/PublicDesignerProfile";
import PublicOwnerProfile from "./pages/dashboard/PublicOwnerProfile";
import DesignersMarketplace from "./pages/dashboard/DesignersMarketplace";
import SubmitDesignOffer from "./pages/dashboard/SubmitDesignOffer";
import AIPropertyAssistant from "./pages/dashboard/AIPropertyAssistant";
import AvailableProjects from "./pages/dashboard/AvailableProjects";
import ProjectDetails from "./pages/dashboard/ProjectDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/auth" element={<Auth />} />
          {/* Dashboard Routes */}
          <Route path="/dashboard/designer" element={<DesignerDashboard />} />
          <Route path="/dashboard/designer/*" element={<DesignerDashboard />} />
          <Route path="/dashboard/designer/available-projects" element={<AvailableProjects />} />
          <Route path="/dashboard/designer/project/:id" element={<ProjectDetails />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/customer/*" element={<CustomerDashboard />} />
          <Route path="/dashboard/customer/designers-marketplace" element={<DesignersMarketplace />} />
          <Route path="/dashboard/customer/submit-design-offer" element={<SubmitDesignOffer />} />
          <Route path="/dashboard/customer/ai-assistant" element={<AIPropertyAssistant />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/owner/designers-marketplace" element={<DesignersMarketplace />} />
          <Route path="/dashboard/owner/submit-design-offer" element={<SubmitDesignOffer />} />
          <Route path="/dashboard/owner/ai-assistant" element={<AIPropertyAssistant />} />
          <Route path="/profile/designer/:id" element={<PublicDesignerProfile />} />
          <Route path="/profile/owner/:id" element={<PublicOwnerProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
