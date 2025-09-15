import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Calculator, BarChart3, Smartphone, Cloud, Monitor, Car, Utensils, Lightbulb } from 'lucide-react';
import heroImage from '/assets/images/hero-eco.jpg';

function Home() {
  const features = [
    {
      icon: Calculator,
      title: 'Personal & Digital Footprint',
      description: 'Track emissions from daily life and digital habits — all in one place.',
    },
    {
      icon: BarChart3,
      title: 'Clear Visual Insights',
      description: 'View detailed breakdowns of your carbon footprint with interactive charts.',
    },
    {
      icon: Lightbulb,
      title: 'Actionable Recommendations',
      description: 'Get personalized tips to reduce your environmental impact effectively.',
    },
  ];

  const emissionSources = [
    { icon: Utensils, name: 'Food', description: 'Meat consumption, diet choices' },
    { icon: Car, name: 'Travel', description: 'Vehicle usage, commuting habits' },
    { icon: Monitor, name: 'Electricity', description: 'Home energy use per week' },
    { icon: Cloud, name: 'Cloud & Streaming', description: 'Data usage, online activity' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 opacity-60"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Understand Your Carbon Impact.
            <br />
            <span className="text-yellow-100">Live More Sustainably.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Whether it's your lifestyle or digital habits, we help you measure, visualize, and reduce your carbon footprint.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/carbon-footprint">
              <Button
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto bg-white text-green-700 hover:bg-white/90 shadow-lg transition-all duration-200"
              >
                Calculate My Footprint
                <Calculator className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto text-green-700 border-green-700 hover:bg-green-50 hover:text-green-800 transition-all duration-200"
              >
                View Dashboard
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Measure Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              What We Measure
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform calculates emissions from everyday activities — both physical and digital — using science-backed data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emissionSources.map((source, index) => (
              <Card key={index} className="border-none hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center">
                    <source.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{source.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{source.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Tools That Help You Reduce
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From personal insights to actionable steps, our tools empower sustainable living.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="space-y-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center shadow-md">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Sustainability Journey?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are tracking their carbon footprint and making meaningful changes.
          </p>
          <Link to="/carbon-footprint">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-green-700 hover:bg-white/90 shadow-xl transition-all duration-200"
            >
              Get Started Now
              <Leaf className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;