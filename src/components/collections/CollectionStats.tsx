
import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, History, Users } from "lucide-react";

export const CollectionStats = () => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Estadísticas</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm">Ranking</span>
          </div>
          <span className="font-medium">#123 de 1,234</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">Progreso semanal</span>
          </div>
          <span className="font-medium">+15 cromos</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <History className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm">Tiempo coleccionando</span>
          </div>
          <span className="font-medium">2 meses</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-purple-500 mr-2" />
            <span className="text-sm">Intercambios realizados</span>
          </div>
          <span className="font-medium">23</span>
        </div>
      </div>
    </Card>
  );
};
