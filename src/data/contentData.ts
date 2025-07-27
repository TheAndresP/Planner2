// Legacy compatibility layer - exports processed data for existing components
// This file now uses the new centralized database and helpers

import { 
  generateAllMonths,
  getAllSeriesWithSlugs,
  getAllCampaignsWithSlugs,
  type ProcessedMonthContent 
} from './dataHelpers';

// Re-export types for compatibility
export interface Campaign {
  id: string;
  title: string;
  slug: string;
  flightDates: string;
  overview: string;
  platforms: string;
  deliverables: string;
  participatingSeries: string[];
  contentType?: string;
}

export interface Series {
  id: string;
  title: string;
  slug: string;
  season: string;
  premiereDate: string;
  episodesAnnually?: string;
  description?: string;
  isNew?: boolean;
  pillar?: string;
  contentType?: string;
}

export interface MonthContent {
  month: string;
  year: number;
  campaigns: Campaign[];
  seriesPremieres: Series[];
  specials?: string[];
  events?: string[];
  keyInitiatives?: string[];
}

// Convert new format to legacy format for backward compatibility
const convertToLegacyFormat = (processedMonths: ProcessedMonthContent[]): MonthContent[] => {
  return processedMonths.map(month => ({
    month: month.month,
    year: month.year,
    campaigns: month.campaigns.map(campaign => ({
      id: campaign.id,
      title: campaign.title,
      slug: campaign.slug,
      flightDates: campaign.flightDates,
      overview: campaign.overview,
      platforms: campaign.platforms,
      deliverables: campaign.deliverables,
      participatingSeries: campaign.participatingSeries.map(ps => ps.series.title),
      contentType: campaign.contentType
    })),
    seriesPremieres: month.seriesPremieres.map(series => ({
      id: series.id,
      title: series.title,
      slug: series.slug,
      season: series.season,
      premiereDate: series.premiereDate,
      episodesAnnually: series.episodesAnnually,
      description: series.description,
      isNew: series.isNew,
      pillar: series.pillar,
      contentType: series.contentType
    })),
    events: month.events.map(e => e.title),
    keyInitiatives: month.keyInitiatives.map(i => i.title)
  }));
};

// Export processed data using new system
export const campaigns = getAllCampaignsWithSlugs().map(campaign => ({
  id: campaign.id,
  title: campaign.title,
  slug: campaign.slug,
  flightDates: campaign.flightDates,
  overview: campaign.overview,
  platforms: campaign.platforms,
  deliverables: campaign.deliverables,
  participatingSeries: campaign.participatingSeries.map(ps => ps.series.title),
  contentType: campaign.contentType
}));

export const series = getAllSeriesWithSlugs().map(s => ({
  id: s.id,
  title: s.title,
  slug: s.slug,
  season: s.season,
  premiereDate: s.premiereDate,
  episodesAnnually: s.episodesAnnually,
  description: s.description,
  isNew: s.isNew,
  pillar: s.pillar,
  contentType: s.contentType
}));

export const allMonths = convertToLegacyFormat(generateAllMonths());

// Keep original functions for compatibility
export const generateAllMonths_Legacy = () => allMonths;
export const monthsContent = allMonths;
