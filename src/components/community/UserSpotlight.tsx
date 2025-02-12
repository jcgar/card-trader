
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Crown, MessageSquare, Star, Trophy, UserPlus } from "lucide-react";

const spotlightUsers = [
  {
    id: 1,
    name: "Carlos Ruiz",
    type: "Coleccionista del Mes",
    avatar: "https://i.pravatar.cc/150?u=carlos",
    stats: {
      trades: 145,
      collections: 23,
      rating: 4.9,
    },
    achievements: ["Master Trader", "Elite Collector"],
    icon: Crown,
  },
  {
    id: 2,
    name: "Ana García",
    type: "Nuevo Miembro",
    avatar: "https://i.pravatar.cc/150?u=ana",
    stats: {
      trades: 12,
      collections: 3,
      rating: 4.7,
    },
    achievements: ["Quick Starter"],
    icon: UserPlus,
  },
  {
    id: 3,
    name: "Luis Torres",
    type: "Intercambiador Activo",
    avatar: "https://i.pravatar.cc/150?u=luis",
    stats: {
      trades: 89,
      collections: 15,
      rating: 4.8,
    },
    achievements: ["Trading Pro"],
    icon: Trophy,
  },
];

export const UserSpotlight = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold mb-12 text-center text-green-800">
          Usuarios Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {spotlightUsers.map((user) => (
            <Card
              key={user.id}
              className="group perspective hover:z-10"
            >
              <div className="relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="p-6 text-center backface-hidden">
                  <user.icon className="w-10 h-10 mx-auto mb-4 text-green-600" />
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="rounded-full border-4 border-green-200"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {user.stats.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                  <p className="text-green-600 text-sm mb-4">{user.type}</p>
                  <div className="flex justify-center gap-2">
                    {user.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 p-6 bg-white rounded-lg backface-hidden rotate-y-180">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold mb-4">Estadísticas</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                          <span>Intercambios:</span>
                          <span className="font-medium">{user.stats.trades}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Colecciones:</span>
                          <span className="font-medium">{user.stats.collections}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Valoración:</span>
                          <span className="font-medium">{user.stats.rating}/5.0</span>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contactar
                      </Button>
                      <Button variant="outline" className="w-full border-green-200">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Seguir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
