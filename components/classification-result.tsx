"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RefreshCw, Info } from "lucide-react";

interface ClassificationResultProps {
  result: {
    primaryCategory: string;
    confidence: number;
    allResults: Array<{
      category: string;
      confidence: number;
      color: string;
    }>;
    disposalTip: string;
  };
  onReset: () => void;
}

export function ClassificationResult({
  result,
  onReset,
}: ClassificationResultProps) {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Plastic: "♻️",
      Organic: "🌿",
      Paper: "📄",
      Metal: "🔩",
    };
    return icons[category] || "🗑️";
  };

  return (
    <Card className="p-8">
      <div className="space-y-6">
        {/* Primary Result */}
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Classification Complete</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-3xl">
              {getCategoryIcon(result.primaryCategory)}
            </span>
            <span className="text-xl font-semibold">
              {result.primaryCategory}
            </span>
          </div>
          <p className="text-muted-foreground mt-2">
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>

        {/* All Results */}
        <div>
          <h3 className="font-semibold mb-3">All Classifications</h3>
          <div className="space-y-2">
            {result.allResults.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {getCategoryIcon(item.category)}
                  </span>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color.replace("text-", "bg-")}`}
                      style={{ width: `${item.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {(item.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disposal Tip */}
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Disposal Tip</h4>
              <p className="text-sm text-muted-foreground">
                {result.disposalTip}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <Button className="w-full" onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Classify Another Item
        </Button>
      </div>
    </Card>
  );
}
