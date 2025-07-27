import { useCallback } from 'react';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { useContentData } from './useContentData';

export const useDocxExport = () => {
  const { allMonths, allSeries, allCampaigns } = useContentData();

  const exportToDocx = useCallback(async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: "Content Programming Guide",
                heading: HeadingLevel.TITLE,
                spacing: { after: 400 }
              }),
              new Paragraph({
                text: "LatiNation Content Calendar",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 200, after: 200 }
              }),
              
              // Monthly Content
              new Paragraph({
                text: "Monthly Programming Schedule",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
              }),
              
              ...allMonths.flatMap(month => [
                new Paragraph({
                  text: `${month.month} ${month.year}`,
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 300, after: 100 }
                }),
                
                // Series Premieres
                ...(month.seriesPremieres.length > 0 ? [
                  new Paragraph({
                    text: "Series Premieres:",
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 100 }
                  }),
                  ...month.seriesPremieres.map(series => 
                    new Paragraph({
                      children: [
                        new TextRun({ text: `• ${series.title}`, bold: true }),
                        new TextRun({ text: ` - Season ${series.season}` }),
                        ...(series.description ? [new TextRun({ text: ` - ${series.description}` })] : [])
                      ],
                      spacing: { after: 100 }
                    })
                  )
                ] : []),
                
                // Campaigns
                ...(month.campaigns.length > 0 ? [
                  new Paragraph({
                    text: "Campaigns:",
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 100 }
                  }),
                  ...month.campaigns.map(campaign => 
                    new Paragraph({
                      children: [
                        new TextRun({ text: `• ${campaign.title}`, bold: true }),
                        new TextRun({ text: ` - ${campaign.flightDates}` }),
                        new TextRun({ text: ` - ${campaign.overview}` })
                      ],
                      spacing: { after: 100 }
                    })
                  )
                ] : []),
                
                // Events
                ...(month.events && month.events.length > 0 ? [
                  new Paragraph({
                    text: "Events:",
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 100 }
                  }),
                  ...month.events.map(event => 
                    new Paragraph({
                      children: [new TextRun({ text: `• ${event.title}` })],
                      spacing: { after: 100 }
                    })
                  )
                ] : []),
                
                // Key Initiatives
                ...(month.keyInitiatives && month.keyInitiatives.length > 0 ? [
                  new Paragraph({
                    text: "Key Initiatives:",
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 100 }
                  }),
                  ...month.keyInitiatives.map(initiative => 
                    new Paragraph({
                      children: [new TextRun({ text: `• ${initiative.title}` })],
                      spacing: { after: 100 }
                    })
                  )
                ] : [])
              ]),
              
              // All Series Overview
              new Paragraph({
                text: "Complete Series Catalog",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
              }),
              
              ...allSeries.map(series => 
                new Paragraph({
                  children: [
                    new TextRun({ text: `• ${series.title}`, bold: true }),
                    new TextRun({ text: ` - Season ${series.season}` }),
                    new TextRun({ text: ` - Premieres: ${series.premiereDate}` }),
                    ...(series.pillar ? [new TextRun({ text: ` - Pillar: ${series.pillar}` })] : []),
                    ...(series.description ? [new TextRun({ text: ` - ${series.description}` })] : [])
                  ],
                  spacing: { after: 100 }
                })
              ),
              
              // All Campaigns Overview
              new Paragraph({
                text: "Complete Campaign Catalog",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
              }),
              
              ...allCampaigns.map(campaign => 
                new Paragraph({
                  children: [
                    new TextRun({ text: `• ${campaign.title}`, bold: true }),
                    new TextRun({ text: ` - ${campaign.flightDates}` }),
                    new TextRun({ text: ` - Platforms: ${campaign.platforms}` }),
                    new TextRun({ text: ` - ${campaign.overview}` })
                  ],
                  spacing: { after: 100 }
                })
              )
            ]
          }
        ]
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      saveAs(blob, 'Content-Programming-Guide.docx');
      
      return true;
    } catch (error) {
      console.error('Error exporting to DOCX:', error);
      return false;
    }
  }, [allMonths, allSeries, allCampaigns]);

  return { exportToDocx };
};