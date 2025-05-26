import { hash, verify, type Options } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function HashPassword(password: string) {
  const result = await hash(password, opts);
  return result;
}
// J'ai fais cette fonction car j'ai la flemme de modifier toutes modif de hachage hors mot de passe je le ferais après 
export async function Hash(element: string) {
  const result = await hash(element, opts);
  return result;
}

// J'ai fais cette fonction car j'ai la flemme de modifier toutes modif de hachage hors mot de passe je le ferais après 
export async function VerifyElement(data: { element: string; hash: string }) {
  const { element, hash } = data;
  const result = await verify(hash, element, opts)
  return result
}


export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;
  const result = await verify(hash, password, opts)
  return result
}


