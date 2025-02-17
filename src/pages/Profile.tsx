
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Camera,
  Settings,
  Edit,
  MapPin,
  Link,
  Lock,
  Trophy,
  Star,
  Bell,
  Moon,
  Palette,
  LogOut,
  Eye,
  Save,
  Upload
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collector } from "@/app/types";

export default function Profile() {
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Collector['preferences']['theme']>('light');

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // Simulamos la llamada a la API
      return {
        id: "1",
        name: "John Doe",
        username: "johndoe",
        level: 42,
        avatar: "/path/to/avatar.jpg",
        coverImage: "/path/to/cover.jpg",
        bio: "Coleccionista apasionado",
        location: "Madrid, España",
        stats: {
          totalStickers: 1234,
          completedCollections: 5,
          totalCollections: 8,
          trades: 150,
          successRate: 98,
          rank: 12,
          reputation: 4.8
        },
        achievements: [
          {
            id: "1",
            name: "Maestro del Intercambio",
            description: "100 intercambios exitosos",
            icon: "🏆",
            unlockedAt: "2024-01-01",
            rarity: "legendary"
          }
        ],
        preferences: {
          theme: 'light',
          cardStyle: 'classic',
          albumMode: true,
          notificationSettings: {
            email: true,
            push: true,
            inApp: true,
            doNotDisturb: {
              enabled: false,
              startTime: "22:00",
              endTime: "08:00"
            }
          }
        }
      } as Collector;
    }
  });

  if (isLoading || !profile) {
    return <div>Cargando...</div>;
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aquí iría la lógica para subir la imagen
      toast({
        title: "Foto actualizada",
        description: "Tu foto de perfil se ha actualizado correctamente"
      });
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Cambios guardados",
      description: "Los cambios en tu perfil se han guardado correctamente"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      {/* Cabecera del perfil */}
      <div className="relative h-[300px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="relative w-32 h-32">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-full border-4 border-white shadow-lg"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
          <p className="text-muted-foreground">@{profile.username}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="text-yellow-600">
              <Trophy className="w-3 h-3 mr-1" />
              Nivel {profile.level}
            </Badge>
            {profile.verified && (
              <Badge variant="outline" className="text-blue-600">
                Verificado
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {!isEditing ? (
            <>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? "Vista Normal" : "Vista Pública"}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="collections">Colecciones</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Información Personal</h2>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium">Nombre</label>
                      <Input defaultValue={profile.name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Biografía</label>
                      <Input defaultValue={profile.bio} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Ubicación</label>
                      <Input defaultValue={profile.location} />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">{profile.bio}</p>
                    {profile.location && (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </p>
                    )}
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Estadísticas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile.stats.totalStickers}
                  </div>
                  <div className="text-sm text-blue-600">Cromos Totales</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">
                    {profile.stats.completedCollections}
                  </div>
                  <div className="text-sm text-green-600">Colecciones Completas</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile.stats.trades}
                  </div>
                  <div className="text-sm text-purple-600">Intercambios</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-50">
                  <div className="text-2xl font-bold text-yellow-600">
                    {profile.stats.reputation}
                  </div>
                  <div className="text-sm text-yellow-600">Reputación</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="collections">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Mis Colecciones</h2>
              {/* Contenido de colecciones */}
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Logros y Medallas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-lg border bg-gradient-to-br from-yellow-50 to-orange-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-bold">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              achievement.rarity === "legendary" && "text-yellow-600 border-yellow-200",
                              achievement.rarity === "epic" && "text-purple-600 border-purple-200",
                              achievement.rarity === "rare" && "text-blue-600 border-blue-200",
                              achievement.rarity === "common" && "text-gray-600 border-gray-200"
                            )}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Preferencias</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Tema</h3>
                      <p className="text-sm text-muted-foreground">
                        Personaliza la apariencia de la aplicación
                      </p>
                    </div>
                    <select
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value as Collector['preferences']['theme'])}
                      className="rounded-md border p-2"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                      <option value="retro">Retro</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Modo Álbum</h3>
                      <p className="text-sm text-muted-foreground">
                        Visualización tipo álbum de cromos
                      </p>
                    </div>
                    <Switch
                      checked={profile.preferences.albumMode}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificaciones por Email</h3>
                      <p className="text-sm text-muted-foreground">
                        Recibe actualizaciones en tu correo
                      </p>
                    </div>
                    <Switch
                      checked={profile.preferences.notificationSettings.email}
                      onCheckedChange={() => {}}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Modo No Molestar</h3>
                      <p className="text-sm text-muted-foreground">
                        Silencia notificaciones en horarios específicos
                      </p>
                    </div>
                    <Switch
                      checked={profile.preferences.notificationSettings.doNotDisturb.enabled}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Privacidad</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Perfil Público</h3>
                      <p className="text-sm text-muted-foreground">
                        Permite que otros vean tu perfil
                      </p>
                    </div>
                    <Switch checked={true} onCheckedChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mostrar Ubicación</h3>
                      <p className="text-sm text-muted-foreground">
                        Muestra tu ubicación en el perfil
                      </p>
                    </div>
                    <Switch checked={true} onCheckedChange={() => {}} />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
