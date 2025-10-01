import { FileText, Check, X, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";

const Offers = () => {
  const receivedOffers = [
    {
      id: 1,
      image: property1,
      property: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      buyer: "John Smith",
      offerAmount: "$4,300,000",
      listingPrice: "$4,500,000",
      status: "pending",
      date: "2024-01-15",
      message: "Very interested in this property. Ready to close within 30 days.",
    },
    {
      id: 2,
      image: property2,
      property: "Downtown Penthouse",
      location: "Manhattan, NY",
      buyer: "Sarah Johnson",
      offerAmount: "$3,500,000",
      listingPrice: "$3,800,000",
      status: "pending",
      date: "2024-01-14",
      message: "Cash offer. No contingencies.",
    },
  ];
  
  const sentOffers = [
    {
      id: 1,
      image: property3,
      property: "Waterfront Condo",
      location: "Miami Beach, FL",
      seller: "Michael Chen",
      offerAmount: "$2,000,000",
      askingPrice: "$2,100,000",
      status: "accepted",
      date: "2024-01-10",
      counterOffer: null,
    },
    {
      id: 2,
      image: property1,
      property: "Beachfront Estate",
      location: "Malibu, CA",
      seller: "Emily Rodriguez",
      offerAmount: "$5,200,000",
      askingPrice: "$5,500,000",
      status: "countered",
      date: "2024-01-12",
      counterOffer: "$5,400,000",
    },
    {
      id: 3,
      image: property2,
      property: "City Loft",
      location: "San Francisco, CA",
      seller: "David Park",
      offerAmount: "$1,800,000",
      askingPrice: "$1,900,000",
      status: "rejected",
      date: "2024-01-08",
      counterOffer: null,
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "accepted":
        return <Badge className="bg-green-500"><Check className="h-3 w-3 mr-1" /> Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-red-500"><X className="h-3 w-3 mr-1" /> Rejected</Badge>;
      case "countered":
        return <Badge className="bg-blue-500"><FileText className="h-3 w-3 mr-1" /> Countered</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <FileText className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">Offer Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Property <span className="text-gradient-gold">Offers</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Manage all your property offers in one place - submit, review, accept, or counter offers seamlessly
              </p>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Offers</h3>
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <p className="text-3xl font-bold text-primary">5</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-primary">2</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Accepted</h3>
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-primary">1</p>
              </Card>
              
              <Card className="p-6 shadow-luxury hover-gold">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Rejected</h3>
                  <X className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-primary">1</p>
              </Card>
            </div>
            
            {/* Offers Tabs */}
            <Tabs defaultValue="received" className="space-y-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="received">Offers Received</TabsTrigger>
                <TabsTrigger value="sent">Offers Sent</TabsTrigger>
              </TabsList>
              
              {/* Received Offers */}
              <TabsContent value="received" className="space-y-6">
                {receivedOffers.map((offer) => (
                  <Card key={offer.id} className="overflow-hidden shadow-luxury">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      {/* Property Image & Info */}
                      <div className="md:col-span-1">
                        <img
                          src={offer.image}
                          alt={offer.property}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-lg text-primary mb-1">{offer.property}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{offer.location}</p>
                        {getStatusBadge(offer.status)}
                      </div>
                      
                      {/* Offer Details */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">Offer Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Buyer</p>
                              <p className="font-semibold text-foreground">{offer.buyer}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Date</p>
                              <p className="font-semibold text-foreground">{offer.date}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Listing Price</p>
                              <p className="font-semibold text-foreground">{offer.listingPrice}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Offer Amount</p>
                              <p className="font-bold text-accent text-lg">{offer.offerAmount}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Message from Buyer</p>
                          <p className="text-sm text-foreground italic bg-muted p-3 rounded-lg">
                            "{offer.message}"
                          </p>
                        </div>
                        
                        {offer.status === "pending" && (
                          <div className="flex gap-3 pt-2">
                            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                              <Check className="mr-2 h-4 w-4" />
                              Accept Offer
                            </Button>
                            <Button variant="outline" className="flex-1 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                              Counter Offer
                            </Button>
                            <Button variant="outline" className="flex-1 hover:bg-red-500 hover:text-white hover:border-red-500">
                              <X className="mr-2 h-4 w-4" />
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              {/* Sent Offers */}
              <TabsContent value="sent" className="space-y-6">
                <div className="flex justify-end mb-4">
                  <Button className="gradient-gold text-primary font-semibold hover:shadow-gold transition-smooth">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Offer
                  </Button>
                </div>
                
                {sentOffers.map((offer) => (
                  <Card key={offer.id} className="overflow-hidden shadow-luxury">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      {/* Property Image & Info */}
                      <div className="md:col-span-1">
                        <img
                          src={offer.image}
                          alt={offer.property}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-lg text-primary mb-1">{offer.property}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{offer.location}</p>
                        {getStatusBadge(offer.status)}
                      </div>
                      
                      {/* Offer Details */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">Your Offer</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Seller</p>
                              <p className="font-semibold text-foreground">{offer.seller}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Date Submitted</p>
                              <p className="font-semibold text-foreground">{offer.date}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Asking Price</p>
                              <p className="font-semibold text-foreground">{offer.askingPrice}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Your Offer</p>
                              <p className="font-bold text-accent text-lg">{offer.offerAmount}</p>
                            </div>
                          </div>
                        </div>
                        
                        {offer.counterOffer && (
                          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                            <p className="text-sm font-medium text-blue-600 mb-2">Counter Offer Received</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Seller's Counter:</span>
                              <span className="font-bold text-blue-600 text-lg">{offer.counterOffer}</span>
                            </div>
                            <div className="flex gap-3 mt-4">
                              <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                                Accept Counter
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Submit New Offer
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {offer.status === "accepted" && (
                          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                            <p className="text-sm font-medium text-green-600 mb-2">✓ Offer Accepted</p>
                            <p className="text-sm text-muted-foreground">
                              Congratulations! The seller has accepted your offer. You'll be contacted shortly to proceed with the transaction.
                            </p>
                          </div>
                        )}
                        
                        {offer.status === "rejected" && (
                          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                            <p className="text-sm font-medium text-red-600 mb-2">✗ Offer Declined</p>
                            <p className="text-sm text-muted-foreground">
                              Unfortunately, the seller has declined your offer. You may submit a new offer if you're still interested.
                            </p>
                          </div>
                        )}
                        
                        <Button variant="outline" className="w-full">
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Offers;
