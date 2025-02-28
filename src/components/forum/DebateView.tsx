"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ThumbsUp, ThumbsDown, Award } from "lucide-react"

export const DebateView = ({ debate, onBack, onVote, onMarkBestAnswer, currentUser }) => {
  const [newReply, setNewReply] = useState("")

  const handleSubmitReply = () => {
    // In a real app, we would make an API call to save the new reply
    console.log("New reply:", newReply)
    setNewReply("")
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la lista
      </Button>
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{debate.title}</h2>
        <Badge variant="secondary" className="mb-4">
          {debate.category}
        </Badge>
        <div className="space-y-4">
          {debate.posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-4 ${post.is_best_answer ? "border-2 border-yellow-400" : ""}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  {post.is_best_answer && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Award className="w-4 h-4 mr-1" /> Mejor respuesta
                    </Badge>
                  )}
                </div>
                <p className="mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onVote(debate.id, post.id, "up")}>
                      <ThumbsUp className="w-4 h-4 mr-1" /> {post.votes_up}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onVote(debate.id, post.id, "down")}>
                      <ThumbsDown className="w-4 h-4 mr-1" /> {post.votes_down}
                    </Button>
                  </div>
                  {currentUser.id === debate.author_id &&
                    !debate.posts.some((p) => p.is_best_answer) &&
                    index !== 0 && (
                      <Button variant="outline" size="sm" onClick={() => onMarkBestAnswer(debate.id, post.id)}>
                        Marcar como mejor respuesta
                      </Button>
                    )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Responder</h3>
        <Textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="mb-4"
        />
        <Button onClick={handleSubmitReply}>Enviar respuesta</Button>
      </Card>
    </div>
  )
}

