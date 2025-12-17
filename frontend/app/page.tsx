import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Recycle, Camera, BarChart3, Leaf } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
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
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/classify">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              AI-Powered Waste Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Sort your trash{" "}
              <span className="text-primary">intelligently</span> with AI
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Upload an image of your waste and let our YOLO-powered computer
              vision technology identify and classify it instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/classify">
                  <Camera className="w-5 h-5 mr-2" />
                  Start Classifying
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto bg-transparent"
              >
                <Link href="/dashboard">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                How it works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
                  <p className="text-muted-foreground">
                    Take a photo or upload an image of your waste item
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Recycle className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    AI Classification
                  </h3>
                  <p className="text-muted-foreground">
                    Our YOLO model analyzes and classifies your waste instantly
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-chart-2" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track History</h3>
                  <p className="text-muted-foreground">
                    View your classification history and environmental impact
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Waste Categories We Identify
              </h2>
              <p className="text-muted-foreground mb-12">
                Our AI model can classify your waste into these categories for
                proper disposal
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Organic", color: "bg-chart-2", icon: "🌿" },
                  { name: "Plastic", color: "bg-chart-1", icon: "♻️" },
                  { name: "Paper", color: "bg-chart-3", icon: "📄" },
                  { name: "Metal", color: "bg-chart-4", icon: "🔩" },
                ].map((category) => (
                  <Card key={category.name} className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${category.color}/10 rounded-full flex items-center justify-center mx-auto mb-3`}
                    >
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to start sorting smarter?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of users making better waste management decisions
              with AI
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/classify">Start Classifying Now</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SorTrash. Powered by YOLO Computer Vision.</p>
        </div>
      </footer>
    </div>
  );
}
