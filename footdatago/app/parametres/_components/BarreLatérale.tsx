'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SectionEmail } from './SectionEmail'
import { SectionMotDePasse } from './SectionMotDePasse'
import { SectionPseudo } from './SectionPseudo'
import { SectionSuppression } from './SectionSuppressionCompte'

export function BarreLaterale() {
  const [sectionActive, setSectionActive] = useState('email')
  
  return (
    <>
      <Card className="p-4 space-y-4 h-fit">
        <nav className="flex flex-col space-y-1">
          <Button 
            variant={sectionActive === 'email' ? 'default' : 'ghost'}
            className="justify-start"
            onClick={() => setSectionActive('email')}
          >
            Email
          </Button>
          <Button 
            variant={sectionActive === 'motdepasse' ? 'default' : 'ghost'}
            className="justify-start"
            onClick={() => setSectionActive('motdepasse')}
          >
            Mot de passe
          </Button>
          <Button 
            variant={sectionActive === 'pseudo' ? 'default' : 'ghost'}
            className="justify-start"
            onClick={() => setSectionActive('pseudo')}
          >
            Pseudo
          </Button>
          <Button 
            variant={sectionActive === 'suppression' ? 'default' : 'ghost'}
            className="justify-start text-red-500 hover:text-red-600"
            onClick={() => setSectionActive('suppression')}
          >
            Supprimer le compte
          </Button>
        </nav>
      </Card>

      <div className="space-y-8">
        {sectionActive === 'email' && <SectionEmail />}
        {sectionActive === 'motdepasse' && <SectionMotDePasse />}
        {sectionActive === 'pseudo' && <SectionPseudo />}
        {sectionActive === 'suppression' && <SectionSuppression />}
      </div>
    </>
  )
}