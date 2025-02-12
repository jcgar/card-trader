
import { Card } from "../ui/card";
import { Gift, Star, Trophy, Crown, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const rewards = [
  {
    id: 1,
    title: "Cromo Legendario",
    description: "Un cromo exclusivo para tu colección",
    points: 1000,
    icon: Crown,
    rarity: "Legendario",
    color: "from-yellow-400 to-amber-600",
    progress: 80,
  },
  {
    id: 2,
    title: "Pack Premium",
    description: "5 cromos raros garantizados",
    points: 500,
    icon: Gift,
    rarity: "Épico",
    color: "from-purple-400 to-pink-600",
    progress: 60,
  },
  {
    id: 3,
    title: "Badge Coleccionista",
    description: "Distintivo único para tu perfil",
    points: 250,
    icon: Star,
    rarity: "Raro",
    color: "from-blue-400 to-indigo-600",
    progress: 45,
  },
];

export const GamificationRewards = () => {
  const [openChest, setOpenChest] = useState<number | null>(null);
  const { toast } = useToast();
  const [playingSound, setPlayingSound] = useState(false);

  const playRewardSound = () => {
    if (playingSound) return;
    setPlayingSound(true);
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dem6Cb3UCeH+gopwEIAQzBU8FZwZ/CpcKsgvBC8ULyAvJC8wLz8lhwkZwc3UoJN8jwRwEQrVCvUK/QsNCxkLCLxsoGwgAAAAAAAAAAAAAAA==");
    audio.play().finally(() => setPlayingSound(false));
  };

  const handleOpenChest = (rewardId: number) => {
    setOpenChest(rewardId);
    playRewardSound();
    toast({
      title: "¡Recompensa desbloqueada!",
      description: "Has obtenido un nuevo premio para tu colección.",
    });
    setTimeout(() => setOpenChest(null), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-green-800 flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
            Recompensas
          </h2>
          <p className="text-green-600">Desbloquea premios especiales y mejora tu colección</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {rewards.map((reward) => (
            <Card
              key={reward.id}
              className={`
                overflow-hidden transition-all duration-500
                ${openChest === reward.id ? 'transform scale-105' : ''}
              `}
            >
              <div className="p-6">
                <div className={`
                  w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                  bg-gradient-to-r ${reward.color}
                  ${openChest === reward.id ? 'animate-spin' : 'animate-pulse'}
                `}>
                  <reward.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-center mb-2">{reward.title}</h3>
                <p className="text-gray-600 text-sm text-center mb-4">{reward.description}</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Puntos necesarios:</span>
                    <span className="font-bold text-green-600">{reward.points}</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${reward.color} transition-all duration-1000`}
                      style={{ width: `${reward.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center text-purple-600">
                      <Sparkles className="w-4 h-4 mr-1" />
                      {reward.rarity}
                    </span>
                    <span className="text-gray-600">{reward.progress}% completado</span>
                  </div>

                  <Button
                    className={`
                      w-full bg-gradient-to-r ${reward.color} text-white
                      transform transition-all duration-300
                      hover:scale-105 hover:shadow-lg
                      ${reward.progress < 100 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => handleOpenChest(reward.id)}
                    disabled={reward.progress < 100}
                  >
                    {reward.progress >= 100 ? 'Reclamar Recompensa' : 'Bloqueado'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
