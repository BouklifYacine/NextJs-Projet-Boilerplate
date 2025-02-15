"use client"
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const traductions = {
  fr: {
    title: "Ma page statique",
    message: "Bienvenue",
    description: "Ceci est mon site"
  },
  en: {
    title: "My static page",
    message: "Welcome",
    description: "This is my website"
  }
} as const

type Lang = 'fr' | 'en'

export default function Home() {
  const [langue, setLangue] = useState<Lang>('fr')
  const texte = traductions[langue]
  
  const GererlaValeur = (value: string) => {
    setLangue(value as Lang)
  }
  
  return (
    <div className="p-4 text-center">
      <Select value={langue} onValueChange={GererlaValeur}>
        <SelectTrigger className="w-[180px] bg-blue-500 mx-auto mb-4">
          <SelectValue placeholder="Langue" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fr" className="text-black cursor-pointer">
            Français 🇫🇷
          </SelectItem>
          <SelectItem value="en" className="text-black cursor-pointer">
            English 🇬🇧
          </SelectItem>
        </SelectContent>
      </Select>

      <h1 className="text-5xl font-bold">{texte.title}</h1>
      <h2 className="text-2xl text-green-500 my-2">{texte.message}</h2>
      <p>{texte.description}</p>
    </div>
  )
}