import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useContentData } from "@/hooks/useContentData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { allSeries, allCampaigns } = useContentData();
  const [seriesFilter, setSeriesFilter] = useState<'all' | 'long-form-series' | 'short-form-series'>('all');

  // Convert URL category back to display format
  const categoryDisplayMap: { [key: string]: string } = {
    'series': 'Series',
    'long-form-series': 'Long-form Series',
    'short-form-series': 'Short-form Series',
    'special': 'Special',
    'latination-campaign': 'LatiNation Campaign',
    'tentpole-campaign': 'Tentpole Campaign',
    'branded-content-campaign': 'Branded Content Campaign'
  };

  const categoryDisplay = categoryDisplayMap[category || ''] || category?.replace(/-/g, ' ') || 'Unknown';

  // Filter content by category
  let filteredSeries = allSeries;
  
  // If we're on the general series page, show all series with optional filtering
  if (category === 'series') {
    if (seriesFilter !== 'all') {
      filteredSeries = allSeries.filter(s => 
        (s.contentType || 'Long-form Series').toLowerCase().replace(/ /g, '-') === seriesFilter
      );
    }
  } else {
    // For specific content type pages
    filteredSeries = allSeries.filter(s => 
      (s.contentType || 'Long-form Series').toLowerCase().replace(/ /g, '-') === category
    );
  }
  
  const filteredCampaigns = allCampaigns.filter(c => {
    const contentType = (c.contentType || 'Campaign').toLowerCase().replace(/ /g, '-');
    return contentType === category;
  });

  const allContent = [
    ...filteredSeries.map(s => ({
      ...s,
      type: 'series' as const,
      link: `/series/${s.slug}`
    })),
    ...filteredCampaigns.map(c => ({
      ...c,
      type: 'campaign' as const,
      link: `/campaigns/${c.slug}`
    }))
  ];

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
            All {categoryDisplay} Content
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Series Filter Buttons - only show on general series page */}
          {category === 'series' && (
            <div className="mb-8 flex flex-wrap gap-3">
              <Button
                variant={seriesFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSeriesFilter('all')}
                className="font-bold uppercase"
              >
                All Series
              </Button>
              <Button
                variant={seriesFilter === 'long-form-series' ? 'default' : 'outline'}
                onClick={() => setSeriesFilter('long-form-series')}
                className="font-bold uppercase"
              >
                Long-form Series
              </Button>
              <Button
                variant={seriesFilter === 'short-form-series' ? 'default' : 'outline'}
                onClick={() => setSeriesFilter('short-form-series')}
                className="font-bold uppercase"
              >
                Short-form Series
              </Button>
            </div>
          )}
          
          {allContent.length === 0 ? (
            <div className="brutalist-card p-8 text-center">
              <h2 className="text-2xl font-black mb-4 uppercase">No Content Found</h2>
              <p className="text-muted-foreground font-medium mb-4">
                No content of type "{categoryDisplay}" is currently available.
              </p>
              <Link to="/admin" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold uppercase hover:bg-primary/90 transition-colors">
                Manage Content
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allContent.map((item) => (
                <Link key={item.id} to={item.link}>
                  <Card className="brutalist-card p-0 h-full hover:scale-105 transition-transform">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-muted-foreground font-bold uppercase flex items-center justify-between">
                          <span>{item.type === 'series' ? (item.contentType || 'Long-form Series') : 'Campaign'}</span>
                        </div>
                        {item.type === 'series' && item.isNew && (
                          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-sm text-xs font-bold uppercase">
                            New
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg font-black uppercase leading-tight">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {item.type === 'series' ? (
                        <div className="space-y-2 text-sm text-muted-foreground font-medium">
                          <div>
                            <span className="font-bold">Season:</span> {item.season}
                          </div>
                          <div>
                            <span className="font-bold">Premiere:</span> {item.premiereDate}
                          </div>
                          {item.pillar && (
                            <div>
                              <span className="font-bold">Pillar:</span> {item.pillar}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm text-muted-foreground font-medium">
                          <div>
                            <span className="font-bold">Flight Dates:</span> {item.flightDates}
                          </div>
                          <div className="line-clamp-3">
                            {item.overview}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;