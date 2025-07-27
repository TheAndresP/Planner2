
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContentData } from "@/hooks/useContentData";
import { ArrowLeft } from "lucide-react";

const PillarPage = () => {
  const { pillar } = useParams<{ pillar: string }>();
  const { getSeriesForPillar, generateSlug } = useContentData();

  // Map URL slugs to display names and pillar keys
  const pillarMap: Record<string, { 
    name: string; 
    key: string; 
    description: string;
    purpose?: string;
    narrative?: string;
    mission?: string;
    vision?: string;
    essence?: string;
    vibe?: string;
    slogan?: string;
  }> = {
    "culture": {
      name: "LatiNation Culture",
      key: "Culture",
      description: "For U.S. bilingual millennial and Gen-Z Latinos, LatiNation Culture is the 360° Latino media powerhouse that delivers the authentic bilingual content that amplifies the true impact of our cultura.",
      purpose: "To champion and amplify the richness of Latino culture by empowering our community's storytellers, pioneering innovative content formats, and forging genuine connections between brands and the modern Latino audience.",
      mission: "LatiNation Culture is on a mission to transform Latino representation in the modern media landscape, creating content that organically represents today's Latino experience. We amplify the influence our community has in redefining art, music, and lifestyle to empower and set new standards in media. Join us as we celebrate Latino culture, inspire our community, and shape the future of storytelling.",
      vision: "Our vision is to be the leading voice in contemporary Latino media, showcasing our Latino community's dynamic and diverse experiences through original content and expression.",
      essence: "Authenticity. Community Pride. Curiosity. Hard Work & Excellence.",
      vibe: "Genuine stories meet cultural celebration. We're authentically creative, funny, welcoming, empathetic, protective and supportive. Latino exceptionalism with receipts."
    },
    "queer": {
      name: "LatiNation Queer",
      key: "Queer",
      description: "Amplifying LGBTQ+ Latine voices and stories with authentic programming that celebrates our diverse identities.",
      purpose: "To honor, amplify, and celebrate the layered realities of queer Latine individuals, bold in identity, fluid in expression, and deeply rooted in culture. This pillar creates space for queer voices to be seen, heard, and felt in full color, not despite their identities, but because of them.",
      narrative: "This is for the ones navigating joy and grief in the same breath. For those redefining family, success, and love on their own terms. For the ones who heal out loud, dress like art, and turn survival into creation. Here, queerness isn't a side story; it's the whole narrative.",
      mission: "LatiNation Queer exists to elevate and celebrate the complexity, creativity, and power of queer Latino identity. We produce content that is boldly intersectional, culturally real, and deeply rooted in the lived experiences of LGBTQ+ Latinos across the U.S. We're here to rewrite the narrative—one where queer Latinos are not just visible, but centered as cultural architects, icons, and everyday storytellers. Through media, events, and digital culture, we hold space for authenticity, joy, rage, softness, and revolution.",
      vision: "Our vision is to be the leading voice in queer Latino media—unfiltered, unbothered, and unforgettable. We imagine a media future where Black, Brown, femme, masc, trans, and nonbinary Latine voices aren't the exception—they're the standard. We bridge the barrio and the ballroom, the queer club and the carne asada, building a platform that makes our community feel seen, celebrated, and self-defined. This isn't allyship content. It's ownership content.",
      essence: "Unapologetic. Expressive. Healing. Loud.",
      vibe: "Barrio chic meets ballroom glam meets spiritual rebirth/ Radical joy. Queer glamour. Punk resistance. Cultura-first, always. We're the afterparty and the dissertation.",
      slogan: "For the Divas"
    },
    "roots": {
      name: "LatiNation Roots",
      key: "Roots",
      description: "Honoring our heritage and celebrating Afro-Latino culture while exploring the depth of our shared experiences.",
      purpose: "Because our community's resilience deserves its own stage. LatiNation Roots exists to reclaim narratives stolen by erasure, to build bridges between barrios and boardrooms, and to nourish a generation that knows its power flows from both the African beat and Latino corazón. We create space for healing, for laughter, for truth-telling—and for unapologetic Black joy in Spanglish and English alike.",
      mission: "To unapologetically center Afro-Latino voices, histories, and creativity in every frame—amplifying the rhythms, flavors, and stories that pulse through our comunidad. We spotlight Black-Latino entrepreneurs, artists, activists, and everyday trailblazers, weaving together cross-continental roots and U.S. hustle into content that educates, elevates, and electrifies.",
      vision: "A cultural landscape where Afro-Latino heritage isn't an afterthought but a celebrated cornerstone—where every documentary, panel, and street-style clip reminds the world that our diaspora's joy, resistance, and innovations are integral to the American tapestry. We see a future where \"Afro-Latino\" is mainstream pride, not niche footnote."
    },
    "latina": {
      name: "LatiNation Latina",
      key: "Latina",
      description: "The Latina Pillar is where boldness meets intention. It's a celebration of Latina identity in all its forms—unapologetic, multidimensional, and constantly evolving.",
      purpose: "To reflect, empower, and celebrate the multidimensional Latina who leads with power, pride, and purpose—on her own terms. This pillar is for the elevated and everyday Latina: stylish, outspoken, culturally rooted, and self-defined. She's a dreamer with receipts, a head-turner with hustle, and a vibe all on her own. She's not chasing status—she's building legacy. She's got taste, but she's resourceful. She looks expensive, but she's smart about how she gets there.",
      narrative: "She's not afraid to speak up, take up space, or romanticize her life—even on a budget. She's navigating career moves, family care, side hustles, soft healing, and loud joy—all while making it look effortless. Whether she's planning her business launch, putting her mom and kid first, or filming a GRWM that turns into a TED Talk, this Latina creates space for herself—and uplifts others while she's at it.",
      essence: "Rooted. Bold. Put-together. Still figuring it out.",
      vibe: "Spanglish elegance meets pop culture chismosa meets career glow-up. She's giving: café con leche + Canva pro + \"better dead than basic\""
    }
  };

  const currentPillar = pillar ? pillarMap[pillar] : null;
  
  if (!currentPillar) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 uppercase">Pillar Not Found</h1>
          <Link to="/">
            <Button className="brutalist-button">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const series = getSeriesForPillar(currentPillar.key);
  
  // Debug logging to see what series are loaded for this pillar
  console.log(`🏛️ PILLAR PAGE DEBUG for ${currentPillar.key}:`, {
    pillarKey: currentPillar.key,
    totalSeries: series.length,
    longFormSeries: series.filter(s => s.contentType === 'Long-form Series'),
    shortFormSeries: series.filter(s => s.contentType === 'Short-form Series'),
    allSeriesTitles: series.map(s => `${s.title} (${s.contentType})`),
    shortFormTitles: series.filter(s => s.contentType === 'Short-form Series').map(s => s.title)
  });
  
  // Also debug what the hook is returning overall
  console.log('🔍 useContentData hook analysis:', {
    totalAllSeries: series.length,
    getSeriesForPillarFunction: typeof getSeriesForPillar
  });

  const formatPremiereDate = (dateString: string): string => {
    const [year, month] = dateString.split('-');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 shadow-cultural">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
              {currentPillar.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              {currentPillar.description}
            </p>
            {currentPillar.slogan && (
              <div className="text-accent font-black text-2xl uppercase tracking-wider">
                {currentPillar.slogan}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Information for All Pillars with Extended Content */}
      {(pillar === "culture" || pillar === "queer" || pillar === "latina" || pillar === "roots") && currentPillar && (
        <div className="bg-secondary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Purpose */}
              <div className="text-center">
                <h2 className="text-3xl font-black mb-6 uppercase text-primary">Purpose</h2>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    {currentPillar.purpose}
                  </p>
                  <p className="text-lg leading-relaxed italic text-muted-foreground">
                    {currentPillar.narrative}
                  </p>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-black mb-4 uppercase text-accent">Mission</h3>
                  <p className="text-base leading-relaxed">
                    {currentPillar.mission}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-4 uppercase text-accent">Vision</h3>
                  <p className="text-base leading-relaxed">
                    {currentPillar.vision}
                  </p>
                </div>
              </div>

              {/* Essence & Vibe */}
              <div className="text-center brutalist-card p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black mb-3 uppercase text-primary">Essence</h3>
                    <p className="text-lg font-bold tracking-wide">
                      {currentPillar.essence}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-3 uppercase text-primary">Vibe</h3>
                    <p className="text-base leading-relaxed">
                      {currentPillar.vibe}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Series Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4 uppercase">Series</h2>
          <p className="text-lg text-muted-foreground font-medium">
            Discover all the programming under {currentPillar.name}
          </p>
        </div>

        {series.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {series.map((show) => (
              <Link 
                key={show.id} 
                to={`/series/${show.slug}`}
                className="brutalist-card p-6 hover:shadow-cultural-lg transition-shadow group"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black uppercase group-hover:text-primary transition-colors">
                      {show.title}
                    </h3>
                    <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-bold uppercase">
                      {show.contentType || 'Long-form Series'}
                    </span>
                  </div>
                  <p className="text-accent font-bold uppercase text-sm mb-2">
                    {show.season} • Premieres {formatPremiereDate(show.premiereDate)}
                  </p>
                  {show.isNew && (
                    <span className="inline-block bg-accent text-accent-foreground px-2 py-1 text-xs font-bold uppercase rounded mb-2">
                      New Series
                    </span>
                  )}
                  {/* Parent Series Link for Short-form Series */}
                  {show.contentType === 'Short-form Series' && show.parentSeries && (
                    <div className="mb-3">
                      <span className="text-xs text-muted-foreground uppercase font-medium">Parent Series: </span>
                      <Link 
                        to={`/series/${generateSlug(show.parentSeries)}`}
                        className="text-xs text-primary hover:text-primary-glow font-bold uppercase underline transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {show.parentSeries}
                      </Link>
                    </div>
                  )}
                </div>
                {show.description && (
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {show.description}
                  </p>
                )}
                {show.episodesAnnually && (
                  <p className="text-xs text-muted-foreground/80 mt-2 uppercase font-medium">
                    {show.episodesAnnually}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No series found for this pillar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PillarPage;
