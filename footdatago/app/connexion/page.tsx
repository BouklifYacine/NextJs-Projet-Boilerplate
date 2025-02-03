"use client";

import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SchemaConnexion } from "@/schema/SchemaConnexion";

import BoutonConnexionProviders from "@/components/BoutonConnexionProviders";

type Schema = z.infer<typeof SchemaConnexion>;

const ConnexionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(SchemaConnexion),
  });
  const router = useRouter();
  const [erreuridentifiant, setErreurIdentifiant] = useState("")

  const onSubmit = async (data: Schema) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setErreurIdentifiant("Email ou mot de passe incorrect.")
        return;
      }

      await router.push(`/`);
    } catch {
      alert("Une erreur est survenue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Se connecter</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                {...register("email")}
                type="email"
                placeholder="votre@email.com"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
          <span className="text-red-500 text-xs"> {erreuridentifiant} </span>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Ou continuer avec
              </span>
            </div>
          </div>

          <BoutonConnexionProviders></BoutonConnexionProviders>

          <p className="text-center text-sm text-gray-600">
            Pas encore inscrit ?{" "}
            <Link
              href="/inscription"
              className="text-blue-600 hover:text-blue-700"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ConnexionForm;
