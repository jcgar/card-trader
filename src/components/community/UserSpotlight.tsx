import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Crown, MessageSquare, Star, Trophy, UserPlus, Heart, Shield, Sparkles, Target, Award } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { generateCollectorPath } from "@/use/routes";

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
      followers: 1234,
      reputation: 98,
    },
    achievements: ["Master Trader", "Elite Collector", "Community Leader"],
    specialties: ["Vintage Cards", "Limited Editions"],
    badges: ["🏆", "⭐", "🎯"],
    icon: Crown,
    color: "text-yellow-500",
  },
  {
    id: 2,
    name: "Ana García",
    type: "Nuevo Miembro Destacado",
    avatar: "https://i.pravatar.cc/150?u=ana",
    stats: {
      trades: 12,
      collections: 3,
      rating: 4.7,
      followers: 245,
      reputation: 85,
    },
    achievements: ["Quick Starter", "Rising Star"],
    specialties: ["Digital Art", "Photography"],
    badges: ["🌟", "📈"],
    icon: UserPlus,
    color: "text-blue-500",
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
      followers: 867,
      reputation: 92,
    },
    achievements: ["Trading Pro", "Collection Master", "Trendsetter"],
    specialties: ["Sports Memorabilia", "Trading Cards"],
    badges: ["💫", "🎮", "🌠"],
    icon: Trophy,
    color: "text-green-500",
  },
];

export const UserSpotlight = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section>
      {spotlightUsers.map((user) => (
        <Link to={generateCollectorPath(user.id)} key={user.id}>
          <Card
            key={user.id}
            className={`group perspective hover:z-10 transition-transform duration-300 ${
              hoveredId === user.id ? 'scale-105' : ''
            }`}
            onMouseEnter={() => setHoveredId(user.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-180">
              <div className="p-6 text-center backface-hidden bg-white rounded-lg">
                <user.icon className={`w-10 h-10 mx-auto mb-4 ${user.color} animate-bounce`} />
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-full border-4 border-green-200 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
                    {user.stats.rating}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                <p className={`${user.color} text-sm mb-4`}>{user.type}</p>
                <div className="flex justify-center gap-2 mb-4">
                  {user.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="text-2xl animate-bounce"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {user.achievements.map((achievement, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full group-hover:scale-105 transition-transform"
                    >
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 p-6 bg-white rounded-lg backface-hidden rotate-y-180">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      Estadísticas
                    </h4>
                    <div className="space-y-3 text-sm">
                      <p className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          Intercambios:
                        </span>
                        <span className="font-medium">{user.stats.trades}</span>
                      </p>
                      <p className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          Colecciones:
                        </span>
                        <span className="font-medium">{user.stats.collections}</span>
                      </p>
                      <p className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4 text-blue-500" />
                          Seguidores:
                        </span>
                        <span className="font-medium">{user.stats.followers}</span>
                      </p>
                      <p className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-red-500" />
                          Reputación:
                        </span>
                        <span className="font-medium">{user.stats.reputation}%</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-green-500" />
                        Especialidades
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {user.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700 group">
                      <MessageSquare className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Contactar
                    </Button>
                    <Button variant="outline" className="w-full border-green-200 group">
                      <Heart className="w-4 h-4 mr-2 group-hover:scale-125 transition-transform text-red-500" />
                      Seguir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </section>
  );
};
