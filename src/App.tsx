
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative max-w-md mx-auto h-screen bg-white overflow-hidden">
          {/* Tech-AI decorative elements */}
          <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-white via-app-blue/5 to-app-purple/5 pointer-events-none"></div>
          <div className="fixed -top-16 -right-16 w-32 h-32 bg-app-purple/10 rounded-full blur-2xl"></div>
          <div className="fixed -bottom-16 -left-16 w-32 h-32 bg-app-blue/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 h-full">
            <Index />
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
