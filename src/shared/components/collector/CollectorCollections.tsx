import { Card } from "@/components/ui/card"
import type { Collection } from "@/shared/app/types"
import { Progress } from "@/components/ui/progress"
import { Users, Heart } from "lucide-react"

interface CollectorCollectionsProps {
  collections: Collection[]
}

export const CollectorCollections = ({ collections }: CollectorCollectionsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Colecciones</h2>
      <div className="grid gap-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="p-4">
            <div className="flex gap-4">
              <img src={collection.image} alt={collection.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{collection.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {collection.activeUsers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {collection.likes}
                  </span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">70% completada</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}

