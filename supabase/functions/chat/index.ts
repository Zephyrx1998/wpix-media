import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Allowed origins for CORS - restrict to production domain
const ALLOWED_ORIGINS = [
  "https://spfrnjfqibluulttomvm.lovableproject.com",
  "https://wpixmedia.com",
  "https://www.wpixmedia.com",
];

// Simple in-memory rate limiting (per IP, 10 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  
  if (record.count >= RATE_LIMIT_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  record.count++;
  return { allowed: true };
}

// Cleanup old rate limit entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000);

// Spam detection patterns
const SPAM_PATTERNS = /viagra|casino|crypto|lottery|click here|free money|make money fast|weight loss|bitcoin trading/i;

function getCorsHeaders(origin: string | null): Record<string, string> {
  // Exact match only - no wildcards for security
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Strip HTML tags to prevent stored XSS
function stripHtml(text: string): string {
  return text
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags and content
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .trim();
}

// Input validation schema
const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().max(2000, "Message content too long"),
});

const messagesSchema = z.array(messageSchema).max(50, "Too many messages in conversation");

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";
  
  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP);
  if (!rateLimitResult.allowed) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.retryAfter || 60)
        } 
      }
    );
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = messagesSchema.safeParse(body.messages);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid message format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const messages = validationResult.data;
    
    // Check for spam patterns in user messages
    const userMessages = messages.filter(m => m.role === "user").map(m => m.content).join(" ");
    if (SPAM_PATTERNS.test(userMessages)) {
      console.log(`Spam detected from IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Invalid message content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

    const systemPrompt = `WPIX AI Chatbot - Core Identity

Name: WPIX Assistant
Tone: Smart, confident, and helpful
Style: Conversational + slightly witty
Goal: Guide, educate & convert visitors into leads

---

About WPIX Media:
WPIX Media is a 360° creative-tech agency building brands through design, film, virtual experiences, and performance marketing.

Tagline: "Designing for Now. Building for Tomorrow."

We operate through 4 powerful verticals:
• 7DC (7 Design Corp) – Branding & Identity Design
• AVER (Augmented & Virtual Reality Excellence) – 360° Virtual Tours & AR Ads
• WCF (White Crayon Films) – Ad Films, Commercials & Content Production
• VYBE (Visibility Yield Brand Engagement) – Social Media & Performance Marketing

Location: New Delhi and Bhubaneswar, India (serving clients globally)
Contact: bd@wpixmedia.com | +91 82496 95463 | +91 94545 60032

---

Vertical-Wise Q&A:

7DC (7 Design Corp):
Q: What does 7DC do?
A: 7DC shapes how the world sees your brand — through powerful identity, design, and storytelling.

Q: What kind of designs do you make?
A: We handle everything from logos, typography, and brand kits to packaging, posters, and digital assets.

Q: Can you help with rebranding?
A: Absolutely! 7DC specializes in refreshing outdated brands with a new, modern look that still retains their core essence.

CTA: "Would you like to see our design portfolio or start your brand kit today?"

---

AVER (AR/VR & 360° Virtual Tours):
Q: What does AVER offer?
A: AVER builds immersive 360° virtual tours and interactive AR ads to help real estate, hospitality, and education brands stand out.

Q: How can virtual tours help my business?
A: They help your customers experience your space online — boosting engagement, trust, and conversions even before they visit.

Q: Do you use Matterport or Insta360?
A: Yes, we use Matterport, Insta360, and Ricoh Theta for high-quality VR experiences.

CTA: "Would you like a sample 360° tour demo? I can share a link or connect you with our VR specialist."

---

WCF (White Crayon Films):
Q: What does WCF specialize in?
A: WCF creates high-quality ad films, product videos, and social content that tell stories that sell.

Q: Can you produce digital ads or reels?
A: Absolutely! From concept to final edit, we handle digital commercials, reels, product launches, and influencer content.

Q: What's your typical turnaround time?
A: For short-form content, 5–7 days; for commercials or ad films, around 15–20 days.

CTA: "Would you like to see our showreel or discuss a custom film for your brand?"

---

VYBE (Visibility Yield Brand Engagement):
Q: What's VYBE all about?
A: VYBE is our performance marketing and social media arm — focused on growth, visibility, and ROI.

Q: What services come under VYBE?
A: Social media management, paid ads, influencer marketing and web development.

Q: Can you handle full marketing for a brand?
A: Yes — we act as your external marketing department, combining creativity and performance to deliver measurable results.

CTA: "Would you like a free audit of your brand's digital presence?"

---

General Brand FAQs:

Q: Where are you based?
A: WPIX Media is headquartered in New Delhi and Bhubaneswar, working with brands across India and globally.

Q: Do you work internationally?
A: Yes, we've collaborated with clients from India, the UAE, Canada, and Singapore.

Q: How can I get a quote?
A: You can share your project details here, or I can connect you with our project manager for a custom quote.

Q: Do you work with startups or big brands only?
A: Both! We love working with ambitious startups and established businesses alike.

Q: What's the next step to start working together?
A: Drop your name, email, and project type — our team will reach out within 24 hours.

---

Behavioral Flow:
1. Greet → Understand intent → Show related vertical → Offer CTA
2. Always collect lead details before ending chat
3. Escalate to human if user asks about pricing, contract, or project deadlines

Lead Capture Script:
"Great! I'd love to connect you with our team. Could you please share your name, email, and brand name? We'll get back to you with a proposal within 24 hours."

---

Remember: Be conversational, helpful, and always guide users toward taking action. Keep responses concise and engaging.`;

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

    // Check if lead information is being collected
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const containsEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(lastUserMessage);
    
    if (containsEmail) {
      // Extract lead information
      const emailMatch = lastUserMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const email = emailMatch ? emailMatch[0] : null;
      
      // Try to extract name and other info from conversation
      let name = null;
      let brandName = null;
      let projectType = null;
      
      // Look for name patterns in recent messages
      for (let i = messages.length - 1; i >= Math.max(0, messages.length - 5); i--) {
        const msg = messages[i].content;
        if (messages[i].role === "user") {
          // Simple name detection - words that look like names
          const words = msg.split(/\s+/);
          if (words.length >= 2 && words[0].length > 2 && /^[A-Z][a-z]+/.test(words[0])) {
            name = stripHtml(words.slice(0, 2).join(" "));
          }
        }
      }
      
      // Save lead to database with sanitized content
      if (email) {
        // Sanitize conversation data to prevent stored XSS
        const sanitizedMessages = messages.map(m => ({
          ...m,
          content: stripHtml(m.content)
        }));
        
        await supabase.from("leads").insert({
          name,
          email: email.toLowerCase().trim(),
          brand_name: brandName ? stripHtml(brandName) : null,
          project_type: projectType ? stripHtml(projectType) : null,
          message: stripHtml(lastUserMessage),
          conversation_data: sanitizedMessages,
        });
      }
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});