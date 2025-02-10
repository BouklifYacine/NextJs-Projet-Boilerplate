'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SectionEmail() {
  const [enEdition, setEnEdition] = useState(false)
  const [email, setEmail] = useState('utilisateur@exemple.com')

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de mise à jour de l'email
    setEnEdition(false)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-sm text-gray-500">Gérez votre adresse email</p>
          </div>
          {!enEdition && (
            <Button onClick={() => setEnEdition(true)}>
              Modifier
            </Button>
          )}
        </div>

        {!enEdition ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{email}</p>
          </div>
        ) : (
          <form onSubmit={gererSoumission} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Nouvelle adresse email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre nouvelle adresse email"
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">Enregistrer</Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setEnEdition(false)}
              >
                Annuler
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  )
}