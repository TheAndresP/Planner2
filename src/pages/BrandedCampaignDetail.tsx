import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { brandedCampaignsDatabase } from "@/data/contentDatabase";
import { ArrowLeft } from "lucide-react";

const BrandedCampaignDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const campaign = brandedCampaignsDatabase.find(c => c.id === slug);
  
  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Branded Campaign Not Found</h1>
          <Link to="/branded-content">
            <Button>Return to Branded Content</Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <Link to="/branded-content" className="inline-flex items-center gap-2 mb-6 text-primary-foreground hover:text-primary-foreground/80 transition-colors font-bold uppercase">
            <ArrowLeft className="w-4 h-4" />
            Back to Branded Content
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase">
            {campaign.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* TYPE Field */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Type</h2>
            <Link 
              to={`/category/${(campaign.contentType || 'Branded Content Campaign').toLowerCase().replace(/ /g, '-')}`}
              className="text-lg font-medium text-primary hover:text-primary/80 transition-colors underline"
            >
              {campaign.contentType || 'Branded Content Campaign'}
            </Link>
          </div>
          {/* Flight Dates */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Flight Dates</h2>
            <p className="text-lg font-medium">{campaign.flightDates}</p>
          </div>

          {/* Campaign Type */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Campaign Type</h2>
            <p className="text-lg font-medium">{campaign.campaignType}</p>
          </div>

          {/* Description */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Description</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">{campaign.description}</p>
          </div>

          {/* Deliverables */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Deliverables</h2>
            <div className="space-y-3">
              {campaign.deliverables.split(';').map((deliverable, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground leading-relaxed font-medium">
                    {deliverable.trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandedCampaignDetail;