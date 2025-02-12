
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const exchanges = [
  {
    id: 1,
    user: "Maria López",
    avatar: "https://i.pravatar.cc/150?u=maria",
    offering: "Mundial 2022 #123",
    requesting: "Premier League #45",
    status: "pending",
  },
  {
    id: 2,
    user: "Juan Pérez",
    avatar: "https://i.pravatar.cc/150?u=juan",
    offering: "Pokemon #89",
    requesting: "Yu-Gi-Oh #12",
    status: "completed",
  },
];

export const MyExchanges = () => {
  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">Mis Intercambios</h3>
      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <div
            key={exchange.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <img
              src={exchange.avatar}
              alt={exchange.user}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium">{exchange.user}</p>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-600">Ofrece: {exchange.offering}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  Solicita: {exchange.requesting}
                </span>
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                exchange.status === "completed"
                  ? "text-green-600 border-green-200"
                  : "text-orange-600 border-orange-200"
              }
            >
              {exchange.status === "completed" ? (
                <CheckCircle className="w-4 h-4 mr-1" />
              ) : (
                <Clock className="w-4 h-4 mr-1" />
              )}
              {exchange.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
