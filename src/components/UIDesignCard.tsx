import React from 'react';
import { Eye, Code, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface UIDesign {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  style: string;
  complexity: 'Simple' | 'Medium' | 'Complex';
}

interface UIDesignCardProps {
  design: UIDesign;
  onPreview: (design: UIDesign) => void;
  onGenerateCode: (design: UIDesign) => void;
}

export const UIDesignCard: React.FC<UIDesignCardProps> = ({ 
  design, 
  onPreview, 
  onGenerateCode 
}) => {
  const complexityColors = {
    Simple: 'bg-green-500/20 text-green-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Complex: 'bg-red-500/20 text-red-400',
  };

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
        <img 
          src={design.thumbnail} 
          alt={design.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${complexityColors[design.complexity]}`}>
            {design.complexity}
          </span>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="hero"
            size="sm"
            onClick={() => onPreview(design)}
            className="backdrop-blur-sm"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {design.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {design.description}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-primary">Style:</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {design.style}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(design)}
            className="flex-1"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={() => onGenerateCode(design)}
            className="flex-1"
          >
            <Code className="h-4 w-4" />
            Generate Code
          </Button>
        </div>
      </div>
    </Card>
  );
};