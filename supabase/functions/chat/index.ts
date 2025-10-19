import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI assistant for WPIX Media, a Full Spectrum Creative-Tech Agency. 

About WPIX Media:
- Full-service creative and technology agency
- Offers services across 4 main verticals: 7DC (Design), WCF (Web & Content), VYBE (Marketing), and AVER (Audio-Visual)
- Main contact: bd@wpixmedia.com
- Phone: +91 82496 95463 (Primary), +91 94545 60032
- Based in India, globally inspired

Services:
1. 7DC (7 Dimension Creatives):
   - Brand Identity Creation
   - Packaging & Print Design
   - UI/UX Design
   - Motion Graphics & Animation
   - Infographics & Visual Communication

2. WCF (Web & Content Factory):
   - Website Development (Custom, E-commerce, CMS)
   - Content Writing & Copywriting
   - Video Production & Editing
   - Photography

3. VYBE (Digital Marketing):
   - Social Media Management
   - Performance Marketing
   - Influencer Partnerships
   - Campaign Web Support

4. AVER (Audio-Visual Excellence & Recording):
   - Commercial Video Production
   - Corporate Films
   - Music Video Production
   - Live Event Coverage
   - Audio Production & Mixing
   - Voice-Over & Dubbing

Answer questions about services, pricing estimates, portfolio, and help guide users to the right solutions. Keep responses concise and professional.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
