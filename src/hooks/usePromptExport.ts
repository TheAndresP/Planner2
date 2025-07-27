import { useCallback } from 'react';
import { useContentData } from './useContentData';

export const usePromptExport = () => {
  const { allMonths, allSeries, allCampaigns } = useContentData();

  const exportPrompt = useCallback(() => {
    const prompt = `# COMPREHENSIVE WEBSITE REBUILD PROMPT FOR LATINATION CONTENT CALENDAR

## PROJECT OVERVIEW
Create a React-based content calendar application for LatiNation programming that displays series, campaigns, branded content, and events in a monthly view. The app uses a brutalist design aesthetic with warm earth tones and clear typography.

## TECHNOLOGY STACK
- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React icons
- TanStack Query for state management
- React Hook Form + Zod for forms

## DESIGN SYSTEM
Use HSL color values in CSS custom properties:
- Primary: Warm earth tones (browns, oranges)
- Background: Cream/beige tones
- Text: Dark brown for contrast
- Accent: Vibrant orange/red
- Typography: Clean, modern sans-serif
- Brutalist styling: Bold borders, high contrast, geometric layouts

## SITE STRUCTURE

### Pages Required:
1. Homepage (/) - Hero section, calendar grid, featured content
2. Timeline (/timeline) - Chronological view of all content
3. Month Pages (/:slug) - Detailed monthly content view
4. Series Detail (/series/:slug) - Individual series information
5. Campaign Detail (/campaigns/:slug) - Campaign details
6. Branded Content (/branded-content) - Branded campaigns overview
7. Branded Campaign Detail (/branded-campaigns/:slug) - Individual branded campaign
8. New Programming (/new-programming) - New series showcase
9. Content Overview (/content-overview) - Filterable content view
10. Pillar Pages (/pillar/:pillar) - Content by pillar category
11. Admin (/admin) - Content management interface
12. 404 Page (/*) - Not found page

### Navigation Structure:
- Main navigation in hero section
- Calendar grid for month navigation
- Breadcrumb navigation on detail pages
- Back to home buttons

## CONTENT DATA STRUCTURE

### Series Interface:
\`\`\`typescript
interface Series {
  id: string;
  title: string;
  season: string;
  premiereDate: string;
  episodesAnnually?: string;
  description?: string;
  isNew?: boolean;
  pillar?: 'Roots' | 'Culture' | 'Latina' | 'Queer';
}
\`\`\`

### Campaign Interface:
\`\`\`typescript
interface Campaign {
  id: string;
  title: string;
  flightDates: string;
  overview: string;
  platforms: string;
  deliverables: string;
  participatingSeriesIds: string[];
}
\`\`\`

### Branded Campaign Interface:
\`\`\`typescript
interface BrandedCampaign {
  id: string;
  title: string;
  flightDates: string;
  description: string;
  deliverables: string;
  campaignType: string;
}
\`\`\`

## SPECIFIC CONTENT DATA

### SERIES DATA:
${JSON.stringify(allSeries, null, 2)}

### CAMPAIGN DATA:
${JSON.stringify(allCampaigns, null, 2)}

### MONTHLY CONTENT:
${JSON.stringify(allMonths, null, 2)}

## KEY FEATURES TO IMPLEMENT

### 1. Calendar Grid Component
- Interactive monthly calendar
- Navigation between months
- Visual indicators for content-heavy months
- Responsive design

### 2. Content Filtering
- Filter by pillar (Roots, Culture, Latina, Queer)
- Filter by new vs existing content
- Filter by quarter
- Search functionality

### 3. Responsive Design
- Mobile-first approach
- Tablet and desktop breakpoints
- Touch-friendly navigation
- Accessible design patterns

### 4. Data Management
- Centralized content database
- Helper functions for data processing
- Slug generation for URLs
- Date formatting utilities

### 5. Export Features
- Word document export (using docx library)
- Website rebuild prompt export
- Downloadable content summaries

### 6. Admin Interface
- Content management forms
- Real-time editing
- Form validation
- Console output for data copying

## COMPONENT ARCHITECTURE

### Core Components:
- CalendarGrid - Monthly calendar navigation
- ContentSummary - Content overview cards
- ScrollToTop - Scroll behavior management
- Toast notifications for user feedback

### UI Components (shadcn/ui):
- Button, Card, Badge variants
- Form components with validation
- Tabs for content organization
- Accordion for expandable content
- Dialog modals for detailed views

## ROUTING CONFIGURATION
Use React Router with the following structure:
- Nested routes for organization
- Dynamic routes for content detail pages
- 404 fallback for invalid routes
- Query parameter support for filtering

## STATE MANAGEMENT
- Custom hooks for content data
- Context for global state if needed
- Local component state for UI interactions
- Form state with React Hook Form

## STYLING APPROACH
- Utility-first with Tailwind CSS
- Custom CSS properties for theming
- Component variants for consistency
- Responsive utilities for all breakpoints

## CRITICAL IMPLEMENTATION NOTES

1. **Slug Generation**: Create URL-friendly slugs from titles
2. **Date Handling**: Parse and format dates consistently
3. **Content Relationships**: Link series to campaigns properly
4. **Responsive Images**: Optimize for all screen sizes
5. **Performance**: Lazy load content and images
6. **Accessibility**: ARIA labels, keyboard navigation
7. **SEO**: Meta tags and proper heading structure

## ASSETS REQUIRED (TO BE PROVIDED SEPARATELY)
- Hero background images
- Series thumbnail images
- Campaign promotional images
- Brand logos and icons
- Placeholder images for missing content

## DEPLOYMENT CONSIDERATIONS
- Environment variable configuration
- Build optimization settings
- Static asset handling
- Error boundary implementation

## TESTING REQUIREMENTS
- Component unit tests
- Integration tests for routing
- Accessibility testing
- Cross-browser compatibility

This prompt provides complete specifications to recreate the LatiNation content calendar application exactly as designed, including all content data, styling requirements, and functionality specifications.`;

    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-rebuild-prompt.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  }, [allMonths, allSeries, allCampaigns]);

  return { exportPrompt };
};