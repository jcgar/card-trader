import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const statusColors = {
  iniciado: "bg-yellow-500 text-black",
  aceptado: "bg-blue-500 text-white",
  recibido: "bg-purple-500 text-white",
  completado: "bg-green-500 text-white",
}

export default function CollectionCard({ collection }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card
        key={collection.id}
        className="group overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <div className="relative aspect-[4/3]">
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4">
              <Button className="w-full bg-white/90 hover:bg-white text-green-800">
                <Search className="w-4 h-4 mr-2" />
                View Album
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">{collection.title}</h3>
            <span className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1" />
              {collection.rarity}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Progress: {collection.progress}
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

