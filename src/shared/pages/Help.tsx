"use client"

import { useState } from "react"
import { NavigationBar } from "@/shared/components/NavigationBar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, BookOpen, MessageCircle, Settings } from "lucide-react"

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    {
      title: "Primeros pasos",
      icon: BookOpen,
      questions: [
        {
          q: "¿Cómo empiezo mi primera colección?",
          a: "Para empezar una colección, dirígete a la sección 'Colecciones' y elige una que te interese. Podrás ver todos los cromos disponibles y empezar a marcar los que ya tienes.",
        },
        {
          q: "¿Cómo funciona el sistema de intercambios?",
          a: "El sistema de intercambios te permite conectar con otros coleccionistas. Puedes proponer intercambios, negociar y acordar los términos. Todo se realiza de forma segura a través de la plataforma.",
        },
      ],
    },
    {
      title: "Gestión de colecciones",
      icon: Settings,
      questions: [
        {
          q: "¿Cómo organizo mis colecciones?",
          a: "Desde tu dashboard personal puedes organizar tus colecciones por categorías, estado de completitud o fecha de inicio. También puedes marcar tus favoritas.",
        },
        {
          q: "¿Puedo compartir mi colección?",
          a: "Sí, cada colección tiene una URL única que puedes compartir. Además, puedes configurar la privacidad de cada colección individualmente.",
        },
      ],
    },
    {
      title: "Comunidad",
      icon: MessageCircle,
      questions: [
        {
          q: "¿Cómo encuentro otros coleccionistas?",
          a: "Utiliza la sección 'Comunidad' para encontrar coleccionistas con intereses similares. Puedes filtrar por ubicación, colecciones o nivel de actividad.",
        },
        {
          q: "¿Cómo funciona el sistema de reputación?",
          a: "La reputación se basa en tus intercambios exitosos, la actividad en la plataforma y las valoraciones de otros usuarios.",
        },
      ],
    },
  ]

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <NavigationBar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Centro de Ayuda</h1>
          <p className="text-green-600 max-w-2xl mx-auto mb-8">
            Encuentra respuestas rápidas a tus preguntas y aprende a sacar el máximo partido a la plataforma
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Buscar en la ayuda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
                <p className="text-gray-600">{category.questions.length} preguntas frecuentes</p>
              </Card>
            )
          })}
        </div>

        <Card className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="divide-y">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {category.questions.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`${categoryIndex}-${itemIndex}`}>
                    <AccordionTrigger className="px-6 hover:no-underline hover:bg-green-50">
                      <div className="flex items-start gap-3 text-left">
                        <HelpCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>{item.q}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-8">
                        <p className="text-gray-600">{item.a}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            ))}
          </Accordion>
        </Card>
      </main>
    </div>
  )
}

export default Help

