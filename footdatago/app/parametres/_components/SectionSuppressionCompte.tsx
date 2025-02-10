'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function SectionSuppression() {
  const gererSuppressionCompte = async () => {
    // Logique de suppression du compte
  }

  return (
    <Card className="p-6 border-red-200">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-red-600">Supprimer le compte</h2>
          <p className="text-sm text-gray-500">
            Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              Supprimer mon compte
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Votre compte et toutes vos données 
                seront définitivement supprimés de nos serveurs.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={gererSuppressionCompte}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer définitivement
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  )
}