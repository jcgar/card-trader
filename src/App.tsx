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
import Search from "./pages/Search";
import { routes } from "./use/routes";
import CollectorProfile from "./pages/CollectorProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Index />} />
          <Route path={routes.community} element={<Community />} />
          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path={routes.myCollections} element={<Collections />} />
          <Route path="/dashboard/colecciones/:id" element={<CollectionDetail />} />
          <Route path="/dashboard/colecciones2/:id" element={<CollectionDetail2 />} />
          <Route path={routes.newCollection} element={<NewCollection />} />
          <Route path={routes.collections} element={<PublicCollections />} />
          <Route path={routes.search} element={<Search />} />
          <Route path={routes.collector} element={<CollectorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
