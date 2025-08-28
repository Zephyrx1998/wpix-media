import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdCopyGenerator = () => {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [offer, setOffer] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateAdCopy = async () => {
    if (!product.trim() || !audience.trim() || !offer.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const copy1 = `🎯 ${audience}! Ready to transform your experience with ${product}?\n\n${offer}\n\nDon't miss out - this offer won't last forever!\n\n👆 Click to claim yours now`;
      
      const copy2 = `💡 Attention ${audience}!\n\nStruggling without ${product}? Here's your solution:\n\n✅ ${offer}\n✅ Proven results\n✅ Limited time only\n\nJoin thousands who've already transformed their lives. Start today! 🚀`;
      
      setOutput(`AD COPY 1 (FB/IG):\n${copy1}\n\n---\n\nAD COPY 2 (Google Ads):\n${copy2}`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-medium">
      <CardHeader>
        <CardTitle className="text-primary">Ad Copy Generator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Product + Audience + Offer → Get 2 high-converting ad copies
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Product/Service (e.g., Online Course)"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <Input
          placeholder="Target Audience (e.g., Small Business Owners)"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
        <Input
          placeholder="Offer (e.g., 50% off + Free Bonus)"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
        <Button 
          onClick={generateAdCopy} 
          disabled={!product.trim() || !audience.trim() || !offer.trim() || isLoading}
          className="w-full"
          variant="default"
        >
          {isLoading ? "Creating Ad Copy..." : "Generate Ad Copy"}
        </Button>
        {output && (
          <Textarea
            className="min-h-[150px] bg-muted/50"
            value={output}
            readOnly
            placeholder="High-converting ad copies will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AdCopyGenerator;