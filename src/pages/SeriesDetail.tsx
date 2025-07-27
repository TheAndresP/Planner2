import { useParams, Link } from 'react-router-dom';
import { useContentData } from '@/hooks/useContentData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Users, TrendingUp, Target, Star } from 'lucide-react';

const SeriesDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getSeriesBySlug, generateSlug } = useContentData();
  
  if (!slug) {
    return <div>Series not found</div>;
  }

  const seriesData = getSeriesBySlug(slug);
  
  if (!seriesData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Series Not Found</h1>
            <Link to="/">
              <Button variant="outline">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getPillarColor = (pillar: string) => {
    switch (pillar) {
      case 'Roots': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'Culture': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Latina': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'Queer': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case 'Long-form Series': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Short-form Series': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">{seriesData.title}</h1>
            {seriesData.isNew && (
              <Badge variant="destructive" className="text-sm">
                NEW
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {seriesData.pillar && (
              <Badge className={getPillarColor(seriesData.pillar)}>
                LatiNation {seriesData.pillar}
              </Badge>
            )}
            <Badge className={getContentTypeColor(seriesData.contentType)}>
              {seriesData.contentType}
            </Badge>
            <Badge variant="outline">
              {seriesData.season}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  About This Series
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {seriesData.description}
                </p>
              </CardContent>
            </Card>

            {/* Sales Opportunity - Only for short-form series */}
            {seriesData.contentType === 'Short-form Series' && seriesData.opportunityForSales && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Opportunity for Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {seriesData.opportunityForSales}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Performance Stats - Only for short-form series with stats */}
            {seriesData.contentType === 'Short-form Series' && (seriesData.bestPerformingVideo || seriesData.overallTopStats) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {seriesData.bestPerformingVideo && (
                    <div>
                      <h4 className="font-semibold mb-2">Best Performing Video</h4>
                      <p className="text-muted-foreground">{seriesData.bestPerformingVideo}</p>
                    </div>
                  )}
                  {seriesData.overallTopStats && (
                    <div>
                      <h4 className="font-semibold mb-2">Overall Top Stats</h4>
                      <p className="text-muted-foreground">{seriesData.overallTopStats}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Key Guests - Only for short-form series with guests */}
            {seriesData.contentType === 'Short-form Series' && seriesData.keyGuests && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Key Guests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {seriesData.keyGuests}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Series Details */}
            <Card>
              <CardHeader>
                <CardTitle>Series Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Premiere Date</div>
                  <div className="font-medium">{seriesData.premiereDate}</div>
                </div>
                
                {seriesData.episodesAnnually && (
                  <div>
                    <div className="text-sm text-muted-foreground">Episodes</div>
                    <div className="font-medium">{seriesData.episodesAnnually}</div>
                  </div>
                )}

                {seriesData.pillar && (
                  <div>
                    <div className="text-sm text-muted-foreground">Pillar</div>
                    <div className="font-medium">LatiNation {seriesData.pillar}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-muted-foreground">Content Type</div>
                  <div className="font-medium">{seriesData.contentType}</div>
                </div>

                {/* Parent Series - Only for short-form series */}
                {seriesData.contentType === 'Short-form Series' && seriesData.parentSeries && (
                  <div>
                    <Separator className="my-4" />
                    <div>
                      <div className="text-sm text-muted-foreground">Part of</div>
                      <div className="font-medium">
                        <Link 
                          to={`/series/${generateSlug(seriesData.parentSeries)}`}
                          className="text-primary hover:underline"
                        >
                          {seriesData.parentSeries}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/">
                  Explore More Content
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/content-overview">
                  View All Series
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;