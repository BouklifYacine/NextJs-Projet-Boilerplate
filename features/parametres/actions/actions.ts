'use server'

import { prisma } from "@/prisma"
import { sendEmail } from "@/lib/email"
import { createElement } from "react"
import CodeConfirmation from "@/emails/CodeConfirmation"
import EmailChangement from "@/emails/ChangementEmail"
import NotifChangementMotDePasse from "@/emails/NotifChangementMotDePasse"
import EmailChangementPseudo from "@/emails/EmailChangementPseudo"
import { revalidatePath } from "next/cache"
import { TypeEmail, TypeMotDePasse, TypePseudo } from "../../features/parametres/schemas/schema"
import EmailSuppressionCompte from "@/app/(emails)/SuppressionCompte"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { hashElement, HashPassword, VerifierElement, verifyPassword } from "@/lib/argon2"

export async function verifierMotDePasse(motdepasse: string) {
  try {

   const session = await auth.api.getSession({
         headers: await headers()
     })
    if (!session?.user?.id) throw new Error("Non autorisé")

    const utilisateur = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { accounts: true }
    })

    const userpassword = utilisateur?.accounts[0].password

    if (!utilisateur) throw new Error("Utilisateur non trouvé")

      const credential = utilisateur.accounts[0].providerId === "credential"

    if (!credential) {
      const provider = utilisateur.accounts[0].providerId
      throw new Error(`Cette fonctionnalité n'est pas disponible car votre compte est lié à ${provider}`)
    }

    if (!userpassword) {
      throw new Error("Aucun mot de passe défini pour ce compte")
    }

const motDePasseValide = await verifyPassword({
  password: motdepasse,
  hash: userpassword
});
    if (!motDePasseValide) throw new Error("Mot de passe incorrect")

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedResetCode = await hashElement(resetCode);
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        resetToken: hashedResetCode,
        resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000)
      }
    })

    await sendEmail({
      to: utilisateur.email!,
      subject: "Code de vérification",
      emailComponent: createElement(CodeConfirmation, {
        resetCode,
        pseudo: utilisateur.name || "Utilisateur"
      })
    })

    return { success: true }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export async function changerEmail(donnees: TypeEmail) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
  })
    if (!session?.user?.id) throw new Error("Non autorisé")

    const { nouvelEmail, codeverification } = donnees

    const emailExistant = await prisma.user.findUnique({
      where: { email: nouvelEmail }
    })

    if (emailExistant) {
      throw new Error("Cet email est déjà utilisé")
    }

    const utilisateur = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      }
    })

    const TokenValide = utilisateur?.resetTokenExpiry && utilisateur.resetTokenExpiry > new Date();
 
     if (!utilisateur?.resetToken) {
  throw new Error("Aucun code de vérification n'a été généré.");
}

    const codevalide = await VerifierElement(codeverification , utilisateur.resetToken)
    
    if (!TokenValide || !codevalide) throw new Error("Code de vérification invalide ou expiré");

    const ancienEmail = utilisateur?.email

    await prisma.$transaction(async (db) => {
      await db.user.update({
        where: { id: session?.user?.id },
        data: {
          email: nouvelEmail,
          resetToken: null,
          resetTokenExpiry: null
        }
      })
      await db.session.deleteMany({
        where: { userId: session?.user?.id}
      })
    })

    await Promise.all([
      sendEmail({
        to: ancienEmail!,
        subject: "Changement de votre email",
        emailComponent: createElement(EmailChangement, {
          pseudo: utilisateur?.name || "",
          email: nouvelEmail,
          ancienemail: ancienEmail || ""
        })
      }),
      sendEmail({
        to: nouvelEmail,
        subject: "Confirmation de votre nouvel email",
        emailComponent: createElement(EmailChangement, {
          pseudo: utilisateur?.name || "",
          email: nouvelEmail,
          ancienemail: ancienEmail || ""
        })
      })
    ])

    revalidatePath('/parametres')
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export async function changerMotDePasse(donnees: TypeMotDePasse) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session?.user?.id) throw new Error("Non autorisé")

    const { motdepasse, codeverification } = donnees

    // ✅ Récupérer l'utilisateur avec ses accounts
    const utilisateur = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        accounts: true // Inclure les accounts
      }
    })

    const TokenValide = utilisateur?.resetTokenExpiry && utilisateur.resetTokenExpiry > new Date();
    
    if (!utilisateur?.resetToken) {
      throw new Error("Aucun code de vérification n'a été généré.");
    }

    const codevalide = await VerifierElement(codeverification, utilisateur.resetToken);

    if (!TokenValide || !codevalide) throw new Error("Code de vérification invalide ou expiré");

    // ✅ Trouver l'account credential
    const accountCredential = utilisateur.accounts.find(acc => acc.providerId === "credential");
    
    if (!accountCredential) {
      throw new Error("Aucun compte avec mot de passe trouvé");
    }

    const motDePasseHashe = await HashPassword(motdepasse);

    await prisma.$transaction(async (db) => {
      await db.user.update({
        where: { id: session?.user?.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null
        }
      })

      // ✅ Utiliser l'ID de l'account
      await db.account.update({
        where: { id: accountCredential.id }, 
        data: {
          password: motDePasseHashe
        }
      })

      // Suppression de toutes les sessions
      await db.session.deleteMany({
        where: { userId: session?.user?.id }
      })
    })

    await sendEmail({
      to: utilisateur?.email || "",
      subject: "Changement de mot de passe",
      emailComponent: createElement(NotifChangementMotDePasse, {
        pseudo: utilisateur?.name || ""
      })
    })

    revalidatePath(`/parametres/${utilisateur.id}`)
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message }
  }
}


export async function changerPseudo(donnees: TypePseudo) {
  try {
const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) throw new Error("Non autorisé");

    const { pseudo, codeverification } = donnees;

    // Récupérer l'utilisateur et ses comptes
    const utilisateur = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { accounts: true }
    });

    if (!utilisateur) throw new Error("Utilisateur non trouvé");

    // Vérifier si le pseudo existe déjà
    const pseudoExistant = await prisma.user.findUnique({
      where: { name: pseudo }
    });

    if (pseudoExistant) {
      throw new Error("Ce pseudo est déjà utilisé");
    }

    // Vérifier si l'utilisateur a un compte credentials
    const hasCredentials = utilisateur.accounts.some(acc => acc.providerId === "credentials");

    // Pour les utilisateurs avec credentials, vérifier le code
    if (hasCredentials) {
      const TokenValide = utilisateur.resetTokenExpiry && utilisateur.resetTokenExpiry > new Date();
      const codevalidecredentials = await VerifierElement(codeverification, utilisateur.resetToken || "");

      if (!codevalidecredentials || !TokenValide) {
        throw new Error("Code de vérification invalide ou expiré");
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: pseudo,
        ...(hasCredentials && {
          resetToken: null,
          resetTokenExpiry: null
        })
      }
    });
    
    const ancienPseudo = utilisateur.name

    if (utilisateur.email) {
      await sendEmail({
        to: utilisateur.email,
        subject: "Changement de pseudo",
        emailComponent: createElement(EmailChangementPseudo, {
          pseudo: ancienPseudo || "",
          name: pseudo
        })
      })
    }

    revalidatePath(`/parametres/${utilisateur.id}`)
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export async function supprimerCompte(codeVerification?: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
  })
    
    if (!session?.user?.id) {
      throw new Error("Non autorisé")
    }

    const utilisateur = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { accounts: true }
    })

    if (!utilisateur) {
      throw new Error("Utilisateur non trouvé")
    }

    const hasProvider = utilisateur.accounts.length > 0

    // Si c'est un compte normal (sans provider) et qu'il n'y a pas de code
    if (!hasProvider && !codeVerification) {
      throw new Error("Code de vérification requis")
    }

    // Vérifier le code uniquement pour les comptes sans provider
    if (!hasProvider) {
      const TokenValide = utilisateur?.resetTokenExpiry && utilisateur.resetTokenExpiry > new Date();
      const codevalide = await VerifierElement(codeVerification || "" , utilisateur?.resetToken || "" )
      if (!TokenValide || !codevalide) throw new Error("Code de vérification invalide ou expiré");
    }

    try {
      await prisma.$transaction(async (db) => {
        await db.session.deleteMany({
          where: { userId: session?.user?.id }
        })

        await db.account.deleteMany({
          where: { userId: session?.user?.id }
        })


        if (utilisateur.clientId) {
          try {
            await db.abonnement.deleteMany({
              where: { userId: session?.user?.id }
            })
          } catch (error) {
            console.error("Erreur lors de la suppression de l'abonnement:", error)
          }
        }

        // Envoyer les mails avant la suppression pour anticiper une erreur 
        if (utilisateur.email) {
          await sendEmail({
            to: utilisateur.email,
            subject: "Compte supprimé",
            emailComponent: createElement(EmailSuppressionCompte, {
              pseudo: utilisateur.name || "Pseudo inconnu"
              
            })
          })
        }

        await db.user.delete({
          where: { id: session?.user?.id }
        })
      })

      // Déconnexion
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
          redirect("/connexion")
          },
        },
      });

      return { success: true }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      throw new Error("Une erreur est survenue lors de la suppression du compte")
    }
  } catch (error) {
    return { error: (error as Error).message }
  }
}