import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator as CalculatorIcon, Utensils, Car, Lightbulb, Leaf, Bike, Zap, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmissionData {
  food: number;
  travel: number;
  electricity: number;
  total: number;
}

const CarbonFootprint = () => {
  const [formData, setFormData] = useState({
    meatMealsPerWeek: "",
    vehicleMilesPerWeek: "",
    electricityKwhPerWeek: "",
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateEmissions = (): EmissionData => {
    // Approximate emission factors (kg CO₂e per unit)
    const FOOD_EMISSION_FACTOR = 2.5; // kg CO₂e per meat-based meal
    const TRAVEL_EMISSION_FACTOR = 0.41; // kg CO₂e per mile driven (gasoline car)
    const ELECTRICITY_EMISSION_FACTOR = 0.45; // kg CO₂e per kWh (India average grid mix)

    const foodEmissions =
      (parseFloat(formData.meatMealsPerWeek) || 0) * FOOD_EMISSION_FACTOR;
    const travelEmissions =
      (parseFloat(formData.vehicleMilesPerWeek) || 0) * TRAVEL_EMISSION_FACTOR;
    const electricityEmissions =
      (parseFloat(formData.electricityKwhPerWeek) || 0) *
      ELECTRICITY_EMISSION_FACTOR;

    const total = foodEmissions + travelEmissions + electricityEmissions;

    return {
      food: parseFloat(foodEmissions.toFixed(2)),
      travel: parseFloat(travelEmissions.toFixed(2)),
      electricity: parseFloat(electricityEmissions.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.meatMealsPerWeek ||
      !formData.vehicleMilesPerWeek ||
      !formData.electricityKwhPerWeek
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate your carbon footprint.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const emissions = calculateEmissions();

    // Save data for dashboard
    localStorage.setItem("carbonFootprintData", JSON.stringify(emissions));

    setIsCalculating(false);

    toast({
      title: "Calculation Complete!",
      description: "Your personal carbon footprint has been calculated. Redirecting to dashboard...",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const inputSections = [
    {
      icon: Utensils,
      title: "Food",
      field: "meatMealsPerWeek",
      label: "Meat-based meals per week",
      placeholder: "e.g., 7",
      suffix: "meals/week",
      description: "Number of times you eat meat or animal products weekly",
    },
    {
      icon: Car,
      title: "Travel",
      field: "vehicleMilesPerWeek",
      label: "Vehicle miles per week",
      placeholder: "e.g., 100",
      suffix: "miles/week",
      description: "Total distance driven by car or other vehicles",
    },
    {
      icon: Lightbulb,
      title: "Electricity",
      field: "electricityKwhPerWeek",
      label: "Home electricity usage",
      placeholder: "e.g., 500",
      suffix: "kWh/week",
      description: "Weekly electricity consumption at home",
    },
  ];

  // Only show suggestions after form is submitted (for demo purposes)
  const getSwapsAndComparison = () => {
    const total = calculateEmissions().total;

    const indiaAverage = 48; // kg CO₂e/week (~2,500 kg/year)
    const worldAverage = 96; // kg CO₂e/week (~5,000 kg/year)

    const comparisons = [
      {
        label: "India Average",
        value: `${indiaAverage} kg/week`,
        status: total > indiaAverage ? "above" : "below",
      },
      {
        label: "World Average",
        value: `${worldAverage} kg/week`,
        status: total > worldAverage ? "above" : "below",
      },
    ];

    const swaps = [];

    // Personalized Swap Suggestions
    if (parseFloat(formData.meatMealsPerWeek) > 3) {
      swaps.push({
        icon: Utensils,
        from: "Daily Meat Meals",
        to: "Plant-Based 2x/Week",
        impact: "Save ~150 kg/year",
      });
    }
    if (parseFloat(formData.vehicleMilesPerWeek) > 50) {
      swaps.push({
        icon: Bike,
        from: "Drive Alone",
        to: "Bike or Public Transit",
        impact: "Save ~200 kg/year",
      });
    }
    if (parseFloat(formData.electricityKwhPerWeek) > 400) {
      swaps.push({
        icon: Zap,
        from: "Standard Bulbs",
        to: "LEDs + Unplug Devices",
        impact: "Save ~100 kg/year",
      });
    }

    return { comparisons, swaps };
  };

  const { comparisons, swaps } = getSwapsAndComparison();

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-lg">
            <CalculatorIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Personal Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estimate your weekly carbon emissions and discover ways to reduce your impact.
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0 rounded-xl bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-2xl font-bold">
              <Leaf className="h-6 w-6" />
              Your Lifestyle
            </CardTitle>
            <CardDescription className="dark:text-gray-300">
              Fill in the details below to estimate your weekly carbon footprint.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {inputSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                        <section.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={section.field} className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                          className="pr-20 border-gray-300 focus:border-green-500 focus:ring-green-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                          {section.suffix}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* How We Calculate */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  How We Calculate
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Meat meal: ~2.5 kg CO₂e</li>
                  <li>• Car mile: ~0.41 kg CO₂e</li>
                  <li>• 1 kWh electricity: ~0.45 kg CO₂e (India average)</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isCalculating}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
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

              {/* Reset Button */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm text-green-600 dark:text-green-400 underline hover:no-underline"
                  onClick={() =>
                    setFormData({
                      meatMealsPerWeek: "",
                      vehicleMilesPerWeek: "",
                      electricityKwhPerWeek: "",
                    })
                  }
                >
                  Reset All Fields
                </Button>
              </div>
            </form>

            {/* Results Preview (only visible after submit, but shown here for UX) */}
            {(formData.meatMealsPerWeek || formData.vehicleMilesPerWeek || formData.electricityKwhPerWeek) && (
              <div className="mt-8 space-y-8">
                {/* Comparison with Averages */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Comparison with Averages
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comparisons.map((item, i) => (
                      <div key={i} className="p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{item.value}</p>
                        <p className={`text-xs ${item.status === 'above' ? 'text-red-500' : 'text-green-500'}`}>
                          You are {item.status} average
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalized Swaps */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Personalized Swaps
                  </h4>
                  {swaps.length > 0 ? (
                    <div className="space-y-4">
                      {swaps.map((swap, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                          <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
                            <swap.icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Switch from <strong>{swap.from}</strong> to <strong>{swap.to}</strong>
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-400">{swap.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Great job! Your inputs are already eco-friendly. Keep it up!
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonFootprint;