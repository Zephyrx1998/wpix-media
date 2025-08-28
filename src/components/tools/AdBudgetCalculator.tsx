import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdBudgetCalculator = () => {
  const [businessType, setBusinessType] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [salesTarget, setSalesTarget] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVybeCTA, setShowVybeCTA] = useState(false);

  const calculateBudget = async () => {
    if (!businessType || !customerValue.trim() || !salesTarget.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const avgValue = parseFloat(customerValue.replace(/[^\d.]/g, ''));
      const monthlyTarget = parseFloat(salesTarget.replace(/[^\d.]/g, ''));
      
      // Calculate budget based on 10-20% of target revenue
      const minBudget = Math.round(monthlyTarget * 0.1);
      const maxBudget = Math.round(monthlyTarget * 0.2);
      
      // Calculate customers needed
      const customersNeeded = Math.ceil(monthlyTarget / avgValue);
      
      const result = `💰 RECOMMENDED AD BUDGET:\n\n📊 Monthly Range: ₹${minBudget.toLocaleString()} - ₹${maxBudget.toLocaleString()}\n\n📈 Strategy Breakdown:\n• Target: ${customersNeeded} customers/month\n• Customer Value: ₹${avgValue.toLocaleString()}\n• ROI Target: 5x-10x return\n\n${businessType === 'Product' ? '🛍️ Product Strategy: Focus on conversion campaigns' : '🎯 Service Strategy: Lead generation + nurturing'}\n\n💡 Pro Tip: Start with ₹${minBudget.toLocaleString()}/month, scale based on performance.`;
      
      setOutput(result);
      setShowVybeCTA(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-medium md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">Ad Budget Calculator</CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">Highlight Feature</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate your optimal monthly ad budget based on business goals
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-2">Business Type:</p>
            <div className="flex gap-2">
              <Button
                variant={businessType === 'Product' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBusinessType('Product')}
              >
                Product
              </Button>
              <Button
                variant={businessType === 'Service' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBusinessType('Service')}
              >
                Service
              </Button>
            </div>
          </div>
          <div>
            <Input
              placeholder="Average Customer Value (₹)"
              value={customerValue}
              onChange={(e) => setCustomerValue(e.target.value)}
            />
          </div>
        </div>
        <Input
          placeholder="Monthly Sales Target (₹)"
          value={salesTarget}
          onChange={(e) => setSalesTarget(e.target.value)}
        />
        <Button 
          onClick={calculateBudget} 
          disabled={!businessType || !customerValue.trim() || !salesTarget.trim() || isLoading}
          className="w-full"
          variant="default"
        >
          {isLoading ? "Calculating..." : "Calculate Ad Budget"}
        </Button>
        {output && (
          <div className="space-y-4">
            <Textarea
              className="min-h-[150px] bg-muted/50"
              value={output}
              readOnly
              placeholder="Budget recommendation will appear here..."
            />
            {showVybeCTA && (
              <div className="p-4 bg-gradient-to-r from-primary/5 to-primary-dark/5 rounded-lg border border-primary/20">
                <p className="text-center text-sm font-medium text-primary">
                  🚀 <strong>Want to execute this plan?</strong> Contact VYBE, the performance marketing arm of WPIX Media.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdBudgetCalculator;