import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Youtube, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthGuard from '@/components/AuthGuard';
import { useContentData } from '@/hooks/useContentData';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { brandedCampaignsDatabase } from '@/data/contentDatabase';

// Enhanced schemas with YouTube support
const seriesSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  season: z.string().min(1, 'Season is required'),
  premiereDate: z.string().min(1, 'Premiere date is required'),
  episodesAnnually: z.string().optional(),
  description: z.string().optional(),
  pillar: z.enum(['Roots', 'Culture', 'Latina', 'Queer']).optional(),
  isNew: z.boolean().optional(),
  contentType: z.enum(['Series', 'Special', 'LatiNation Campaign', 'Tentpole Campaign', 'Branded Content Campaign']).optional(),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  youtubeThumbnail: z.string().optional()
});

const campaignSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  flightDates: z.string().min(1, 'Flight dates are required'),
  overview: z.string().min(1, 'Overview is required'),
  platforms: z.string().min(1, 'Platforms are required'),
  deliverables: z.string().min(1, 'Deliverables are required'),
  contentType: z.enum(['LatiNation Campaign', 'Tentpole Campaign', 'Branded Content Campaign', 'Series', 'Special']).optional(),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  youtubeThumbnail: z.string().optional()
});

const brandedCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  flightDates: z.string().min(1, 'Flight dates are required'),
  description: z.string().min(1, 'Description is required'),
  deliverables: z.string().min(1, 'Deliverables are required'),
  campaignType: z.string().min(1, 'Campaign type is required'),
  contentType: z.enum(['Branded Content Campaign', 'LatiNation Campaign', 'Tentpole Campaign', 'Series', 'Special']).optional(),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  youtubeThumbnail: z.string().optional()
});

type SeriesFormData = z.infer<typeof seriesSchema>;
type CampaignFormData = z.infer<typeof campaignSchema>;
type BrandedCampaignFormData = z.infer<typeof brandedCampaignSchema>;

// YouTube utility functions
const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

// YouTube Preview Component
const YouTubePreview: React.FC<{ url: string; className?: string }> = ({ url, className = "" }) => {
  const videoId = extractYouTubeVideoId(url);
  
  if (!videoId) return null;

  return (
    <div className={`relative group ${className}`}>
      <img 
        src={getYouTubeThumbnail(videoId)} 
        alt="YouTube thumbnail" 
        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
        onError={(e) => {
          // Fallback to default thumbnail if maxres fails
          e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
        <Youtube className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

const Admin = () => {
  const { toast } = useToast();
  const { allSeries, allCampaigns } = useContentData();
  const [activeSection, setActiveSection] = useState<'series' | 'campaigns' | 'branded'>('series');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form instances with enhanced YouTube support
  const seriesForm = useForm<SeriesFormData>({
    resolver: zodResolver(seriesSchema),
    defaultValues: {
      title: '',
      season: '',
      premiereDate: '',
      episodesAnnually: '',
      description: '',
      isNew: false,
      contentType: 'Series',
      youtubeUrl: '',
      youtubeThumbnail: ''
    }
  });

  const campaignForm = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: '',
      flightDates: '',
      overview: '',
      platforms: '',
      deliverables: '',
      contentType: 'LatiNation Campaign',
      youtubeUrl: '',
      youtubeThumbnail: ''
    }
  });

  const brandedForm = useForm<BrandedCampaignFormData>({
    resolver: zodResolver(brandedCampaignSchema),
    defaultValues: {
      title: '',
      flightDates: '',
      description: '',
      deliverables: '',
      campaignType: '',
      contentType: 'Branded Content Campaign',
      youtubeUrl: '',
      youtubeThumbnail: ''
    }
  });

  // Auto-generate thumbnail when YouTube URL changes
  const watchYouTubeUrl = (url: string, form: any) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      form.setValue('youtubeThumbnail', getYouTubeThumbnail(videoId));
    } else {
      form.setValue('youtubeThumbnail', '');
    }
  };

  // Watch for YouTube URL changes
  const seriesYouTubeUrl = seriesForm.watch('youtubeUrl');
  const campaignYouTubeUrl = campaignForm.watch('youtubeUrl');
  const brandedYouTubeUrl = brandedForm.watch('youtubeUrl');

  useEffect(() => {
    if (seriesYouTubeUrl) watchYouTubeUrl(seriesYouTubeUrl, seriesForm);
  }, [seriesYouTubeUrl]);

  useEffect(() => {
    if (campaignYouTubeUrl) watchYouTubeUrl(campaignYouTubeUrl, campaignForm);
  }, [campaignYouTubeUrl]);

  useEffect(() => {
    if (brandedYouTubeUrl) watchYouTubeUrl(brandedYouTubeUrl, brandedForm);
  }, [brandedYouTubeUrl]);

  // Content stats
  const stats = {
    series: allSeries.length,
    latinationCampaigns: allCampaigns.filter(c => c.contentType === 'LatiNation Campaign').length,
    tentpoleCampaigns: allCampaigns.filter(c => c.contentType === 'Tentpole Campaign').length,
    brandedCampaigns: brandedCampaignsDatabase.length,
  };

  // Enhanced form submission handlers
  const onSeriesSubmit = (data: SeriesFormData) => {
    console.log('Series data with YouTube:', data);
    toast({
      title: editingId ? "Series Updated" : "Series Added",
      description: `${data.title} has been ${editingId ? 'updated' : 'added'} successfully.`,
    });
    seriesForm.reset();
    setEditingId(null);
    setShowAddForm(false);
  };

  const onCampaignSubmit = (data: CampaignFormData) => {
    console.log('Campaign data with YouTube:', data);
    toast({
      title: editingId ? "Campaign Updated" : "Campaign Added",
      description: `${data.title} has been ${editingId ? 'updated' : 'added'} successfully.`,
    });
    campaignForm.reset();
    setEditingId(null);
    setShowAddForm(false);
  };

  const onBrandedSubmit = (data: BrandedCampaignFormData) => {
    console.log('Branded campaign data with YouTube:', data);
    toast({
      title: editingId ? "Campaign Updated" : "Campaign Added",
      description: `${data.title} has been ${editingId ? 'updated' : 'added'} successfully.`,
    });
    brandedForm.reset();
    setEditingId(null);
    setShowAddForm(false);
  };

  // Enhanced edit handlers with YouTube support
  const editSeries = (series: any) => {
    seriesForm.reset({
      title: series.title,
      season: series.season,
      premiereDate: series.premiereDate,
      episodesAnnually: series.episodesAnnually || '',
      description: series.description || '',
      pillar: series.pillar,
      isNew: series.isNew || false,
      contentType: series.contentType || 'Series',
      youtubeUrl: series.youtubeUrl || '',
      youtubeThumbnail: series.youtubeThumbnail || ''
    });
    setEditingId(series.id);
    setShowAddForm(true);
    setActiveSection('series');
  };

  const editCampaign = (campaign: any) => {
    campaignForm.reset({
      title: campaign.title,
      flightDates: campaign.flightDates,
      overview: campaign.overview,
      platforms: campaign.platforms,
      deliverables: campaign.deliverables,
      contentType: campaign.contentType || 'LatiNation Campaign',
      youtubeUrl: campaign.youtubeUrl || '',
      youtubeThumbnail: campaign.youtubeThumbnail || ''
    });
    setEditingId(campaign.id);
    setShowAddForm(true);
    setActiveSection('campaigns');
  };

  const editBrandedCampaign = (campaign: any) => {
    brandedForm.reset({
      title: campaign.title,
      flightDates: campaign.flightDates,
      description: campaign.description,
      deliverables: campaign.deliverables,
      campaignType: campaign.campaignType,
      contentType: campaign.contentType || 'Branded Content Campaign',
      youtubeUrl: campaign.youtubeUrl || '',
      youtubeThumbnail: campaign.youtubeThumbnail || ''
    });
    setEditingId(campaign.id);
    setShowAddForm(true);
    setActiveSection('branded');
  };

  // Delete handlers
  const deleteItem = (id: string, type: string) => {
    console.log(`Deleting ${type}:`, id);
    toast({
      title: "Content Deleted",
      description: `${type} has been deleted successfully.`,
      variant: "destructive"
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    seriesForm.reset();
    campaignForm.reset();
    brandedForm.reset();
  };

  // Enhanced form renderers with YouTube support
  const renderSeriesForm = () => (
    <form onSubmit={seriesForm.handleSubmit(onSeriesSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input {...seriesForm.register('title')} placeholder="Content title" />
          {seriesForm.formState.errors.title && (
            <p className="text-sm text-destructive">{seriesForm.formState.errors.title.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="contentType">Content Type</Label>
          <Select onValueChange={(value) => seriesForm.setValue('contentType', value as any)} value={seriesForm.watch('contentType')}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Series">Series</SelectItem>
              <SelectItem value="Special">Special</SelectItem>
              <SelectItem value="LatiNation Campaign">LatiNation Campaign</SelectItem>
              <SelectItem value="Tentpole Campaign">Tentpole Campaign</SelectItem>
              <SelectItem value="Branded Content Campaign">Branded Content Campaign</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="season">Season</Label>
          <Input {...seriesForm.register('season')} placeholder="Season 1" />
          {seriesForm.formState.errors.season && (
            <p className="text-sm text-destructive">{seriesForm.formState.errors.season.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="premiereDate">Premiere Date</Label>
          <Input {...seriesForm.register('premiereDate')} placeholder="2025-01 or 2025-01-15" />
          {seriesForm.formState.errors.premiereDate && (
            <p className="text-sm text-destructive">{seriesForm.formState.errors.premiereDate.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="episodesAnnually">Episodes Annually</Label>
          <Input {...seriesForm.register('episodesAnnually')} placeholder="12 episodes annually" />
        </div>
        <div>
          <Label htmlFor="pillar">Pillar</Label>
          <Select onValueChange={(value) => seriesForm.setValue('pillar', value as any)} value={seriesForm.watch('pillar')}>
            <SelectTrigger>
              <SelectValue placeholder="Select pillar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Roots">Roots</SelectItem>
              <SelectItem value="Culture">Culture</SelectItem>
              <SelectItem value="Latina">Latina</SelectItem>
              <SelectItem value="Queer">Queer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            {...seriesForm.register('isNew')} 
            id="isNew"
            className="rounded border-gray-300"
          />
          <Label htmlFor="isNew">New Content</Label>
        </div>
      </div>
      
      {/* YouTube URL Field */}
      <div>
        <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-600" />
          YouTube URL (Optional)
        </Label>
        <Input 
          {...seriesForm.register('youtubeUrl')} 
          placeholder="https://www.youtube.com/watch?v=..." 
          className="mt-1"
        />
        {seriesForm.formState.errors.youtubeUrl && (
          <p className="text-sm text-destructive">{seriesForm.formState.errors.youtubeUrl.message}</p>
        )}
        {seriesYouTubeUrl && extractYouTubeVideoId(seriesYouTubeUrl) && (
          <div className="mt-2">
            <Label className="text-sm text-muted-foreground">Preview:</Label>
            <YouTubePreview url={seriesYouTubeUrl} className="mt-1" />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea {...seriesForm.register('description')} placeholder="Content description" rows={4} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {editingId ? 'Update' : 'Add'} Series
        </Button>
        <Button type="button" variant="outline" onClick={cancelEdit} className="flex items-center gap-2">
          <X className="w-4 h-4" />
          Cancel
        </Button>
      </div>
    </form>
  );

  const renderCampaignForm = () => (
    <form onSubmit={campaignForm.handleSubmit(onCampaignSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input {...campaignForm.register('title')} placeholder="Content title" />
          {campaignForm.formState.errors.title && (
            <p className="text-sm text-destructive">{campaignForm.formState.errors.title.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="contentType">Content Type</Label>
          <Select onValueChange={(value) => campaignForm.setValue('contentType', value as any)} value={campaignForm.watch('contentType')}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LatiNation Campaign">LatiNation Campaign</SelectItem>
              <SelectItem value="Tentpole Campaign">Tentpole Campaign</SelectItem>
              <SelectItem value="Branded Content Campaign">Branded Content Campaign</SelectItem>
              <SelectItem value="Series">Series</SelectItem>
              <SelectItem value="Special">Special</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="flightDates">Flight Dates</Label>
          <Input {...campaignForm.register('flightDates')} placeholder="01/01 - 01/31" />
          {campaignForm.formState.errors.flightDates && (
            <p className="text-sm text-destructive">{campaignForm.formState.errors.flightDates.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="contentType">Campaign Type</Label>
          <Select onValueChange={(value) => campaignForm.setValue('contentType', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select campaign type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LatiNation Campaign">LatiNation Campaign</SelectItem>
              <SelectItem value="Tentpole Campaign">Tentpole Campaign</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* YouTube URL Field */}
      <div>
        <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-600" />
          YouTube URL (Optional)
        </Label>
        <Input 
          {...campaignForm.register('youtubeUrl')} 
          placeholder="https://www.youtube.com/watch?v=..." 
          className="mt-1"
        />
        {campaignForm.formState.errors.youtubeUrl && (
          <p className="text-sm text-destructive">{campaignForm.formState.errors.youtubeUrl.message}</p>
        )}
        {campaignYouTubeUrl && extractYouTubeVideoId(campaignYouTubeUrl) && (
          <div className="mt-2">
            <Label className="text-sm text-muted-foreground">Preview:</Label>
            <YouTubePreview url={campaignYouTubeUrl} className="mt-1" />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="overview">Overview</Label>
        <Textarea {...campaignForm.register('overview')} placeholder="Campaign overview" rows={3} />
        {campaignForm.formState.errors.overview && (
          <p className="text-sm text-destructive">{campaignForm.formState.errors.overview.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="platforms">Platforms</Label>
        <Textarea {...campaignForm.register('platforms')} placeholder="Platforms and distribution" rows={2} />
        {campaignForm.formState.errors.platforms && (
          <p className="text-sm text-destructive">{campaignForm.formState.errors.platforms.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="deliverables">Deliverables</Label>
        <Textarea {...campaignForm.register('deliverables')} placeholder="Campaign deliverables" rows={3} />
        {campaignForm.formState.errors.deliverables && (
          <p className="text-sm text-destructive">{campaignForm.formState.errors.deliverables.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {editingId ? 'Update' : 'Add'} Campaign
        </Button>
        <Button type="button" variant="outline" onClick={cancelEdit} className="flex items-center gap-2">
          <X className="w-4 h-4" />
          Cancel
        </Button>
      </div>
    </form>
  );

  const renderBrandedForm = () => (
    <form onSubmit={brandedForm.handleSubmit(onBrandedSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input {...brandedForm.register('title')} placeholder="Content title" />
          {brandedForm.formState.errors.title && (
            <p className="text-sm text-destructive">{brandedForm.formState.errors.title.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="contentType">Content Type</Label>
          <Select onValueChange={(value) => brandedForm.setValue('contentType', value as any)} value={brandedForm.watch('contentType')}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Branded Content Campaign">Branded Content Campaign</SelectItem>
              <SelectItem value="LatiNation Campaign">LatiNation Campaign</SelectItem>
              <SelectItem value="Tentpole Campaign">Tentpole Campaign</SelectItem>
              <SelectItem value="Series">Series</SelectItem>
              <SelectItem value="Special">Special</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="flightDates">Flight Dates</Label>
          <Input {...brandedForm.register('flightDates')} placeholder="01/01 - 01/31" />
          {brandedForm.formState.errors.flightDates && (
            <p className="text-sm text-destructive">{brandedForm.formState.errors.flightDates.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="campaignType">Campaign Type</Label>
          <Input {...brandedForm.register('campaignType')} placeholder="Social Media + OLV, 360 campaign, etc." />
          {brandedForm.formState.errors.campaignType && (
            <p className="text-sm text-destructive">{brandedForm.formState.errors.campaignType.message}</p>
          )}
        </div>
      </div>

      {/* YouTube URL Field */}
      <div>
        <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-600" />
          YouTube URL (Optional)
        </Label>
        <Input 
          {...brandedForm.register('youtubeUrl')} 
          placeholder="https://www.youtube.com/watch?v=..." 
          className="mt-1"
        />
        {brandedForm.formState.errors.youtubeUrl && (
          <p className="text-sm text-destructive">{brandedForm.formState.errors.youtubeUrl.message}</p>
        )}
        {brandedYouTubeUrl && extractYouTubeVideoId(brandedYouTubeUrl) && (
          <div className="mt-2">
            <Label className="text-sm text-muted-foreground">Preview:</Label>
            <YouTubePreview url={brandedYouTubeUrl} className="mt-1" />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea {...brandedForm.register('description')} placeholder="Campaign description" rows={3} />
        {brandedForm.formState.errors.description && (
          <p className="text-sm text-destructive">{brandedForm.formState.errors.description.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="deliverables">Deliverables</Label>
        <Textarea {...brandedForm.register('deliverables')} placeholder="Campaign deliverables" rows={3} />
        {brandedForm.formState.errors.deliverables && (
          <p className="text-sm text-destructive">{brandedForm.formState.errors.deliverables.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {editingId ? 'Update' : 'Add'} Campaign
        </Button>
        <Button type="button" variant="outline" onClick={cancelEdit} className="flex items-center gap-2">
          <X className="w-4 h-4" />
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-200">
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-8 shadow-cultural">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 text-primary-foreground hover:text-primary-foreground/80 transition-colors font-bold uppercase">
              <ArrowLeft className="w-4 h-4" />
              Back to Calendar
            </Link>
            <h1 className="text-3xl md:text-4xl font-black uppercase">Content Management</h1>
            <p className="text-primary-foreground/80 mt-2">Now with YouTube Integration! 🎥</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="brutalist-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-primary">{stats.series}</div>
                <div className="text-sm font-bold uppercase text-muted-foreground">Series</div>
              </CardContent>
            </Card>
            <Card className="brutalist-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-primary">{stats.latinationCampaigns}</div>
                <div className="text-sm font-bold uppercase text-muted-foreground">LatiNation Campaigns</div>
              </CardContent>
            </Card>
            <Card className="brutalist-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-primary">{stats.tentpoleCampaigns}</div>
                <div className="text-sm font-bold uppercase text-muted-foreground">Tentpole Campaigns</div>
              </CardContent>
            </Card>
            <Card className="brutalist-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-primary">{stats.brandedCampaigns}</div>
                <div className="text-sm font-bold uppercase text-muted-foreground">Branded Campaigns</div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={activeSection === 'series' ? 'default' : 'outline'}
              onClick={() => {setActiveSection('series'); setShowAddForm(false); setEditingId(null);}}
              className="font-bold uppercase"
            >
              Series ({stats.series})
            </Button>
            <Button 
              variant={activeSection === 'campaigns' ? 'default' : 'outline'}
              onClick={() => {setActiveSection('campaigns'); setShowAddForm(false); setEditingId(null);}}
              className="font-bold uppercase"
            >
              Campaigns ({stats.latinationCampaigns + stats.tentpoleCampaigns})
            </Button>
            <Button 
              variant={activeSection === 'branded' ? 'default' : 'outline'}
              onClick={() => {setActiveSection('branded'); setShowAddForm(false); setEditingId(null);}}
              className="font-bold uppercase"
            >
              Branded Content ({stats.brandedCampaigns})
            </Button>
          </div>

          {/* Add New Button */}
          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="mb-6 font-bold uppercase flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New {activeSection === 'series' ? 'Series' : activeSection === 'campaigns' ? 'Campaign' : 'Branded Campaign'}
            </Button>
          )}

          {/* Add/Edit Form */}
          {showAddForm && (
            <Card className="brutalist-card mb-8">
              <CardHeader>
                <CardTitle className="font-black uppercase flex items-center gap-2">
                  {editingId ? 'Edit' : 'Add New'} {activeSection === 'series' ? 'Series' : activeSection === 'campaigns' ? 'Campaign' : 'Branded Campaign'}
                  <Youtube className="w-5 h-5 text-red-600" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeSection === 'series' && renderSeriesForm()}
                {activeSection === 'campaigns' && renderCampaignForm()}
                {activeSection === 'branded' && renderBrandedForm()}
              </CardContent>
            </Card>
          )}

          {/* Content Lists with YouTube Previews */}
          <div className="space-y-4">
            {activeSection === 'series' && allSeries.map((series) => (
              <Card key={series.id} className="brutalist-card">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* YouTube Preview if available */}
                    {series.youtubeUrl && (
                      <div className="lg:w-48 flex-shrink-0">
                        <YouTubePreview url={series.youtubeUrl} />
                      </div>
                    )}
                    
                    {/* Content Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="font-black uppercase text-lg">{series.title}</h3>
                            {series.isNew && <Badge variant="secondary">New</Badge>}
                            {series.pillar && <Badge variant="outline">{series.pillar}</Badge>}
                            {series.youtubeUrl && (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <Youtube className="w-3 h-3" />
                                Video
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div><span className="font-bold">Season:</span> {series.season}</div>
                            <div><span className="font-bold">Premiere:</span> {series.premiereDate}</div>
                            <div><span className="font-bold">Episodes:</span> {series.episodesAnnually || 'N/A'}</div>
                          </div>
                          {series.description && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{series.description}</p>
                          )}
                          {series.youtubeUrl && (
                            <a 
                              href={series.youtubeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              <Youtube className="w-4 h-4" />
                              Watch on YouTube
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" onClick={() => editSeries(series)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteItem(series.id, 'Series')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {activeSection === 'campaigns' && allCampaigns.filter(c => c.contentType === 'LatiNation Campaign' || c.contentType === 'Tentpole Campaign').map((campaign) => (
              <Card key={campaign.id} className="brutalist-card">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* YouTube Preview if available */}
                    {campaign.youtubeUrl && (
                      <div className="lg:w-48 flex-shrink-0">
                        <YouTubePreview url={campaign.youtubeUrl} />
                      </div>
                    )}
                    
                    {/* Content Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="font-black uppercase text-lg">{campaign.title}</h3>
                            <Badge variant="outline">{campaign.contentType}</Badge>
                            {campaign.youtubeUrl && (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <Youtube className="w-3 h-3" />
                                Video
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                            <div><span className="font-bold">Flight Dates:</span> {campaign.flightDates}</div>
                            <div><span className="font-bold">Platforms:</span> {campaign.platforms}</div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{campaign.overview}</p>
                          {campaign.youtubeUrl && (
                            <a 
                              href={campaign.youtubeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              <Youtube className="w-4 h-4" />
                              Watch on YouTube
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" onClick={() => editCampaign(campaign)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteItem(campaign.id, 'Campaign')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {activeSection === 'branded' && brandedCampaignsDatabase.map((campaign) => (
              <Card key={campaign.id} className="brutalist-card">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* YouTube Preview if available */}
                    {campaign.youtubeUrl && (
                      <div className="lg:w-48 flex-shrink-0">
                        <YouTubePreview url={campaign.youtubeUrl} />
                      </div>
                    )}
                    
                    {/* Content Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="font-black uppercase text-lg">{campaign.title}</h3>
                            <Badge variant="outline">Branded Content</Badge>
                            {campaign.youtubeUrl && (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <Youtube className="w-3 h-3" />
                                Video
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                            <div><span className="font-bold">Flight Dates:</span> {campaign.flightDates}</div>
                            <div><span className="font-bold">Type:</span> {campaign.campaignType}</div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{campaign.description}</p>
                          {campaign.youtubeUrl && (
                            <a 
                              href={campaign.youtubeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              <Youtube className="w-4 h-4" />
                              Watch on YouTube
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" onClick={() => editBrandedCampaign(campaign)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteItem(campaign.id, 'Branded Campaign')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Admin;