import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile, onClear }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files[0] && files[0].type === 'application/pdf') {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  if (selectedFile) {
    return (
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClear}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`relative p-12 border-2 border-dashed transition-all duration-300 cursor-pointer hover:border-primary/50 bg-card/30 backdrop-blur-sm ${
        isDragOver ? 'border-primary bg-primary/5 scale-105' : 'border-border'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary">
          <Upload className="h-8 w-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Upload your product idea PDF
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Drag and drop your PDF file here, or click to browse. We'll analyze it and generate beautiful UI designs.
          </p>
        </div>
        
        <Button variant="hero" size="lg" className="mt-6">
          Choose PDF File
        </Button>
      </div>
    </Card>
  );
};