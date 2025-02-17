
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "sonner"

import Index from './pages/Index';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import CollectionDetail from './pages/CollectionDetail';
import NewCollection from './pages/NewCollection';
import PublicCollections from './pages/PublicCollections';
import Search from './pages/Search';
import CollectorProfile from './pages/CollectorProfile';
import CollectorProProfile from './pages/CollectorProProfile';
import Blog from './pages/Blog';
import Help from './pages/Help';
import CollectionPublicView from "./pages/CollectionPublicView";
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import { routes } from './use/routes';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Index />} />
          <Route path={routes.community} element={<Community />} />
          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path={routes.myCollectionDetail} element={<CollectionDetail />} />
          <Route path={routes.newCollection} element={<NewCollection />} />
          <Route path={routes.collections} element={<PublicCollections />} />
          <Route path={routes.collection} element={<CollectionPublicView />} />
          <Route path={routes.search} element={<Search />} />
          <Route path={routes.collector} element={<CollectorProfile />} />
          <Route path={routes.collectorPro} element={<CollectorProProfile />} />
          <Route path={routes.blog} element={<Blog />} />
          <Route path={routes.help} element={<Help />} />
          <Route path={routes.admin} element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
