import React, { useState } from 'react';
import { Copy, Download, FileText, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CodeFile {
  name: string;
  content: string;
  language: string;
}

interface CodeViewerProps {
  files: CodeFile[];
  onDownload: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files, onDownload }) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleCopy = async (content: string, fileName: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Generated Code
            </h3>
            <p className="text-muted-foreground">
              Your UI design has been converted to production-ready code
            </p>
          </div>
          <Button variant="gradient" onClick={onDownload}>
            <Download className="h-4 w-4" />
            Download All
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue={files[0]?.name} className="w-full">
          <TabsList className="grid w-full grid-cols-auto bg-secondary/50">
            {files.map((file) => (
              <TabsTrigger
                key={file.name}
                value={file.name}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {files.map((file) => (
            <TabsContent key={file.name} value={file.name} className="mt-4">
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(file.content, file.name)}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    {copiedFile === file.name ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <pre className="bg-secondary/50 rounded-lg p-4 overflow-x-auto text-sm border border-border">
                  <code className="text-foreground">
                    {file.content}
                  </code>
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
};