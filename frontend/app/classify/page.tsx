import { ClassifyInterface } from "@/components/classify-interface";
import { Button } from "@/components/ui/button";
import { Recycle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ClassifyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SorTrash</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth">Sign in</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Classify Your Waste</h1>
            <p className="text-muted-foreground">
              Upload or capture an image to identify the waste category
            </p>
          </div>
          <ClassifyInterface />
        </div>
      </main>
    </div>
  );
}
