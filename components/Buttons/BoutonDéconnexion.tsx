import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function BoutonDeconnexion() {
  const navigate = useNavigate();
  const Deconnexion = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    });
  };
  return (
    <Button
      onClick={Deconnexion}
      variant="ghost"
      className=" border-blue-500 border flex items-center gap-2 cursor-pointer"
    >
      Déconnexion <LogOut size={16} />
    </Button>
  );
}
