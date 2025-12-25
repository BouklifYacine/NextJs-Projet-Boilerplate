import { createFileRoute } from "@tanstack/react-router";
import FormulaireChangementMotDePasse from "@/features/codemotdepasseoublie/components/FormulaireChangementMotDePasse";

export const Route = createFileRoute("/connexion/motdepasseoublie/code/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FormulaireChangementMotDePasse />;
}
