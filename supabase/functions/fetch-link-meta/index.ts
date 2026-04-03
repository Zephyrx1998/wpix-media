import { corsHeaders } from '@supabase/supabase-js/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate it's a LinkedIn URL
    const parsed = new URL(url);
    if (!parsed.hostname.includes('linkedin.com')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Only LinkedIn URLs are supported' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching metadata for:', url);

    // Fetch the page HTML with a browser-like User-Agent
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch URL:', response.status);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to fetch page (${response.status})` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();

    // Extract Open Graph metadata
    const getMetaContent = (property: string): string | null => {
      // Try og: tags
      const ogMatch = html.match(new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'))
        || html.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i'));
      if (ogMatch) return ogMatch[1];

      // Try name= tags
      const nameMatch = html.match(new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'))
        || html.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${property}["']`, 'i'));
      if (nameMatch) return nameMatch[1];

      return null;
    };

    const title = getMetaContent('og:title') 
      || getMetaContent('twitter:title')
      || html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]
      || null;

    const description = getMetaContent('og:description')
      || getMetaContent('twitter:description')
      || getMetaContent('description')
      || null;

    const image = getMetaContent('og:image')
      || getMetaContent('twitter:image')
      || null;

    console.log('Extracted metadata:', { title, description, image: image ? 'found' : 'not found' });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          title: title ? decodeHtmlEntities(title) : null,
          description: description ? decodeHtmlEntities(description) : null,
          image: image || null,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}
