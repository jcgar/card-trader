"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion } from "framer-motion"
import { Facebook, Mail, ChromeIcon as Google, ArrowLeft } from "lucide-react"
import { t } from "@/shared/use/i18n"
import { ScrollArea } from "@/components/ui/scroll-area"
import { routes } from "@/shared/use/routes"
import { useNavigate } from "@/shared/use/navigate"
import type { User } from "@/shared/app/types"

type AuthFlowProps = {
  onClose: () => void
  isMobile: boolean
  onLogin: (user: User) => void
}

type AuthStep = "initial" | "email" | "register" | "forgotPassword"

export const AuthFlow: React.FC<AuthFlowProps> = ({ onClose, isMobile, onLogin }) => {
  const navigate = useNavigate()

  const [step, setStep] = useState<AuthStep>("initial")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  const validatePassword = (value: string) => {
    setPassword(value)
    if (value.length < 4) {
      setPasswordError(t("auth.passwordTooShort"))
    } else {
      setPasswordError("")
    }
  }

  const handleLogin = async (provider: "email" | "facebook" | "google") => {
    // Simular una llamada a la API para obtener los datos del usuario
    const userData: User = {
      id: "1",
      email: email || "user@example.com",
      name: "John Doe",
      isAdmin: true,
      collector: {
        id: "1",
        name: "John Doe",
        username: "johndoe",
        avatar: "/placeholder-user.jpg",
        coverImage: "/placeholder.svg",
        level: 5,
        joinedDate: "2023-01-01",
        verified: true,
        bio: "Passionate collector",
        location: "New York, USA",
        socialLinks: {},
        stats: {
          totalCards: 100,
          completedCollections: 5,
          totalCollections: 10,
          exchanges: 20,
          successRate: 95,
          rank: 100,
          likes: 50,
          followers: 100,
          following: 50,
          completionRate: 80,
          reputation: 4.5,
        },
        achievements: [],
        badges: [],
        rank: {
          global: 100,
          category: "Beginner",
          categoryRank: 50,
        },
        title: "Novice Collector",
        motto: "Collecting memories, one card at a time",
        recentActivity: [],
        wishlist: [],
      },
    }

    await onLogin(userData)
    navigate(routes.dashboard)
    onClose()
  }

  const renderStep = () => {
    switch (step) {
      case "initial":
        return (
          <motion.div key="initial" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 className="text-2xl font-bold mb-4">{t("auth.login")}</h2>
            <div className="space-y-4">
              <Button onClick={() => setStep("email")} className="w-full">
                <Mail className="mr-2 h-4 w-4" /> {t("auth.continueWithEmail")}
              </Button>
              <Button onClick={() => handleLogin("facebook")} variant="outline" className="w-full">
                <Facebook className="mr-2 h-4 w-4" /> {t("auth.continueWithFacebook")}
              </Button>
              <Button onClick={() => handleLogin("google")} variant="outline" className="w-full">
                <Google className="mr-2 h-4 w-4" /> {t("auth.continueWithGoogle")}
              </Button>
              <p className="text-sm text-center">
                {t("auth.noAccount")}{" "}
                <Button variant="link" className="p-0" onClick={() => setStep("register")}>
                  {t("auth.startHere")}
                </Button>
              </p>
            </div>
          </motion.div>
        )
      case "email":
        return (
          <motion.div key="email" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Button variant="ghost" className="mb-4" onClick={() => setStep("initial")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("auth.back")}
            </Button>
            <h2 className="text-2xl font-bold mb-4">{t("auth.login")}</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin("email")
              }}
            >
              <div>
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={password.length < 4}>
                {t("auth.login")}
              </Button>
              <Button variant="link" className="w-full" onClick={() => setStep("forgotPassword")}>
                {t("auth.forgotPassword")}
              </Button>
            </form>
          </motion.div>
        )
      case "register":
        return (
          <motion.div key="register" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Button variant="ghost" className="mb-4" onClick={() => setStep("initial")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("auth.back")}
            </Button>
            <h2 className="text-2xl font-bold mb-4">{t("auth.createAccount")}</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin("email")
              }}
            >
              <div>
                <Label htmlFor="name">{t("auth.name")}</Label>
                <Input id="name" type="text" placeholder={t("auth.namePlaceholder")} />
              </div>
              <div>
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={password.length < 4}>
                {t("auth.register")}
              </Button>
            </form>
          </motion.div>
        )
      case "forgotPassword":
        return (
          <motion.div key="forgotPassword" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Button variant="ghost" className="mb-4" onClick={() => setStep("email")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("auth.back")}
            </Button>
            <h2 className="text-2xl font-bold mb-4">{t("auth.recoverPassword")}</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="w-full">{t("auth.sendInstructions")}</Button>
            </form>
          </motion.div>
        )
    }
  }

  return (
    <ScrollArea className={isMobile ? "h-[80vh]" : ""}>
      <div className={isMobile ? "p-4" : ""}>
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
    </ScrollArea>
  )
}

