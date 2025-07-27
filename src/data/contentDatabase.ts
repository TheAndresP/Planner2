// Content Database - Single Source of Truth
// This is where you add/edit all content. Everything else is computed from here.

export type ContentType = 'LatiNation Campaign' | 'Tentpole Campaign' | 'Branded Content Campaign' | 'Long-form Series' | 'Short-form Series' | 'Special';

export interface Series {
  id: string;
  title: string;
  season: string;
  premiereDate: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  episodesAnnually?: string;
  description?: string;
  isNew?: boolean;
  pillar?: 'Roots' | 'Culture' | 'Latina' | 'Queer';
  contentType: ContentType;
  parentSeries?: string; // For short-form series that belong to a long-form series
  opportunityForSales?: string;
  bestPerformingVideo?: string;
  overallTopStats?: string;
  keyGuests?: string;
}

export interface Campaign {
  id: string;
  title: string;
  flightDates: string;
  overview: string;
  platforms: string;
  deliverables: string;
  participatingSeriesIds: string[]; // References to series IDs
  contentType: ContentType;
}

export interface Event {
  id: string;
  title: string;
  date: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  description?: string;
  contentType: ContentType;
}

export interface Initiative {
  id: string;
  title: string;
  date: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  description?: string;
  contentType: ContentType;
}

export interface Special {
  id: string;
  title: string;
  date: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  description: string;
  contentType: ContentType;
}

export interface BrandedCampaign {
  id: string;
  title: string;
  flightDates: string;
  description: string;
  contentType: ContentType;
  deliverables: string;
  campaignType: string; // e.g., "Social Media + OLV", "360 campaign", etc.
}

// ==========================================
// SERIES DATABASE - Add/Edit Series Here
// ==========================================

export const seriesDatabase: Series[] = [
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
    premiereDate: "2025-11",
    episodesAnnually: "8 episodes annually",
    description: "Batalla Nation is an electrifying celebration of freestyle rap culture, storytelling, and community. In this 8-part unscripted series, LatiNation and Red Bull bring the fire of Batalla into a new format, blending viral moments, never-before-seen footage, nostalgic flashbacks, and fresh commentary for a new generation of U.S. Latinos. Hosted by Sofia Gutierrez and Boss",
    isNew: true,
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "jenny-lorenzo-comedy",
    title: "Jenny Lorenzo Comedy",
    season: "Season 1",
    premiereDate: "2026-01",
    episodesAnnually: "12 episodes annually",
    description: "Relatable comedy sketches exploring everyday Latino life created and performed by Latina viral legend Jenny Lorenzo",
    isNew: true,
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "whats-good-hwood",
    title: "What's Good HWood",
    season: "Season 1",
    premiereDate: "2025-11",
    episodesAnnually: "24 episodes annually",
    description: "Hollywood news and pop culture from a Latino perspective.",
    isNew: true,
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  {
    id: "a-toast-to-life",
    title: "A Toast to Life",
    season: "Season 1",
    premiereDate: "2025-08",
    episodesAnnually: "12 episodes annually",
    description: "The most organic most authentic podcast out right now. We are here to share peoples stories on life, business and motivation/inspiration. We hope the conversations we share we help anyone going through a tough time, inspire them take that leap of faith and trust themselves in this journey called life.",
    isNew: true,
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  
  // LatiNation Latina
  {
    id: "esencia-latina-wellness",
    title: "Esencia: Latina Wellness",
    season: "Season 3",
    premiereDate: "2025-10",
    episodesAnnually: "16 episodes annually",
    description: "\"Esencia: Latina Wellness\" is a sanctuary where holistic wisdom meets expert insights in the realm of Latina health. Host Katherine Castro invites you on a transformative journey to explore diverse approaches to wellness. Join in-depth conversations with experts as they unveil a rich tapestry of wellness philosophies.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "foodie-on-the-go",
    title: "Foodie On The Go",
    season: "Season 2",
    premiereDate: "2025-11",
    episodesAnnually: "6 episodes annually",
    description: "Foodie on the Go follows GRAMMY-winning artist and entrepreneur Chiquis as she travels across the U.S. exploring unique and exciting foods. From local spots and food trucks to five-star restaurants, Chiquis dives into each dish while connecting with the chefs, workers, and communities behind them. Foodie on the Go highlights her passion for food, travel, and supporting small business.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "ganadoras",
    title: "Ganadoras",
    season: "Season 3",
    premiereDate: "2025-10",
    episodesAnnually: "16 episodes annually",
    description: "Fueled by Latina host Sofia Gutierrez, Ganadoras is LATV's brand-new sports series that brings a fresh take on everything competitive. Including coverage of rapidly growing women's sports, this groundbreaking series brings you the latest from the biggest sporting events and teams Latino fans go crazy for. From off-pitch interviews with athletes, previews, and highlights of major tournaments to in-depth segments about Latina achievements, Ganadoras emphasizes Latino culture in sports.",
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "jenickas-journey",
    title: "Jenicka's Journey",
    season: "Season 1",
    premiereDate: "2026-03",
    episodesAnnually: "6 episodes annually",
    description: "Reality TV star, influencer, entrepreneur and so much more. Jenicka López has been in the public eye since she was a teen, but this series will reveal her heart, her mind, and her growth like never before. Her authenticity, relatability, and cultural voice make her a powerful lead for millennial and Gen Z Latina audiences.",
    isNew: true,
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  {
    id: "new-latina-show",
    title: "New Latina Show",
    season: "Season 1",
    premiereDate: "2026-01",
    episodesAnnually: "24 episodes annually",
    description: "New flagship LatiNation Latina series in development.",
    isNew: true,
    pillar: "Latina",
    contentType: "Long-form Series"
  },
  
  // LatiNation Queer
  {
    id: "the-q-agenda",
    title: "The Q Agenda",
    season: "Season 12",
    premiereDate: "2026-06",
    episodesAnnually: "16 episodes annually",
    description: "Recognized by GLAAD, The Blade, and Out Magazine for championing queer, Latine voices on and off camera, the show has welcomed LGBTQ+ celebrities, leaders, and trailblazers like Carmen Carrera, Ashlee Marie Preston and Isis King. Hosted by Enrique Sapene, Victor Ramos, Carolina Gutierrez, Lianna Carrera, and Juliana Joel, The Q Agenda features exciting success stories, touching coming-out stories, with hot takes on politics, hotter takes on pop culture, and all the unexpected chisme you won't want to miss.",
    pillar: "Queer",
    contentType: "Long-form Series"
  },
  {
    id: "latino-alternative-storytellers",
    title: "Latino Alternative Storytellers",
    season: "Season 2",
    premiereDate: "2026-02",
    episodesAnnually: "16 episodes annually",
    description: "LatiNation's Latino Alternative Storytellers honors individuals who carry on the Latino tradition of storytelling and make an impact on our community. From the kitchen to the theatre, fashion workshops to music studios, artists across mediums share how their stories fit into a larger Hispanic narrative.",
    pillar: "Culture",
    contentType: "Long-form Series"
  },
  
  // Short-form Series
  {
    id: 'overly-emojinal',
    title: 'Overly Emojinal',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'In Overly Emojinal, artists are challenged to decipher the popular songs sent to them via emojis. The format is versatile, featuring regular segments where artists guess their own songs, as well as "Special Editions" that highlight top trending music movements. The integration of emojis adds an element of fun and mystery, keeping both artists and viewers engaged throughout the game.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    opportunityForSales: 'This interactive concept not only captivates a broad demographic of music enthusiasts but also presents a valuable opportunity for client partnerships. Brands can leverage this high-engagement platform to align with cultural trends, amplify musical movements, and connect with a dedicated audience through bespoke sponsorships and content integrations.',
    bestPerformingVideo: 'Xavi – 2.1M views and over 43,300 engagements; 143% engagement rate',
    overallTopStats: '3.9M video views; 100K total engagements across platforms (TikTok, IG, YouTube)',
    keyGuests: 'Eslabon Armado; Xavi; Marca MP; Fabio Guerra; Oscar Maydon; La Receta; Octavio Cuadras; Padrinito Toys; Matisse; Bodine'
  },
  {
    id: 'get2know',
    title: 'Get2Know',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Get2Know is a fast-paced, personality-driven interview segment that offers a deeper, more relatable look at today\'s top music artists. Through a series of rapid-fire, offbeat questions—ranging from quirky habits to everyday preferences—Get2Know explores lifestyle, humor, and behind-the-scenes anecdotes. With Get2Know, fans don\'t just see the artist—they meet the person behind the music.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    opportunityForSales: 'Designed for short-form, high-engagement social platforms, Get2Know is ideal for branded content integration, product placements, and culture-forward sponsorship opportunities. Its flexible format and authentic tone make it an effective tool for reaching Gen Z and millennial audiences through shareable, relatable storytelling.',
    bestPerformingVideo: 'Get2Know Xavi – 75,000 views; 1,800 engagements',
    overallTopStats: '138,422 video views; 7,015 total engagements; avg. engagement rate 0.75%',
    keyGuests: 'Xavi; Kenia Os; Fabio Guerra; Angela Aguilar; Jay Wheeler; Ximena Sarinana; Angelina Victoria; Adrian Chaparro; St. Vincent; La Receta; Yng Lvcas; Camila Fernandez; Nicole Zignago; Ramon Vega; Karina Sofia'
  },
  {
    id: 'bomba-mix',
    title: 'Bomba Mix',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Bomba Mix is a nostalgic, music-driven segment that taps into the early 2000s era of burning CDs and curating the perfect mix for every mood. In this interactive series, artists are prompted with a variety of real-life scenarios—like "What\'s your heartbreak anthem?" or "What song gets you hyped before a show?"—and they respond with their top music pick for each. As the segment unfolds, viewers get a unique window into the artist\'s personal taste, emotional landscape, and musical influences. With Bomba Mix, we don\'t just hear what the artist makes—we hear what moves them.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    opportunityForSales: 'Designed for high-impact social engagement and cross-platform integration (Spotify, Apple Music, YouTube), Bomba Mix is a natural fit for music brands, streaming services, and lifestyle sponsors looking to connect through storytelling, nostalgia, and curated audio experiences.',
    bestPerformingVideo: 'Angela Aguilar – 2.5M views; 69,917 engagements',
    keyGuests: 'David Archuleta; Prince Royce; Angela Aguilar; Erick Brian; Gaby Moreno; Yng Lvcas; Lupita Infante; Octavio Cuadras; Nicki Nicole; Luis Angel "El Flaco"'
  },
  {
    id: 'truth-or-myth',
    title: 'Truth or Myth',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Truth or Myth is a fun, interactive segment on Esencia where the host sits down with wellness pros—from functional medicine doctors to holistic estheticians—to debunk common health and wellness myths. After each question, the guest and host take a sip of Esen wellness shots before revealing the truth, adding a playful, branded ritual to the conversation.',
    isNew: false,
    pillar: 'Latina',
    contentType: 'Short-form Series',
    parentSeries: 'esencia-latina-wellness',
    opportunityForSales: 'Brands can align with Truth or Myth by sponsoring the series or integrating their product directly into the segment\'s ritual. With its credible experts, shareable format, and built-in wellness shot moment, this series is ideal for health, beauty, beverage, and lifestyle brands looking to position themselves at the heart of authentic, expert-backed wellness conversations.',
    overallTopStats: 'Average engagement rate: 3.64%; total reach: 10.1M'
  },
  {
    id: 'sad-boy-starter-pack',
    title: 'Sad Boy Starter Pack',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Sad Boy Starter Pack is a mood-based segment where male music artists open up about their go-to comforts during their "sad boy hours." From what they\'re listening to, watching, and eating, to the rituals that help them ride the emotional waves, each artist curates a personalized starter pack that fans can use to match the vibe. Because sometimes, the best way to get through your sad boy hours… is with the perfect soundtrack, a hoodie, and hot wings—just like your favorite artist.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    opportunityForSales: 'Sad Boy Starter Pack blends authenticity with entertainment and is ideal for fan engagement, streaming partnerships, food or beverage integrations, and mental health-forward messaging. Its relatable tone and emotionally resonant content create a strong viewer connection and high shareability across platforms.',
    keyGuests: 'Saul Villareal; Eslabon Armado'
  },
  {
    id: 'never-again',
    title: 'Never Again',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Never Again is a social-first interview series where guests share the places they\'ll never visit or things they\'ll never do again—from overrated spots to unforgettable fails. Using fun, themed prompts, we uncover relatable, culturally rooted stories that spark laughs and conversation.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    opportunityForSales: 'Episode or series sponsorship with logo integration, custom prompts tied to your category (e.g., travel fails, foodie flops), or branded segments that highlight "what to do instead." Perfect for travel, dining, lifestyle, and entertainment brands looking to connect through humor and authenticity.',
    bestPerformingVideo: 'Zashia Santiago – 45,000 reach; 2,800 engagements; 9.52% engagement rate',
    overallTopStats: 'Avg. engagement rate 1.21%; avg. reach 6,453',
    keyGuests: 'Zashia Santiago; Victoria La Mala; Karissa Love; Aleja Jimenez; Rai Nao; Lupita Infante; Alycia Pascual; Sir John; Jason Canela; Judeline; Carolina Gutierrez; Chiquis'
  },
  {
    id: 'deep-cuts',
    title: 'Deep Cuts',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Deep Cuts is a social-first interview series where guests share their favorite underrated or little-known spots in their hometown—from taco trucks to thrift shops to secret hiking trails. Fun, themed prompts uncover authentic, culturally rooted gems our audience craves.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    opportunityForSales: 'Can align the series with authentic, local storytelling through sponsorship, product placement, or venue integration. Perfect for brands in food, beverage, lifestyle, or travel looking to reach a discovery-driven, culture-savvy audience.',
    keyGuests: 'Valentina Ferrer; Amy Correa Bell; Johnny Valencia; Bodine; Gabriela Ramos; Daviana; Maldita Molotov; Carolina Moreno'
  },
  {
    id: 'este-o-este',
    title: 'Este o Este (This or That?)',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'It\'s a fast-paced, social-first "this or that" segment where guests choose between two iconic Latin items—like mofongo or mangú, horchata or agua fresca—showcasing the diversity and pride of Latin cultures. Each version can spotlight a specific country or theme (e.g., Dominican edition, Mexican edition).',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    opportunityForSales: 'Brands can sponsor Este o Este by owning a full series, a country-specific edition, or even integrating their product as one of the choices. With its highly shareable and interactive format, Este o Este invites audiences to engage, comment, and debate—making it ideal for brands in food, beverage, travel, and lifestyle that want to connect with a culture-savvy, engaged Latino audience.'
  },
  {
    id: 'ponte-las-pilas',
    title: 'Ponte Las Pilas',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Ponte Las Pilas is an electrifying, fast-paced segment within Cultura Shock where guests are put to the test through trivia, challenges, and quick-fire games that push them to think fast and act even faster. Inspired by the popular Spanish idiom meaning "step up" or "get your act together," this segment invites participants to prove just how sharp, savvy, or culturally in-the-know they really are. Whether it\'s answering rapid trivia about music, pop culture, and Latinx heritage, or completing offbeat challenges under pressure, Ponte Las Pilas brings out the competitive spirit in a fun, engaging format that\'s both informative and entertaining.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    parentSeries: 'cultura-shock',
    opportunityForSales: 'The segment is designed to be adaptable for social extensions, live audience participation, and brand activations. From energy drinks to mobile apps, Ponte Las Pilas is a natural fit for partners looking to align with high-energy, youth-driven content that celebrates culture, quick thinking, and personality.',
    bestPerformingVideo: 'Jason Canela – Miami I think or Hollywood',
    keyGuests: 'Jason Canela; Itati & Silvia Lopez'
  },
  {
    id: 'clapback',
    title: 'Clapback',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Clapback is a powerful, conversation-driven segment within Cultura Shock that gives guests—artists, actors, athletes, and changemakers—the mic to confront stereotypes, shut down criticism, and reclaim their narrative. But this isn\'t just about the comeback—it\'s about turning clapbacks into teachable, empowering moments. In each episode, guests respond to real or recurring comments they\'ve received—like "You don\'t look Latina" or "You\'re too emotional to lead"—and share how they would respond, with fire and purpose.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    parentSeries: 'cultura-shock',
    opportunityForSales: 'The segment creates space for community dialogue and offers strong opportunities for partnerships around cultural empowerment, identity, mental health, and social advocacy.',
    bestPerformingVideo: 'Angelina Victoria on Machismo?',
    keyGuests: 'Loren Esandon; Angelina Victoria; Estevie; Itati y Silvia Lopez; Jason Canela; Carolina Moreno; Black Oxygen; Ana Saia'
  },
  {
    id: 'bench-talk',
    title: 'Bench Talk',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Bench Talk is a developing podcast-style segment within the broadcast show Ganadoras. Hosted by two dynamic Latina sports reporters, this segment offers sharp, unfiltered commentary on the latest in the sports world—with a special focus on women athletes, leagues, and events. Bench Talk goes beyond the headlines to give hot takes, deep dives, and personal perspectives on trending topics. From Olympic preparations to behind-the-scenes moments in athletes\' lives, our hosts keep it real, relevant, and unapologetically female. Bench Talk is where sports analysis meets cultura, humor, and heart.',
    isNew: false,
    pillar: 'Culture',
    contentType: 'Short-form Series',
    parentSeries: 'ganadoras',
    opportunityForSales: 'With its focus on storytelling, representation, and lifestyle crossover, the segment offers natural alignment opportunities for brands in sportswear, media, health, and women-focused campaigns.'
  },
  {
    id: 'chat-no-chaser-queer',
    title: 'Chat no Chaser',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Are there questions you have for the queer community that you\'re too embarrassed to ask? Do you not have a queer person in your life to give you thoughtful perspective? As queer identity becomes more normalized, so too do questions about queer life. Part journalism, part personal anecdote, Queer Questions is an all-new LatiNation Queer series where we respond to curiosities, stigmas, and ignorances, using personal experience as proof. Raise your hand! Watch Season 1 here.',
    isNew: false,
    pillar: 'Queer',
    contentType: 'Short-form Series',
    parentSeries: 'the-q-agenda',
    opportunityForSales: 'With its focus on storytelling, representation, and lifestyle crossover, the segment offers natural alignment opportunities for brands in sportswear, media, health, and women-focused campaigns.'
  },
  {
    id: 'cold-reads',
    title: 'Cold Reads',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'How good a read can two strangers get on each other after one theatrical cold read? In LatiNation\'s all-new comedy segment, COLD READS, we pair up two individuals who perform a quick two-person scene on camera. What they don\'t know is that this segment has nothing to do with their reading of the scene – but everything to do with their reading of each other. After their "performance," we split them up and ask them questions to see just how well they think they know each other. Their guesses will have you on the floor laughing. Watch the pilot episode here.',
    isNew: false,
    pillar: 'Queer',
    contentType: 'Short-form Series',
    parentSeries: 'the-q-agenda'
  },
  {
    id: 'caro-all-dressed-up',
    title: 'Caro All Dressed Up & Nowhere to Go',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Caro All Dressed Up & Nowhere to Go is a fabulously chaotic comedy following trans Latina glam goddess Carolina Gutierrez, who somehow always ends up overdressed, underprepared, and absolutely unbothered. Every episode, she\'s canceled on at the last minute—but with full glam and nowhere to go, her mischievous "friend" Enrique Sapene (from LatiNation) swoops in with a totally helpful idea... that always leads her to the most hilariously wrong location for her look. Think stilettos on a mountain trail, sequins in a staff meeting, or a Christmas onesie under the blazing sun. It\'s queer, it\'s camp, it\'s couture-meets-chaos—and it\'s for anyone who\'s ever gotten dressed just for the drama of it.',
    isNew: false,
    pillar: 'Queer',
    contentType: 'Short-form Series',
    parentSeries: 'the-q-agenda'
  },
  {
    id: 'chat-no-chaser-victor',
    title: 'Chat no Chaser',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'What about the grit behind the glam? Internet personality Victor Ramos is curious. In his all-new short-form talk show, Chat No Chaser, Victor gets real with beauty influencers, content creators, and pop culture queens and gets their unfiltered takes about social media and the Hollywood scene. You know those convos on the patio outside the club at 1 AM? We\'re bringing that kind of honest chitchat to the studio—hold the chaser. Watch the first few episodes here.',
    isNew: false,
    pillar: 'Queer',
    contentType: 'Short-form Series',
    parentSeries: 'the-q-agenda'
  },
  {
    id: 'lianna-caffeinated',
    title: 'Lianna Caffeinated',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Lianna Caffeinated is the jolt of curiosity you didn\'t know you needed. Fueled by a big cup of coffee and an earnest sense of wonder, comedian Lianna Carrera sits down with everyone from Kabbalah scholars to arepa artisans to maintenance pros—people whose jobs we see every day but rarely stop to ask about. With heart and humor, Lianna dives into the nitty gritty: faith, politics, ethics, work flow, and all the questions you\'re secretly dying to ask but never do. Caffeinated conversations, uncaffeinated egos.',
    isNew: false,
    pillar: 'Queer',
    contentType: 'Short-form Series',
    parentSeries: 'the-q-agenda'
  },
  {
    id: 'cultura-y-sazon',
    title: 'Cultura & Sazón',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'This short-form LatiNation Roots series dives into conversations about culture, identity, and roots with guests like Arlen Escarpeta, Mabel Frias, and Rom Lawrell. It\'s cozy, delicious, and rooted in real connection.',
    isNew: false,
    pillar: 'Roots',
    contentType: 'Short-form Series',
    parentSeries: 'blacktinidad'
  },
  {
    id: 'cuentame',
    title: 'Cuéntame',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'A one-on-one moment that blends playful and personal. While playing nostalgic games like Connect Four or Jenga, stars like Jharrel Jerome, Nelson Estevez, and Rico Paris open up about their journeys and share their unique stories with one of our hosts. Think of it as catching up with a friend—just with a twist.',
    isNew: false,
    pillar: 'Roots',
    contentType: 'Short-form Series',
    parentSeries: 'blacktinidad'
  },
  {
    id: 'spill-the-tea',
    title: 'Spill the Tea',
    season: 'Season 1',
    premiereDate: 'Ongoing',
    episodesAnnually: 'Multiple',
    description: 'Spill the Tea combines gossip with art in the most hilarious way. Hosted by the sassy Elijah Gil, this timed drawing challenge forces the cast to spill secrets and opinions on pop culture and current events while sketching the "image of the day." It\'s chaotic, clever, and impossible not to watch—a real peek into our hosts\' personalities. Other guests/interviews include TV stars Rome Flynn and Elvis Nolasco, singer Prince Royce, producer David Bianchi, and more.',
    isNew: false,
    pillar: 'Roots',
    contentType: 'Short-form Series',
    parentSeries: 'blacktinidad'
  }
];

// ==========================================
// CAMPAIGNS DATABASE - Add/Edit Campaigns Here
// ==========================================

export const campaignsDatabase: Campaign[] = [
  {
    id: "echoes-of-cultura-2025",
    title: "Echoes of Cultura (Hispanic Heritage Month Campaign)",
    flightDates: "09/15 – 10/15",
    overview: "Echoes of Cultura is our visual poem to the past and present. A mosaic of memories and movement — from dancing to cumbia or norteño at family weddings to vibing at block parties that feel like home. Hispanic Heritage Month is our canvas, and we paint it with voices, visions, and vibes from across the diaspora. We honor our stories, remix our roots, and celebrate the impact we make on the world — one moment, one rhythm, one generation at a time.",
    platforms: "Linear broadcast; digital hub and editorials on Latination.com; mobile app; social (IG, TikTok, YouTube).",
    deliverables: "Long-form HHM specials across eight series; short-form (30–60 s) teasers and BTS; digital editorials (#EchoesofCultura); weekly recap reels and broadcast segments.",
    participatingSeriesIds: ["cultura-shock", "blacktinidad", "the-q-agenda", "latino-alternative-storytellers"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "dia-de-muertos-2025",
    title: "Día de Muertos Micro-campaign",
    flightDates: "10/25 – 11/02",
    overview: "Honoring ancestral traditions through altar spotlights, community stories, and culinary rituals.",
    platforms: "Linear broadcast; digital features; mobile app; social (IG Stories, TikTok).",
    deliverables: "Day-of specials; short-form cultural explainers; user-generated content callouts; social remembrance galleries.",
    participatingSeriesIds: [],
    contentType: "LatiNation Campaign"
  },
  {
    id: "sin-city-musica-2025",
    title: "Sin City Musica (Latin Recording Academy Awards Coverage)",
    flightDates: "11/10 – 11/17",
    overview: "An all-access dive into the 26th Annual Latin GRAMMY Awards in Las Vegas. We'll bring viewers VIP interviews, backstage sound-checks, red-carpet glam, and the city's hottest after-party moments—all through a bilingual, culture-first lens. The 26th Annual Latin GRAMMY Awards will be held on Thursday, Nov. 13, 2025, at the MGM Grand Garden Arena in Las Vegas.",
    platforms: "Linear & FAST/CTV: 30-min highlight special; LATV+ App & Digital Hub: on-demand mini-docs & interviews; Social (TikTok, IG Reels, X): daily BTS cuts, live takeovers, countdowns; Microsite: hub for full episodes, artist deep dives, playlist embeds",
    deliverables: "• Highlight Special (30 min): Fast-cut weave of winners, reactions, backstage access\n• Backstage Beats: 3–5 min artist-focused shorts—candid Q&As + performance teasers\n• Style Files: 2–4 min fashion + beauty capsules dissecting red-carpet looks\n• VIP Insider: 2–4 min party pass into Vegas's most exclusive after-parties\n• Red Carpet Live: Real-time social streams pre- and post-show with on-the-spot reactions\n• Social Countdown & Reactions: 30–60 sec teasers and winner-reveal reels\n• Digital Microsite Hub: Mobile-first portal aggregating every asset, plus editorial rundowns",
    participatingSeriesIds: ["cultura-shock", "the-q-agenda", "blacktinidad", "whats-good-hwood"],
    contentType: "Tentpole Campaign"
  },
  {
    id: "fiestas-our-way-2025",
    title: "Fiestas Our Way (Holiday Season Campaign)",
    flightDates: "11/20 – 12/31",
    overview: "A bicultural celebration blending holiday traditions with Latine flair across festive specials.",
    platforms: "Linear broadcast; Latination.com gift guides; mobile app; social (IG, TikTok, YouTube).",
    deliverables: "Holiday specials across pillar series; digital gift guides and style lookbooks; behind-the-scenes holiday prep; year-end montage. This should live as segments within the different series and should have a stand alone social campaign supporting \"Fiestas Our Way\"",
    participatingSeriesIds: ["cultura-shock", "blacktinidad", "the-q-agenda", "shades-of-beauty"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "new-year-renewal-2026",
    title: "New Year Renewal Campaign",
    flightDates: "01/01 – 01/31",
    overview: "Launching the year with themes of renewal—health, goals, and fresh beginnings.",
    platforms: "Linear broadcast; digital features; mobile app; social.",
    deliverables: "New Year specials; expert interviews; goal-setting social series; interactive resolution challenges.",
    participatingSeriesIds: ["esencia-latina-wellness", "new-latina-show", "ganadoras"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "black-history-month-2026",
    title: "Black History Month",
    flightDates: "02/01 – 02/28",
    overview: "Spotlighting Afro-Latino contributions with immersive storytelling and education.",
    platforms: "Linear broadcast; digital content hub; mobile app; social.",
    deliverables: "1-hour BHM Special; pillar-series tie-ins; short-form spotlights; editorial hub (#BlackHistoryMonth); Black History Month Party.",
    participatingSeriesIds: ["blacktinidad", "shades-of-beauty", "cultura-shock", "the-q-agenda", "new-latina-show", "latino-alternative-storytellers"],
    contentType: "Tentpole Campaign"
  },
  {
    id: "mujeres-in-charge-2026",
    title: "Mujeres in Charge (Women's History Month)",
    flightDates: "03/01 – 03/31",
    overview: "Amplifying Latina leaders and innovators through in-depth profiles and expert discussions.",
    platforms: "Linear; digital hub; mobile app; social.",
    deliverables: "1-hour Mujeres in Charge Special; leadership roundtables; social empowerment takeovers; Women's History Month Wellness Event.",
    participatingSeriesIds: ["blacktinidad", "cultura-shock", "whats-good-hwood", "new-latina-show", "ganadoras", "latino-alternative-storytellers"],
    contentType: "Tentpole Campaign"
  },
  {
    id: "earth-day-2026",
    title: "Earth Day (Micro-campaign if needed)",
    flightDates: "04/22",
    overview: "Environmental awareness micro-campaign",
    platforms: "Linear; digital; app; social.",
    deliverables: "Environmental segments within series",
    participatingSeriesIds: ["blacktinidad", "cultura-shock"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "cinco-de-mayo-2026",
    title: "Cinco de Mayo Micro-Campaign",
    flightDates: "04/25 – 05/05",
    overview: "Showcasing Cinco de Mayo celebrations with cultural deep dives and festival coverage.",
    platforms: "Linear; digital; app; social.",
    deliverables: "Festival recap specials; cultural explainers",
    participatingSeriesIds: [],
    contentType: "LatiNation Campaign"
  },
  {
    id: "mothers-day-madrehood-2026",
    title: "Mother's Day 'Madrehood' Micro-Campaign",
    flightDates: "05/12",
    overview: "Content around motherhood throughout LatiNation series but most likely social / digital.",
    platforms: "Linear; digital; app; social.",
    deliverables: "Social content and perhaps segments within New Latina Show",
    participatingSeriesIds: ["new-latina-show"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "feliz-pride-2026",
    title: "Feliz Pride (Pride Month)",
    flightDates: "06/01 – 06/30",
    overview: "Celebrating LGBTQ+ Latine art and expression with joyful programming.",
    platforms: "Linear; digital hub; app; social.",
    deliverables: "1-hour Pride special; series tie-in episodes; social cutdowns; #FelizPride content hub; Pride Month Party.",
    participatingSeriesIds: ["the-q-agenda", "blacktinidad", "cultura-shock", "new-latina-show"],
    contentType: "Tentpole Campaign"
  },
  {
    id: "world-cup-2026",
    title: "World Cup 2026 (World Cup Campaign)",
    flightDates: "06/01 – 07/20",
    overview: "World Cup coverage across Latination Series",
    platforms: "Linear; digital; app; social.",
    deliverables: "World Cup coverage and specials",
    participatingSeriesIds: ["latination-futbol-club", "cultura-shock", "latino-alternative-storytellers"],
    contentType: "Tentpole Campaign"
  },
  {
    id: "summer-music-2026",
    title: "Summer Music Campaign",
    flightDates: "07/01 – 08/31",
    overview: "Merging summer vibes with Latino music culture—live sessions and exclusive playlists.",
    platforms: "Linear; digital; app; social.",
    deliverables: "Live music specials; artist spotlight interviews; community playlist takeovers; social music challenges.",
    participatingSeriesIds: ["whats-good-hwood", "cultura-shock"],
    contentType: "LatiNation Campaign"
  },
  {
    id: "hispanic-heritage-2026",
    title: "Hispanic heritage 2026 campaign",
    flightDates: "2026: 09/15 – 10/15",
    overview: "Honoring Hispanic heritage with documentary specials and community stories.",
    platforms: "Linear; digital; app; social.",
    deliverables: "Long-form specials; social recap reels; educational explainers; digital cultural hub.",
    participatingSeriesIds: [],
    contentType: "LatiNation Campaign"
  }
];

// ==========================================
// BRANDED CONTENT CAMPAIGNS DATABASE
// ==========================================

export const brandedCampaignsDatabase: BrandedCampaign[] = [
  {
    id: "penguin-random-house-publishing",
    title: "Penguin Random House – Publishing",
    flightDates: "JUNE – DECEMBER 2025",
    description: "Campaign promoting Latinx authors through our tentpoles",
    deliverables: "2 (two) Social media reels; 2 (two) Social media Carousels; 4 Themes Articles (aligned with posts)",
    campaignType: "Social Media + OLV",
    contentType: "Branded Content Campaign"
  },
  {
    id: "ad-council",
    title: "Ad Council",
    flightDates: "APRIL – SEPT 22 2025",
    description: "Campaign promoting Alzheimer's awareness. Ft on Cultura Shock page.",
    deliverables: "Broadcast, CTV & OLV: Four (4) horizontal 60 Secs videos (featuring two hosts – 1 host x 2 videos each); OLV: Two (2) Themed articles with videos embedded featured on LATV.com; Social Media: Four (4) vertical videos for social content (Cut Downs from the horizontal videos)",
    campaignType: "360 campaign: Social, Digital, Broadcast",
    contentType: "Branded Content Campaign"
  },
  {
    id: "gilead-biktarvy-living-y-ready-iii",
    title: "Gilead – Biktarvy – Living Y Ready III",
    flightDates: "1/1 – 12/31 2025",
    description: "Digital series ft. HIV+ Latino men who are living a healthy lifestyle.",
    deliverables: "8 Episodes; 8 articles + embedded cutdowns; 8 Vertical social media; Digital Custom Microsite",
    campaignType: "Digital – OLV + Social Media",
    contentType: "Branded Content Campaign"
  }
];

// ==========================================
// EVENTS DATABASE - Add/Edit Events Here
// ==========================================

export const eventsDatabase: Event[] = [
  {
    id: "latination-launch",
    title: "LatiNation.com Launch",
    date: "2025-09",
    description: "Official launch of the LatiNation digital platform",
    contentType: "Special"
  },
  {
    id: "hispanic-heritage-party-2025",
    title: "Hispanic Heritage Month Party",
    date: "2025-09",
    description: "Celebration event for Hispanic Heritage Month",
    contentType: "Special"
  },
  {
    id: "latina-fest-2026",
    title: "Latina Fest in Downtown LA",
    date: "2026-08",
    description: "Annual Latina celebration festival in Los Angeles",
    contentType: "Special"
  }
];

// ==========================================
// INITIATIVES DATABASE - Add/Edit Initiatives Here
// ==========================================

export const initiativesDatabase: Initiative[] = [
  {
    id: "thinknow-study",
    title: "ThinkNow Study Release",
    date: "2025-09",
    description: "Highly coordinated marketing release of the study to get visibility and establish LatiNation as an authority when it comes to Gen Z and Millennial Latinos",
    contentType: "Special"
  },
  {
    id: "latination-website",
    title: "LatiNation.com",
    date: "2025-09",
    description: "We need a clear launch strategy that supports adding content to the site and marketing the site.",
    contentType: "Special"
  },
  {
    id: "latination-brand-awareness",
    title: "LatiNation Brand Awareness",
    date: "2025-09",
    description: "We need a highly visible and coordinated marketing campaign promoting our brand.",
    contentType: "Special"
  }
];

// ==========================================
// SPECIALS DATABASE - Add/Edit Specials Here
// ==========================================

export const specialsDatabase: Special[] = [
  {
    id: "latina-power-tea-oct-2025",
    title: "Latina Power Tea",
    date: "2025-10",
    description: "Episodes 1–2 (Weeks 1 & 3)\nTeasers: Cast intro (09/28); Trailer (10/12)\nSocial cutdowns: 2–4 per episode",
    contentType: "Special"
  },
  {
    id: "latin-grammys-special-2025",
    title: "Latin GRAMMY's Special",
    date: "2025-11",
    description: "Air: November",
    contentType: "Special"
  },
  {
    id: "latina-power-tea-nov-2025",
    title: "Latina Power Tea",
    date: "2025-11",
    description: "Episodes 3–5; Best-of reel",
    contentType: "Special"
  }
];