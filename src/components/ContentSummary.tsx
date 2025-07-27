import { Link } from "react-router-dom";
import { Calendar, Play, Users } from "lucide-react";
import type { ProcessedMonthContent } from "../data/dataHelpers";

interface ContentSummaryProps {
  monthData: ProcessedMonthContent;
  showLimits?: boolean;
  compact?: boolean;
}

const ContentSummary: React.FC<ContentSummaryProps> = ({ 
  monthData, 
  showLimits = true,
  compact = false 
}) => {
  const hasContent = monthData.campaigns.length > 0 || 
                    monthData.seriesPremieres.length > 0 || 
                    monthData.events.length > 0 ||
                    monthData.keyInitiatives.length > 0 ||
                    monthData.brandedCampaigns.length > 0;

  if (!hasContent) {
    return (
      <div className={`text-center ${compact ? 'py-4' : 'py-8'}`}>
        <p className="text-sm text-muted-foreground font-medium uppercase">
          No Content Scheduled
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Campaigns */}
      {monthData.campaigns.length > 0 && (
        <div>
          <h4 className={`font-black mb-2 text-primary uppercase ${compact ? 'text-xs' : 'text-sm'}`}>
            Campaigns
          </h4>
          <div className="space-y-2">
            {monthData.campaigns
              .slice(0, showLimits ? 2 : undefined)
              .map((campaign) => (
                <Link
                  key={campaign.id}
                  to={`/campaigns/${campaign.slug}`}
                  className={`block bg-primary/10 p-2 font-medium hover:bg-primary/20 transition-colors ${compact ? 'text-xs' : 'text-sm'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <Play className={`text-primary ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className="truncate">{campaign.title}</span>
                  </div>
                </Link>
              ))}
            {showLimits && monthData.campaigns.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{monthData.campaigns.length - 2} more
              </p>
            )}
          </div>
        </div>
      )}

      {/* Series Premieres */}
      {monthData.seriesPremieres.length > 0 && (
        <div>
          <h4 className={`font-black mb-2 text-accent uppercase ${compact ? 'text-xs' : 'text-sm'}`}>
            Series
          </h4>
          <div className="space-y-2">
            {monthData.seriesPremieres
              .slice(0, showLimits ? 3 : undefined)
              .map((series) => (
                <Link
                  key={series.id}
                  to={`/series/${series.slug}`}
                  className={`block bg-accent/10 p-2 font-medium hover:bg-accent/20 transition-colors ${compact ? 'text-xs' : 'text-sm'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <Users className={`text-accent ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className="truncate">{series.title}</span>
                    {series.isNew && (
                      <span className="bg-accent text-accent-foreground text-xs px-1 uppercase font-bold">
                        New
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            {showLimits && monthData.seriesPremieres.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{monthData.seriesPremieres.length - 3} more
              </p>
            )}
          </div>
        </div>
      )}

      {/* Branded Campaigns */}
      {monthData.brandedCampaigns.length > 0 && (
        <div>
          <h4 className={`font-black mb-2 text-orange-600 uppercase ${compact ? 'text-xs' : 'text-sm'}`}>
            Branded Content
          </h4>
          <div className="space-y-2">
            {monthData.brandedCampaigns
              .slice(0, showLimits ? 2 : undefined)
              .map((campaign) => (
                <Link
                  key={campaign.id}
                  to={`/branded-campaigns/${campaign.id}`}
                  className={`block bg-orange-600/10 p-2 font-medium hover:bg-orange-600/20 transition-colors ${compact ? 'text-xs' : 'text-sm'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className={`text-orange-600 ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className="truncate">{campaign.title}</span>
                  </div>
                </Link>
              ))}
            {showLimits && monthData.brandedCampaigns.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{monthData.brandedCampaigns.length - 2} more
              </p>
            )}
          </div>
        </div>
      )}

      {/* Events & Initiatives */}
      {(monthData.events.length > 0 || monthData.keyInitiatives.length > 0) && (
        <div>
          <h4 className={`font-black mb-2 text-secondary uppercase ${compact ? 'text-xs' : 'text-sm'}`}>
            Events
          </h4>
          <div className="space-y-1">
            {monthData.events
              .slice(0, showLimits ? 2 : undefined)
              .map((event) => (
                <div key={event.id} className={`bg-secondary/10 p-2 font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
                  <span className="truncate">{event.title}</span>
                </div>
              ))}
            {monthData.keyInitiatives
              .slice(0, showLimits ? 1 : undefined)
              .map((initiative) => (
                <div key={initiative.id} className={`bg-secondary/10 p-2 font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
                  <span className="truncate">{initiative.title}</span>
                </div>
              ))}
            {showLimits && (monthData.events.length + monthData.keyInitiatives.length > 3) && (
              <p className="text-xs text-muted-foreground">
                +{(monthData.events.length + monthData.keyInitiatives.length) - 3} more
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSummary;