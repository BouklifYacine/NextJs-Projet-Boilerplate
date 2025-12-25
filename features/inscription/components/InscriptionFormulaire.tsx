import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import BoutonConnexionProviders from "@/components/Buttons/BoutonConnexionProviders";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { inscriptionAction } from "@/features/inscription/actions/InscriptionAction";
import { BoutonDisabled } from "@/components/Buttons/BoutonDisabled";

import SchemaInscription from "@/features/inscription/schemas/SchemaInscription";
import { InputPassword } from "../../parametres/components/InputPassword";
import { Lock } from "lucide-react";

type Schema = z.infer<typeof SchemaInscription>;

export default function InscriptionFormulaire({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [erreurMessage, setErreurMessage] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } as Schema,
    onSubmit: async ({ value }) => {
      try {
        const result = await inscriptionAction({ data: value });

        if (result.success) {
          navigate({ to: "/connexion" });
          form.reset();
          setErreurMessage("");
        } else {
          const messageErreur = String(
            result?.error || "Une erreur inconnue est survenue"
          );
          setErreurMessage(messageErreur);
        }
      } catch (error) {
        setErreurMessage("Une erreur est survenue");
        console.error(error);
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Créer un compte</CardTitle>
          <CardDescription>
            Inscrivez-vous avec Google, Github ou votre email
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Boutons providers EN DEHORS du form */}
          <div className="flex flex-col gap-4">
            <BoutonConnexionProviders />
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-6">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Ou continuer avec
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid gap-6">
              {/* Nom */}
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const result =
                      SchemaInscription.shape.name.safeParse(value);
                    if (!result.success) return result.error.issues[0].message;
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="name">Pseudo</FieldLabel>
                    <Input
                      id="name"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Votre nom"
                    />
                    <FieldError
                      errors={field.state.meta.errors?.map((err) => ({
                        message: typeof err === "string" ? err : String(err),
                      }))}
                    />
                  </Field>
                )}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const result =
                      SchemaInscription.shape.email.safeParse(value);
                    if (!result.success) return result.error.issues[0].message;
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      placeholder="votre@email.com"
                    />
                    <FieldError
                      errors={field.state.meta.errors?.map((err) => ({
                        message: typeof err === "string" ? err : String(err),
                      }))}
                    />
                  </Field>
                )}
              </form.Field>

              {/* Mot de passe */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    const result =
                      SchemaInscription.shape.password.safeParse(value);
                    if (!result.success) return result.error.issues[0].message;
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <InputPassword
                        id="password"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Mot de passe"
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

              {/* Erreur */}
              {erreurMessage && (
                <span className="text-red-500 md:text-sm block text-center">
                  {erreurMessage}
                </span>
              )}

              {/* Bouton */}
              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) =>
                  isSubmitting ? (
                    <BoutonDisabled
                      text="Inscription en cours..."
                      className="w-full"
                      classnameLoader="mr-2 h-4 w-4"
                    />
                  ) : (
                    <Button type="submit" className="w-full cursor-pointer">
                      Inscription
                    </Button>
                  )
                }
              </form.Subscribe>
            </div>
            <div className="text-center text-sm mt-4">
              Déjà inscrit ?{" "}
              <Link to="/connexion" className="underline underline-offset-4">
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        En cliquant sur inscription, vous acceptez nos{" "}
        <a href="#">Conditions d&apos;utilisation</a> et notre{" "}
        <a href="#">Politique de confidentialité</a>.
      </div>
    </div>
  );
}
