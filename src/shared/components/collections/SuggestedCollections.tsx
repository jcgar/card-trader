import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, Activity } from "lucide-react"

const suggestions = [
  {
    id: 1,
    name: "Mundial 2022",
    category: "Deportes",
    popularity: 98,
    users: 1234,
    image: "https://picsum.photos/200/300?7",
  },
  {
    id: 2,
    name: "Pokémon TCG",
    category: "Trading Cards",
    popularity: 95,
    users: 987,
    image: "https://picsum.photos/200/300?8",
  },
  // ... más sugerencias
]

export const SuggestedCollections = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suggestions.map((collection) => (
        <Card key={collection.id} className="overflow-hidden group">
          <div className="relative aspect-video">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-4 w-full">
              <h4 className="text-white font-semibold text-lg">{collection.name}</h4>
              <p className="text-white/80 text-sm">{collection.category}</p>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{collection.popularity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span>{collection.users}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-4 w-4 text-green-500" />
                <span>Activa</span>
              </div>
            </div>
            <Button className="w-full">Ver colección</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

