"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

export function LiveTracking() {
  return (
    <div className="space-y-6">
      <Card className="p-8 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Live AI Tracking</h2>
          <p className="text-muted-foreground">Under Development</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Video className="w-12 h-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground max-w-md">
            This feature is currently under development. We'll add real-time
            waste detection and live camera tracking soon.
          </p>
          <Button disabled size="lg">
            Coming Soon
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-2">Status</h3>
        <p className="text-sm text-muted-foreground">
          We're working on adding live camera support and model integration.
          Check back later.
        </p>
      </Card>
    </div>
  );
}
