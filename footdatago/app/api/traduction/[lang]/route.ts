import { NextRequest } from "next/server";

type Translations = {
    fr: typeof traductions.fr;
    en: typeof traductions.fr;
  }
  
  const traductions = {
    fr: {
      title: "Mon Site Web",
      welcome: "Bienvenue",
      description: "Ceci est mon site"
    },
    en: {
      title: "My Website",
      welcome: "Welcome",
      description: "This is my website"
    }
  }
  
  export async function GET(
    request: NextRequest,
    { params }: { params: { lang: keyof Translations } }
  ) {
    return Response.json(traductions[params.lang]);
  }