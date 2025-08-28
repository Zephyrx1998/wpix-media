import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SocialMediaGenerator = () => {
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateCaptions = async () => {
    if (!input.trim() || !mood.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const captions = [
        `🚀 ${input} that changes the game! ${mood === 'professional' ? 'Ready to elevate your experience.' : mood === 'funny' ? 'Because ordinary is boring! 😄' : 'Transform your world today! ✨'}`,
        `${mood === 'inspiring' ? '💪 Every step forward counts!' : mood === 'funny' ? '🎉 Plot twist:' : '✅ Professional excellence meets'} ${input} - ${mood === 'professional' ? 'delivering results that matter.' : mood === 'funny' ? 'Your life just got 10x more awesome!' : 'where dreams become reality!'}`,
        `${mood === 'funny' ? '🤔 Life hack:' : mood === 'inspiring' ? '🌟 Believe in the power of' : '📈 Maximize your potential with'} ${input}${mood === 'funny' ? ' = instant happiness boost!' : mood === 'inspiring' ? '. Your journey starts now!' : '. Excellence delivered.'}`
      ];
      setOutput(captions.join('\n\n'));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-medium">
      <CardHeader>
        <CardTitle className="text-primary">Social Media Caption Generator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your product/service & mood → Get 3 engaging captions
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Product/Service (e.g., Digital Marketing Course)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Input
          placeholder="Mood (funny, inspiring, professional)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <Button 
          onClick={generateCaptions} 
          disabled={!input.trim() || !mood.trim() || isLoading}
          className="w-full"
          variant="default"
        >
          {isLoading ? "Generating..." : "Generate Captions"}
        </Button>
        {output && (
          <Textarea
            className="min-h-[120px] bg-muted/50"
            value={output}
            readOnly
            placeholder="Generated captions will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SocialMediaGenerator;