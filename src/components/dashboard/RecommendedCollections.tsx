import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tag } from 'lucide-react'

interface Collection {
  id: string
  image: string
  title: string
  category: string
  progress: number
  total: number
}

const collections: Collection[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=100&width=200",
    title: "Maravillas del Mundo",
    category: "Geografía",
    progress: 15,
    total: 50,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=100&width=200",
    title: "Leyendas del Fútbol",
    category: "Deportes",
    progress: 0,
    total: 30,
  },
]

export function RecommendedCollections() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Colecciones Recomendadas</h2>
      {collections.map((collection) => (
        <Card key={collection.id}>
          <CardHeader>
            <img src={collection.image || "/placeholder.svg"} alt={collection.title} className="w-full h-32 object-cover rounded-t-lg" />
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2">{collection.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Tag className="w-4 h-4 mr-2" />
              <span>{collection.category}</span>
            </div>
            {collection.progress > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progreso</span>
                  <span>{collection.progress}/{collection.total}</span>
                </div>
                <Progress value={(collection.progress / collection.total) * 100} />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Ver Colección</Button>
            <Button>Añadir a Mis Colecciones</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
