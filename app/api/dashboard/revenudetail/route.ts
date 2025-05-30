import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: {
      users: { total: 0, pro: 0 },
      abonnements: {
        mensuels: { nombre: 0, revenus: 0 },
        annuels: { nombre: 0, revenus: 0 },
        total: { revenus: "0", mrr: "0" }
      }
    }
  });
}
