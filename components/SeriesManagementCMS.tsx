import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit2, Trash2, Youtube, Eye, Save, Upload, Link } from 'lucide-react';

// Types for our content
interface Series {
  id: string;
  title: string;
  description: string;
  pillar: 'Culture' | 'Queer' | 'Roots' | 'Latina';
  contentType: 'Long-form Series' | 'Short-form Series';
  season: string;
  premiereDate: string;
  episodesAnnually: string;
  isNew: boolean;
  parentSeries?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  slug: string;
}

interface PillarInfo {
  name: string;
  description: string;
  purpose: string;
  mission: string;
  vision: string;
  essence: string;
  vibe: string;
  slogan?: string;
}

const SeriesManagementCMS: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [editingSeries, setEditingSeries] = useState<Series | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('series');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Mock initial data - in real app, this would come from your backend/database
  useEffect(() => {
    const mockSeries: Series[] = [
      {
        id: '1',
        title: 'LatiNation Stories',
        description: 'Authentic stories from the Latino community showcasing diverse experiences and perspectives.',
        pillar: 'Culture',
        contentType: 'Long-form Series',
        season: 'Season 1',
        premiereDate: '2024-03',
        episodesAnnually: '12 episodes annually',
        isNew: true,
        youtubeUrl: 'https://youtube.com/watch?v=example',
        slug: 'latinacion-stories'
      },
      {
        id: '2',
        title: 'Queer & Proud',
        description: 'Celebrating LGBTQ+ Latine voices and their impact on culture and community.',
        pillar: 'Queer',
        contentType: 'Short-form Series',
        season: 'Season 1',
        premiereDate: '2024-04',
        episodesAnnually: '24 episodes annually',
        isNew: false,
        parentSeries: 'LatiNation Stories',
        youtubeUrl: 'https://youtube.com/watch?v=example2',
        slug: 'queer-and-proud'
      }
    ];
    setSeries(mockSeries);
  }, []);

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Save series (add or update)
  const saveSeries = async (seriesData: Omit<Series, 'id'>) => {
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingSeries) {
        // Update existing
        setSeries(prev => prev.map(s => 
          s.id === editingSeries.id 
            ? { ...seriesData, id: editingSeries.id }
            : s
        ));
      } else {
        // Add new
        const newSeries: Series = {
          ...seriesData,
          id: Date.now().toString(),
          slug: generateSlug(seriesData.title)
        };
        setSeries(prev => [...prev, newSeries]);
      }
      
      setSaveStatus('saved');
      setIsDialogOpen(false);
      setEditingSeries(null);
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  // Delete series
  const deleteSeries = async (id: string) => {
    if (confirm('Are you sure you want to delete this series?')) {
      setSeries(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">LatiNation CMS</h1>
          <p className="text-gray-600">Manage your content, series, and pillar information</p>
          
          {/* Save Status */}
          {saveStatus !== 'idle' && (
            <Alert className={`mt-4 ${saveStatus === 'saved' ? 'border-green-200 bg-green-50' : 
                              saveStatus === 'error' ? 'border-red-200 bg-red-50' : 
                              'border-blue-200 bg-blue-50'}`}>
              <AlertDescription>
                {saveStatus === 'saving' && '💾 Saving changes...'}
                {saveStatus === 'saved' && '✅ Changes saved successfully!'}
                {saveStatus === 'error' && '❌ Error saving changes. Please try again.'}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="series">Series Management</TabsTrigger>
            <TabsTrigger value="pillars">Pillar Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Series Management Tab */}
          <TabsContent value="series" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Series</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingSeries(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Series
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingSeries ? 'Edit Series' : 'Add New Series'}
                    </DialogTitle>
                    <DialogDescription>
                      Fill out the information for your series. YouTube links will automatically show previews.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <SeriesForm 
                    series={editingSeries}
                    onSave={saveSeries}
                    onCancel={() => {
                      setIsDialogOpen(false);
                      setEditingSeries(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Series Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {series.map((s) => (
                <Card key={s.id} className="group hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{s.title}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{s.pillar}</Badge>
                          <Badge variant="secondary">{s.contentType}</Badge>
                          {s.isNew && <Badge className="bg-green-500">New</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingSeries(s);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSeries(s.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* YouTube Preview */}
                    {s.youtubeUrl && (
                      <div className="mb-3">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          {extractYouTubeId(s.youtubeUrl) ? (
                            <img 
                              src={`https://img.youtube.com/vi/${extractYouTubeId(s.youtubeUrl)}/maxresdefault.jpg`}
                              alt="YouTube thumbnail"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Youtube className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <CardDescription className="text-sm line-clamp-3 mb-3">
                      {s.description}
                    </CardDescription>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>{s.season} • Premieres {s.premiereDate}</div>
                      <div>{s.episodesAnnually}</div>
                      {s.parentSeries && <div>Parent: {s.parentSeries}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pillar Settings Tab */}
          <TabsContent value="pillars">
            <Card>
              <CardHeader>
                <CardTitle>Pillar Settings</CardTitle>
                <CardDescription>
                  Edit the descriptions, missions, and visions for each pillar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Pillar editing interface coming next!</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Content Analytics</CardTitle>
                <CardDescription>
                  View performance metrics for your series and pillars
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming next!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Series Form Component
const SeriesForm: React.FC<{
  series: Series | null;
  onSave: (data: Omit<Series, 'id'>) => void;
  onCancel: () => void;
}> = ({ series, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: series?.title || '',
    description: series?.description || '',
    pillar: series?.pillar || 'Culture',
    contentType: series?.contentType || 'Long-form Series',
    season: series?.season || 'Season 1',
    premiereDate: series?.premiereDate || '',
    episodesAnnually: series?.episodesAnnually || '',
    isNew: series?.isNew || false,
    parentSeries: series?.parentSeries || '',
    youtubeUrl: series?.youtubeUrl || '',
    thumbnailUrl: series?.thumbnailUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      pillar: formData.pillar as any,
      contentType: formData.contentType as any,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    });
  };

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Series Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter series title"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="season">Season</Label>
          <Input
            id="season"
            value={formData.season}
            onChange={(e) => setFormData(prev => ({ ...prev, season: e.target.value }))}
            placeholder="Season 1"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe what this series is about..."
          rows={3}
          required
        />
      </div>

      {/* Pillar and Content Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pillar">Pillar *</Label>
          <Select value={formData.pillar} onValueChange={(value) => setFormData(prev => ({ ...prev, pillar: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Culture">Culture</SelectItem>
              <SelectItem value="Queer">Queer</SelectItem>
              <SelectItem value="Roots">Roots</SelectItem>
              <SelectItem value="Latina">Latina</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="contentType">Content Type</Label>
          <Select value={formData.contentType} onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Long-form Series">Long-form Series</SelectItem>
              <SelectItem value="Short-form Series">Short-form Series</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dates and Episodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="premiereDate">Premiere Date</Label>
          <Input
            id="premiereDate"
            type="month"
            value={formData.premiereDate}
            onChange={(e) => setFormData(prev => ({ ...prev, premiereDate: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="episodesAnnually">Episodes Per Year</Label>
          <Input
            id="episodesAnnually"
            value={formData.episodesAnnually}
            onChange={(e) => setFormData(prev => ({ ...prev, episodesAnnually: e.target.value }))}
            placeholder="12 episodes annually"
          />
        </div>
      </div>

      {/* YouTube URL */}
      <div>
        <Label htmlFor="youtubeUrl">YouTube URL</Label>
        <Input
          id="youtubeUrl"
          type="url"
          value={formData.youtubeUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
          placeholder="https://youtube.com/watch?v=..."
        />
        {formData.youtubeUrl && extractYouTubeId(formData.youtubeUrl) && (
          <div className="mt-2">
            <Label>Preview:</Label>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mt-1">
              <img 
                src={`https://img.youtube.com/vi/${extractYouTubeId(formData.youtubeUrl)}/maxresdefault.jpg`}
                alt="YouTube thumbnail preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Parent Series (for short-form) */}
      {formData.contentType === 'Short-form Series' && (
        <div>
          <Label htmlFor="parentSeries">Parent Series</Label>
          <Input
            id="parentSeries"
            value={formData.parentSeries}
            onChange={(e) => setFormData(prev => ({ ...prev, parentSeries: e.target.value }))}
            placeholder="Enter parent series name"
          />
        </div>
      )}

      {/* Is New */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isNew"
          checked={formData.isNew}
          onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
          className="rounded"
        />
        <Label htmlFor="isNew">Mark as New Series</Label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {series ? 'Update Series' : 'Create Series'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SeriesManagementCMS;