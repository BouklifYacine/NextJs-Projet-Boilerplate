
import React from 'react'
import { GetUtilisateurs } from '../(actions)/Dashboard'

const Dashboard = async () => {
    const utilisateur = await GetUtilisateurs()
  return (
    <div>{utilisateur.map((user => user.id))}</div>
  )
}

export default Dashboard