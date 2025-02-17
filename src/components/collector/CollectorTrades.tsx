
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import type { Collector } from "@/app/types";

interface CollectorTradesProps {
  profile: CollectorProfile;
}

export const CollectorTrades = ({ profile }: CollectorTradesProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <RefreshCw className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-semibold">Intercambios</h2>
        <Badge variant="secondary" className="ml-auto">
          {profile.stats.trades} completados
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {profile.stats.trades}
            </div>
            <div className="text-sm text-green-600">Total intercambios</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {profile.stats.successRate}%
            </div>
            <div className="text-sm text-blue-600">Tasa de éxito</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center md:col-span-1 col-span-2">
            <div className="text-2xl font-bold text-purple-600">
              {Math.floor(profile.stats.trades * 0.8)}
            </div>
            <div className="text-sm text-purple-600">Valoraciones positivas</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
