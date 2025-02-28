"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
}

interface SectionHeaderProps {
  children?: React.ReactNode
  title: string
  placeholder: string
  categories: Category[]
}

export const SectionHeader = ({ children, title, placeholder, categories }: SectionHeaderProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-green-800">{title}</h1>
        {children}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder={placeholder} className="pl-10" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategories.includes(category.id) ? "default" : "outline"}
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

