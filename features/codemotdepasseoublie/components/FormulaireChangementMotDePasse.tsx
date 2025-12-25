import React, { useState } from "react";
import { Lock, Mail, MessageSquareLock } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { ResetPasswordSchema } from "@/features/codemotdepasseoublie/schemas/SchemaMotDepasse";
import { InputPassword } from "@/features/parametres/components/InputPassword";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordResetService } from "../services/PasswordResetService";

type Schema = z.infer<typeof ResetPasswordSchema>;

const FormulaireChangementMotDePasse = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
    } as Schema,
    onSubmit: async ({ value }) => {
      try {
        const response = await PasswordResetService.confirmPasswordReset(value);

        form.reset();
        setCode(response.message);
        setErrorMessage("");
        navigate({ to: "/connexion" });
      } catch (error) {
        setErrorMessage("Une erreur est survenue");
        console.error(error);
      }
    },
  });

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-black font-bold text-center mb-6">
          Nouveau mot de passe
        </h2>

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
                const result = ResetPasswordSchema.shape.email.safeParse(value);
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
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    className="pl-10 text-black"
                    placeholder="Rentrez votre email"
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
            name="code"
            validators={{
              onChange: ({ value }) => {
                const result = ResetPasswordSchema.shape.code.safeParse(value);
                if (!result.success) return result.error.issues[0].message;
                return undefined;
              },
            }}
          >
            {(field) => (
              <Field>
                <FieldLabel>Code</FieldLabel>
                <div className="relative">
                  <MessageSquareLock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    className="pl-10 text-black"
                    placeholder="Code"
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
            name="newPassword"
            validators={{
              onChange: ({ value }) => {
                const result =
                  ResetPasswordSchema.shape.newPassword.safeParse(value);
                if (!result.success) return result.error.issues[0].message;
                return undefined;
              },
            }}
          >
            {(field) => (
              <Field>
                <FieldLabel>Nouveau mot de passe</FieldLabel>
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

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <p className=" text-green-500 text-sm">{code}</p>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white cursor-pointer py-2 rounded-md hover:bg-blue-700 transition-colors ${
                  isSubmitting ? "opacity-50" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "En cours" : "Valider "}
              </button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
};

export default FormulaireChangementMotDePasse;
