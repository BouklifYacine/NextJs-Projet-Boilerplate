

import AlertDialogButton from '@/components/AlertDialog/AlertDialogButton'
import { BadgeX } from 'lucide-react'
import React from 'react'

function Testcomponents() {
  return (
    <div><AlertDialogButton icon={<BadgeX />} textbutton={"Supprimer"} titre={"Titre"} description={"description"} textconfirmbutton={"Confirmez"} textcancelbutton={"Annuler"}></AlertDialogButton></div>
  )
}

export default Testcomponents