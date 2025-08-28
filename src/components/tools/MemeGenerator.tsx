import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MemeGenerator = () => {
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateMemeIdeas = async () => {
    if (!industry.trim() || !audience.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const memes = [
        `🔥 MEME CONCEPT 1: "Drake Pointing Meme"\n- First panel: "Expensive ${industry} tools"\n- Second panel: "Smart ${industry} hacks for ${audience}"\n\nCaption: "Why pay more when you can be smarter? 🧠"`,
        
        `😂 MEME CONCEPT 2: "This is Fine Dog"\n- Scene: ${audience} trying to handle ${industry} without proper strategy\n- Text overlay: "Everything is under control"\n\nCaption: "Us before we discovered proper ${industry} planning 😅 Tag someone who needs this!"`
      ];
      
      setOutput(memes.join('\n\n---\n\n'));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-medium">
      <CardHeader>
        <CardTitle className="text-primary">Meme / Viral Idea Generator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Industry + Audience → Get 2 fun meme concepts
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Industry (e.g., Digital Marketing)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <Input
          placeholder="Audience Type (e.g., Small Business Owners)"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
        <Button 
          onClick={generateMemeIdeas} 
          disabled={!industry.trim() || !audience.trim() || isLoading}
          className="w-full"
          variant="default"
        >
          {isLoading ? "Creating Memes..." : "Generate Meme Ideas"}
        </Button>
        {output && (
          <Textarea
            className="min-h-[120px] bg-muted/50"
            value={output}
            readOnly
            placeholder="Viral meme concepts will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MemeGenerator;