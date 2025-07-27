import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brandedCampaignsDatabase } from "@/data/contentDatabase";
import { ArrowLeft } from "lucide-react";

const BrandedContent = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 shadow-cultural relative">
        {/* Logo in upper right */}
        <div className="absolute top-4 right-4">
          <img 
            src="/lovable-uploads/87fbea9d-ec59-4ff1-8114-f0c154be182d.png" 
            alt="LatiNation" 
            className="h-12 w-auto"
          />
        </div>
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 text-primary-foreground hover:text-primary-foreground/80 transition-colors font-bold uppercase">
            <ArrowLeft className="w-4 h-4" />
            Back to Calendar
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase">
            Branded Content Campaigns
          </h1>
          <p className="text-xl mt-4 font-medium">
            Strategic partnerships and branded content initiatives
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandedCampaignsDatabase.map((campaign) => (
            <Link 
              key={campaign.id} 
              to={`/branded-campaigns/${campaign.id}`}
              className="brutalist-card p-6 hover:shadow-cultural-lg transition-shadow group"
            >
              <h3 className="text-xl font-black mb-3 uppercase group-hover:text-primary transition-colors">
                {campaign.title}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-accent font-bold uppercase text-sm">
                  {campaign.campaignType}
                </p>
                <p className="text-muted-foreground text-sm font-medium">
                  {campaign.flightDates}
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {campaign.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandedContent;