import { ClassifyInterface } from "@/components/classify-interface";
import { Navbar } from "@/components/navbar";

export default function ClassifyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Classify Your Waste</h1>
            <p className="text-muted-foreground">
              Upload an image to identify the waste category
            </p>
          </div>
          <ClassifyInterface />
        </div>
      </main>
    </div>
  );
}
