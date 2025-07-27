import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContentData } from "@/hooks/useContentData";
import { ArrowLeft } from "lucide-react";

const MonthPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getMonthBySlug } = useContentData();
  
  if (!slug) return <div>Month not found</div>;
  
  const monthData = getMonthBySlug(slug);
  
  if (!monthData) {
    return <div>Month not found</div>;
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
          <h2 className="text-4xl md:text-5xl font-black uppercase">
            {monthData.month} {monthData.year}
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Campaigns & Tentpoles */}
          {monthData.campaigns.length > 0 && (
            <section>
              <h3 className="text-2xl font-black mb-6 uppercase">Campaigns & Tentpoles</h3>
              <div className="space-y-6">
                {monthData.campaigns.map((campaign) => (
                  <div key={campaign.id} className="brutalist-card p-6">
                    <div>
                      <h4 className="text-xl font-black mb-4">
                        <Link 
                          to={`/campaigns/${campaign.slug}`}
                          className="text-primary hover:text-primary-glow transition-colors uppercase"
                        >
                          {campaign.title}
                        </Link>
                        <span className="text-sm font-medium text-muted-foreground ml-2 normal-case">
                          ({campaign.flightDates})
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h5 className="font-black mb-2 uppercase">Flight dates:</h5>
                        <p className="text-muted-foreground">{campaign.flightDates}</p>
                      </div>
                      <div>
                        <h5 className="font-black mb-2 uppercase">Overview:</h5>
                        <p className="text-muted-foreground">{campaign.overview}</p>
                      </div>
                      <div>
                        <h5 className="font-black mb-2 uppercase">Platforms & Distribution:</h5>
                        <p className="text-muted-foreground">{campaign.platforms}</p>
                      </div>
                      <div>
                        <h5 className="font-black mb-2 uppercase">Key Deliverables:</h5>
                        <p className="text-muted-foreground">{campaign.deliverables}</p>
                      </div>
                      <div>
                        <h5 className="font-black mb-2 uppercase">Participating Series:</h5>
                        <ul className="list-none text-muted-foreground space-y-1">
                          {campaign.participatingSeries.map((seriesData, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary"></div>
                              <Link 
                                to={`/series/${seriesData.slug}`}
                                className="text-primary hover:text-primary-glow transition-colors font-medium"
                              >
                                {seriesData.series.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Series Premieres */}
          {monthData.seriesPremieres.length > 0 && (
            <section>
              <h3 className="text-2xl font-black mb-6 uppercase">Series Premieres</h3>
              <div className="grid gap-4">
                {monthData.seriesPremieres.map((series) => (
                  <div key={series.id} className="brutalist-card p-6">
                    <p className="text-lg">
                      <Link 
                        to={`/series/${series.slug}`}
                        className="text-primary hover:text-primary-glow transition-colors font-black uppercase"
                      >
                        {series.title}
                      </Link>
                      <span className="text-muted-foreground ml-2 font-medium">
                        – {series.season} Premiere (Premiere week: {series.premiereDate})
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Specials */}
          {monthData.specials && monthData.specials.length > 0 && (
            <section>
              <h3 className="text-2xl font-black mb-6 uppercase">Specials</h3>
              <div className="space-y-6">
                {monthData.specials.map((special) => (
                  <div key={special.id} className="brutalist-card p-6">
                    <h4 className="text-xl font-black mb-4 uppercase">{special.title}</h4>
                    <div className="whitespace-pre-line text-muted-foreground font-medium">
                      {special.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Events */}
          {monthData.events && monthData.events.length > 0 && (
            <section>
              <h3 className="text-2xl font-black mb-6 uppercase">Events</h3>
              <div className="brutalist-card p-6">
                <ul className="space-y-2">
                  {monthData.events.map((event, index) => (
                    <li key={index} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent"></div>
                      <strong className="text-foreground font-bold">{event.title}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Key Initiatives */}
          {monthData.keyInitiatives && monthData.keyInitiatives.length > 0 && (
            <section>
              <h3 className="text-2xl font-black mb-6 uppercase">Key Initiatives</h3>
              <div className="brutalist-card p-6">
                <ul className="space-y-2">
                  {monthData.keyInitiatives.map((initiative, index) => (
                    <li key={index} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary"></div>
                      <strong className="text-foreground font-bold">{initiative.title}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Branded Content Campaigns */}
          {monthData.brandedCampaigns && monthData.brandedCampaigns.length > 0 && (
            <section>
              <h3 className="text-2xl font-black mb-6 uppercase">Branded Content Campaigns</h3>
              <div className="space-y-6">
                {monthData.brandedCampaigns.map((campaign) => (
                  <div key={campaign.id} className="brutalist-card p-6">
                    <div>
                      <h4 className="text-xl font-black mb-4">
                        <Link 
                          to={`/branded-campaigns/${campaign.id}`}
                          className="text-orange-600 hover:text-orange-700 transition-colors uppercase"
                        >
                          {campaign.title}
                        </Link>
                        <span className="text-sm font-medium text-muted-foreground ml-2 normal-case">
                          ({campaign.flightDates})
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h5 className="font-black mb-2 uppercase">Campaign Type:</h5>
                        <p className="text-muted-foreground">{campaign.campaignType}</p>
                      </div>
                      <div>
                        <h5 className="font-black mb-2 uppercase">Flight dates:</h5>
                        <p className="text-muted-foreground">{campaign.flightDates}</p>
                      </div>
                      <div>
                        <h5 className="font-black mb-2 uppercase">Description:</h5>
                        <p className="text-muted-foreground">{campaign.description}</p>
                      </div>
                      <div>
                        <h5 className="font-black mb-2 uppercase">Deliverables:</h5>
                        <div className="space-y-2">
                          {campaign.deliverables.split(';').map((deliverable, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-orange-600 mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{deliverable.trim()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {monthData.campaigns.length === 0 && 
           monthData.seriesPremieres.length === 0 && 
           (!monthData.events || monthData.events.length === 0) &&
           (!monthData.keyInitiatives || monthData.keyInitiatives.length === 0) &&
           (!monthData.specials || monthData.specials.length === 0) &&
           (!monthData.brandedCampaigns || monthData.brandedCampaigns.length === 0) && (
            <div className="text-center py-16">
              <div className="brutalist-card p-8">
                <h3 className="text-xl font-black mb-4 uppercase">No Content Scheduled</h3>
                <p className="text-muted-foreground mb-8 font-medium">
                  There are no campaigns, premieres, events, or initiatives scheduled for this month yet.
                </p>
                <Link to="/">
                  <button className="brutalist-button px-6 py-3">Return to Calendar</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthPage;