import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

const statusColors = {
  iniciado: "bg-yellow-500 text-black",
  aceptado: "bg-blue-500 text-white",
  recibido: "bg-purple-500 text-white",
  completado: "bg-green-500 text-white",
}

export default function ExchangeCard({ exchange }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="bg-background text-text hover:bg-accent hover:text-text transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Intercambio con {exchange.user.name}
          </CardTitle>
          <Avatar className="h-8 w-8">
            <AvatarImage src={exchange.user.avatar} alt={exchange.user.name} />
            <AvatarFallback>{exchange.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <Badge className={`${statusColors[exchange.status]}`}>{exchange.status}</Badge>
            <span className="text-xs text-secondary">
              {formatDistanceToNow(new Date(exchange.date), { addSuffix: true, locale: es })}
            </span>
          </div>
          <p className="text-sm mb-2 line-clamp-1">{exchange.lastMessage}</p>
          <div className="space-y-1">
            {exchange.collections.map((collection, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={collection.avatar} alt={collection.name} />
                  <AvatarFallback>{collection.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs">
                  {collection.name}: {collection.cardsCount} cromos
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-secondary">
            Último acceso: {formatDistanceToNow(new Date(exchange.user.lastAccess), { addSuffix: true, locale: es })}
          </div>
          <div className="mt-2 flex justify-between text-sm text-text">
            <span>Ofreces: {exchange.totalCards.offered}</span>
            <span>Recibes: {exchange.totalCards.requested}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

