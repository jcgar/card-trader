"use client"

import { motion } from "framer-motion"
import { Heart, Search, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Collection } from "@/shared/app/types"
import { Card } from "@/components/ui/card"
import { Image } from "@/components/ui/image"

const statusColors = {
  iniciado: "bg-yellow-500 text-black",
  aceptado: "bg-blue-500 text-white",
  recibido: "bg-purple-500 text-white",
  completado: "bg-green-500 text-white",
}

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card key={collection.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="group relative aspect-[4/3]">
          <Image
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="text-white absolute top-0 left-0 h-16 p-4 w-full bg-black/20">
            {collection.name}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t group-hover:scale-105 from-green-900/80 via-green-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4">
              <Button className="w-full bg-white/90 hover:bg-white text-green-800">
                <Search className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </div>
        </div>
        <div className="flex p-4 gap-4">
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {collection.likes}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {collection.activeUsers}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {collection.popularity}
          </span>
        </div>
      </Card>
    </motion.div>
  )
}

