import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContentData } from "@/hooks/useContentData";
import { ArrowLeft } from "lucide-react";

interface FilterState {
  pillar: string;
  isNew: string;
  quarter: string;
  type: string;
}

interface ContentItem {
  id: string;
  name: string;
  type: string;
  link: string;
  quarter: string;
  pillar?: string;
  isNew?: boolean;
}

const ContentOverview = () => {
  const [searchParams] = useSearchParams();
  const { allCampaigns, allSeries, allMonths } = useContentData();
  const [filters, setFilters] = useState<FilterState>({
    pillar: "all",
    isNew: "all",
    quarter: "all",
    type: "all"
  });

  // Debug logging to see what's actually loaded
  console.log('📊 CONTENT OVERVIEW DEBUG:', {
    totalSeries: allSeries.length,
    longFormSeries: allSeries.filter(s => s.contentType === 'Long-form Series'),
    shortFormSeries: allSeries.filter(s => s.contentType === 'Short-form Series'),
    firstFewShortFormTitles: allSeries.filter(s => s.contentType === 'Short-form Series').slice(0, 5).map(s => s.title)
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const pillarParam = searchParams.get('pillar');
    const quarterParam = searchParams.get('quarter');
    const isNewParam = searchParams.get('isNew');
    
    setFilters({
      type: typeParam || "all",
      pillar: pillarParam || "all",
      quarter: quarterParam || "all",
      isNew: isNewParam || "all"
    });
  }, [searchParams]);

  const quarters = [
    { value: "q3-2025", label: "Q3 2025" },
    { value: "q4-2025", label: "Q4 2025" },
    { value: "q1-2026", label: "Q1 2026" },
    { value: "q2-2026", label: "Q2 2026" },
    { value: "q3-2026", label: "Q3 2026" },
    { value: "q4-2026", label: "Q4 2026" }
  ];

  const pillars = ["Roots", "Culture", "Latina", "Queer"];

  function getQuarter(month: string, year: number): string {
    const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1;
    if (monthNum >= 7 && monthNum <= 9) return `q3-${year}`;
    if (monthNum >= 10 && monthNum <= 12) return `q4-${year}`;
    if (monthNum >= 1 && monthNum <= 3) return `q1-${year}`;
    return `q2-${year}`;
  }

  function getQuarterFromDate(dateString: string): string {
    const parts = dateString.split('-');
    if (parts.length === 2) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      if (month >= 7 && month <= 9) return `q3-${year}`;
      if (month >= 10 && month <= 12) return `q4-${year}`;
      if (month >= 1 && month <= 3) return `q1-${year}`;
      return `q2-${year}`;
    }
    return "q3-2025"; // fallback
  }

  function getCampaignQuarter(flightDates: string): string {
    // Extract year from campaign ID or determine based on flight dates
    // Most 2026 campaigns are in the database with 2026 in their ID
    if (flightDates.includes('01/') || flightDates.includes('02/') || flightDates.includes('03/')) {
      return 'q1-2026'; // January-March 2026
    }
    if (flightDates.includes('04/') || flightDates.includes('05/')) {
      return 'q2-2026'; // April-May 2026
    }
    if (flightDates.includes('06/') || flightDates.includes('07/') || flightDates.includes('08/')) {
      return 'q3-2026'; // June-August 2026
    }
    if (flightDates.includes('09/') || flightDates.includes('10/')) {
      // September-October could be 2025 or 2026
      return flightDates.includes('2026') ? 'q4-2026' : 'q3-2025';
    }
    if (flightDates.includes('11/') || flightDates.includes('12/')) {
      return 'q4-2025'; // November-December 2025
    }
    return 'q3-2025'; // fallback
  }

  // Combine all content items
  const allContent: ContentItem[] = [
    ...allCampaigns.map(c => ({ 
      id: c.id,
      type: "Campaign", 
      name: c.title,
      link: `/campaigns/${c.slug}`,
      quarter: getCampaignQuarter(c.flightDates),
      pillar: undefined,
      isNew: false
    })),
    ...allSeries.map(s => ({ 
      id: s.id,
      type: s.contentType, 
      name: s.title,
      link: `/series/${s.slug}`,
      quarter: getQuarterFromDate(s.premiereDate),
      pillar: s.pillar,
      isNew: s.isNew || false
    })),
    // Add events and initiatives from months
    ...allMonths.flatMap(month => [
      ...(month.events || []).map(event => ({
        id: `event-${typeof event === 'object' ? event.id : event}`,
        name: typeof event === 'object' ? event.title : event,
        type: "Event",
        link: `/${month.year}-${String(new Date(`${month.month} 1, ${month.year}`).getMonth() + 1).padStart(2, '0')}`,
        quarter: getQuarter(month.month, month.year),
        pillar: undefined,
        isNew: false
      })),
      ...(month.keyInitiatives || []).map(initiative => ({
        id: `initiative-${typeof initiative === 'object' ? initiative.id : initiative}`,
        name: typeof initiative === 'object' ? initiative.title : initiative,
        type: "Initiative",
        link: `/${month.year}-${String(new Date(`${month.month} 1, ${month.year}`).getMonth() + 1).padStart(2, '0')}`,
        quarter: getQuarter(month.month, month.year),
        pillar: undefined,
        isNew: false
      }))
    ])
  ];

  const filteredContent = allContent.filter(item => {
    if (filters.pillar !== "all" && item.pillar !== filters.pillar) return false;
    if (filters.isNew !== "all") {
      const isNew = item.isNew || false;
      if (filters.isNew === "yes" && !isNew) return false;
      if (filters.isNew === "no" && isNew) return false;
    }
    if (filters.quarter !== "all" && item.quarter !== filters.quarter) return false;
    if (filters.type !== "all") {
      if (filters.type === "Series") {
        // Show both long-form and short-form series
        if (item.type !== "Long-form Series" && item.type !== "Short-form Series") return false;
      } else if (item.type !== filters.type) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

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
            Content Overview
          </h1>
          <p className="text-xl mt-4 font-bold uppercase">
            Filter and browse all campaigns, series, events, and initiatives
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="brutalist-card p-6 mb-8">
          <h2 className="text-xl font-black mb-6 uppercase">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-black mb-2 block uppercase">Content Type</label>
              <Select 
                value={filters.type} 
                onValueChange={(value) => setFilters({...filters, type: value})}
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Campaign">Campaigns</SelectItem>
                  <SelectItem value="Series">Series (All)</SelectItem>
                  <SelectItem value="Long-form Series">Long-form Series</SelectItem>
                  <SelectItem value="Short-form Series">Short-form Series</SelectItem>
                  <SelectItem value="Event">Events</SelectItem>
                  <SelectItem value="Initiative">Initiatives</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-black mb-2 block uppercase">Pillar</label>
              <Select 
                value={filters.pillar} 
                onValueChange={(value) => setFilters({...filters, pillar: value})}
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue placeholder="Select pillar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pillars</SelectItem>
                  {pillars.map(pillar => (
                    <SelectItem key={pillar} value={pillar}>{pillar}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-black mb-2 block uppercase">New Programming</label>
              <Select 
                value={filters.isNew} 
                onValueChange={(value) => setFilters({...filters, isNew: value})}
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="yes">New Only</SelectItem>
                  <SelectItem value="no">Existing Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-black mb-2 block uppercase">Quarter</label>
              <Select 
                value={filters.quarter} 
                onValueChange={(value) => setFilters({...filters, quarter: value})}
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Quarters</SelectItem>
                  {quarters.map(quarter => (
                    <SelectItem key={quarter.value} value={quarter.value}>
                      {quarter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black uppercase">
              Results ({filteredContent.length})
            </h2>
            <div className="text-sm text-muted-foreground">
              Total Series: {allSeries.length} | Short-form: {allSeries.filter(s => s.contentType === 'Short-form Series').length} | Long-form: {allSeries.filter(s => s.contentType === 'Long-form Series').length}
              <br />
              Debug: Short-form titles loaded: {allSeries.filter(s => s.contentType === 'Short-form Series').map(s => s.title).join(', ').substring(0, 100)}...
            </div>
            <button 
              className="brutalist-button px-4 py-2 text-sm"
              onClick={() => setFilters({ pillar: "all", isNew: "all", quarter: "all", type: "all" })}
            >
              Clear Filters
            </button>
          </div>

          {filteredContent.length > 0 ? (
            <div className="grid gap-4">
              {filteredContent.map((item, index) => (
                <div key={`${item.type}-${index}`} className="brutalist-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-black mb-2">
                        <Link 
                          to={item.link}
                          className="text-primary hover:text-primary-glow transition-colors uppercase"
                        >
                          {item.name}
                        </Link>
                      </h2>
                      <div className="flex items-center gap-4">
                        <h3 className="text-sm bg-muted px-2 py-1 font-bold uppercase">
                          {item.type}
                        </h3>
                        <h4 className="text-sm text-muted-foreground font-medium uppercase">
                          {quarters.find(q => q.value === item.quarter)?.label || item.quarter}
                        </h4>
                        {item.pillar && (
                          <Link 
                            to={`/pillar/${item.pillar.toLowerCase()}`}
                            className="text-sm text-secondary bg-secondary/10 px-2 py-1 font-bold uppercase hover:bg-secondary/20 transition-colors cursor-pointer"
                          >
                            {item.pillar}
                          </Link>
                        )}
                        {item.isNew && (
                          <div className="text-sm text-accent bg-accent/10 px-2 py-1 font-bold uppercase">
                            New
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="brutalist-card p-8">
                <h3 className="text-xl font-black mb-4 uppercase">No Results Found</h3>
                <p className="text-muted-foreground mb-8 font-medium">
                  Try adjusting your filters to see more content.
                </p>
                <button 
                  className="brutalist-button px-6 py-3"
                  onClick={() => setFilters({ pillar: "all", isNew: "all", quarter: "all", type: "all" })}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentOverview;