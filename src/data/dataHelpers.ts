// Data Helpers - Utility functions for processing content data

import { seriesDatabase, campaignsDatabase, eventsDatabase, initiativesDatabase, specialsDatabase, brandedCampaignsDatabase } from './contentDatabase';
import type { Series, Campaign, Event, Initiative, Special, BrandedCampaign } from './contentDatabase';

// ==========================================
// SLUG GENERATION - Consistent across all content
// ==========================================

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// ==========================================
// DATE UTILITIES
// ==========================================

export const parseDate = (dateString: string): { year: number; month: number; day?: number } => {
  const parts = dateString.split('-');
  return {
    year: parseInt(parts[0]),
    month: parseInt(parts[1]),
    day: parts[2] ? parseInt(parts[2]) : undefined
  };
};

export const formatMonthSlug = (month: string, year: number): string => {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1;
  return `${year}-${monthIndex.toString().padStart(2, '0')}`;
};

export const getMonthName = (monthNumber: number): string => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
};

// ==========================================
// CONTENT PROCESSING
// ==========================================

export const getSeriesById = (id: string): Series | undefined => {
  return seriesDatabase.find(series => series.id === id);
};

export const getSeriesBySlug = (slug: string): Series | undefined => {
  return seriesDatabase.find(series => generateSlug(series.title) === slug);
};

export const getCampaignById = (id: string): Campaign | undefined => {
  return campaignsDatabase.find(campaign => campaign.id === id);
};

export const getCampaignBySlug = (slug: string): Campaign | undefined => {
  return campaignsDatabase.find(campaign => generateSlug(campaign.title) === slug);
};

export const getBrandedCampaignById = (id: string): BrandedCampaign | undefined => {
  return brandedCampaignsDatabase.find(campaign => campaign.id === id);
};

// ==========================================
// PARTICIPATING SERIES HELPERS
// ==========================================

export const getParticipatingSeries = (campaign: Campaign): Series[] => {
  return campaign.participatingSeriesIds
    .map(id => getSeriesById(id))
    .filter((series): series is Series => series !== undefined);
};

export const getParticipatingSeriesWithSlugs = (campaign: Campaign): Array<{series: Series, slug: string}> => {
  return getParticipatingSeries(campaign).map(series => ({
    series,
    slug: generateSlug(series.title)
  }));
};

// ==========================================
// MONTH DATA GENERATION
// ==========================================

export interface ProcessedMonthContent {
  month: string;
  year: number;
  campaigns: Array<Campaign & { slug: string; participatingSeries: Array<{series: Series, slug: string}> }>;
  seriesPremieres: Array<Series & { slug: string }>;
  events: Event[];
  keyInitiatives: Initiative[];
  specials: Special[];
  brandedCampaigns: BrandedCampaign[];
}

export const generateMonthContent = (year: number, month: number): ProcessedMonthContent => {
  const monthName = getMonthName(month);
  
  // Find campaigns that overlap with this month
  const campaigns = campaignsDatabase
    .filter(campaign => {
      const flightDates = campaign.flightDates;
      
      // Handle different flight date formats
      
      // Format 1: "YYYY: MM/DD – MM/DD" (e.g., "2026: 09/15 – 10/15")
      const yearSpecificMatch = flightDates.match(/(\d{4}):\s*(\d{1,2})\/(\d{1,2})\s*[–-]\s*(\d{1,2})\/(\d{1,2})/);
      if (yearSpecificMatch) {
        const [, campaignYear, startMonth, startDay, endMonth, endDay] = yearSpecificMatch;
        if (parseInt(campaignYear) !== year) return false;
        
        const startMonthNum = parseInt(startMonth);
        const endMonthNum = parseInt(endMonth);
        
        // Check if current month falls within the campaign range
        if (startMonthNum <= endMonthNum) {
          return month >= startMonthNum && month <= endMonthNum;
        } else {
          // Campaign spans across year boundary
          return month >= startMonthNum || month <= endMonthNum;
        }
      }
      
      // Format 2: "MM/DD – MM/DD" (e.g., "09/15 – 10/15")
      const monthRangeMatch = flightDates.match(/(\d{1,2})\/(\d{1,2})\s*[–-]\s*(\d{1,2})\/(\d{1,2})/);
      if (monthRangeMatch) {
        const [, startMonth, startDay, endMonth, endDay] = monthRangeMatch;
        const startMonthNum = parseInt(startMonth);
        const endMonthNum = parseInt(endMonth);
        
        // For campaigns without explicit year, assume they're for the current year being viewed
        // But apply some logic: 2025 campaigns (Sept-Dec), 2026 campaigns (Jan-Dec)
        let campaignYear = year;
        if (year === 2026 && startMonthNum >= 9) {
          // If we're looking at 2026 but the campaign starts in Sept+, it's probably a 2025 campaign
          campaignYear = 2025;
        } else if (year === 2025 && startMonthNum <= 8) {
          // If we're looking at 2025 but the campaign starts Jan-Aug, it's probably a 2026 campaign
          campaignYear = 2026;
        }
        
        // Only include if the years match
        if (campaignYear !== year) return false;
        
        // Check if current month falls within the campaign range
        if (startMonthNum <= endMonthNum) {
          return month >= startMonthNum && month <= endMonthNum;
        } else {
          // Campaign spans across year boundary
          return month >= startMonthNum || month <= endMonthNum;
        }
      }
      
      // Format 3: Single date "MM/DD" (e.g., "04/22")
      const singleDateMatch = flightDates.match(/^(\d{1,2})\/(\d{1,2})$/);
      if (singleDateMatch) {
        const [, campaignMonth] = singleDateMatch;
        return month === parseInt(campaignMonth);
      }
      
      return false;
    })
    .map(campaign => ({
      ...campaign,
      slug: generateSlug(campaign.title),
      participatingSeries: getParticipatingSeriesWithSlugs(campaign)
    }));

  // Find series premiering in this month
  const seriesPremieres = seriesDatabase
    .filter(series => {
      const premiereDate = parseDate(series.premiereDate);
      return premiereDate.year === year && premiereDate.month === month;
    })
    .map(series => ({
      ...series,
      slug: generateSlug(series.title)
    }));

  // Find events in this month
  const events = eventsDatabase.filter(event => {
    const eventDate = parseDate(event.date);
    return eventDate.year === year && eventDate.month === month;
  });

  // Find initiatives in this month
  const keyInitiatives = initiativesDatabase.filter(initiative => {
    const initiativeDate = parseDate(initiative.date);
    return initiativeDate.year === year && initiativeDate.month === month;
  });

  // Find specials in this month
  const specials = specialsDatabase.filter(special => {
    const specialDate = parseDate(special.date);
    return specialDate.year === year && specialDate.month === month;
  });

  // Find branded campaigns for this month
  const brandedCampaigns = brandedCampaignsDatabase.filter(campaign => {
    const flightDates = campaign.flightDates.toLowerCase();
    
    // Handle different formats for branded campaigns
    if (flightDates.includes('june') && flightDates.includes('december') && flightDates.includes('2025')) {
      // Penguin Random House: June - December 2025
      return year === 2025 && month >= 6 && month <= 12;
    }
    
    if (flightDates.includes('april') && flightDates.includes('sept') && flightDates.includes('2025')) {
      // Ad Council: April - September 2025
      return year === 2025 && month >= 4 && month <= 9;
    }
    
    if (flightDates.includes('1/1') && flightDates.includes('12/31') && flightDates.includes('2025')) {
      // Gilead: January - December 2025
      return year === 2025 && month >= 1 && month <= 12;
    }
    
    return false;
  });

  return {
    month: monthName,
    year,
    campaigns,
    seriesPremieres,
    events,
    keyInitiatives,
    specials,
    brandedCampaigns
  };
};

// ==========================================
// GENERATE ALL MONTHS
// ==========================================

export const generateAllMonths = (): ProcessedMonthContent[] => {
  const months: ProcessedMonthContent[] = [];
  
  // 2025: September - December
  for (let month = 9; month <= 12; month++) {
    months.push(generateMonthContent(2025, month));
  }
  
  // 2026: January - December
  for (let month = 1; month <= 12; month++) {
    months.push(generateMonthContent(2026, month));
  }
  
  return months;
};

// ==========================================
// FILTER HELPERS
// ==========================================

export const getNewSeries = (): Array<Series & { slug: string }> => {
  return seriesDatabase
    .filter(series => series.isNew)
    .map(series => ({
      ...series,
      slug: generateSlug(series.title)
    }));
};

export const getSeriesByPillar = (pillar: string): Array<Series & { slug: string }> => {
  return seriesDatabase
    .filter(series => series.pillar === pillar)
    .map(series => ({
      ...series,
      slug: generateSlug(series.title)
    }));
};

export const getAllSeriesWithSlugs = (): Array<Series & { slug: string }> => {
  return seriesDatabase.map(series => ({
    ...series,
    slug: generateSlug(series.title)
  }));
};

export const getAllCampaignsWithSlugs = (): Array<Campaign & { slug: string; participatingSeries: Array<{series: Series, slug: string}> }> => {
  return campaignsDatabase.map(campaign => ({
    ...campaign,
    slug: generateSlug(campaign.title),
    participatingSeries: getParticipatingSeriesWithSlugs(campaign)
  }));
};

export const getAllBrandedCampaigns = (): BrandedCampaign[] => {
  return brandedCampaignsDatabase;
};