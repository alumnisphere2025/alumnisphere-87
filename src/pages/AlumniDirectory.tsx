
import { Navbar } from "@/components/Navbar";
import { User2 } from "lucide-react";

export default function AlumniDirectory() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Alumni Directory</h1>
        <p className="text-muted-foreground mb-8">Connect with alumni from your university</p>
        
        <div className="flex flex-col items-center justify-center py-12">
          <User2 className="h-16 w-16 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Coming Soon
          </h2>
          <p className="text-muted-foreground text-center max-w-md">
            We're working hard to bring you a comprehensive alumni directory. 
            Check back soon to connect with fellow alumni from your university.
          </p>
        </div>
      </main>
    </div>
  );
}
