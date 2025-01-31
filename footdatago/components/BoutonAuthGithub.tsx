"use client"

import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import React from 'react'

const BoutonAuthGithub = () => {

  return (
    <>
     <button 
            type="button"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            onClick={async () => await signIn("github", { redirectTo: `/` })}
          >
            <Github size={20} />
            Continuer avec GitHub
          </button>
    </>
  )
}

export default BoutonAuthGithub