import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Repeat, Star } from 'lucide-react'

interface Partner {
  id: string
  avatar: string
  username: string
  exchanges: number
  successRate: number
  rating: number
}

const partners: Partner[] = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "CromoMaster",
    exchanges: 87,
    successRate: 98,
    rating: 4.9,
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "ColeccionistaTop",
    exchanges: 65,
    successRate: 95,
    rating: 4.7,
  },
]

export function TopExchangePartners() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mejores Compañeros de Intercambio</h2>
      {partners.map((partner) => (
        <Card key={partner.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={partner.avatar} alt={partner.username} />
                <AvatarFallback>{partner.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{partner.username}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center">
                <Repeat className="w-4 h-4 mr-1" />
                {partner.exchanges} intercambios
              </span>
              <span>{partner.successRate}% de éxito</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{partner.rating.toFixed(1)} valoración</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Ver Perfil</Button>
            <Button>Proponer Intercambio</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
