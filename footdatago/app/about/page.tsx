"use client"
import { Navigation } from '../marqueblanche/ComposantNavigation';
import useThemeStore from '../(store)/UseThemeStore';
import { useEffect, useState } from 'react';

export default function About() {
  // Gérer le montage pour éviter le flash
  const [mounted, setMounted] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="opacity-0">Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <div className={`${theme.containerColor} p-6 rounded-lg`}>
        <h1 className={`text-2xl font-bold ${theme.textColor} mb-4`}>
          À propos
        </h1>
        <p className={`${theme.textColor} mb-4`}>
         Test voir si les couleurs et couleur container change
        </p>
        
      </div>
    </div>
  );
}