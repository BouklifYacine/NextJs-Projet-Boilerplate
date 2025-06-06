import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function BoutonAjouter() {
  return (
    <Button variant="outline" className="aspect-square max-sm:p-0">
      <Plus className="opacity-60 sm:-ms-1 sm:me-2" size={16} strokeWidth={2} aria-hidden="true" />
      <span className="max-sm:sr-only">Ajouter</span>
    </Button>
  );
}

export { BoutonAjouter };
