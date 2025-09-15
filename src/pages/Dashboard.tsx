import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Leaf, Lightbulb, Calculator, TrendingDown, TreePine, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Type that matches what you're actually saving
interface FootprintData {
  food: number; // kg CO₂e per week
  travel: number; // kg CO₂e per week
  electricity: number; // kg CO₂e per week
  total: number; // Total weekly emissions
}

const Dashboard = () => {
  const [data, setData] = useState<FootprintData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('carbonFootprintData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData(parsed);
      } catch (error) {
        console.error("Failed to parse carbon footprint data:", error);
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="bg-gradient-eco p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-gray-100">
            Results Dashboard
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-300">
            No carbon footprint data found. Please calculate your impact first.
          </p>
          <Link to="/calculator">
            <Button variant="eco" size="lg">
              Calculate My Impact
              <Calculator className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Daily emissions (divide weekly by 7)
  const dailyEmissions = data.total / 7;

  // Trees needed to offset annual emissions (~21kg CO₂ per tree)
  const treesNeeded = Math.ceil((data.total * 52) / 21); // 52 weeks/year

  // Weekly emissions in grams
  const weeklyEmissionsGrams = Math.round(data.total * 1000);

  // Chart data for bar chart
  const chartData = [
    { category: 'Food', emissions: data.food },
    { category: 'Travel', emissions: data.travel },
    { category: 'Electricity', emissions: data.electricity },
  ];

  // Pie chart data
  const pieData = chartData.map(item => ({
    name: item.category,
    value: item.emissions,
    color: item.category === 'Food' ? '#10b981' : 
           item.category === 'Travel' ? '#059669' : '#047857',
  }));

  // Reduction tips based on high-emission areas
  const tips = [];
  if (data.food > data.travel && data.food > data.electricity) {
    tips.push({
      category: 'Food',
      tip: 'Reduce meat consumption or switch to plant-based meals.',
      impact: 'Can reduce emissions by up to 50%',
    });
  }
  if (data.travel > data.food && data.travel > data.electricity) {
    tips.push({
      category: 'Travel',
      tip: 'Use public transport, carpool, or bike instead of driving.',
      impact: 'Can reduce emissions by up to 40%',
    });
  }
  if (data.electricity > data.food && data.electricity > data.travel) {
    tips.push({
      category: 'Electricity',
      tip: 'Switch to LED bulbs and unplug devices when not in use.',
      impact: 'Can reduce emissions by up to 30%',
    });
  }

  // Equivalencies
  const equivalencies = [
    {
      icon: TreePine,
      value: treesNeeded,
      unit: 'trees needed',
      description: 'to offset annual emissions',
    },
    {
      icon: TrendingDown,
      value: weeklyEmissionsGrams,
      unit: 'grams CO₂',
      description: 'weekly emissions',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="bg-gradient-eco p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-eco-dark dark:text-gray-100">
            Your Personal Carbon Footprint
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-300">
            Analysis of your lifestyle and environmental impact
          </p>
        </div>

        {/* Reset Button */}
        <div className="text-center mb-8">
          <Button
            variant="eco-outline"
            size="lg"
            onClick={() => {
              const confirmReset = window.confirm("Are you sure you want to reset your carbon data and start fresh?");
              if (confirmReset) {
                localStorage.removeItem('carbonFootprintData');
                navigate('/calculator'); 
              }
            }}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset My Carbon Data
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Daily Emissions</p>
                  <p className="text-2xl font-bold text-eco-primary">
                    {dailyEmissions.toFixed(3)} kg
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">CO₂ equivalent</p>
                </div>
                <div className="bg-eco-primary/10 p-3 rounded-full">
                  <Leaf className="h-6 w-6 text-eco-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {equivalencies.map((equiv, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">{equiv.description}</p>
                    <p className="text-2xl font-bold text-eco-primary">{equiv.value}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">{equiv.unit}</p>
                  </div>
                  <div className="bg-eco-primary/10 p-3 rounded-full">
                    <equiv.icon className="h-6 w-6 text-eco-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <Link to="/calculator">
                <Button variant="eco-outline" size="sm" className="w-full">
                  Recalculate
                  <Calculator className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-gray-200">
                <BarChart3 className="h-5 w-5 text-eco-primary" />
                Emissions by Category
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Daily CO₂ emissions breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(3)} kg`, 'CO₂ Emissions']}
                  />
                  <Bar dataKey="emissions" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-gray-200">
                <BarChart3 className="h-5 w-5 text-eco-primary" />
                Distribution Overview
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Proportion of emissions by source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(3)} kg`, 'CO₂ Emissions']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reduction Tips */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-200">
              <Lightbulb className="h-5 w-5 text-eco-primary" />
              Personalized Reduction Tips
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Ways to reduce your personal carbon footprint based on your usage patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.length > 0 ? (
                tips.map((tip, index) => (
                  <div key={index} className="space-y-3 p-4 bg-eco-primary/5 rounded-lg border border-eco-primary/20">
                    <h4 className="font-semibold text-eco-primary">{tip.category}</h4>
                    <p className="text-sm text-foreground dark:text-gray-300">{tip.tip}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-400 font-medium">{tip.impact}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center p-6">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">No personalized tips available.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;