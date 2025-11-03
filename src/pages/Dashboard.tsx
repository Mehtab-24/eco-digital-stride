import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Leaf, Lightbulb, Calculator, TrendingDown, TreePine, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FootprintData {
  // Personal emissions (food, travel, electricity)
  food?: number;
  travel?: number;
  electricity?: number;
  total?: number;

  // Digital emissions (streaming, cloud, charging)
  streaming?: number;
  cloudStorage?: number;
  deviceCharging?: number;
  laptopUsage?: number;
  emailUsage?: number;
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

  // Check which type of data we have
  const hasPersonalData = data.food !== undefined && data.travel !== undefined && data.electricity !== undefined;
  const hasDigitalData = data.streaming !== undefined && data.cloudStorage !== undefined && data.deviceCharging !== undefined;

  // Total emissions (personal or digital)
  let totalEmissions = 0;
  if (hasPersonalData) {
    totalEmissions = (data.food || 0) + (data.travel || 0) + (data.electricity || 0);
  } else if (hasDigitalData) {
    totalEmissions = (data.streaming || 0) + (data.cloudStorage || 0) + (data.deviceCharging || 0) + (data.laptopUsage || 0) + (data.emailUsage || 0);
  }

  const dailyEmissions = totalEmissions / 7;
  const treesNeeded = Math.ceil((totalEmissions * 52) / 21); // Trees needed per year
  const weeklyEmissionsGrams = Math.round(totalEmissions * 1000);

  // Chart data
  const chartData = [];
  if (hasPersonalData) {
    chartData.push(
      { category: 'Food', emissions: data.food || 0 },
      { category: 'Travel', emissions: data.travel || 0 },
      { category: 'Electricity', emissions: data.electricity || 0 }
    );
  } else if (hasDigitalData) {
    chartData.push(
      { category: 'Streaming', emissions: data.streaming || 0 },
      { category: 'Cloud Storage', emissions: data.cloudStorage || 0 },
      { category: 'Device Charging', emissions: data.deviceCharging || 0 },
      { category: 'Laptop Usage', emissions: data.laptopUsage || 0 },
      { category: 'Emails', emissions: data.emailUsage || 0 }
    );
  }

  const pieData = chartData.map(item => ({
    name: item.category,
    value: item.emissions,
    color: item.category === 'Food' ? '#10b981' : 
           item.category === 'Travel' ? '#059669' : '#047857',
  }));

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
      </div>
    </div>
  );
};

export default Dashboard;