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
import { SchemaConnexion } from "../schemas/SchemaConnexion";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { connexionAction } from "../actions/ConnexionAction";
import { BoutonDisabled } from "@/components/Buttons/BoutonDisabled";

type Schema = z.infer<typeof SchemaConnexion>;

export function ConnexionFormulaire({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [erreurIdentifiant, setErreurIdentifiant] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as Schema,
    onSubmit: async ({ value }) => {
      try {
        const result = await connexionAction({ data: value });
        console.log(value);

        if (result.success) {
          navigate({ to: "/" });
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Se connecter </CardTitle>
          <CardDescription>
            Connexion avec un compte Google ou Github
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <BoutonConnexionProviders></BoutonConnexionProviders>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Ou continuer avec
                </span>
              </div>
              <div className="grid gap-6">
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        SchemaConnexion.shape.email.safeParse(value);
                      if (!result.success)
                        return result.error.issues[0].message;
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
                        placeholder="footy@example.com"
                      />
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
                      const result =
                        SchemaConnexion.shape.password.safeParse(value);
                      if (!result.success)
                        return result.error.issues[0].message;
                      return undefined;
                    },
                  }}
                >
                  {(field) => (
                    <Field>
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                        <Link
                          to="/connexion/motdepasseoublie"
                          className="text-sm underline-offset-4 hover:underline"
                        >
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="password"
                        placeholder="Mot de passe"
                      />
                      <FieldError
                        errors={field.state.meta.errors?.map((err) => ({
                          message: typeof err === "string" ? err : String(err),
                        }))}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Subscribe selector={(state) => state.isSubmitting}>
                  {(isSubmitting) =>
                    isSubmitting ? (
                      <BoutonDisabled
                        text="Connexion en cours..."
                        className="w-full"
                        classnameLoader="mr-2 h-4 w-4"
                      ></BoutonDisabled>
                    ) : (
                      <Button type="submit" className="w-full cursor-pointer">
                        Connexion
                      </Button>
                    )
                  }
                </form.Subscribe>

                {erreurIdentifiant && (
                  <span className="text-red-500 md:text-sm block text-center">
                    {erreurIdentifiant}
                  </span>
                )}
                <div className="text-center text-sm">
                  Vous n&apos;avez pas de compte?{" "}
                  <Link
                    to="/inscription"
                    className="underline underline-offset-4"
                  >
                    Inscrivez vous
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 px-4 pb-4">
        En cliquant sur connexion, vous acceptez nos{" "}
        <a href="#">Conditions d&apos;utilisation</a> et notre{" "}
        <a href="#">Politique de confidentialité</a>.
      </div>
    </div>
  );
}
