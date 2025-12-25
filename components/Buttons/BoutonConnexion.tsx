import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function BoutonConnexion() {
  return (
    <>
      <Link to="/connexion">
        <Button
          variant="ghost"
          className=" border-blue-500 border flex items-center gap-2 cursor-pointer"
        >
          Connexion
        </Button>
      </Link>
    </>
  );
}
