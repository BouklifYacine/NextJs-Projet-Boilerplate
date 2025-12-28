import { Badge } from "@/components/ui/badge";

interface BadgeBanProps {
  banned: boolean;
}

export function BadgeBan({ banned }: BadgeBanProps) {
  if (!banned) return null;

  return (
    <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
      Banni
    </Badge>
  );
}
