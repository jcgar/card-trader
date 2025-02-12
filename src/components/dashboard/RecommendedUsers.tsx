
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { MessageSquare, UserPlus } from "lucide-react";

const users = [
  {
    id: 1,
    name: "David Chen",
    avatar: "https://i.pravatar.cc/150?u=david",
    commonInterests: "Pokémon, Sports",
    mutualConnections: 3,
  },
  {
    id: 2,
    name: "Sofia Garcia",
    avatar: "https://i.pravatar.cc/150?u=sofia",
    commonInterests: "Movies, Anime",
    mutualConnections: 5,
  },
];

export const RecommendedUsers = () => {
  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">Usuarios Recomendados</h3>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.commonInterests}</p>
              <p className="text-xs text-gray-500">
                {user.mutualConnections} conexiones en común
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
