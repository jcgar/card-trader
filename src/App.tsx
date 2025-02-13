
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import CollectionDetail2 from "./pages/CollectionDetail2";
import NewCollection from "./pages/NewCollection";
import PublicCollections from "./pages/PublicCollections";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/comunidad" element={<Community />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/colecciones" element={<Collections />} />
          <Route path="/dashboard/colecciones/:id" element={<CollectionDetail />} />
          <Route path="/dashboard/colecciones2/:id" element={<CollectionDetail2 />} />
          <Route path="/dashboard/colecciones/nueva" element={<NewCollection />} />
          <Route path="/colecciones" element={<PublicCollections />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
