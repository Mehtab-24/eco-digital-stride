import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator as CalculatorIcon, Leaf, Monitor, Cloud, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmissionData {
  streaming: number;
  cloudStorage: number;
  deviceCharging: number;
  laptopUsage: number;
  emailUsage: number;
}

const CarbonFootprint = () => {
  const [formData, setFormData] = useState({
    streamingHours: '',
    cloudStorageGB: '',
    chargingFrequency: '',
    laptopUsageHours: '',
    emailsPerDay: '',
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEmissions = (): EmissionData => {
    const streamingEmissions = parseFloat(formData.streamingHours) * 0.036 || 0;
    const cloudEmissions = parseFloat(formData.cloudStorageGB) * 0.005 || 0;
    const chargingEmissions = parseFloat(formData.chargingFrequency) * 0.008 || 0;
    const laptopEmissions = parseFloat(formData.laptopUsageHours) * 0.02 || 0; // ~20g/hour
    const emailEmissions = parseFloat(formData.emailsPerDay) * 0.004 || 0; // ~4g/email

    return {
      streaming: streamingEmissions,
      cloudStorage: cloudEmissions,
      deviceCharging: chargingEmissions,
      laptopUsage: laptopEmissions,
      emailUsage: emailEmissions,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.streamingHours ||
      !formData.cloudStorageGB ||
      !formData.chargingFrequency ||
      !formData.laptopUsageHours ||
      !formData.emailsPerDay
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your carbon footprint.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const emissions = calculateEmissions();

    // Store results in localStorage for the dashboard
    localStorage.setItem('carbonFootprintData', JSON.stringify({
      ...emissions,
      timestamp: new Date().toISOString(),
      inputs: formData,
    }));

    setIsCalculating(false);

    toast({
      title: "Calculation Complete!",
      description: "Your carbon footprint has been calculated. Redirecting to dashboard...",
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const inputSections = [
    {
      icon: Monitor,
      title: 'Streaming Hours',
      field: 'streamingHours',
      label: 'Daily streaming hours',
      placeholder: 'e.g., 4',
      suffix: 'hours/day',
      description: 'Include video streaming, music, and online gaming',
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      field: 'cloudStorageGB',
      label: 'Cloud storage usage',
      placeholder: 'e.g., 50',
      suffix: 'GB',
      description: 'Total data stored in cloud services',
    },
    {
      icon: Smartphone,
      title: 'Device Charging',
      field: 'chargingFrequency',
      label: 'Daily charging cycles',
      placeholder: 'e.g., 2',
      suffix: 'charges/day',
      description: 'All devices: phone, laptop, tablet, etc.',
    },
    {
      icon: Monitor,
      title: 'Laptop Usage',
      field: 'laptopUsageHours',
      label: 'Laptop usage (hours/day)',
      placeholder: 'e.g., 5',
      suffix: 'hours/day',
      description: 'Estimated daily laptop screen time',
    },
    {
      icon: Cloud,
      title: 'Emails Sent',
      field: 'emailsPerDay',
      label: 'Emails sent per day',
      placeholder: 'e.g., 20',
      suffix: 'emails/day',
      description: 'An average email emits ~4g CO₂',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="bg-gradient-eco p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <CalculatorIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-gray-100">
            Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your digital carbon emissions by providing information about your daily digital activities.
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-eco-primary">
              <Leaf className="h-5 w-5" />
              Your Digital Activity
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Fill in the details below to estimate your weekly digital carbon footprint.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {inputSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-eco-primary/10 p-2 rounded-lg">
                        <section.icon className="h-5 w-5 text-eco-primary" />
                      </div>
                      <h3 className="font-semibold text-eco-dark dark:text-gray-200">{section.title}</h3>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={section.field} className="text-sm font-medium dark:text-gray-300">
                        {section.label}
                      </Label>
                      <div className="relative">
                        <Input
                          id={section.field}
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder={section.placeholder}
                          value={formData[section.field as keyof typeof formData]}
                          onChange={(e) => handleInputChange(section.field, e.target.value)}
                          className="pr-20"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground dark:text-gray-400">
                          {section.suffix}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-eco-primary/5 border border-eco-primary/20 rounded-lg p-6">
                <h4 className="font-semibold text-eco-primary mb-2 flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  How We Calculate
                </h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Our calculations are based on industry research on energy consumption and carbon emissions 
                  from digital activities. Results provide estimated weekly CO₂ emissions to help you understand 
                  your digital environmental impact.
                </p>
              </div>
              <div className="text-center">
                <Button 
                  type="submit" 
                  variant="eco" 
                  size="xl" 
                  disabled={isCalculating}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate My Impact
                      <CalculatorIcon className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm text-eco-primary underline hover:no-underline"
                  onClick={() => setFormData({
                    streamingHours: '',
                    cloudStorageGB: '',
                    chargingFrequency: '',
                    laptopUsageHours: '',
                    emailsPerDay: '',
                  })}
                >
                  Reset All Fields
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonFootprint;