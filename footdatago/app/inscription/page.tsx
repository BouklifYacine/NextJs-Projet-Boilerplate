"use client"

import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios"
import SchemaInscription from '@/schema/SchemaInscription';
import { useRouter } from 'next/navigation';
import Boutongoogle from '@/components/BoutonAuthGoogle';
import BoutonGithub from '@/components/BoutonAuthGoogle';
import BoutonConnexionProviders from '@/components/BoutonConnexionProviders';

type Schema = z.infer<typeof SchemaInscription>;

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting},
  } = useForm<Schema>({
    resolver: zodResolver(SchemaInscription),
  });

  const router = useRouter()

  const onSubmit = async (data : Schema) => {
    try {
      const response = await axios.post('/api/inscription', data);
      router.push("/connexion")
      reset()
      console.log(response.data)
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">S'inscrire</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('name')}
                type="text"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('email')}
                type="email"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('password')}
                type="password"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours" : "S'inscrire "}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
            </div>
          </div>

     <BoutonConnexionProviders></BoutonConnexionProviders>

          <p className="text-center text-sm text-gray-600 mt-4">
            Déjà inscrit?{' '}
            <Link href="/connexion" className="text-blue-600 hover:text-blue-700">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;