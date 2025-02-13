import { useQuery } from '@tanstack/react-query';

async function GetTraduction(lang: string) {
  const res = await fetch(`/api/traduction?lang=${lang}`);
  if (!res.ok) throw new Error('Erreur serveur dégage');
  
  return res.json();
}

export function useTraductions(lang: string) {
  return useQuery({
    queryKey: ['traductions', lang],
    queryFn: () => GetTraduction(lang),
    staleTime: Infinity, 
  });
}