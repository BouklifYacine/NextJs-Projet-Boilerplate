
// type Translations = {
//     fr: typeof traductions.fr;
//     en: typeof traductions.fr;
//   }
  
//   const traductions = {
//     fr: {
//       title: "Mon Site Web",
//       welcome: "Bienvenue",
//       description: "Ceci est mon site"
//     },
//     en: {
//       title: "My Website",
//       welcome: "Welcome",
//       description: "This is my website"
//     }
//   } 
  
//   export async function GET(request: Request) {
//     const searchParams = new URL(request.url).searchParams;
//     const lang = searchParams.get('lang') as keyof Translations || 'fr';
    
//     return Response.json(traductions[lang]);
//   }