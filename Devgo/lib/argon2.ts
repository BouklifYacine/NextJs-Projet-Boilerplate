import { hash, verify, type Options } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

// Hashage générique
export async function hashElement(element: string) {
  return await hash(element, opts);
}

// Alias pour la clarté
export const HashPassword = hashElement;

// Vérification générique
export async function VerifierElement(element: string, hashed: string) {
  return await verify(hashed, element, opts);
}

// Alias pour la clarté
export const verifyPassword = VerifierElement;
