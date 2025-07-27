import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaigns } from "@/data/contentData";
import { ArrowLeft } from "lucide-react";

const CampaignDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const campaign = campaigns.find(c => c.slug === slug);
  
  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Campaign Not Found</h1>
          <Link to="/">
            <Button>Return to Calendar</Button>
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
          <Link to="/" className="inline-flex items-center gap-2 mb-6 text-primary-foreground hover:text-primary-foreground/80 transition-colors font-bold uppercase">
            <ArrowLeft className="w-4 h-4" />
            Back to Calendar
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
              to={`/category/${(campaign.contentType || 'Campaign').toLowerCase().replace(/ /g, '-')}`}
              className="text-lg font-medium text-primary hover:text-primary/80 transition-colors underline"
            >
              {campaign.contentType || 'Campaign'}
            </Link>
          </div>

          {/* Campaign Type */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Campaign Type</h2>
            <p className="text-lg font-medium">{campaign.contentType || 'Not specified'}</p>
          </div>

          {/* Flight Dates */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Flight Dates</h2>
            <p className="text-lg font-medium">{campaign.flightDates}</p>
          </div>

          {/* Overview */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Overview</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">{campaign.overview}</p>
          </div>

          {/* Platforms & Distribution */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Platforms & Distribution</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">{campaign.platforms}</p>
          </div>

          {/* Key Deliverables */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Key Deliverables</h2>
            {campaign.deliverables.includes('\n•') ? (
              <div className="space-y-3">
                {campaign.deliverables.split('\n').map((deliverable, index) => {
                  if (deliverable.trim().startsWith('•')) {
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed font-medium">
                          {deliverable.replace('•', '').trim()}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed font-medium">{campaign.deliverables}</p>
            )}
            
            {/* Google Presentation - Only for Hispanic Heritage Month */}
            {campaign.slug === 'echoes-of-cultura-hispanic-heritage-month-campaign' && (
              <div className="mt-8">
                <h3 className="text-lg font-black mb-4 uppercase">As presented to Horizon</h3>
                <div className="aspect-video w-full">
                  <iframe
                    src="https://docs.google.com/presentation/d/1SfeSPp5Khs6B4WWbdVoik9uGoK167JF7dbFMV2gecjE/embed?start=false&loop=false&delayms=3000"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg border-2 border-foreground"
                    title="Hispanic Heritage Month Presentation"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Participating Series */}
          <div className="brutalist-card p-6">
            <h2 className="text-xl font-black mb-4 uppercase">Participating Series</h2>
            <p className="text-muted-foreground leading-relaxed font-medium mb-4">
              (These series should have a special episode around the campaign, while other series should have a segment and/or social content aligned with the campaign)
            </p>
            <ul className="space-y-2">
              {campaign.participatingSeries.map((series, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary"></div>
                  <span className="text-muted-foreground font-medium">{series}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;