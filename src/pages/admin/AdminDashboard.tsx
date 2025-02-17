
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminUsers } from './AdminUsers';
import { AdminCollections } from './AdminCollections';
import { AdminStats } from './AdminStats';
import { AdminSettings } from './AdminSettings';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="collections">Colecciones</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <AdminUsers />
        </TabsContent>
        
        <TabsContent value="collections">
          <AdminCollections />
        </TabsContent>
        
        <TabsContent value="stats">
          <AdminStats />
        </TabsContent>
        
        <TabsContent value="settings">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
