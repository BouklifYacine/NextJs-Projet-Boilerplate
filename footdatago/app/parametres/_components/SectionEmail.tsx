"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmail } from "../hooks/useEmail";
import { Alert, AlertDescription } from "@/components/ui/alert";
import toast from "react-hot-toast";
import { InputPassword } from "./InputPassword";
import {  useRouter } from "next/navigation";

interface SectionEmailProps {
  userId: string;
}

export function SectionEmail({ userId }: SectionEmailProps) {
  const router = useRouter();
  const [enEdition, setEnEdition] = useState(false);
  const {
    etape,
    formMotDePasse,
    formEmail,
    verifierMotDePasseMutation,
    changerEmailMutation,
    reinitialiser,
  } = useEmail(userId);

  const annuler = () => {
    setEnEdition(false);
    reinitialiser();
  };

  const gererVerificationMotDePasse = async (data: { motdepasse: string }) => {
    try {
      await verifierMotDePasseMutation.mutateAsync(data.motdepasse);
      router.refresh();
      toast.success("Code de vérification envoyé");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const gererChangementEmail = async (data: {
    nouvelEmail: string;
    codeVerification: string;
  }) => {
    try {
      await changerEmailMutation.mutateAsync(data);
      
      window.location.reload();
      toast.success("Email modifié avec succès");
      annuler();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-sm text-gray-500">Gérez votre adresse email</p>
          </div>
          {!enEdition && (
            <Button onClick={() => setEnEdition(true)}>Modifier</Button>
          )}
        </div>

        {enEdition && etape === "motdepasse" && (
          <form
            onSubmit={formMotDePasse.handleSubmit(gererVerificationMotDePasse)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="motdepasse">Mot de passe actuel</Label>
              <InputPassword
                id="motdepasse"
                {...formMotDePasse.register("motdepasse")}
              />
              {formMotDePasse.formState.errors.motdepasse && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formMotDePasse.formState.errors.motdepasse.message?.toString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={verifierMotDePasseMutation.isPending}
              >
                {verifierMotDePasseMutation.isPending
                  ? "Vérification..."
                  : "Continuer"}
              </Button>
              <Button type="button" variant="outline" onClick={annuler}>
                Annuler
              </Button>
            </div>
          </form>
        )}

        {enEdition && etape === "email" && (
          <form
            onSubmit={formEmail.handleSubmit(gererChangementEmail)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="nouvelEmail">Nouvel email</Label>
              <Input
                id="nouvelEmail"
                type="email"
                {...formEmail.register("nouvelEmail")}
              />
              {formEmail.formState.errors.nouvelEmail && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formEmail.formState.errors.nouvelEmail.message?.toString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeVerification">Code de vérification</Label>
              <Input
                id="codeVerification"
                {...formEmail.register("codeVerification")}
              />
              {formEmail.formState.errors.codeVerification && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formEmail.formState.errors.codeVerification.message?.toString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex space-x-2">
              <Button type="submit" disabled={changerEmailMutation.isPending}>
                {changerEmailMutation.isPending
                  ? "Modification en cours..."
                  : "Changer l'email"}
              </Button>
              <Button type="button" variant="outline" onClick={annuler}>
                Annuler
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}
