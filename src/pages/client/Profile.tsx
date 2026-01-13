import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientLayout } from '@/components/client/ClientLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth-context';
import { useClientProfile } from '@/hooks/useClientProfile';
import { toast } from 'sonner';
import { 
  User, Building2, MapPin, Phone, Mail, FileText, 
  Save, Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const sectors = [
  'Residential',
  'Commercial',
  'Industrial',
  'Agricultural',
  'Educational',
  'Healthcare',
  'Hospitality',
  'Other',
];

export default function ClientProfile() {
  const { profile, refreshProfile } = useAuth();
  const { clientProfile, isLoading, createProfile, updateProfile } = useClientProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: '',
    company_registration: '',
    company_profile: '',
    kra_pin: '',
    sector: '',
    business_address: '',
    residential_address: '',
    energy_usage_location: '',
    representative_name: '',
    representative_email: '',
    representative_phone: '',
    personal_id_details: '',
  });

  const [saving, setSaving] = useState(false);
  const isCompany = profile?.entity_type === 'company';

  useEffect(() => {
    if (clientProfile) {
      setFormData({
        company_name: clientProfile.company_name || '',
        company_registration: clientProfile.company_registration || '',
        company_profile: clientProfile.company_profile || '',
        kra_pin: clientProfile.kra_pin || '',
        sector: clientProfile.sector || '',
        business_address: clientProfile.business_address || '',
        residential_address: clientProfile.residential_address || '',
        energy_usage_location: clientProfile.energy_usage_location || '',
        representative_name: clientProfile.representative_name || '',
        representative_email: clientProfile.representative_email || '',
        representative_phone: clientProfile.representative_phone || '',
        personal_id_details: clientProfile.personal_id_details || '',
      });
    }
  }, [clientProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (clientProfile) {
        await updateProfile.mutateAsync(formData);
      } else {
        await createProfile.mutateAsync(formData);
      }
      await refreshProfile();
      toast.success('Profile saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-display font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            {clientProfile ? 'Manage your profile information' : 'Complete your profile to get started'}
          </p>
        </div>

        {/* Profile Status */}
        {clientProfile ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-green-600 shrink-0" size={20} />
            <div>
              <p className="font-medium text-green-900">Profile Complete</p>
              <p className="text-green-700 text-sm">You can now create energy requests.</p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-amber-600 shrink-0" size={20} />
            <div>
              <p className="font-medium text-amber-900">Profile Incomplete</p>
              <p className="text-amber-700 text-sm">Please fill in your details to start creating requests.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <Tabs defaultValue="general" className="w-full">
              <div className="border-b border-border px-6 pt-4">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="general">
                    <User size={16} className="mr-2" /> General
                  </TabsTrigger>
                  <TabsTrigger value="location">
                    <MapPin size={16} className="mr-2" /> Location
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    <Phone size={16} className="mr-2" /> Contact
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="general" className="mt-0 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {isCompany && (
                      <>
                        <div>
                          <Label htmlFor="company_name">Company Name</Label>
                          <div className="relative mt-1">
                            <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="company_name"
                              placeholder="Your company name"
                              className="pl-10"
                              value={formData.company_name}
                              onChange={(e) => handleChange('company_name', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="company_registration">Company Registration No.</Label>
                          <div className="relative mt-1">
                            <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="company_registration"
                              placeholder="e.g., CPR/2024/12345"
                              className="pl-10"
                              value={formData.company_registration}
                              onChange={(e) => handleChange('company_registration', e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <Label htmlFor="kra_pin">KRA PIN</Label>
                      <div className="relative mt-1">
                        <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="kra_pin"
                          placeholder="e.g., A012345678K"
                          className="pl-10"
                          value={formData.kra_pin}
                          onChange={(e) => handleChange('kra_pin', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sector">Sector</Label>
                      <Select 
                        value={formData.sector} 
                        onValueChange={(value) => handleChange('sector', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectors.map((sector) => (
                            <SelectItem key={sector} value={sector.toLowerCase()}>
                              {sector}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {isCompany && (
                    <div>
                      <Label htmlFor="company_profile">Company Profile / Description</Label>
                      <Textarea
                        id="company_profile"
                        placeholder="Brief description of your company and its activities..."
                        className="mt-1"
                        rows={4}
                        value={formData.company_profile}
                        onChange={(e) => handleChange('company_profile', e.target.value)}
                      />
                    </div>
                  )}

                  {!isCompany && (
                    <div>
                      <Label htmlFor="personal_id_details">ID Details</Label>
                      <Input
                        id="personal_id_details"
                        placeholder="National ID / Passport number"
                        className="mt-1"
                        value={formData.personal_id_details}
                        onChange={(e) => handleChange('personal_id_details', e.target.value)}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="location" className="mt-0 space-y-6">
                  {isCompany && (
                    <div>
                      <Label htmlFor="business_address">Business Address</Label>
                      <div className="relative mt-1">
                        <MapPin size={18} className="absolute left-3 top-3 text-muted-foreground" />
                        <Textarea
                          id="business_address"
                          placeholder="Physical business address..."
                          className="pl-10"
                          rows={3}
                          value={formData.business_address}
                          onChange={(e) => handleChange('business_address', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="residential_address">
                      {isCompany ? 'Alternative Address' : 'Residential Address'}
                    </Label>
                    <div className="relative mt-1">
                      <MapPin size={18} className="absolute left-3 top-3 text-muted-foreground" />
                      <Textarea
                        id="residential_address"
                        placeholder="Your address..."
                        className="pl-10"
                        rows={3}
                        value={formData.residential_address}
                        onChange={(e) => handleChange('residential_address', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="energy_usage_location">Energy Usage Location</Label>
                    <div className="relative mt-1">
                      <MapPin size={18} className="absolute left-3 top-3 text-muted-foreground" />
                      <Textarea
                        id="energy_usage_location"
                        placeholder="Where will the solar system be installed?"
                        className="pl-10"
                        rows={3}
                        value={formData.energy_usage_location}
                        onChange={(e) => handleChange('energy_usage_location', e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="mt-0 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="representative_name">
                        {isCompany ? 'Representative Name' : 'Full Name'}
                      </Label>
                      <div className="relative mt-1">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="representative_name"
                          placeholder="Full name"
                          className="pl-10"
                          value={formData.representative_name}
                          onChange={(e) => handleChange('representative_name', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="representative_phone">Phone Number</Label>
                      <div className="relative mt-1">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="representative_phone"
                          type="tel"
                          placeholder="+254 7XX XXX XXX"
                          className="pl-10"
                          value={formData.representative_phone}
                          onChange={(e) => handleChange('representative_phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="representative_email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="representative_email"
                        type="email"
                        placeholder="email@example.com"
                        className="pl-10"
                        value={formData.representative_email}
                        onChange={(e) => handleChange('representative_email', e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="border-t border-border p-6 bg-muted/30 flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/client')}>
                Cancel
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" /> Save Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
}
