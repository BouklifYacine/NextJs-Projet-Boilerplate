import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Utilisateurs récupérés avec succès",
    data: [],
    total: 0,
    totalPages: 0
  });
}
