"use client";

import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SchemaConnexion } from "@/features/connexion/schemas/SchemaConnexion";
import { connexionAction } from "../actions/ConnexionAction";
import BoutonConnexionProviders from "@/components/Buttons/BoutonConnexionProviders";
import { InputPassword } from "../../parametres/components/InputPassword";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Schema = z.infer<typeof SchemaConnexion>;

const ClientConnexionFormulaire = () => {
  const router = useRouter();
  const [erreurIdentifiant, setErreurIdentifiant] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as Schema,
    onSubmit: async ({ value }) => {
      try {
        const result = await connexionAction(value);

        if (result.success) {
          router.push("/");
          router.refresh();
        } else {
          setErreurIdentifiant(result.error || "Une erreur est survenue");
        }
      } catch (error) {
        console.error(error);
        setErreurIdentifiant("Une erreur est survenue lors de la connexion");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            const result = SchemaConnexion.shape.email.safeParse(value);
            if (!result.success) return result.error.issues[0].message;
            return undefined;
          },
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel>Email</FieldLabel>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                placeholder="votre@email.com"
                className="pl-10 text-black"
              />
            </div>
            <FieldError
              errors={field.state.meta.errors?.map((err) => ({
                message: typeof err === "string" ? err : String(err),
              }))}
            />
          </Field>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            const result = SchemaConnexion.shape.password.safeParse(value);
            if (!result.success) return result.error.issues[0].message;
            return undefined;
          },
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel>Mot de passe</FieldLabel>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <InputPassword
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <FieldError
              errors={field.state.meta.errors?.map((err) => ({
                message: typeof err === "string" ? err : String(err),
              }))}
            />
          </Field>
        )}
      </form.Field>

      <div className="flex justify-end text-md text-blue-600 hover:text-blue-700 underline">
        <Link href="/connexion/motdepasseoublie">Mot de passe oublié?</Link>
      </div>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition-colors ${isSubmitting ? "opacity-50" : ""
              }`}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        )}
      </form.Subscribe>

      {erreurIdentifiant && (
        <span className="text-red-500 md:text-md block text-center">
          {erreurIdentifiant}
        </span>
      )}

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
        </div>
      </div>

      <BoutonConnexionProviders />

      <p className="text-center text-md text-gray-600">
        Pas encore inscrit ?{" "}
        <Link href="/inscription" className="text-blue-600 hover:text-blue-700">
          Inscription
        </Link>
      </p>
    </form>
  );
};

export default ClientConnexionFormulaire;
