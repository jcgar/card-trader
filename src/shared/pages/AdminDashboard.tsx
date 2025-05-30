import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users } from "@/shared/components/admin/Users"
import { Collections } from "@/shared/components/admin/Collections"
import { Stats } from "@/shared/components/admin/Stats"
import { Settings } from "@/shared/components/admin/Settings"
import { NavigationBar } from "@/shared/components/NavigationBar"

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
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
            <Users />
          </TabsContent>

          <TabsContent value="collections">
            <Collections />
          </TabsContent>

          <TabsContent value="stats">
            <Stats />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminDashboard

