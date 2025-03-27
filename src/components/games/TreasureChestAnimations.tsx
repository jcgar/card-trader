
import React, { ReactNode } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export const popIn: Variants = {
  hidden: { 
    scale: 0.8,
    opacity: 0
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  },
  exit: { 
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

interface AnimatedContainerProps {
  children: ReactNode
  isVisible: boolean
  [key: string]: any
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children, isVisible, ...props }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeIn}
        {...props}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

export const PrizeReveal: React.FC<AnimatedContainerProps> = ({ children, isVisible, ...props }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={popIn}
        {...props}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)
