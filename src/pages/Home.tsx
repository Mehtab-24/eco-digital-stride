import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Calculator, BarChart3, Smartphone, Cloud, Monitor } from 'lucide-react';
import heroImage from '/assets/images/hero-eco.jpg';
import { estimateCarbonFootprint } from "../utils/carbonEstimator";
import { ThemeToggle } from '@/components/ThemeToggle';

function Home() {
  const features = [
    {
      icon: Calculator,
      title: 'Digital Footprint Calculator',
      description: 'Calculate emissions from streaming, cloud usage, and device charging with our easy-to-use tool.',
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'See your carbon impact broken down by category with beautiful, interactive charts.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Tips',
      description: 'Get personalized recommendations to reduce your digital environmental impact.',
    },
  ];

  const emissionSources = [
    { icon: Monitor, name: 'Streaming', description: 'Video and music streaming services' },
    { icon: Cloud, name: 'Cloud Storage', description: 'Online file storage and backups' },
    { icon: Smartphone, name: 'Device Charging', description: 'Daily device power consumption' },
  ];

  return (
    <div className="min-h-screen">
      {/* Dark Mode Toggle */}
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-earth opacity-50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-eco-dark dark:text-gray-100 leading-tight">
                Track Your Digital Impact.
                <br />
                <span className="text-eco-primary">Make Greener Choices.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
                Understand and reduce your digital carbon footprint with our comprehensive tracking platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button variant="eco" size="xl" className="w-full sm:w-auto">
                  Calculate My Impact
                  <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="eco-outline" size="xl" className="w-full sm:w-auto">
                  View Dashboard
                  <BarChart3 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 text-center">
              How We Estimate Your Digital Emissions
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-center">
              Our platform analyzes your digital activities and converts them into estimated carbon emissions
              using industry-standard calculations and energy consumption data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {emissionSources.map((source, index) => (
              <Card key={index} className="hover:shadow-soft transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="bg-gradient-eco p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <source.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-eco-dark dark:text-gray-200">{source.name}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">{source.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-gray-100">
              Powerful Features for Conscious Users
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to understand, track, and reduce your digital environmental impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-6">
                <div className="bg-gradient-eco p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-eco-dark dark:text-gray-200">{feature.title}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-eco text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Start tracking your digital carbon footprint today and join thousands of users
            making conscious choices for a greener future.
          </p>
          <Link to="/calculator">
            <Button variant="secondary" size="xl" className="bg-white text-eco-primary hover:bg-white/90">
              Get Started Now
              <Leaf className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          {/* Test Button for Carbon Estimation */}
          <Button
            variant="eco-outline"
            className="mt-8"
            onClick={() => {
              const result = estimateCarbonFootprint({
                streamingHours: 2,
                mobileHours: 3,
                laptopHours: 5,
                cloudGB: 1,
                emailsPerDay: 20,
              });
              console.log("Estimated Carbon Emissions:", result, "gCO2e");
              alert(`Estimated Carbon Emissions: ${result} gCO2e`);
            }}
          >
            Test Carbon Estimator
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
