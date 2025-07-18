import React from 'react';
import { Loader2, FileText, Lightbulb, Code, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

interface ProcessingStateProps {
  stage: 'parsing' | 'analyzing' | 'generating' | 'complete';
}

const stages = [
  {
    id: 'parsing',
    title: 'Parsing PDF',
    description: 'Extracting text and understanding your product idea',
    icon: FileText,
  },
  {
    id: 'analyzing',
    title: 'Analyzing Requirements',
    description: 'Identifying features and user flows',
    icon: Lightbulb,
  },
  {
    id: 'generating',
    title: 'Generating UI Designs',
    description: 'Creating multiple design variations',
    icon: Sparkles,
  },
  {
    id: 'complete',
    title: 'Ready!',
    description: 'Your designs are ready to view',
    icon: Code,
  },
];

export const ProcessingState: React.FC<ProcessingStateProps> = ({ stage }) => {
  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="text-center mb-8">
        <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary mb-4">
          <Loader2 className="h-10 w-10 text-white animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          AI is working its magic
        </h2>
        <p className="text-muted-foreground">
          This might take a moment while we analyze your PDF and generate designs
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stageItem, index) => {
          const Icon = stageItem.icon;
          const isActive = index === currentStageIndex;
          const isComplete = index < currentStageIndex;
          
          return (
            <div
              key={stageItem.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/10 border border-primary/20' 
                  : isComplete 
                    ? 'bg-green-500/10 border border-green-500/20' 
                    : 'bg-secondary/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isActive 
                  ? 'bg-primary/20 text-primary' 
                  : isComplete 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <h3 className={`font-medium ${
                  isActive || isComplete ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {stageItem.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stageItem.description}
                </p>
              </div>
              
              {isActive && (
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              )}
              
              {isComplete && (
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};