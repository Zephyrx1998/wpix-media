import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContentCalendarGenerator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateContentIdeas = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const ideas = [
        `📱 Monday: "Behind the Scenes" - Show your ${input} process (Reel)`,
        `💡 Tuesday: "Tips Tuesday" - 5 Quick ${input} hacks (Carousel)`,
        `🎯 Wednesday: "Client Spotlight" - Success story with ${input} (Post + Story)`,
        `🔥 Thursday: "Trending Topic" - ${input} industry news reaction (Reel)`,
        `📊 Friday: "Facts Friday" - Statistics about ${input} (Infographic Carousel)`,
        `🚀 Weekend: "Motivation Monday Prep" - Inspirational ${input} content (Story Series)`
      ];
      
      setOutput(ideas.join('\n\n'));
      setIsLoading(false);
    }, 1800);
  };

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-medium">
      <CardHeader>
        <CardTitle className="text-primary">Content Calendar Generator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your niche → Get 5 weekly post ideas with formats
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Niche/Brand Theme (e.g., Digital Marketing)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button 
          onClick={generateContentIdeas} 
          disabled={!input.trim() || isLoading}
          className="w-full"
          variant="default"
        >
          {isLoading ? "Planning Content..." : "Generate Ideas"}
        </Button>
        {output && (
          <Textarea
            className="min-h-[150px] bg-muted/50"
            value={output}
            readOnly
            placeholder="Weekly content ideas will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ContentCalendarGenerator;