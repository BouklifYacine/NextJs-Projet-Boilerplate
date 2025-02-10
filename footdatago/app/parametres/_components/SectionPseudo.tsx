'use client'
// app/parametres/components/SectionPseudo.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SectionPseudo() {
  const [enEdition, setEnEdition] = useState(false)
  const [pseudo, setPseudo] = useState('MonPseudo') 

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setEnEdition(false)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Pseudo</h2>
            <p className="text-sm text-gray-500">Votre pseudo affiché publiquement</p>
          </div>
          {!enEdition && (
            <Button onClick={() => setEnEdition(true)}>
              Modifier
            </Button>
          )}
        </div>

        {!enEdition ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{pseudo}</p>
          </div>
        ) : (
          <form onSubmit={gererSoumission} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pseudo">Nouveau pseudo</Label>
              <Input
                id="pseudo"
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder="Entrez votre nouveau pseudo"
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