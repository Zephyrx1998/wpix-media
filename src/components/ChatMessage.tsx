import { motion } from "framer-motion";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
}

// Parse markdown and convert to clean formatted React elements
const parseMarkdown = (text: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  
  // Split by double newlines to get paragraphs
  const paragraphs = text.split(/\n\n+/);
  
  paragraphs.forEach((paragraph, pIndex) => {
    const lines = paragraph.split(/\n/);
    
    lines.forEach((line, lIndex) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) return;
      
      // Check for bullet points (-, *, •)
      const bulletMatch = trimmedLine.match(/^[-*•]\s+(.+)$/);
      if (bulletMatch) {
        elements.push(
          <div key={`${pIndex}-${lIndex}`} className="flex items-start gap-2 ml-2 my-1">
            <span className="text-primary mt-1.5 text-xs">●</span>
            <span>{formatInlineText(bulletMatch[1])}</span>
          </div>
        );
        return;
      }
      
      // Check for numbered lists
      const numberedMatch = trimmedLine.match(/^(\d+)[.)]\s+(.+)$/);
      if (numberedMatch) {
        elements.push(
          <div key={`${pIndex}-${lIndex}`} className="flex items-start gap-2 ml-2 my-1">
            <span className="text-primary font-medium min-w-[1.25rem]">{numberedMatch[1]}.</span>
            <span>{formatInlineText(numberedMatch[2])}</span>
          </div>
        );
        return;
      }
      
      // Regular paragraph text
      elements.push(
        <p key={`${pIndex}-${lIndex}`} className="my-1">
          {formatInlineText(trimmedLine)}
        </p>
      );
    });
    
    // Add spacing between paragraphs
    if (pIndex < paragraphs.length - 1) {
      elements.push(<div key={`spacer-${pIndex}`} className="h-2" />);
    }
  });
  
  return elements;
};

// Format inline text (bold, italic, etc.)
const formatInlineText = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;
  
  // Process bold (**text** or __text__)
  const boldRegex = /\*\*(.+?)\*\*|__(.+?)__/g;
  // Process italic (*text* or _text_)
  const italicRegex = /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g;
  
  // Combined regex to find all markdown patterns
  const combinedRegex = /\*\*(.+?)\*\*|__(.+?)__|(?<!\*)\*([^*]+)\*(?!\*)|(?<!_)_([^_]+)_(?!_)/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // Determine which group matched
    if (match[1] || match[2]) {
      // Bold
      parts.push(
        <strong key={keyIndex++} className="font-semibold">
          {match[1] || match[2]}
        </strong>
      );
    } else if (match[3] || match[4]) {
      // Italic
      parts.push(
        <em key={keyIndex++} className="italic">
          {match[3] || match[4]}
        </em>
      );
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

const ChatMessage = ({ content, role }: ChatMessageProps) => {
  const isUser = role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground shadow-[var(--glass-shadow)]"
            : "bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-[hsl(var(--glass-border))] text-foreground shadow-[var(--glass-inset)]"
        }`}
      >
        <div className="text-sm leading-relaxed">
          {isUser ? content : parseMarkdown(content)}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
