"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion } from "framer-motion"
import { Facebook, Mail, ChromeIcon as Google, ArrowLeft } from "lucide-react"

type AuthFlowProps = {
  onClose: () => void
  isMobile: boolean
}

type AuthStep = "initial" | "email" | "register" | "forgotPassword"

export const AuthFlow: React.FC<AuthFlowProps> = ({ onClose, isMobile }) => {
  const [step, setStep] = useState<AuthStep>("initial")

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  const renderStep = () => {
    switch (step) {
      case "initial":
        return (
          <motion.div key="initial" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
            <div className="space-y-4">
              <Button onClick={() => setStep("email")} className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Continuar con correo
              </Button>
              <Button variant="outline" className="w-full">
                <Facebook className="mr-2 h-4 w-4" /> Continuar con Facebook
              </Button>
              <Button variant="outline" className="w-full">
                <Google className="mr-2 h-4 w-4" /> Continuar con Google
              </Button>
              <p className="text-sm text-center">
                ¿No tienes una cuenta?{" "}
                <Button variant="link" className="p-0" onClick={() => setStep("register")}>
                  Empieza aquí
                </Button>
              </p>
            </div>
          </motion.div>
        )
      case "email":
        return (
          <motion.div key="email" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Button variant="ghost" className="mb-4" onClick={() => setStep("initial")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión con correo</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full">Iniciar sesión</Button>
              <Button variant="link" className="w-full" onClick={() => setStep("forgotPassword")}>
                ¿Olvidaste tu contraseña?
              </Button>
            </form>
          </motion.div>
        )
      case "register":
        return (
          <motion.div key="register" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Button variant="ghost" className="mb-4" onClick={() => setStep("initial")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
            <h2 className="text-2xl font-bold mb-4">Crear una cuenta</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" type="text" placeholder="Tu nombre" />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full">Registrarse</Button>
            </form>
          </motion.div>
        )
      case "forgotPassword":
        return (
          <motion.div key="forgotPassword" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Button variant="ghost" className="mb-4" onClick={() => setStep("email")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
            <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <Button className="w-full">Enviar instrucciones</Button>
            </form>
          </motion.div>
        )
    }
  }

  return (
    <div className={isMobile ? "p-4" : ""}>
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  )
}

