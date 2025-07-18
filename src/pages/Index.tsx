import React from 'react';
import { Sparkles } from 'lucide-react';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">AI Chat Assistant</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
