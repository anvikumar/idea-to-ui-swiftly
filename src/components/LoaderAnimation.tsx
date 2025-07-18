import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import agentAvatar from '@/assets/agent-avatar.jpg';

interface LoaderAnimationProps {
  onComplete: () => void;
}

export function LoaderAnimation({ onComplete }: LoaderAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200); // Small delay before transitioning
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Agent Avatar */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            <img
              src={agentAvatar}
              alt="AI Agent"
              className="w-full h-full rounded-full object-cover border-4 border-primary/20"
            />
            
            {/* Animated Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute -top-4 -right-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <div className="absolute -bottom-4 -left-4">
            <Sparkles className="h-4 w-4 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Initializing AI Assistant
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Setting up your personal AI chat companion...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-card rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-gradient-primary transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}