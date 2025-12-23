import { DashboardContent } from "@/components/dashboard-content";
import { Navbar } from "@/components/navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-secondary/20">
        <DashboardContent />
      </main>
    </div>
  );
}
