import { Link } from "react-router-dom";
import { allMonths } from "@/data/contentData";

const CalendarGrid = () => {
  const formatMonthSlug = (month: string, year: number) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1;
    return `${year}-${monthIndex.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {allMonths.map((monthData) => {
        const slug = formatMonthSlug(monthData.month, monthData.year);
        const hasContent = monthData.campaigns.length > 0 || 
                          monthData.seriesPremieres.length > 0 || 
                          (monthData.events && monthData.events.length > 0) ||
                          (monthData.keyInitiatives && monthData.keyInitiatives.length > 0);
        
        return (
          <Link 
            key={slug} 
            to={`/${slug}`}
            className="calendar-cell group brutalist-card"
          >
            <div className="p-6 relative z-10">
              <div className="text-center">
                <h3 className="text-lg font-black text-foreground mb-2 uppercase">
                  {monthData.month}
                </h3>
                <p className="text-2xl font-black text-primary mb-3">
                  {monthData.year}
                </p>
                {hasContent && (
                  <div className="space-y-1">
                    {monthData.campaigns.length > 0 && (
                      <div className="text-xs bg-primary text-primary-foreground px-2 py-1 font-bold uppercase">
                        {monthData.campaigns.length} Campaign{monthData.campaigns.length !== 1 ? 's' : ''}
                      </div>
                    )}
                    {monthData.seriesPremieres.length > 0 && (
                      <div className="text-xs bg-accent text-accent-foreground px-2 py-1 font-bold uppercase">
                        {monthData.seriesPremieres.length} Premiere{monthData.seriesPremieres.length !== 1 ? 's' : ''}
                      </div>
                    )}
                    {monthData.events && monthData.events.length > 0 && (
                      <div className="text-xs bg-secondary text-secondary-foreground px-2 py-1 font-bold uppercase">
                        {monthData.events.length} Event{monthData.events.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                )}
                {!hasContent && (
                  <p className="text-xs text-muted-foreground font-medium uppercase">
                    No Content
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CalendarGrid;