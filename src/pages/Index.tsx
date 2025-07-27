
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CalendarGrid from "@/components/CalendarGrid";
import { useContentData } from "@/hooks/useContentData";
import { Download, FileText, Edit } from "lucide-react";
import { useDocxExport } from "@/hooks/useDocxExport";
import { usePromptExport } from "@/hooks/usePromptExport";


const Index = () => {
  const { exportToDocx } = useDocxExport();
  const { exportPrompt } = usePromptExport();
  const { allSeries, newSeries: newSeriesData } = useContentData();

  const handleDocxExport = async () => {
    const success = await exportToDocx();
    if (success) {
      console.log("Word document exported successfully");
    } else {
      console.error("Failed to export Word document");
    }
  };

  const handlePromptExport = () => {
    exportPrompt();
    console.log("Rebuild prompt exported successfully");
  };

  // Get all new series and format their premiere dates
  const newSeries = newSeriesData
    .map(s => ({
      ...s,
      premiereMonth: formatPremiereDate(s.premiereDate)
    }))
    .sort((a, b) => new Date(a.premiereDate + '-01').getTime() - new Date(b.premiereDate + '-01').getTime());

  function formatPremiereDate(dateString: string): string {
    const [year, month] = dateString.split('-');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  }

  return (
    <div 
      className="min-h-screen bg-gray-100 relative"
      style={{
        backgroundImage: `url('/lovable-uploads/6dd66f6e-3b45-4a7d-8965-b7d69cfb253c.png')`,
        backgroundSize: '80%',
        backgroundPosition: '150% center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gray-100/70"></div>
      <div className="relative z-10">

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat text-white py-16 shadow-cultural"
        style={{
          backgroundImage: `url('/lovable-uploads/d7d85a8c-5bc0-4f7e-bdd5-0675fb9f5090.png')`
        }}
      >
        <div className="absolute inset-0 bg-green-600/70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-white drop-shadow-lg">
            2025 Master Tentpole & Content Calendar
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-bold uppercase text-white drop-shadow-lg">
            August 2025 – December 2026
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center max-w-2xl mx-auto">
            <Link to="/new-programming">
              <Button size="lg" className="brutalist-button bg-green-600 hover:bg-green-700 w-full">
                New Programming
              </Button>
            </Link>
            <Link to="/content-overview?type=Campaign">
              <Button size="lg" className="brutalist-button bg-green-600 hover:bg-green-700 w-full">
                Tentpoles & Campaigns
              </Button>
            </Link>
            <Link to="/content-overview">
              <Button size="lg" className="brutalist-button bg-green-600 hover:bg-green-700 w-full">
                Content Overview
              </Button>
            </Link>
            <Link to="/branded-content">
              <Button size="lg" className="brutalist-button bg-green-600 hover:bg-green-700 w-full">
                Branded Content Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar Grid Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4 uppercase">Navigate by Month</h2>
          <p className="text-lg text-muted-foreground font-medium">
            Click on any month to view detailed content, campaigns, and programming
          </p>
        </div>
        <CalendarGrid />
      </div>

      {/* New Series Section */}
      <div className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 uppercase">New Series</h2>
            <p className="text-lg text-muted-foreground font-medium">
              Discover the latest programming coming to LatiNation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newSeries.map((show) => (
              <Link 
                key={show.id} 
                to={`/series/${show.slug}`}
                className="brutalist-card p-6 hover:shadow-cultural-lg transition-shadow group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black uppercase group-hover:text-primary transition-colors">
                    {show.title}
                  </h3>
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-bold uppercase">
                    {show.contentType || 'Long-form Series'}
                  </span>
                </div>
                <p className="text-accent font-bold uppercase text-sm">
                  Premieres {show.premiereMonth}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="bg-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 uppercase">LatiNation Pillars</h2>
            <p className="text-lg text-muted-foreground font-medium">
              Explore our content by pillar
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/pillar/culture"
              className="brutalist-card p-6 hover:shadow-cultural-lg transition-shadow group text-center"
            >
              <h3 className="text-xl font-black mb-2 uppercase group-hover:text-primary transition-colors">
                LatiNation Culture
              </h3>
              <p className="text-muted-foreground text-sm">
                Comedy, entertainment, and lifestyle
              </p>
            </Link>
            <Link 
              to="/pillar/queer"
              className="brutalist-card p-6 hover:shadow-cultural-lg transition-shadow group text-center"
            >
              <h3 className="text-xl font-black mb-2 uppercase group-hover:text-primary transition-colors">
                LatiNation Queer
              </h3>
              <p className="text-muted-foreground text-sm">
                LGBTQ+ Latine voices and stories
              </p>
            </Link>
            <Link 
              to="/pillar/roots"
              className="brutalist-card p-6 hover:shadow-cultural-lg transition-shadow group text-center"
            >
              <h3 className="text-xl font-black mb-2 uppercase group-hover:text-primary transition-colors">
                LatiNation Roots
              </h3>
              <p className="text-muted-foreground text-sm">
                Heritage and Afro-Latino culture
              </p>
            </Link>
            <Link 
              to="/pillar/latina"
              className="brutalist-card p-6 hover:shadow-cultural-lg transition-shadow group text-center"
            >
              <h3 className="text-xl font-black mb-2 uppercase group-hover:text-primary transition-colors">
                LatiNation Latina
              </h3>
              <p className="text-muted-foreground text-sm">
                Empowering Latina voices
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Export and Admin Buttons */}
      <div className="bg-secondary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleDocxExport}
              size="lg" 
              className="brutalist-button bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Word Document
            </Button>
            <Button 
              onClick={handlePromptExport}
              size="lg" 
              variant="outline"
              className="brutalist-button w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Rebuild Prompt
            </Button>
            <Link to="/admin">
              <Button 
                size="lg" 
                variant="secondary"
                className="brutalist-button w-full sm:w-auto"
              >
                <Edit className="w-4 h-4 mr-2" />
                Manage Content
              </Button>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
