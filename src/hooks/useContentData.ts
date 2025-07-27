// Custom hook for accessing processed content data from central database
import { useMemo } from 'react';
import { 
  LONG_FORM_SERIES,
  SHORT_FORM_SERIES,
  ALL_CAMPAIGNS, 
  ALL_BRANDED_CAMPAIGNS,
  generateSlug,
  type BaseSeries,
  type BaseCampaign
} from '../data/centralDatabase';
import { 
  generateAllMonths,
  formatMonthSlug,
  type ProcessedMonthContent
} from '../data/dataHelpers';

// Extended types with slugs
export type SeriesWithSlug = BaseSeries & { slug: string };
export type CampaignWithSlug = BaseCampaign & { slug: string };

export const useContentData = () => {
  // Generate all months data
  const allMonths = useMemo(() => {
    try {
      return generateAllMonths();
    } catch (error) {
      console.error('Error generating months:', error);
      return [];
    }
  }, []);
  
  // COMPLETELY REWRITE: Combine series data directly and safely
  const allSeries = useMemo(() => {
    try {
      // Directly combine the arrays
      const combinedSeries = [...LONG_FORM_SERIES, ...SHORT_FORM_SERIES];
      
      console.log('🔧 DIRECT DATA LOADING:', {
        longFormCount: LONG_FORM_SERIES.length,
        shortFormCount: SHORT_FORM_SERIES.length,
        totalCombined: combinedSeries.length,
        shortFormTitles: SHORT_FORM_SERIES.map(s => s.title).slice(0, 10),
        pillarsInShortForm: [...new Set(SHORT_FORM_SERIES.map(s => s.pillar).filter(Boolean))]
      });

      const processedSeries: SeriesWithSlug[] = combinedSeries.map(series => ({
        ...series,
        slug: generateSlug(series.title)
      }));
      
      console.log('🎬 FINAL PROCESSED SERIES:', {
        total: processedSeries.length,
        byPillar: {
          Culture: processedSeries.filter(s => s.pillar === 'Culture').length,
          Roots: processedSeries.filter(s => s.pillar === 'Roots').length,
          Latina: processedSeries.filter(s => s.pillar === 'Latina').length,
          Queer: processedSeries.filter(s => s.pillar === 'Queer').length
        },
        byType: {
          longForm: processedSeries.filter(s => s.contentType === 'Long-form Series').length,
          shortForm: processedSeries.filter(s => s.contentType === 'Short-form Series').length
        }
      });
      
      return processedSeries;
    } catch (error) {
      console.error('Error processing series:', error);
      return [];
    }
  }, []);
  
  // Process new series
  const newSeries = useMemo(() => {
    try {
      return allSeries.filter(series => series.isNew === true);
    } catch (error) {
      console.error('Error processing new series:', error);
      return [];
    }
  }, [allSeries]);
  
  // Process all campaigns with slugs
  const allCampaigns = useMemo(() => {
    try {
      if (!ALL_CAMPAIGNS || !Array.isArray(ALL_CAMPAIGNS)) {
        console.warn('ALL_CAMPAIGNS is not available or not an array');
        return [];
      }

      return ALL_CAMPAIGNS.map(campaign => ({
        ...campaign,
        slug: generateSlug(campaign.title)
      }));
    } catch (error) {
      console.error('Error processing campaigns:', error);
      return [];
    }
  }, []);

  // Helper functions
  const getMonthBySlug = (slug: string): ProcessedMonthContent | undefined => {
    try {
      const [year, month] = slug.split('-').map(Number);
      return allMonths.find(m => m.year === year && 
        formatMonthSlug(m.month, m.year) === slug);
    } catch (error) {
      console.error('Error getting month by slug:', error);
      return undefined;
    }
  };
  
  // REWRITE: Direct filtering instead of calling external function
  const getSeriesForPillar = (pillar: string) => {
    try {
      console.log(`🔍 getSeriesForPillar called with: "${pillar}"`);
      console.log('🔍 Available series:', allSeries.length);
      console.log('🔍 Available pillars:', [...new Set(allSeries.map(s => s.pillar).filter(Boolean))]);
      
      const filtered = allSeries.filter(series => series.pillar === pillar);
      console.log(`🔍 Found ${filtered.length} series for pillar "${pillar}":`, filtered.map(s => `${s.title} (${s.contentType})`));
      
      return filtered;
    } catch (error) {
      console.error('Error getting series for pillar:', error);
      return [];
    }
  };

  // Content filtering for overview page
  const getFilteredContent = (filters: {
    pillar: string;
    isNew: string;
    quarter: string;
  }) => {
    try {
      const getQuarter = (month: string, year: number): string => {
        const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1;
        if (monthNum >= 7 && monthNum <= 9) return `q3-${year}`;
        if (monthNum >= 10 && monthNum <= 12) return `q4-${year}`;
        if (monthNum >= 1 && monthNum <= 3) return `q1-${year}`;
        return `q2-${year}`;
      };
      
      interface ContentItem {
        id: string;
        name: string;
        type: string;
        link: string;
        quarter: string;
        pillar?: string;
        isNew?: boolean;
      }
      
      const allContent: ContentItem[] = [
        // Campaigns
        ...allCampaigns.map(c => ({
          id: c.id,
          type: "Campaign",
          name: c.title,
          link: `/campaigns/${c.slug}`,
          quarter: "q3-2025", // Based on flight dates - could be computed
          pillar: undefined,
          isNew: false
        })),
        // Series
        ...allSeries.map(s => ({
          id: s.id,
          type: s.contentType,
          name: s.title,
          link: `/series/${s.slug}`,
          quarter: "q3-2025", // Based on premiere date - could be computed
          pillar: s.pillar,
          isNew: s.isNew || false
        })),
        // Events and initiatives from months
        ...allMonths.flatMap(month => [
          ...month.events.map(event => ({
            id: event.id,
            name: event.title,
            type: "Event",
            link: `/${formatMonthSlug(month.month, month.year)}`,
            quarter: getQuarter(month.month, month.year),
            pillar: undefined,
            isNew: false
          })),
          ...month.keyInitiatives.map(initiative => ({
            id: initiative.id,
            name: initiative.title,
            type: "Initiative",
            link: `/${formatMonthSlug(month.month, month.year)}`,
            quarter: getQuarter(month.month, month.year),
            pillar: undefined,
            isNew: false
          }))
        ])
      ];
      
      return allContent.filter(item => {
        if (filters.pillar !== "all" && item.pillar !== filters.pillar) return false;
        if (filters.isNew !== "all") {
          const isNew = item.isNew || false;
          if (filters.isNew === "yes" && !isNew) return false;
          if (filters.isNew === "no" && isNew) return false;
        }
        if (filters.quarter !== "all" && item.quarter !== filters.quarter) return false;
        return true;
      });
    } catch (error) {
      console.error('Error filtering content:', error);
      return [];
    }
  };

  // Direct series lookup functions
  const getSeriesBySlug = (slug: string) => {
    return allSeries.find(series => series.slug === slug);
  };

  const getCampaignBySlug = (slug: string) => {
    return allCampaigns.find(campaign => campaign.slug === slug);
  };
  
  return {
    // Data
    allMonths,
    allSeries,
    newSeries,
    allCampaigns,
    
    // Lookup functions
    getMonthBySlug,
    getSeriesForPillar,
    getFilteredContent,
    
    // Utility functions
    getSeriesBySlug,
    getCampaignBySlug,
    generateSlug,
    formatMonthSlug
  };
};