"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";

export function DashboardContent() {
  // Mock data - replace with actual data from backend
  const stats = {
    totalScans: 127,
    thisWeek: 23,
    mostCommon: "Plastic",
  };

  const recentClassifications = [
    {
      id: 1,
      category: "Plastic",
      confidence: 0.92,
      date: "2024-01-15",
      icon: "♻️",
    },
    {
      id: 2,
      category: "Organic",
      confidence: 0.87,
      date: "2024-01-15",
      icon: "🌿",
    },
    {
      id: 3,
      category: "Paper",
      confidence: 0.95,
      date: "2024-01-14",
      icon: "📄",
    },
    {
      id: 4,
      category: "Metal",
      confidence: 0.78,
      date: "2024-01-14",
      icon: "🔩",
    },
    {
      id: 5,
      category: "Plastic",
      confidence: 0.89,
      date: "2024-01-13",
      icon: "♻️",
    },
  ];

  const categoryDistribution = [
    { category: "Plastic", count: 45, color: "bg-chart-1" },
    { category: "Organic", count: 38, color: "bg-chart-2" },
    { category: "Paper", count: 28, color: "bg-chart-3" },
    { category: "Metal", count: 16, color: "bg-chart-4" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your waste classification history and environmental impact
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Scans</p>
              <p className="text-3xl font-bold">{stats.totalScans}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">This Week</p>
              <p className="text-3xl font-bold">{stats.thisWeek}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Most Common</p>
              <p className="text-3xl font-bold">{stats.mostCommon}</p>
            </div>
            <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-chart-2" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Category Distribution</h2>
          <div className="space-y-4">
            {categoryDistribution.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} items
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{
                      width: `${(item.count / stats.totalScans) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Classifications */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Classifications</h2>
          <div className="space-y-3">
            {recentClassifications.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">
                  {(item.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            View All History
          </Button>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card className="p-6 mt-6 bg-primary text-primary-foreground">
        <h2 className="text-xl font-semibold mb-2">
          Your Environmental Impact
        </h2>
        <p className="text-primary-foreground/90 mb-4">
          By correctly sorting {stats.totalScans} items, you've helped reduce
          contamination and improve recycling efficiency.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary-foreground/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">89%</p>
            <p className="text-sm text-primary-foreground/80">Accuracy Rate</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">12kg</p>
            <p className="text-sm text-primary-foreground/80">CO₂ Saved</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-primary-foreground/80">Trees Equiv.</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">23L</p>
            <p className="text-sm text-primary-foreground/80">Water Saved</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
