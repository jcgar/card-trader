import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from 'lucide-react'

interface Event {
  id: string
  image: string
  title: string
  description: string
  startDate: string
  endDate: string
  isNew: boolean
  isExclusive: boolean
}

const events: Event[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=100&width=200",
    title: "Maratón de Intercambios",
    description: "Participa en el mayor evento de intercambios del año",
    startDate: "2023-08-01",
    endDate: "2023-08-07",
    isNew: true,
    isExclusive: false,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=100&width=200",
    title: "Lanzamiento Colección Limitada",
    description: "Sé el primero en conseguir la nueva colección de edición limitada",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    isNew: false,
    isExclusive: true,
  },
]

export function FeaturedEvents() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Eventos Destacados</h2>
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-32 object-cover rounded-t-lg" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{event.title}</CardTitle>
              <div>
                {event.isNew && <Badge className="mr-2">Nuevo</Badge>}
                {event.isExclusive && <Badge variant="secondary">Exclusivo</Badge>}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {event.startDate} - {event.endDate}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Ver Evento</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
