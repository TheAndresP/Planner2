import { Link } from "react-router-dom";
import { useContentData } from "@/hooks/useContentData";
import { ArrowLeft } from "lucide-react";

const NewProgramming = () => {
  const { newSeries } = useContentData();

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
            New Programming
          </h1>
          <p className="text-xl mt-4 font-bold uppercase">
            Timeline view of all new series premieres
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {newSeries.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {newSeries
                .sort((a, b) => new Date(a.premiereDate).getTime() - new Date(b.premiereDate).getTime())
                .map((seriesData) => (
                  <div key={seriesData.id} className="brutalist-card p-6">
                    <h2 className="text-2xl font-black mb-4 uppercase">
                      <Link 
                        to={`/series/${seriesData.slug}`}
                        className="text-primary hover:text-primary-glow transition-colors"
                      >
                        {seriesData.title}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-lg font-bold uppercase">
                        {seriesData.season} Premiere: {seriesData.premiereDate}
                      </span>
                      <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm font-bold uppercase">
                        {seriesData.contentType || 'Long-form Series'}
                      </span>
                    </div>
                    {seriesData.description && (
                      <p className="text-muted-foreground leading-relaxed font-medium mb-4">
                        {seriesData.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4">
                      {seriesData.pillar && (
                        <div className="inline-flex items-center gap-2">
                          <div className="w-2 h-2 bg-secondary"></div>
                          <span className="text-sm text-muted-foreground font-medium uppercase">{seriesData.pillar}</span>
                        </div>
                      )}
                      <div className="inline-flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent"></div>
                        <span className="text-sm text-accent font-bold uppercase">New</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="brutalist-card p-8">
              <h2 className="text-2xl font-black mb-4 uppercase">No New Programming</h2>
              <p className="text-muted-foreground mb-8 font-medium">
                There are currently no new series marked for premiere.
              </p>
              <Link to="/">
                <button className="brutalist-button px-6 py-3">Return to Calendar</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProgramming;