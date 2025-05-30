import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function MiddlewareUtilisateurConnecte (){
      const session = await auth.api.getSession({
        headers: await headers(), 
      });
    
      console.log(session)
     
      if(session?.session.id || session?.session.token){
        redirect("/")
      }
}