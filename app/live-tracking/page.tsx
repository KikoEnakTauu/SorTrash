import { LiveTracking } from "@/components/live-tracking";
import { Navbar } from "@/components/navbar";

export default function LiveTrackingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <LiveTracking />
        </div>
      </main>
    </div>
  );
}
