import { Link } from "react-router-dom";
import { useContentData } from "@/hooks/useContentData";
import ContentSummary from "@/components/ContentSummary";
import { ArrowLeft, Calendar } from "lucide-react";

const Timeline = () => {
  const { allMonths, formatMonthSlug } = useContentData();

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
            Content Timeline
          </h1>
          <p className="text-xl mt-4 font-bold uppercase">
            Horizontal view of all campaigns, series, and events
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black mb-4 uppercase">September 2025 - December 2026</h2>
            <p className="text-muted-foreground font-medium">Scroll horizontally to explore the complete content timeline</p>
          </div>

          {/* Horizontal Timeline */}
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-6 min-w-max">
              {allMonths.map((monthData, index) => {
                const slug = formatMonthSlug(monthData.month, monthData.year);
                const hasContent = monthData.campaigns.length > 0 || 
                                  monthData.seriesPremieres.length > 0 || 
                                  monthData.events.length > 0 ||
                                  monthData.keyInitiatives.length > 0;
                
                return (
                  <div key={slug} className="flex-shrink-0 w-80">
                    {/* Timeline Node */}
                    <div className="relative">
                      {/* Timeline Line */}
                      {index < allMonths.length - 1 && (
                        <div className="absolute top-8 right-0 w-6 h-0.5 bg-border"></div>
                      )}
                      
                      {/* Month Card */}
                      <Link to={`/${slug}`} className="block">
                        <div className="brutalist-card p-6 hover:shadow-cultural transition-all duration-200 cursor-pointer">
                          {/* Month Header */}
                          <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 mb-2">
                              <Calendar className="w-5 h-5 text-primary" />
                              <h3 className="text-lg font-black uppercase">{monthData.month}</h3>
                            </div>
                            <p className="text-2xl font-black text-primary">{monthData.year}</p>
                          </div>

                          {/* Content Summary */}
                          <ContentSummary monthData={monthData} showLimits={true} compact={true} />

                          {/* View Month Button */}
                          <div className="mt-6 pt-4 border-t border-border">
                            <button className="w-full text-xs font-black uppercase text-primary hover:text-primary-glow transition-colors">
                              View Full Month →
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground font-medium">
              💡 Click on any month card to view details • Click on campaigns/series for specific pages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;