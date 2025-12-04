import React, { useState } from 'react';
import { Check, Minus, Lightbulb, Calculator, Building, UtensilsCrossed, Hotel, Home } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PricingPackage {
  name: string;
  subtitle: string;
  oneTimeBase: number;
  oneTimePerSqft?: number;
  monthlyFee: number;
  features: string[];
  bestFor: string[];
  isPopular?: boolean;
}

const packages: PricingPackage[] = [
  {
    name: "Starter",
    subtitle: "Small Spaces",
    oneTimeBase: 25000,
    monthlyFee: 2000,
    features: [
      "360° Virtual Tour",
      "Website Embed",
      "Basic Analytics",
      "Mobile Optimized",
      "Customer Support"
    ],
    bestFor: [
      "Small Shops & Boutiques",
      "Single Offices",
      "Apartments & Flats",
      "Up to 2,000 sqft"
    ]
  },
  {
    name: "Professional",
    subtitle: "Growing Businesses",
    oneTimeBase: 25000,
    oneTimePerSqft: 10,
    monthlyFee: 3000,
    features: [
      "All Starter features",
      "Professional Floor Plan",
      "Monthly Text Updates",
      "Advanced Analytics",
      "Priority Support",
      "Google Maps Ready",
      "Seasonal Refreshes"
    ],
    bestFor: [
      "Restaurants & Cafes",
      "Real Estate Offices",
      "Retail Chains",
      "Villas & Homes",
      "2,000-5,000 sqft"
    ],
    isPopular: true
  },
  {
    name: "Premium",
    subtitle: "Luxury Properties",
    oneTimeBase: 25000,
    oneTimePerSqft: 10,
    monthlyFee: 3500,
    features: [
      "All Professional features",
      "Quarterly Photo Update",
      "Video Highlights",
      "3D Furniture Defurnish",
      "SEO Optimization",
      "Dedicated Manager",
      "Weekly Reports",
      "Social Media Assets"
    ],
    bestFor: [
      "Luxury Hotels & Resorts",
      "Premium Restaurants",
      "Corporate Offices",
      "Luxury Villas & Bungalows",
      "5,000+ sqft"
    ]
  }
];

const comparisonData = [
  { feature: "Property Size", starter: "Up to 2K sqft", professional: "2K-5K sqft", premium: "5K+ sqft" },
  { feature: "Monthly Fee", starter: "₹2,000", professional: "₹3,000", premium: "₹3,500" },
  { feature: "Year 1 Cost", starter: "~₹49K", professional: "~₹76K+", premium: "~₹107K+" },
  { feature: "360° Tour", starter: true, professional: true, premium: true },
  { feature: "Floor Plan", starter: false, professional: true, premium: true },
  { feature: "Analytics", starter: "Basic", professional: "Advanced", premium: "Advanced" },
  { feature: "Updates", starter: false, professional: true, premium: true },
  { feature: "Dedicated Manager", starter: false, professional: false, premium: true }
];

const realExamples = [
  {
    title: "1,000 sqft Boutique",
    icon: Building,
    package: "Starter",
    sqft: 1000,
    oneTime: 25000,
    monthly: 2000,
    year1Total: 49000,
    year2Plus: 24000
  },
  {
    title: "3,500 sqft Restaurant",
    icon: UtensilsCrossed,
    package: "Professional",
    sqft: 3500,
    oneTime: 40000,
    monthly: 3000,
    year1Total: 76000,
    year2Plus: 36000
  },
  {
    title: "6,000 sqft Hotel",
    icon: Hotel,
    package: "Premium",
    sqft: 6000,
    oneTime: 65000,
    monthly: 3500,
    year1Total: 107000,
    year2Plus: 42000
  }
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const AVERPricingSection = () => {
  const [sqft, setSqft] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [calculatedPrice, setCalculatedPrice] = useState<{
    oneTime: number;
    monthly: number;
    annual: number;
    year1Total: number;
    year2Plus: number;
  } | null>(null);

  const calculatePrice = () => {
    const sqftNum = parseInt(sqft) || 0;
    if (!sqftNum || !selectedPackage) return;

    const pkg = packages.find(p => p.name.toLowerCase() === selectedPackage);
    if (!pkg) return;

    let oneTime = pkg.oneTimeBase;
    if (pkg.oneTimePerSqft && sqftNum > 2000) {
      oneTime += (sqftNum - 2000) * pkg.oneTimePerSqft;
    }

    const annual = pkg.monthlyFee * 12;
    const year1Total = oneTime + annual;

    setCalculatedPrice({
      oneTime,
      monthly: pkg.monthlyFee,
      annual,
      year1Total,
      year2Plus: annual
    });
  };

  const getDisplayPrice = (pkg: PricingPackage) => {
    if (billingPeriod === 'monthly') {
      return {
        primary: formatCurrency(pkg.monthlyFee),
        period: '/month',
        secondary: pkg.oneTimePerSqft 
          ? `+ ${formatCurrency(pkg.oneTimeBase)}+ one-time setup` 
          : `+ ${formatCurrency(pkg.oneTimeBase)} one-time setup`
      };
    } else {
      const annual = pkg.monthlyFee * 12;
      const year1Total = pkg.oneTimeBase + annual;
      return {
        primary: formatCurrency(year1Total) + (pkg.oneTimePerSqft ? '+' : ''),
        period: '/year (Year 1)',
        secondary: `Then ${formatCurrency(annual)}/year`
      };
    }
  };

  const getYear1Total = (pkg: PricingPackage): string => {
    const baseTotal = pkg.oneTimeBase + (pkg.monthlyFee * 12);
    if (pkg.oneTimePerSqft) {
      return formatCurrency(baseTotal) + '+';
    }
    return formatCurrency(baseTotal);
  };

  const getOneTimePrice = (pkg: PricingPackage): string => {
    if (pkg.oneTimePerSqft) {
      return `${formatCurrency(pkg.oneTimeBase)}+ (${formatCurrency(pkg.oneTimeBase)} + ₹${pkg.oneTimePerSqft}/sqft)`;
    }
    return formatCurrency(pkg.oneTimeBase);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our <span className="text-green-500">Pricing Plans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the package that fits your business
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-card border border-green-500/20 rounded-full p-1 gap-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Best Value</span>
            </button>
          </div>
        </div>

        {/* Key Message Banner */}
        <div className="bg-card border-l-4 border-green-500 rounded-r-xl p-6 mb-12 shadow-soft">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">How It Works:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span><strong>ONE-TIME FEE:</strong> Professional shooting & tour creation (price varies by property size)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span><strong>MONTHLY FEE:</strong> Keep your tour live & updated (₹2,000-3,500/month)</span>
                </li>
              </ul>
              <p className="mt-3 font-medium text-foreground">
                TOTAL YEAR 1 COST = One-Time Fee + (Monthly Fee × 12)
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => {
            const displayPrice = getDisplayPrice(pkg);
            return (
            <Card 
              key={index} 
              className={`relative bg-card border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                pkg.isPopular 
                  ? 'border-green-500 scale-105 shadow-lg shadow-green-500/20' 
                  : 'border-green-500/20 hover:border-green-500/50'
              }`}
            >
              {pkg.isPopular && (
                <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                  ⭐ POPULAR
                </Badge>
              )}
              
              <CardHeader className="bg-green-500/5 rounded-t-lg pb-4">
                <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
                <p className="text-muted-foreground">{pkg.subtitle}</p>
              </CardHeader>
              
              <CardContent className="p-6">
                {/* Pricing - Tab Based */}
                <div className="space-y-3 mb-6 pb-6 border-b border-green-500/20">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-green-500">{displayPrice.primary}</span>
                    <span className="text-sm text-muted-foreground">{displayPrice.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {displayPrice.secondary}
                  </p>
                  {billingPeriod === 'monthly' && pkg.oneTimePerSqft && (
                    <p className="text-xs text-muted-foreground text-center">
                      (Base + ₹{pkg.oneTimePerSqft}/sqft over 2,000 sqft)
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Best For */}
                <div className="bg-green-500/5 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-foreground mb-2 text-sm">Best For:</p>
                  <ul className="space-y-1">
                    {pkg.bestFor.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    pkg.isPopular 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' 
                      : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/30'
                  }`}
                  onClick={() => window.location.href = '/#contact'}
                >
                  {pkg.isPopular ? 'Get Started Now' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
            );
          })}
        </div>

        {/* Price Calculator */}
        <Card className="bg-card border-green-500/20 mb-16">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-6 w-6 text-green-500" />
              <h3 className="text-2xl font-bold text-foreground">Calculate Your Quote</h3>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Property Size (sqft)
                </label>
                <Input
                  type="number"
                  placeholder="Enter sqft"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  className="border-green-500/30 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Select Package
                </label>
                <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                  <SelectTrigger className="border-green-500/30 focus:border-green-500">
                    <SelectValue placeholder="Choose package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={calculatePrice}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                Calculate
              </Button>
              
              {calculatedPrice && (
                <div className="md:col-span-1 bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">One-Time:</span>
                      <span className="font-medium text-foreground">{formatCurrency(calculatedPrice.oneTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly:</span>
                      <span className="font-medium text-foreground">{formatCurrency(calculatedPrice.monthly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual:</span>
                      <span className="font-medium text-foreground">{formatCurrency(calculatedPrice.annual)}</span>
                    </div>
                    <div className="pt-2 border-t border-green-500/30">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Year 1:</span>
                        <span className="font-bold text-green-500">{formatCurrency(calculatedPrice.year1Total)}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">Year 2+:</span>
                        <span className="text-muted-foreground">{formatCurrency(calculatedPrice.year2Plus)}/year</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        <Card className="bg-card border-green-500/20 mb-16 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-500/10">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center p-4 font-semibold text-foreground">Starter</th>
                    <th className="text-center p-4 font-semibold text-green-500 bg-green-500/5">Professional</th>
                    <th className="text-center p-4 font-semibold text-foreground">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-t border-green-500/10">
                      <td className="p-4 text-muted-foreground">{row.feature}</td>
                      <td className="text-center p-4">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                          )
                        ) : (
                          <span className="text-foreground">{row.starter}</span>
                        )}
                      </td>
                      <td className="text-center p-4 bg-green-500/5">
                        {typeof row.professional === 'boolean' ? (
                          row.professional ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                          )
                        ) : (
                          <span className="text-foreground font-medium">{row.professional}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                          )
                        ) : (
                          <span className="text-foreground">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Real Examples */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Real-World Examples</h3>
          <p className="text-muted-foreground">See how pricing works for different business types</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {realExamples.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <Card key={index} className="bg-card border-green-500/20 hover:border-green-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{example.title}</h4>
                      <Badge variant="outline" className="text-green-500 border-green-500/30 text-xs">
                        {example.package}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">One-Time:</span>
                      <span className="text-foreground">{formatCurrency(example.oneTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly:</span>
                      <span className="text-foreground">{formatCurrency(example.monthly)} × 12 = {formatCurrency(example.monthly * 12)}</span>
                    </div>
                    <div className="pt-2 border-t border-green-500/20">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">YEAR 1 TOTAL:</span>
                        <span className="font-bold text-green-500">{formatCurrency(example.year1Total)}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground text-xs">YEAR 2+:</span>
                        <span className="text-muted-foreground text-xs">{formatCurrency(example.year2Plus)}/year</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AVERPricingSection;
