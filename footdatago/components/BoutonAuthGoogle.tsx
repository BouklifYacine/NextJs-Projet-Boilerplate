"use client"

import { signIn } from "next-auth/react"
import React from 'react'

const BoutonAuthGoogle = () => {
 
  return (
    <>
    <button 
                type="button"
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors mb-2 flex items-center justify-center gap-2"
                onClick={async () => await signIn("google", { redirectTo: `/` })}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                  />
                </svg>
                Continuer avec Google
              </button>
    </>
  )
}

export default BoutonAuthGoogle