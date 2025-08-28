import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HashtagFinder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateHashtags = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const broad = ['#marketing', '#digitalmarketing', '#socialmedia', '#branding', '#business'];
      const niche = [`#${input.toLowerCase().replace(/\s+/g, '')}`, `#${input.toLowerCase().replace(/\s+/g, '')}tips`, '#growthhacking', '#contentcreator', '#entrepreneurlife'];
      const trending = ['#viral', '#trending2024', '#brandstrategy', '#marketingtips', '#socialmediamarketing'];
      
      const result = `🔥 BROAD HASHTAGS:\n${broad.join(' ')}\n\n💎 NICHE HASHTAGS:\n${niche.join(' ')}\n\n📈 TRENDING:\n${trending.join(' ')}\n\nTotal: ${broad.length + niche.length + trending.length} hashtags`;
      setOutput(result);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-medium">
      <CardHeader>
        <CardTitle className="text-primary">Hashtag Finder</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your industry/topic → Get trending hashtags (broad + niche)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Industry/Topic (e.g., Fitness, Tech Startup)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button 
          onClick={generateHashtags} 
          disabled={!input.trim() || isLoading}
          className="w-full"
          variant="default"
        >
          {isLoading ? "Finding Hashtags..." : "Find Hashtags"}
        </Button>
        {output && (
          <Textarea
            className="min-h-[120px] bg-muted/50"
            value={output}
            readOnly
            placeholder="Trending hashtags will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
};

export default HashtagFinder;