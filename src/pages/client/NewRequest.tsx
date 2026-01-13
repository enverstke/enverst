import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientLayout } from '@/components/client/ClientLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useClientProfile } from '@/hooks/useClientProfile';
import { useEnergyRequests } from '@/hooks/useEnergyRequests';
import { toast } from 'sonner';
import { 
  Zap, MapPin, Clock, DollarSign, ArrowLeft, ArrowRight,
  Sun, Battery, Loader2, CheckCircle2, AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const steps = [
  { id: 1, title: 'System Type', icon: Sun },
  { id: 2, title: 'Energy Details', icon: Zap },
  { id: 3, title: 'Installation', icon: MapPin },
  { id: 4, title: 'Financing', icon: DollarSign },
];

export default function NewRequest() {
  const navigate = useNavigate();
  const { clientProfile, isLoading: profileLoading } = useClientProfile();
  const { createRequest } = useEnergyRequests(clientProfile?.id);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    system_type: '' as 'grid_tie' | 'hybrid' | '',
    setup_type: '',
    current_power_consumption: '',
    hours_of_operation: '',
    energy_usage_pattern: '',
    has_diesel_generator: false,
    generator_details: '',
    hours_of_autonomy: '',
    days_of_backup: '',
    roof_or_ground: '',
    roof_area: '',
    roof_material: '',
    ground_nature: '',
    distance_from_roof: '',
    installation_location: '',
    project_timeline: '',
    payment_method: '' as 'self_financing' | 'requires_financing' | '',
    additional_notes: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!clientProfile?.id) {
      toast.error('Please complete your profile first');
      return;
    }

    setSaving(true);
    try {
      await createRequest.mutateAsync({
        client_profile_id: clientProfile.id,
        system_type: formData.system_type || null,
        setup_type: formData.setup_type || null,
        current_power_consumption: formData.current_power_consumption ? parseFloat(formData.current_power_consumption) : null,
        hours_of_operation: formData.hours_of_operation || null,
        energy_usage_pattern: formData.energy_usage_pattern || null,
        has_diesel_generator: formData.has_diesel_generator,
        generator_details: formData.generator_details || null,
        hours_of_autonomy: formData.hours_of_autonomy ? parseFloat(formData.hours_of_autonomy) : null,
        days_of_backup: formData.days_of_backup ? parseFloat(formData.days_of_backup) : null,
        roof_or_ground: formData.roof_or_ground || null,
        roof_area: formData.roof_area ? parseFloat(formData.roof_area) : null,
        roof_material: formData.roof_material || null,
        ground_nature: formData.ground_nature || null,
        distance_from_roof: formData.distance_from_roof ? parseFloat(formData.distance_from_roof) : null,
        installation_location: formData.installation_location || null,
        project_timeline: formData.project_timeline || null,
        payment_method: formData.payment_method || null,
        additional_notes: formData.additional_notes || null,
        status: 'draft',
      });
      toast.success('Request created successfully!');
      navigate('/client/requests');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create request');
    } finally {
      setSaving(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (!profileLoading && !clientProfile) {
    return (
      <ClientLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-display font-bold mb-2">Complete Your Profile First</h2>
          <p className="text-muted-foreground mb-6">
            You need to complete your client profile before creating energy requests.
          </p>
          <Button onClick={() => navigate('/client/profile')} className="bg-accent hover:bg-accent/90">
            Complete Profile
          </Button>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/client/requests')}>
          <ArrowLeft size={18} className="mr-2" /> Back to Requests
        </Button>

        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-display font-bold">New Energy Request</h1>
          <p className="text-muted-foreground">Tell us about your solar energy needs</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                currentStep >= step.id 
                  ? 'bg-accent border-accent text-white' 
                  : 'border-border text-muted-foreground'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-accent' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border p-6 lg:p-8">
          {/* Step 1: System Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-semibold mb-2">Select System Type</h2>
                <p className="text-muted-foreground mb-6">Choose the type of solar system you need</p>
              </div>

              <RadioGroup
                value={formData.system_type}
                onValueChange={(value) => handleChange('system_type', value)}
                className="grid md:grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="grid_tie"
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    formData.system_type === 'grid_tie' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                  }`}
                >
                  <RadioGroupItem value="grid_tie" id="grid_tie" className="mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Sun size={20} className="text-accent" />
                      <span className="font-semibold">Grid-Tie</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connected to the utility grid. Excess power is fed back.
                    </p>
                  </div>
                </Label>

                <Label
                  htmlFor="hybrid"
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    formData.system_type === 'hybrid' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                  }`}
                >
                  <RadioGroupItem value="hybrid" id="hybrid" className="mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Battery size={20} className="text-accent" />
                      <span className="font-semibold">Hybrid</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Battery backup included for power during outages.
                    </p>
                  </div>
                </Label>
              </RadioGroup>

              {formData.system_type === 'hybrid' && (
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <Label htmlFor="hours_of_autonomy">Hours of Autonomy</Label>
                    <Input
                      id="hours_of_autonomy"
                      type="number"
                      placeholder="e.g., 4"
                      className="mt-1"
                      value={formData.hours_of_autonomy}
                      onChange={(e) => handleChange('hours_of_autonomy', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Hours of backup power needed</p>
                  </div>
                  <div>
                    <Label htmlFor="days_of_backup">Days of Backup</Label>
                    <Input
                      id="days_of_backup"
                      type="number"
                      placeholder="e.g., 1"
                      className="mt-1"
                      value={formData.days_of_backup}
                      onChange={(e) => handleChange('days_of_backup', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Energy Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-semibold mb-2">Energy Usage Details</h2>
                <p className="text-muted-foreground mb-6">Help us understand your energy needs</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="current_power_consumption">Current Power Consumption (kW)</Label>
                  <Input
                    id="current_power_consumption"
                    type="number"
                    placeholder="e.g., 50"
                    className="mt-1"
                    value={formData.current_power_consumption}
                    onChange={(e) => handleChange('current_power_consumption', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hours_of_operation">Hours of Operation</Label>
                  <Select 
                    value={formData.hours_of_operation} 
                    onValueChange={(value) => handleChange('hours_of_operation', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8 hours (Day shift)</SelectItem>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="16">16 hours</SelectItem>
                      <SelectItem value="24">24 hours (Continuous)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="energy_usage_pattern">Energy Usage Pattern</Label>
                <Select 
                  value={formData.energy_usage_pattern} 
                  onValueChange={(value) => handleChange('energy_usage_pattern', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="constant">Constant throughout the day</SelectItem>
                    <SelectItem value="peak_daytime">Peak during daytime</SelectItem>
                    <SelectItem value="peak_evening">Peak in evening</SelectItem>
                    <SelectItem value="variable">Variable/Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <Checkbox
                  id="has_generator"
                  checked={formData.has_diesel_generator}
                  onCheckedChange={(checked) => handleChange('has_diesel_generator', checked)}
                />
                <Label htmlFor="has_generator" className="cursor-pointer">
                  I have a diesel generator as backup
                </Label>
              </div>

              {formData.has_diesel_generator && (
                <div>
                  <Label htmlFor="generator_details">Generator Details</Label>
                  <Textarea
                    id="generator_details"
                    placeholder="Generator capacity, fuel consumption, etc."
                    className="mt-1"
                    rows={3}
                    value={formData.generator_details}
                    onChange={(e) => handleChange('generator_details', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Installation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-semibold mb-2">Installation Details</h2>
                <p className="text-muted-foreground mb-6">Where will the system be installed?</p>
              </div>

              <div>
                <Label>Installation Type</Label>
                <RadioGroup
                  value={formData.roof_or_ground}
                  onValueChange={(value) => handleChange('roof_or_ground', value)}
                  className="flex gap-4 mt-2"
                >
                  <Label
                    htmlFor="roof"
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer ${
                      formData.roof_or_ground === 'roof' ? 'border-accent bg-accent/5' : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value="roof" id="roof" />
                    <span>Rooftop</span>
                  </Label>
                  <Label
                    htmlFor="ground"
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer ${
                      formData.roof_or_ground === 'ground' ? 'border-accent bg-accent/5' : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value="ground" id="ground" />
                    <span>Ground Mount</span>
                  </Label>
                </RadioGroup>
              </div>

              {formData.roof_or_ground === 'roof' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="roof_area">Available Roof Area (sq.m)</Label>
                    <Input
                      id="roof_area"
                      type="number"
                      placeholder="e.g., 200"
                      className="mt-1"
                      value={formData.roof_area}
                      onChange={(e) => handleChange('roof_area', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="roof_material">Roof Material</Label>
                    <Select 
                      value={formData.roof_material} 
                      onValueChange={(value) => handleChange('roof_material', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iron_sheet">Iron Sheet</SelectItem>
                        <SelectItem value="tiles">Tiles</SelectItem>
                        <SelectItem value="concrete">Concrete</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {formData.roof_or_ground === 'ground' && (
                <div>
                  <Label htmlFor="ground_nature">Ground Conditions</Label>
                  <Select 
                    value={formData.ground_nature} 
                    onValueChange={(value) => handleChange('ground_nature', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select ground type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat terrain</SelectItem>
                      <SelectItem value="sloped">Sloped</SelectItem>
                      <SelectItem value="rocky">Rocky</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="installation_location">Installation Address</Label>
                <Textarea
                  id="installation_location"
                  placeholder="Full address where the system will be installed"
                  className="mt-1"
                  rows={3}
                  value={formData.installation_location}
                  onChange={(e) => handleChange('installation_location', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="project_timeline">Preferred Timeline</Label>
                <Select 
                  value={formData.project_timeline} 
                  onValueChange={(value) => handleChange('project_timeline', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="When do you want to start?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately</SelectItem>
                    <SelectItem value="1_month">Within 1 month</SelectItem>
                    <SelectItem value="3_months">Within 3 months</SelectItem>
                    <SelectItem value="6_months">Within 6 months</SelectItem>
                    <SelectItem value="planning">Just planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Financing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-semibold mb-2">Financing Options</h2>
                <p className="text-muted-foreground mb-6">How do you plan to finance this project?</p>
              </div>

              <RadioGroup
                value={formData.payment_method}
                onValueChange={(value) => handleChange('payment_method', value)}
                className="space-y-4"
              >
                <Label
                  htmlFor="self_financing"
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    formData.payment_method === 'self_financing' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                  }`}
                >
                  <RadioGroupItem value="self_financing" id="self_financing" className="mt-1" />
                  <div>
                    <div className="font-semibold">Self-Financing</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      I will pay for the system upfront or have my own financing arranged.
                    </p>
                  </div>
                </Label>

                <Label
                  htmlFor="requires_financing"
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    formData.payment_method === 'requires_financing' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                  }`}
                >
                  <RadioGroupItem value="requires_financing" id="requires_financing" className="mt-1" />
                  <div>
                    <div className="font-semibold">Requires Financing</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      I need financing options (loan, lease, or PPA) from our partner financiers.
                    </p>
                  </div>
                </Label>
              </RadioGroup>

              <div className="pt-4 border-t border-border">
                <Label htmlFor="additional_notes">Additional Notes</Label>
                <Textarea
                  id="additional_notes"
                  placeholder="Any other information you'd like to share..."
                  className="mt-1"
                  rows={4}
                  value={formData.additional_notes}
                  onChange={(e) => handleChange('additional_notes', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={18} className="mr-2" /> Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-accent hover:bg-accent/90">
                Next <ArrowRight size={18} className="ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="bg-accent hover:bg-accent/90"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" /> Creating...
                  </>
                ) : (
                  <>
                    Create Request <CheckCircle2 size={18} className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
