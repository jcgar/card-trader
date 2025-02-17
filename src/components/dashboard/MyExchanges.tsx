
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react";
import { Trade } from "@/app/types";

interface MyExchangesProps {
  exchanges: Trade[];
}

export const MyExchanges = ({ exchanges }: MyExchangesProps) => {
  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">Mis Intercambios</h3>
      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <Link
            key={exchange.id}
            to={`/dashboard/trades/${exchange.id}`}
            className="block transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-4 p-4 rounded-lg">
              <img
                src={exchange.sender.avatar}
                alt={exchange.sender.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{exchange.sender.name}</p>
                <div className="flex gap-2 text-sm">
                  <span className="text-gray-600">
                    Ofrece: {exchange.senderStickers.length} cromos
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    Solicita: {exchange.receiverStickers.length} cromos
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  exchange.status === "completed"
                    ? "text-green-600 border-green-200"
                    : "text-orange-600 border-orange-200"
                )}
              >
                {exchange.status === "completed" ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <Clock className="w-4 h-4 mr-1" />
                )}
                {exchange.status}
              </Badge>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};
