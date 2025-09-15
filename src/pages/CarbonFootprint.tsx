import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { estimateCarbonFootprint } from "@/utils/carbonEstimator";
import { Calculator, Leaf, Utensils, Car, Lightbulb } from "lucide-react";

const CarbonFootprint = () => {
  const [formData, setFormData] = useState({
    meatPerWeek: "",
    vehicleMiles: "",
    electricityKWh: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    const inputs = {
      meatPerWeek: parseInt(formData.meatPerWeek) || 0,
      vehicleMiles: parseFloat(formData.vehicleMiles) || 0,
      electricityKWh: parseFloat(formData.electricityKWh) || 0,
    };

    const carbonFootprint = estimateCarbonFootprint(inputs);
    setResult(carbonFootprint);
  };

  const handleReset = () => {
    setFormData({
      meatPerWeek: "",
      vehicleMiles: "",
      electricityKWh: "",
    });
    setResult(null);
  };

  const inputSections = [
    {
      icon: Utensils,
      title: "Food",
      field: "meatPerWeek",
      label: "Meat consumption per week",
      placeholder: "e.g., 3",
      suffix: "times/week",
      description: "Number of times you consume meat or animal products",
    },
    {
      icon: Car,
      title: "Travel",
      field: "vehicleMiles",
      label: "Vehicle miles per week",
      placeholder: "e.g., 100",
      suffix: "miles/week",
      description: "Total distance driven by car or other vehicles",
    },
    {
      icon: Lightbulb,
      title: "Electricity",
      field: "electricityKWh",
      label: "Electricity usage",
      placeholder: "e.g., 500",
      suffix: "kWh/week",
      description: "Weekly electricity consumption at home",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estimate your weekly carbon emissions based on food consumption, travel habits, and electricity usage.
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0 rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 text-2xl font-bold">
              <Leaf className="h-6 w-6 text-green-600" />
              Your Lifestyle
            </CardTitle>
            <p className="text-gray-600">
              Fill in the details below to estimate your weekly carbon footprint.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {inputSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <section.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={section.field} className="text-sm font-medium text-gray-700">
                        {section.label}
                      </Label>
                      <div className="relative">
                        <Input
                          id={section.field}
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder={section.placeholder}
                          value={formData[section.field]}
                          onChange={(e) => handleInputChange(section.field, e.target.value)}
                          className="pr-20 border-gray-300 focus:border-green-500 focus:ring-green-500/20"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                          {section.suffix}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="button"
                  onClick={handleCalculate}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Calculate My Impact
                  <Calculator className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Results */}
            {result !== null && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Your Carbon Footprint Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                    <p className="text-2xl font-bold text-green-600">
                      {result} g CO₂e
                    </p>
                    <p className="text-sm text-green-600">Total Weekly Emissions</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                    <p className="text-2xl font-bold text-green-600">
                      {(result / 1000).toFixed(3)} kg CO₂e
                    </p>
                    <p className="text-sm text-green-600">In Kilograms</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50"
                  >
                    Calculate Again
                  </Button>
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