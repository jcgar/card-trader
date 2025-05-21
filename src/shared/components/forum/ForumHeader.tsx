"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SectionHeader } from "../shared/SectionHeader"
import { t } from "@/shared/use/i18n"
import { Category } from "@/shared/app/types"

const categories: Category[] = [
  {
    id: "general",
    name: "General"
  },
  {
    id: "intercambios",
    name: "Intercambios"
  },
  {
    id: "retos",
    name: "Retos y Concursos"
  },
  {
    id: "consejos",
    name: "Consejos y Guías"
  },
  {
    id: "historicas",
    name: "Colecciones Históricas"
  },
  {
    id: "preguntas",
    name: "Preguntas y Respuestas"
  }
]

export const ForumHeader = ({ onCreateDebate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newDebateTitle, setNewDebateTitle] = useState("")
  const [newDebateContent, setNewDebateContent] = useState("")
  const [newDebateCategory, setNewDebateCategory] = useState("")

  const handleCreateDebate = () => {
    onCreateDebate({
      id: Date.now(),
      title: newDebateTitle,
      category: newDebateCategory,
      author: "Current User",
      content: newDebateContent,
      created_at: new Date().toISOString(),
      replies: 0,
      views: 0,
      posts: [
        {
          id: Date.now(),
          content: newDebateContent,
          author: "Current User",
          created_at: new Date().toISOString(),
          votes_up: 0,
          votes_down: 0,
        },
      ],
    })
    setIsDialogOpen(false)
    setNewDebateTitle("")
    setNewDebateContent("")
    setNewDebateCategory("")
  }

  const ForumNewDebateDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Crear Debate
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Debate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={newDebateTitle} onChange={(e) => setNewDebateTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Select value={newDebateCategory} onValueChange={setNewDebateCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="content">Contenido</Label>
            <Textarea id="content" value={newDebateContent} onChange={(e) => setNewDebateContent(e.target.value)} />
          </div>
          <Button onClick={handleCreateDebate}>Crear Debate</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
  return (
    <SectionHeader title={t('Foro de Debate')} placeholder={t("Buscar debates...")}
      categories={categories}>
      <ForumNewDebateDialog />
    </SectionHeader>

  )
}

