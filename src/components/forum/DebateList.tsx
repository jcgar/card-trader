"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Flame, MessageSquare, Eye } from "lucide-react"

export const DebateList = ({ debates, onSelectDebate }) => {
  return (
    <div className="space-y-4">
      {debates.map((debate) => (
        <motion.div key={debate.id} whileHover={{ scale: 1.02, rotateX: 5 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => onSelectDebate(debate)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{debate.title}</h3>
                <Badge variant="secondary">{debate.category}</Badge>
              </div>
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?u=${debate.author}`} />
                <AvatarFallback>{debate.author[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {debate.replies} respuestas
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {debate.views} vistas
              </span>
              <span>Última respuesta: {new Date(debate.last_reply_at).toLocaleDateString()}</span>
            </div>
            {debate.is_hot && (
              <Badge variant="secondary" className="mt-2 bg-red-100 text-red-800">
                <Flame className="w-4 h-4 mr-1" /> Debate caliente
              </Badge>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

