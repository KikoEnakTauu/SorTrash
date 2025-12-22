import { LiveTracking } from "@/components/live-tracking";
import { Button } from "@/components/ui/button";
import { Recycle, Home, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function LiveTrackingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SorTrash</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/classify"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Classify
            </Link>
            <Link
              href="/live-tracking"
              className="text-sm font-medium text-primary"
            >
              Live Tracking
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <LiveTracking />
        </div>
      </main>
    </div>
  );
}
