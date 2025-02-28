import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Calendar } from 'lucide-react'

interface SpecialEvent {
  id: string
  image: string
  name: string
  prizeType: "exclusive" | "limited" | "physical" | "digital"
  status: "open" | "in-progress" | "finished"
}

const events: SpecialEvent[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=100&width=200",
    name: "Aniversario 5 Años",
    prizeType: "exclusive",
    status: "open",
  },
  {
    id: "2",
    image: "/placeholder.svg?height=100&width=200",
    name: "Colaboración Especial",
    prizeType: "limited",
    status: "in-progress",
  },
]

export function SpecialEvents() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Eventos Especiales</h2>
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-32 object-cover rounded-t-lg" />
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2">{event.name}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4" />
              <span className="text-sm">
                Premio {event.prizeType === "exclusive" && "Exclusivo"}
                {event.prizeType === "limited" && "Limitado"}
                {event.prizeType === "physical" && "Físico"}
                {event.prizeType === "digital" && "Digital"}
              </span>
            </div>
            <Badge
              variant={event.status === "open" ? "default" : event.status === "in-progress" ? "secondary" : "outline"}
            >
              {event.status === "open" && "Abierto"}
              {event.status === "in-progress" && "En Curso"}
              {event.status === "finished" && "Finalizado"}
            </Badge>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Ver Detalles</Button>
            {event.status !== "finished" && <Button>Participar</Button>}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
