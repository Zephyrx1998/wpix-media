import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useChatSounds } from "@/hooks/useChatSounds";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeCollapsing, setWelcomeCollapsing] = useState(false);
  const [iconPulse, setIconPulse] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your WPIX Media assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);
  const { toast } = useToast();
  const { playWelcomeSound, playSendSound, playReceiveSound, playOpenSound, playCloseSound } = useChatSounds();

  // Welcome animation - triggers once per session
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("wpix-chatbot-welcome");
    
    if (!hasSeenWelcome && !isOpen) {
      const showTimer = setTimeout(() => {
        setShowWelcome(true);
        playWelcomeSound();
      }, 1500); // Delay before showing welcome

      return () => clearTimeout(showTimer);
    }
  }, [playWelcomeSound]);

  // Handle welcome collapse animation
  useEffect(() => {
    if (showWelcome) {
      const collapseTimer = setTimeout(() => {
        setWelcomeCollapsing(true);
        
        // After collapse animation, hide welcome and pulse icon
        setTimeout(() => {
          setShowWelcome(false);
          setWelcomeCollapsing(false);
          setIconPulse(true);
          sessionStorage.setItem("wpix-chatbot-welcome", "true");
          
          // Stop pulse after one animation
          setTimeout(() => setIconPulse(false), 600);
        }, 400);
      }, 2500); // Show welcome for 2.5 seconds

      return () => clearTimeout(collapseTimer);
    }
  }, [showWelcome]);

  // Hide welcome when chat opens
  useEffect(() => {
    if (isOpen && showWelcome) {
      setShowWelcome(false);
      setWelcomeCollapsing(false);
      sessionStorage.setItem("wpix-chatbot-welcome", "true");
    }
  }, [isOpen, showWelcome]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Play receive sound when new assistant message arrives
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant" && messages.length > 1) {
        playReceiveSound();
      }
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, playReceiveSound]);

  const handleOpenChat = () => {
    setIsOpen(true);
    playOpenSound();
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    playCloseSound();
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    playSendSound();

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { 
          messages: [...messages, { role: "user", content: userMessage }]
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Welcome Pop-up */}
      <AnimatePresence>
        {showWelcome && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={welcomeCollapsing ? {
              opacity: 0,
              scale: 0.3,
              x: 60,
              y: 20,
            } : {
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            exit={{ opacity: 0, scale: 0.3, x: 60, y: 20 }}
            transition={{ 
              duration: welcomeCollapsing ? 0.4 : 0.3, 
              ease: "easeOut" 
            }}
            className="fixed bottom-[5.5rem] right-6 z-50"
          >
            <div className="bg-[hsl(var(--glass-bg))] backdrop-blur-xl border border-[hsl(var(--glass-border))] rounded-2xl px-4 py-3 shadow-[var(--glass-shadow-hover)] max-w-[200px]">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ 
                    rotate: [0, 14, -8, 14, -4, 10, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut",
                    repeat: 1,
                    repeatDelay: 0.5
                  }}
                  className="text-xl inline-block origin-[70%_70%]"
                >
                  👋
                </motion.span>
                <span className="text-sm font-medium text-foreground">
                  Hey! WPIX Assistant is here
                </span>
              </div>
              {/* Tail pointing to chatbot icon */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[hsl(var(--glass-bg))] border-r border-b border-[hsl(var(--glass-border))] transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: iconPulse ? [1, 1.15, 1] : 1, 
              opacity: 1 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: iconPulse ? 0.6 : 0.3,
              ease: "easeOut"
            }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleOpenChat}
              size="lg"
              className="rounded-full w-16 h-16 bg-primary hover:bg-primary-dark shadow-[var(--glass-shadow-hover)] hover:shadow-[0_20px_60px_-12px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-110"
            >
              <MessageCircle className="h-7 w-7" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "60px" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] rounded-2xl z-50 flex flex-col overflow-hidden bg-[hsl(var(--glass-bg))] backdrop-blur-xl border border-[hsl(var(--glass-border))] shadow-[var(--glass-shadow-hover),var(--glass-inset)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--glass-border))] bg-primary/90 backdrop-blur-md text-primary-foreground">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <h3 className="font-semibold">WPIX Assistant</h3>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseChat}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={index}
                        content={message.content}
                        role={message.role}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-[hsl(var(--glass-border))] rounded-2xl px-4 py-2 shadow-[var(--glass-inset)]">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-[hsl(var(--glass-border))]">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      size="icon"
                      className="bg-primary hover:bg-primary-dark"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;