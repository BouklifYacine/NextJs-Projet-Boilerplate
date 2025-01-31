import React from 'react'
import { Deconnexion } from './BoutonDéconnexion'
import { ConnexionGoogle } from './BoutonAuthGoogle'

const TestBouton = () => {
  return (
    <>
    <div className='flex justify-evenly'>
    <ConnexionGoogle></ConnexionGoogle>
    <Deconnexion></Deconnexion>
    </div>
    </>
  )
}

export default TestBouton