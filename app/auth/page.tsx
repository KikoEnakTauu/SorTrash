import { AuthForm } from "@/components/auth-form";
import { Navbar } from "@/components/navbar";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 bg-secondary/20">
        <AuthForm />
      </main>
    </div>
  );
}
