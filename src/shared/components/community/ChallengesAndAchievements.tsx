"use client"

import { Card } from "../../../components/ui/card"
import { Trophy, Star, Crown, Award, Sparkles } from "lucide-react"
import { Progress } from "../../../components/ui/progress"
import { useState } from "react"
import { showToast } from "@/shared/use/ui"

const challenges = [
  {
    id: 1,
    title: "Coleccionista Experto",
    description: "Completa 5 colecciones en un mes",
    progress: 80,
    reward: "Medalla de Oro",
    icon: Trophy,
    deadline: "5 días restantes",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: 2,
    title: "Intercambiador Elite",
    description: "Realiza 20 intercambios exitosos",
    progress: 65,
    reward: "Badge Exclusivo",
    icon: Star,
    deadline: "2 semanas restantes",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Pionero",
    description: "Sé uno de los primeros en completar la nueva colección",
    progress: 45,
    reward: "Cromo Legendario",
    icon: Crown,
    deadline: "3 días restantes",
    color: "from-purple-500 to-pink-600",
  },
]

const achievements = [
  {
    id: 1,
    title: "Master Trader",
    description: "100 intercambios exitosos",
    icon: Award,
    date: "Conseguido hace 2 días",
  },
  {
    id: 2,
    title: "Colección Perfecta",
    description: "Primera colección 100% completada",
    icon: Star,
    date: "Conseguido hace 1 semana",
  },
]

export const ChallengesAndAchievements = () => {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null)
  const [playingSound, setPlayingSound] = useState(false)

  const playAchievementSound = () => {
    if (playingSound) return
    setPlayingSound(true)
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dem6Cb3UCeH+gopwEIAQzBU8FZwZ/CpcKsgvBC8ULyAvJC8wLz8lhwkZwc3UoJN8jwRwEQrVCvUK/QsNCxkLCLxsoGwgAAAAAAAAAAAAAAA==",
    )
    audio.play().finally(() => setPlayingSound(false))
  }

  const handleChallengeClick = (challengeId: number) => {
    setActiveChallenge(challengeId)
    playAchievementSound()
    showToast({
      title: "¡Reto seleccionado!",
      description: "Continúa trabajando en este desafío para obtener recompensas.",
    })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-green-800 flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
            Retos y Logros
          </h2>
          <p className="text-green-600">Completa desafíos y desbloquea recompensas únicas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`
                transform transition-all duration-500 cursor-pointer
                hover:scale-105 hover:shadow-xl
                ${activeChallenge === challenge.id ? "ring-2 ring-green-400 ring-offset-4" : ""}
              `}
              onClick={() => handleChallengeClick(challenge.id)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`
                    p-3 rounded-full bg-gradient-to-r ${challenge.color}
                    transform transition-transform duration-300 hover:scale-110
                  `}
                  >
                    <challenge.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progreso</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2 animate-pulse" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-green-600">{challenge.deadline}</span>
                        <div className="flex items-center gap-1 text-yellow-600 text-sm">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                          <span>Recompensa: {challenge.reward}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-center">Logros Recientes</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-2 bg-yellow-100 rounded-full">
                  <achievement.icon className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

