import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Deportes",
    collections: [
      { id: 1, name: "Liga 2023-24", image: "https://picsum.photos/200/300?1" },
      { id: 2, name: "Mundial 2022", image: "https://picsum.photos/200/300?2" },
      { id: 3, name: "NBA 2024", image: "https://picsum.photos/200/300?3" },
    ],
  },
  {
    id: 2,
    name: "Anime",
    collections: [
      { id: 4, name: "Dragon Ball", image: "https://picsum.photos/200/300?4" },
      { id: 5, name: "Naruto", image: "https://picsum.photos/200/300?5" },
      { id: 6, name: "One Piece", image: "https://picsum.photos/200/300?6" },
    ],
  },
  // ... más categorías
]

export const CollectionsByCategory = () => {
  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <Card key={category.id} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{category.name}</h3>
            <Button variant="ghost" className="text-sm">
              Ver más <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4">
              {category.collections.map((collection) => (
                <Card key={collection.id} className="w-[250px] overflow-hidden group cursor-pointer">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-4">
                      <h4 className="text-white font-semibold">{collection.name}</h4>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Card>
      ))}
    </div>
  )
}

