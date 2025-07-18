import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/FileUpload';
import { ProcessingState } from '@/components/ProcessingState';
import { UIDesignCard } from '@/components/UIDesignCard';
import { CodeViewer } from '@/components/CodeViewer';
import heroImage from '@/assets/hero-image.jpg';
import design1 from '@/assets/design-1.jpg';
import design2 from '@/assets/design-2.jpg';
import design3 from '@/assets/design-3.jpg';
import design4 from '@/assets/design-4.jpg';

type AppState = 'upload' | 'processing' | 'designs' | 'code';
type ProcessingStage = 'parsing' | 'analyzing' | 'generating' | 'complete';

interface UIDesign {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  style: string;
  complexity: 'Simple' | 'Medium' | 'Complex';
}

const mockDesigns: UIDesign[] = [
  {
    id: '1',
    title: 'Modern Dashboard',
    description: 'Clean analytics dashboard with charts, metrics, and responsive design',
    thumbnail: design1,
    style: 'Modern',
    complexity: 'Medium',
  },
  {
    id: '2',
    title: 'Landing Page',
    description: 'Minimalist landing page with hero section and clean typography',
    thumbnail: design2,
    style: 'Minimalist',
    complexity: 'Simple',
  },
  {
    id: '3',
    title: 'E-commerce Interface',
    description: 'Product catalog with advanced filtering and shopping cart functionality',
    thumbnail: design3,
    style: 'E-commerce',
    complexity: 'Complex',
  },
  {
    id: '4',
    title: 'Social Media App',
    description: 'Feed-based social interface with stories and messaging features',
    thumbnail: design4,
    style: 'Social',
    complexity: 'Complex',
  },
];

const mockCodeFiles = [
  {
    name: 'App.tsx',
    language: 'typescript',
    content: `import React from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}`,
  },
  {
    name: 'Dashboard.tsx',
    language: 'typescript',
    content: `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`,
  },
  {
    name: 'globals.css',
    language: 'css',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 220 65% 4%;
    --foreground: 220 20% 95%;
    --primary: 260 100% 65%;
    --primary-foreground: 220 20% 95%;
  }

  body {
    @apply bg-background text-foreground;
  }
}`,
  },
];

const Index = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('parsing');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<UIDesign | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAppState('processing');
    simulateProcessing();
  };

  const simulateProcessing = () => {
    const stages: ProcessingStage[] = ['parsing', 'analyzing', 'generating', 'complete'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < stages.length) {
        setProcessingStage(stages[currentIndex]);
      } else {
        clearInterval(interval);
        setTimeout(() => setAppState('designs'), 1000);
      }
    }, 2000);
  };

  const handlePreview = (design: UIDesign) => {
    setSelectedDesign(design);
    // In a real app, this would open a modal or navigate to a preview page
  };

  const handleGenerateCode = (design: UIDesign) => {
    setSelectedDesign(design);
    setAppState('code');
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a zip file
    console.log('Downloading code bundle...');
  };

  const resetApp = () => {
    setAppState('upload');
    setSelectedFile(null);
    setSelectedDesign(null);
    setProcessingStage('parsing');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">AI UI Generator</h1>
            </div>
            
            {appState !== 'upload' && (
              <Button variant="outline" onClick={resetApp}>
                Start Over
              </Button>
            )}
          </div>
        </div>
      </header>

      <main>
        {appState === 'upload' && (
          <>
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
              <div 
                className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              
              <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                      Turn Your{' '}
                      <span className="bg-gradient-primary bg-clip-text text-transparent">
                        PDF Ideas
                      </span>{' '}
                      Into Beautiful UIs
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Upload your product specification PDF and get multiple stunning UI designs 
                      with production-ready code in minutes.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="hero" size="xl" className="group">
                      Get Started Free
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button variant="outline" size="xl">
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-card/20">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow-primary">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Lightning Fast</h3>
                    <p className="text-muted-foreground">
                      Get 4-5 unique design variations in under 2 minutes from your PDF upload.
                    </p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto shadow-glow-accent">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">AI-Powered</h3>
                    <p className="text-muted-foreground">
                      Advanced AI analyzes your requirements and generates contextual UI designs.
                    </p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Production Ready</h3>
                    <p className="text-muted-foreground">
                      Export clean React + Tailwind CSS code that's ready for production use.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Upload Section */}
            <section className="py-20">
              <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    onClear={() => setSelectedFile(null)}
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {appState === 'processing' && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mx-auto">
                <ProcessingState stage={processingStage} />
              </div>
            </div>
          </section>
        )}

        {appState === 'designs' && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Your AI-Generated UI Designs
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Here are 4 unique design variations based on your PDF. Click to preview or generate code.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {mockDesigns.map((design) => (
                  <UIDesignCard
                    key={design.id}
                    design={design}
                    onPreview={handlePreview}
                    onGenerateCode={handleGenerateCode}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {appState === 'code' && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {selectedDesign?.title} - Generated Code
                  </h2>
                  <p className="text-muted-foreground">
                    Your selected design has been converted to production-ready React + Tailwind CSS code.
                  </p>
                </div>
                
                <CodeViewer
                  files={mockCodeFiles}
                  onDownload={handleDownload}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Built with AI • Powered by React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
