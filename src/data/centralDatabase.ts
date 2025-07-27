// CENTRAL CONTENT DATABASE - SINGLE SOURCE OF TRUTH
// This is the ONLY place where content should be added/edited
// All other files reference this database

export type ContentType = 'LatiNation Campaign' | 'Tentpole Campaign' | 'Branded Content Campaign' | 'Long-form Series' | 'Short-form Series' | 'Special';
export type PillarType = 'Roots' | 'Culture' | 'Latina' | 'Queer';

export interface BaseSeries {
  id: string;
  title: string;
  season: string;
  premiereDate: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  episodesAnnually?: string;
  description?: string;
  isNew?: boolean;
  pillar?: PillarType;
  contentType: ContentType;
  parentSeries?: string; // For short-form series that belong to a long-form series
  opportunityForSales?: string;
  bestPerformingVideo?: string;
  overallTopStats?: string;
  keyGuests?: string;
}

export interface BaseCampaign {
  id: string;
  title: string;
  flightDates: string;
  overview: string;
  platforms: string;
  deliverables: string;
  participatingSeriesIds: string[]; // References to series IDs
  contentType: ContentType;
}

export interface BrandedCampaign {
  id: string;
  title: string;
  flightDates: string;
  description: string;
  contentType: ContentType;
  deliverables: string;
  campaignType: string;
}

// ==========================================
// LONG-FORM SERIES DATABASE
// ==========================================
export const LONG_FORM_SERIES: BaseSeries[] = [
  // LatiNation Roots
  {
    id: "blacktinidad",
    title: "Blacktinidad",
    season: "Season 8",
    premiereDate: "2026-02",
    episodesAnnually: "16 episodes annually",
    description: "Blacktinidad is a safe space to celebrate Afro-Latino culture and community. This one-of-a-kind show provides culturally relevant social discourse that addresses the complexities and nuances of the Afro-Latino lived experiences. It builds community by amplifying Afro-Latino leaders in business, entertainment, the arts, and more—delivering insightful content that pushes through barriers and highlights all things Afro-Latino and Afro-Diasporic. Don't miss it! Only on LatiNation.",
    pillar: "Roots",
    contentType: "Long-form Series"
  },
  {
    id: "shades-of-beauty",
    title: "Shades of Beauty",
    season: "Season 1",
    premiereDate: "2026-04",
    episodesAnnually: "12 episodes annually",
    description: "Beauty is not one-dimensional. Welcome to Shades of Beauty, where we celebrate all shades all the time. This series, inclusive of Afro-Latina beauty, offers out-of-the-box inspiration, interviews with beauty and fashion icons, and practical tips to have you feeling like your best self every day. Dive deep into every shape and every shade.",
    isNew: true,
    pillar: "Roots",
    contentType: "Long-form Series"
  },
  
  // LatiNation Culture
  {
    id: "checkitow",
    title: "Checkitow",
    season: "Season 7",
    premiereDate: "2025-10",
    episodesAnnually: "24 episodes annually",
    description: "Hosted by Humberto Guida, Checkitow is LatiNation's original platform for Latinos in comedy and entertainment to showcase who they really are and tell it like it really is. From hot takes on pop culture to hilarious personal stories, nothing is off limits.",
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "cultura-shock",
    title: "Cultura Shock",
    season: "Season 6",
    premiereDate: "2025-10",
    episodesAnnually: "24 episodes annually",
    description: "Cultura Shock focuses on aspects of Latino culture not seen anywhere else. LatiNation's Anakaren Lopez and Mike ALfaro bring you an electrifying and refreshing perspective on what Latino cultura looks like in modern-day America.",
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "latination-futbol-club",
    title: "LatiNation Futbol Club",
    season: "Season 3",
    premiereDate: "2025-09",
    episodesAnnually: "24 episodes annually",
    description: "Hosted by soccer expert Marcelino Ortiz, LatiNation Futbol Club delivers focused insights on Latino soccer, covering player updates, league developments, and the unique cultural impact of the sport within the Latino community. Airing every Friday, the show combines expert analysis with authentic storytelling to connect fans to the game's rich heritage and ongoing narratives. Whether you're a passionate fan or new to Latino soccer culture, LatiNation Futbol Club offers a comprehensive and engaging weekly experience. Comprehensive coverage of Latino soccer culture—from MLS to World Cup.",
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "lone-lobos",
    title: "Lone Lobos",
    season: "Season 2",
    premiereDate: "2025-04",
    episodesAnnually: "10 episodes annually",
    description: "Unapologetically honest on-and-off-screen best friends Xolo Maridueña and Jacob Bertrand take you into their world each week on their podcast, Lone Lobos.",
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "desmadre-live",
    title: "Desmadre Live",
    season: "Season 1",
    premiereDate: "2025-10",
    episodesAnnually: "40 episodes annually",
    description: "A groundbreaking one-hour weekly live simulcast that seamlessly fuses the electrifying energy of radio with the captivating visuals of TV, streaming across app, web, and CTV. An immersive, high-energy clubhouse. Expect the unexpected: unfiltered conversations, spontaneous interactions, and an unforgettable experience that keeps audiences engaged and entertained. Exporting Latino LA to the World. High-energy variety show mixing music, comedy, and interactive audience segments.",
    isNew: true,
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "batalla-nation",
    title: "Batalla Nation",
    season: "Season 1",
    premiereDate: "2025-09",
    episodesAnnually: "12 episodes annually",
    description: "Musical competition series featuring Latin music artists in head-to-head battles.",
    isNew: true,
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "jenny-lorenzo-comedy",
    title: "Jenny Lorenzo Comedy",
    season: "Season 2",
    premiereDate: "2025-11",
    episodesAnnually: "12 episodes annually",
    description: "Comedy series featuring Jenny Lorenzo's unique take on Latino culture and family dynamics.",
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "whats-good-hwood",
    title: "What's Good H'Wood",
    season: "Season 4",
    premiereDate: "2025-10",
    episodesAnnually: "20 episodes annually",
    description: "Entertainment news and celebrity interviews focusing on Latino representation in Hollywood.",
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  
  // LatiNation Latina
  {
    id: "a-toast-to-life",
    title: "A Toast to Life",
    season: "Season 3",
    premiereDate: "2025-11",
    episodesAnnually: "12 episodes annually",
    description: "Celebrating life's milestones and achievements within the Latina community.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "esencia-latina-wellness",
    title: "Esencia: Latina Wellness",
    season: "Season 2",
    premiereDate: "2025-09",
    episodesAnnually: "24 episodes annually",
    description: "Wellness-focused series addressing physical, mental, and spiritual health in the Latina community.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "foodie-on-the-go",
    title: "Foodie on the Go",
    season: "Season 3",
    premiereDate: "2025-10",
    episodesAnnually: "24 episodes annually",
    description: "Culinary adventures exploring Latino cuisine and food culture.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "ganadoras",
    title: "Ganadoras",
    season: "Season 2",
    premiereDate: "2025-09",
    episodesAnnually: "16 episodes annually",
    description: "Celebrating Latina women who are winning in sports, business, and life.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "jenickas-journey",
    title: "Jenicka's Journey",
    season: "Season 2",
    premiereDate: "2025-11",
    episodesAnnually: "12 episodes annually",
    description: "Personal journey series following Jenicka Lopez.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "new-latina-show",
    title: "New Latina Show",
    season: "Season 1",
    premiereDate: "2026-01",
    episodesAnnually: "20 episodes annually",
    description: "Brand new series celebrating modern Latina experiences.",
    isNew: true,
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  
  // LatiNation Queer
  {
    id: "the-q-agenda",
    title: "The Q Agenda",
    season: "Season 3",
    premiereDate: "2025-10",
    episodesAnnually: "24 episodes annually",
    description: "LGBTQ+ focused content celebrating queer Latino voices and stories.",
    pillar: "Queer",
    contentType: "Long-form Series"
  },
  {
    id: "latino-alternative-storytellers",
    title: "Latino Alternative Storytellers",
    season: "Season 2",
    premiereDate: "2025-12",
    episodesAnnually: "12 episodes annually",
    description: "Alternative storytelling format highlighting diverse Latino narratives.",
    pillar: "Queer",
    contentType: "Long-form Series"
  }
];

// ==========================================
// SHORT-FORM SERIES DATABASE
// ==========================================
export const SHORT_FORM_SERIES: BaseSeries[] = [
  // LatiNation Culture Short-form Series
  {
    id: 'overly-emojinal',
    title: 'Overly Emojinal',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'In Overly Emojinal, artists are challenged to decipher the popular songs sent to them via emojis. The format is versatile, featuring regular segments where artists guess their own songs, as well as "Special Editions" that highlight top trending music movements. The integration of emojis adds an element of fun and mystery, keeping both artists and viewers engaged throughout the game.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    opportunityForSales: 'This interactive concept not only captivates a broad demographic of music enthusiasts but also presents a valuable opportunity for client partnerships. Brands can leverage this high-engagement platform to align with cultural trends, amplify musical movements, and connect with a dedicated audience through bespoke sponsorships and content integrations.',
    bestPerformingVideo: 'Xavi – 2.1M views and over 43,300 engagements; 143% engagement rate',
    overallTopStats: '3.9M video views; 100K total engagements across platforms (TikTok, IG, YouTube)',
    keyGuests: 'Eslabon Armado; Xavi; Marca MP; Fabio Guerra; Oscar Maydon; La Receta; Octavio Cuadras; Padrinito Toys; Matisse; Bodine'
  },
  {
    id: 'get2know',
    title: 'Get2Know',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Get2Know is a fast-paced, personality-driven interview segment that offers a deeper, more relatable look at today\'s top music artists. Through a series of rapid-fire, offbeat questions—ranging from quirky habits to everyday preferences—Get2Know explores lifestyle, humor, and behind-the-scenes anecdotes. With Get2Know, fans don\'t just see the artist—they meet the person behind the music.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    opportunityForSales: 'Designed for short-form, high-engagement social platforms, Get2Know is ideal for branded content integration, product placements, and culture-forward sponsorship opportunities. Its flexible format and authentic tone make it an effective tool for reaching Gen Z and millennial audiences through shareable, relatable storytelling.',
    bestPerformingVideo: 'Get2Know Xavi – 75,000 views; 1,800 engagements',
    overallTopStats: '138,422 video views; 7,015 total engagements; avg. engagement rate 0.75%',
    keyGuests: 'Xavi; Kenia Os; Fabio Guerra; Angela Aguilar; Jay Wheeler; Ximena Sarinana; Angelina Victoria; Adrian Chaparro; St. Vincent; La Receta; Yng Lvcas; Camila Fernandez; Nicole Zignago; Ramon Vega; Karina Sofia'
  },
  {
    id: 'bomba-mix',
    title: 'Bomba Mix',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Bomba Mix is a nostalgic, music-driven segment that taps into the early 2000s era of burning CDs and curating the perfect mix for every mood. In this interactive series, artists are prompted with a variety of real-life scenarios—like "What\'s your heartbreak anthem?" or "What song gets you hyped before a show?"—and they respond with their top music pick for each. As the segment unfolds, viewers get a unique window into the artist\'s personal taste, emotional landscape, and musical influences. With Bomba Mix, we don\'t just hear what the artist makes—we hear what moves them.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    opportunityForSales: 'Designed for high-impact social engagement and cross-platform integration (Spotify, Apple Music, YouTube), Bomba Mix is a natural fit for music brands, streaming services, and lifestyle sponsors looking to connect through storytelling, nostalgia, and curated audio experiences.',
    bestPerformingVideo: 'Angela Aguilar – 2.5M views; 69,917 engagements',
    keyGuests: 'David Archuleta; Prince Royce; Angela Aguilar; Erick Brian; Gaby Moreno; Yng Lvcas; Lupita Infante; Octavio Cuadras; Nicki Nicole; Luis Angel "El Flaco"'
  },
  {
    id: 'sad-boy-starter-pack',
    title: 'Sad Boy Starter Pack',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Sad Boy Starter Pack is a mood-based segment where male music artists open up about their go-to comforts during their "sad boy hours." From what they\'re listening to, watching, and eating, to the rituals that help them ride the emotional waves, each artist curates a personalized starter pack that fans can use to match the vibe. Because sometimes, the best way to get through your sad boy hours… is with the perfect soundtrack, a hoodie, and hot wings—just like your favorite artist.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    opportunityForSales: 'Sad Boy Starter Pack blends authenticity with entertainment and is ideal for fan engagement, streaming partnerships, food or beverage integrations, and mental health-forward messaging. Its relatable tone and emotionally resonant content create a strong viewer connection and high shareability across platforms.',
    keyGuests: 'Saul Villareal; Eslabon Armado'
  },
  {
    id: 'never-again',
    title: 'Never Again',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Never Again is a social-first interview series where guests share the places they\'ll never visit or things they\'ll never do again—from overrated spots to unforgettable fails. Using fun, themed prompts, we uncover relatable, culturally rooted stories that spark laughs and conversation.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    opportunityForSales: 'Episode or series sponsorship with logo integration, custom prompts tied to your category (e.g., travel fails, foodie flops), or branded segments that highlight "what to do instead." Perfect for travel, dining, lifestyle, and entertainment brands looking to connect through humor and authenticity.',
    bestPerformingVideo: 'Zashia Santiago – 45,000 reach; 2,800 engagements; 9.52% engagement rate',
    overallTopStats: 'Avg. engagement rate 1.21%; avg. reach 6,453',
    keyGuests: 'Zashia Santiago; Victoria La Mala; Karissa Love; Aleja Jimenez; Rai Nao; Lupita Infante; Alycia Pascual; Sir John; Jason Canela; Judeline; Carolina Gutierrez; Chiquis'
  },
  {
    id: 'deep-cuts',
    title: 'Deep Cuts',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Deep Cuts is a social-first interview series where guests share their favorite underrated or little-known spots in their hometown—from taco trucks to thrift shops to secret hiking trails. Fun, themed prompts uncover authentic, culturally rooted gems our audience craves.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    opportunityForSales: 'Can align the series with authentic, local storytelling through sponsorship, product placement, or venue integration. Perfect for brands in food, beverage, lifestyle, or travel looking to reach a discovery-driven, culture-savvy audience.',
    keyGuests: 'Valentina Ferrer; Amy Correa Bell; Johnny Valencia; Bodine; Gabriela Ramos; Daviana; Maldita Molotov; Carolina Moreno'
  },
  {
    id: 'este-o-este',
    title: 'Este o Este (This or That?)',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'It\'s a fast-paced, social-first "this or that" segment where guests choose between two iconic Latin items—like mofongo or mangú, horchata or agua fresca—showcasing the diversity and pride of Latin cultures. Each version can spotlight a specific country or theme (e.g., Dominican edition, Mexican edition).',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    opportunityForSales: 'Brands can sponsor Este o Este by owning a full series, a country-specific edition, or even integrating their product as one of the choices. With its highly shareable and interactive format, Este o Este invites audiences to engage, comment, and debate—making it ideal for brands in food, beverage, travel, and lifestyle that want to connect with a culture-savvy, engaged Latino audience.'
  },
  {
    id: 'ponte-las-pilas',
    title: 'Ponte Las Pilas',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Ponte Las Pilas is an electrifying, fast-paced segment within Cultura Shock where guests are put to the test through trivia, challenges, and quick-fire games that push them to think fast and act even faster. Inspired by the popular Spanish idiom meaning "step up" or "get your act together," this segment invites participants to prove just how sharp, savvy, or culturally in-the-know they really are.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    parentSeries: 'Cultura Shock',
    opportunityForSales: 'The segment is designed to be adaptable for social extensions, live audience participation, and brand activations. From energy drinks to mobile apps, Ponte Las Pilas is a natural fit for partners looking to align with high-energy, youth-driven content that celebrates culture, quick thinking, and personality.',
    bestPerformingVideo: 'Jason Canela – Miami I think or Hollywood',
    keyGuests: 'Jason Canela; Itati & Silvia Lopez'
  },
  {
    id: 'clapback',
    title: 'Clapback',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Clapback is a powerful, conversation-driven segment within Cultura Shock that gives guests—artists, actors, athletes, and changemakers—the mic to confront stereotypes, shut down criticism, and reclaim their narrative. But this isn\'t just about the comeback—it\'s about turning clapbacks into teachable, empowering moments.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    parentSeries: 'Cultura Shock',
    opportunityForSales: 'The segment creates space for community dialogue and offers strong opportunities for partnerships around cultural empowerment, identity, mental health, and social advocacy.',
    bestPerformingVideo: 'Angelina Victoria on Machismo?',
    keyGuests: 'Loren Esandon; Angelina Victoria; Estevie; Itati y Silvia Lopez; Jason Canela; Carolina Moreno; Black Oxygen; Ana Saia'
  },
  {
    id: 'bench-talk',
    title: 'Bench Talk',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Bench Talk is a developing podcast-style segment within the broadcast show Ganadoras. Hosted by two dynamic Latina sports reporters, this segment offers sharp, unfiltered commentary on the latest in the sports world—with a special focus on women athletes, leagues, and events.',
    contentType: 'Short-form Series',
    pillar: 'Culture',
    parentSeries: 'Ganadoras',
    opportunityForSales: 'With its focus on storytelling, representation, and lifestyle crossover, the segment offers natural alignment opportunities for brands in sportswear, media, health, and women-focused campaigns.'
  },

  // LatiNation Latina Short-form Series
  {
    id: 'truth-or-myth',
    title: 'Truth or Myth',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Truth or Myth is a fun, interactive segment on Esencia where the host sits down with wellness pros—from functional medicine doctors to holistic estheticians—to debunk common health and wellness myths. After each question, the guest and host take a sip of Esen wellness shots before revealing the truth, adding a playful, branded ritual to the conversation.',
    contentType: 'Short-form Series',
    pillar: 'Latina',
    parentSeries: 'Esencia: Latina Wellness',
    opportunityForSales: 'Brands can align with Truth or Myth by sponsoring the series or integrating their product directly into the segment\'s ritual. With its credible experts, shareable format, and built-in wellness shot moment, this series is ideal for health, beauty, beverage, and lifestyle brands looking to position themselves at the heart of authentic, expert-backed wellness conversations.',
    overallTopStats: 'Average engagement rate: 3.64%; total reach: 10.1M'
  },

  // LatiNation Queer Short-form Series
  {
    id: 'queer-questions',
    title: 'Queer Questions',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Are there questions you have for the queer community that you\'re too embarrassed to ask? Do you not have a queer person in your life to give you thoughtful perspective? As queer identity becomes more normalized, so too do questions about queer life. Part journalism, part personal anecdote, Queer Questions is an all-new LatiNation Queer series where we respond to curiosities, stigmas, and ignorances, using personal experience as proof.',
    contentType: 'Short-form Series',
    pillar: 'Queer',
    parentSeries: 'The Q Agenda',
    opportunityForSales: 'With its focus on storytelling, representation, and lifestyle crossover, the segment offers natural alignment opportunities for brands in sportswear, media, health, and women-focused campaigns.'
  },
  {
    id: 'cold-reads',
    title: 'Cold Reads',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'How good a read can two strangers get on each other after one theatrical cold read? In LatiNation\'s all-new comedy segment, COLD READS, we pair up two individuals who perform a quick two-person scene on camera. What they don\'t know is that this segment has nothing to do with their reading of the scene – but everything to do with their reading of each other.',
    contentType: 'Short-form Series',
    pillar: 'Queer',
    parentSeries: 'The Q Agenda'
  },
  {
    id: 'caro-all-dressed-up',
    title: 'Caro All Dressed Up & Nowhere to Go',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Caro All Dressed Up & Nowhere to Go is a fabulously chaotic comedy following trans Latina glam goddess Carolina Gutierrez, who somehow always ends up overdressed, underprepared, and absolutely unbothered. Every episode, she\'s canceled on at the last minute—but with full glam and nowhere to go, her mischievous "friend" Enrique Sapene (from LatiNation) swoops in with a totally helpful idea... that always leads her to the most hilariously wrong location for her look.',
    contentType: 'Short-form Series',
    pillar: 'Queer',
    parentSeries: 'The Q Agenda'
  },
  {
    id: 'chat-no-chaser-victor',
    title: 'Chat no Chaser',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'What about the grit behind the glam? Internet personality Victor Ramos is curious. In his all-new short-form talk show, Chat No Chaser, Victor gets real with beauty influencers, content creators, and pop culture queens and gets their unfiltered takes about social media and the Hollywood scene.',
    contentType: 'Short-form Series',
    pillar: 'Queer',
    parentSeries: 'The Q Agenda'
  },
  {
    id: 'lianna-caffeinated',
    title: 'Lianna Caffeinated',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Lianna Caffeinated is the jolt of curiosity you didn\'t know you needed. Fueled by a big cup of coffee and an earnest sense of wonder, comedian Lianna Carrera sits down with everyone from Kabbalah scholars to arepa artisans to maintenance pros—people whose jobs we see every day but rarely stop to ask about.',
    contentType: 'Short-form Series',
    pillar: 'Queer',
    parentSeries: 'The Q Agenda'
  },

  // LatiNation Roots Short-form Series
  {
    id: 'cultura-y-sazon',
    title: 'Cultura & Sazón',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'This short-form LatiNation Roots series dives into conversations about culture, identity, and roots with guests like Arlen Escarpeta, Mabel Frias, and Rom Lawrell. It\'s cozy, delicious, and rooted in real connection.',
    contentType: 'Short-form Series',
    pillar: 'Roots',
    parentSeries: 'Blacktinidad'
  },
  {
    id: 'cuentame',
    title: 'Cuéntame',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'A one-on-one moment that blends playful and personal. While playing nostalgic games like Connect Four or Jenga, stars like Jharrel Jerome, Nelson Estevez, and Rico Paris open up about their journeys and share their unique stories with one of our hosts. Think of it as catching up with a friend—just with a twist.',
    contentType: 'Short-form Series',
    pillar: 'Roots',
    parentSeries: 'Blacktinidad'
  },
  {
    id: 'spill-the-tea',
    title: 'Spill the Tea',
    season: 'Season 1',
    premiereDate: '2025-07',
    description: 'Spill the Tea combines gossip with art in the most hilarious way. Hosted by the sassy Elijah Gil, this timed drawing challenge forces the cast to spill secrets and opinions on pop culture and current events while sketching the "image of the day." It\'s chaotic, clever, and impossible not to watch—a real peek into our hosts\' personalities.',
    contentType: 'Short-form Series',
    pillar: 'Roots',
    parentSeries: 'Blacktinidad'
  }
];

// ==========================================
// CAMPAIGNS DATABASE
// ==========================================
export const CAMPAIGNS: BaseCampaign[] = [
  {
    id: "echoes-of-cultura-2025",
    title: "Echoes of Cultura",
    flightDates: "September 2 - October 31, 2025",
    overview: "Hispanic Heritage Month campaign celebrating Latino culture and heritage",
    platforms: "Digital, Social, CTV",
    deliverables: "Special episodes, social content, branded integrations",
    participatingSeriesIds: ["cultura-shock", "blacktinidad", "the-q-agenda", "latino-alternative-storytellers"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "dia-de-muertos-2025",
    title: "Día de Muertos Celebration",
    flightDates: "October 28 - November 2, 2025",
    overview: "Special programming celebrating Day of the Dead traditions",
    platforms: "Digital, Social, CTV",
    deliverables: "Special content, cultural programming, community features",
    participatingSeriesIds: [],
    contentType: "LatiNation Campaign"
  },
  {
    id: "sin-city-musica-2025",
    title: "Sin City Música",
    flightDates: "November 14-17, 2025",
    overview: "Latin Grammy Las Vegas coverage and celebration",
    platforms: "Digital, Social, CTV, Live Streaming",
    deliverables: "• Highlight Special (30 min): Fast-cut weave of winners, reactions, backstage access\n• Backstage Beats: 3–5 min artist-focused shorts—candid Q&As + performance teasers\n• Style Files: 2–4 min fashion + beauty capsules dissecting red-carpet looks\n• VIP Insider: 2–4 min party pass into Vegas's most exclusive after-parties\n• Red Carpet Live: Real-time social streams pre- and post-show with on-the-spot reactions\n• Social Countdown & Reactions: 30–60 sec teasers and winner-reveal reels\n• Digital Microsite Hub: Mobile-first portal aggregating every asset, plus editorial rundowns",
    participatingSeriesIds: ["cultura-shock", "the-q-agenda", "blacktinidad", "whats-good-hwood"],
    contentType: "Tentpole Campaign"
  },
  {
    id: "fiestas-our-way-2025",
    title: "Fiestas Our Way",
    flightDates: "December 1-31, 2025",
    overview: "Holiday season programming celebrating Latino holiday traditions",
    platforms: "Digital, Social, CTV",
    deliverables: "Holiday special episodes, cultural content, family programming",
    participatingSeriesIds: ["cultura-shock", "blacktinidad", "the-q-agenda", "shades-of-beauty"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "new-year-renewal-2026",
    title: "New Year Renewal",
    flightDates: "January 1-31, 2026",
    overview: "New Year wellness and renewal campaign",
    platforms: "Digital, Social, CTV",
    deliverables: "Wellness content, goal-setting programming, motivational series",
    participatingSeriesIds: ["esencia-latina-wellness", "new-latina-show", "ganadoras"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "black-history-month-2026",
    title: "Black History Month Celebration",
    flightDates: "February 1-28, 2026",
    overview: "Celebrating Afro-Latino heritage and Black history",
    platforms: "Digital, Social, CTV",
    deliverables: "Educational content, cultural programming, historical features",
    participatingSeriesIds: ["blacktinidad", "shades-of-beauty", "cultura-shock", "the-q-agenda", "new-latina-show", "latino-alternative-storytellers"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "mujeres-in-charge-2026",
    title: "Mujeres in Charge",
    flightDates: "March 1-31, 2026",
    overview: "Women's History Month celebrating Latina leadership and empowerment",
    platforms: "Digital, Social, CTV",
    deliverables: "Empowerment content, leadership profiles, inspirational programming",
    participatingSeriesIds: ["blacktinidad", "cultura-shock", "whats-good-hwood", "new-latina-show", "ganadoras", "latino-alternative-storytellers"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "earth-day-2026",
    title: "Earth Day Awareness",
    flightDates: "April 15-30, 2026",
    overview: "Environmental awareness and sustainability campaign",
    platforms: "Digital, Social",
    deliverables: "Educational content, eco-friendly programming, sustainability features",
    participatingSeriesIds: ["blacktinidad", "cultura-shock"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "cinco-de-mayo-2026",
    title: "Cinco de Mayo Celebration",
    flightDates: "May 1-5, 2026",
    overview: "Mexican culture celebration and heritage programming",
    platforms: "Digital, Social, CTV",
    deliverables: "Cultural content, music programming, food features",
    participatingSeriesIds: [],
    contentType: "LatiNation Campaign"
  },
  {
    id: "mothers-day-madrehood-2026",
    title: "Mother's Day Madrehood",
    flightDates: "May 1-11, 2026",
    overview: "Celebrating Latina mothers and motherhood",
    platforms: "Digital, Social, CTV",
    deliverables: "Family content, maternal stories, generational programming",
    participatingSeriesIds: ["new-latina-show"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "feliz-pride-2026",
    title: "Feliz Pride",
    flightDates: "June 1-30, 2026",
    overview: "Pride Month celebration of LGBTQ+ Latino community",
    platforms: "Digital, Social, CTV",
    deliverables: "LGBTQ+ programming, pride content, community features",
    participatingSeriesIds: ["the-q-agenda", "blacktinidad", "cultura-shock", "new-latina-show"],
    contentType: "LatiNation Campaign"
  }
];

// ==========================================
// BRANDED CAMPAIGNS DATABASE
// ==========================================
export const BRANDED_CAMPAIGNS: BrandedCampaign[] = [
  {
    id: "wellness-shots-integration-2025",
    title: "Wellness Shots Brand Integration",
    flightDates: "September 1 - December 31, 2025",
    description: "Integrated wellness product placement across wellness-focused content",
    contentType: "Branded Content Campaign",
    deliverables: "Product integration, sponsored segments, wellness content",
    campaignType: "Product Integration"
  },
  {
    id: "music-streaming-partnership-2025",
    title: "Music Streaming Platform Partnership",
    flightDates: "October 1 - December 31, 2025",
    description: "Partnership with major streaming platform for music-focused content",
    contentType: "Branded Content Campaign",
    deliverables: "Playlist integrations, artist interviews, streaming features",
    campaignType: "Platform Partnership"
  }
];

// ==========================================
// CENTRAL DATA ACCESS
// ==========================================
export const ALL_SERIES = [...LONG_FORM_SERIES, ...SHORT_FORM_SERIES];
export const ALL_CAMPAIGNS = CAMPAIGNS;
export const ALL_BRANDED_CAMPAIGNS = BRANDED_CAMPAIGNS;

// Utility function to generate slugs
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Get series by type
export const getSeriesByType = (type: 'Long-form Series' | 'Short-form Series') => {
  return ALL_SERIES.filter(series => series.contentType === type);
};

// Get series by pillar
export const getSeriesByPillar = (pillar: PillarType) => {
  return ALL_SERIES.filter(series => series.pillar === pillar);
};

// Get new series
export const getNewSeries = () => {
  return ALL_SERIES.filter(series => series.isNew === true);
};

// Get series by slug
export const getSeriesBySlug = (slug: string) => {
  return ALL_SERIES.find(series => generateSlug(series.title) === slug);
};

// Get campaign by slug
export const getCampaignBySlug = (slug: string) => {
  return ALL_CAMPAIGNS.find(campaign => generateSlug(campaign.title) === slug);
};

// Debug function to log all content counts
export const logContentCounts = () => {
  console.log('📊 CENTRAL DATABASE STATS:', {
    totalSeries: ALL_SERIES.length,
    longFormSeries: getSeriesByType('Long-form Series').length,
    shortFormSeries: getSeriesByType('Short-form Series').length,
    newSeries: getNewSeries().length,
    totalCampaigns: ALL_CAMPAIGNS.length,
    brandedCampaigns: ALL_BRANDED_CAMPAIGNS.length,
    byPillar: {
      roots: getSeriesByPillar('Roots').length,
      culture: getSeriesByPillar('Culture').length,
      latina: getSeriesByPillar('Latina').length,
      queer: getSeriesByPillar('Queer').length
    }
  });
};