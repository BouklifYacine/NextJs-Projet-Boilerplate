'use client'
// app/parametres/components/SectionMotDePasse.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SectionMotDePasse() {
  const [enEdition, setEnEdition] = useState(false)
  const [motDePasseActuel, setMotDePasseActuel] = useState('')
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('')
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('')
  const dernierChangement = "10 février 2024" // À remplacer par la vraie date

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de mise à jour du mot de passe
    setEnEdition(false)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Mot de passe</h2>
            <p className="text-sm text-gray-500">Dernier changement: {dernierChangement}</p>
          </div>
          {!enEdition && (
            <Button onClick={() => setEnEdition(true)}>
              Modifier
            </Button>
          )}
        </div>

        {enEdition && (
          <form onSubmit={gererSoumission} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motDePasseActuel">Mot de passe actuel</Label>
              <Input
                id="motDePasseActuel"
                type="password"
                value={motDePasseActuel}
                onChange={(e) => setMotDePasseActuel(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nouveauMotDePasse">Nouveau mot de passe</Label>
              <Input
                id="nouveauMotDePasse"
                type="password"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmationMotDePasse">Confirmez le mot de passe</Label>
              <Input
                id="confirmationMotDePasse"
                type="password"
                value={confirmationMotDePasse}
                onChange={(e) => setConfirmationMotDePasse(e.target.value)}
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