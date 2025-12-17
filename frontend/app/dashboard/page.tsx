import { DashboardContent } from "@/components/dashboard-content";
import { Button } from "@/components/ui/button";
import { Recycle, Camera } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
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
              href="/dashboard"
              className="text-sm font-medium text-primary"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link href="/classify">
                <Camera className="w-4 h-4 mr-2" />
                New Scan
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-secondary/20">
        <DashboardContent />
      </main>
    </div>
  );
}
