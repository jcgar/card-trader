
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Users,
  Heart,
  Medal,
  Flame
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/use/api";
import { routes } from "@/use/routes";

interface UserSpotlight {
  id: string;
  name: string;
  avatar: string;
  level: number;
  achievements: number;
  followers: number;
  collections: number;
  speciality: string;
  rarity: string;
}

export const UserSpotlight = () => {
  const [spotlightUsers, setSpotlightUsers] = useState<UserSpotlight[]>([]);

  useEffect(() => {
    const fetchSpotlightUsers = async () => {
      const data = await api("topCollectors");
      setSpotlightUsers(data.slice(0, 3));
    };
    fetchSpotlightUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Coleccionistas Destacados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spotlightUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Link to={routes.collector.replace(':id', user.id)}>
              <Card className="p-6 hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                    Nivel {user.level}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500 group-hover:scale-105 transition-transform"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-center mb-4">{user.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Logros
                    </span>
                    <span className="font-bold">{user.achievements}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      Seguidores
                    </span>
                    <span className="font-bold">{user.followers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-purple-500" />
                      Colecciones
                    </span>
                    <span className="font-bold">{user.collections}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Medal className="w-4 h-4 text-green-500" />
                      {user.speciality}
                    </span>
                    <span className="flex items-center gap-1 text-orange-500">
                      <Flame className="w-4 h-4" />
                      {user.rarity}
                    </span>
                  </div>
                </div>
                
                <Button className="w-full mt-6">Ver Perfil</Button>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
