"use client";
import React, { useEffect, useState } from "react";
import useThemeStore from "../(store)/UseThemeStore";
import { TailwindColor } from "../(store)/TypesStoreMarqueBlanche";

export function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTextColor, setContainerColor, resetTheme } =
    useThemeStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const textColorOptions = [
    { name: "Noir", value: "text-gray-900" as TailwindColor },
    { name: "Bleu", value: "text-blue-500" as TailwindColor },
    { name: "Rouge", value: "text-red-500" as TailwindColor },
    { name: "Vert", value: "text-green-500" as TailwindColor },
  ];

  const containerColorOptions = [
    { name: "Blanc", value: "bg-white" as TailwindColor },
    { name: "Bleu clair", value: "bg-blue-100" as TailwindColor },
    { name: "Rouge clair", value: "bg-red-100" as TailwindColor },
    { name: "Vert clair", value: "bg-green-100" as TailwindColor },
  ];

  if (!mounted) {
    return <div className="opacity-0">Chargement...</div>;
  }

  return (
    <div className={`transition-colors duration-300 ${theme.containerColor}`}>
      <div className="p-4 space-y-6">
        <div>
          <p className={`mb-2 ${theme.textColor}`}>Couleur du texte:</p>
          <div className="flex space-x-2">
            {textColorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setTextColor(color.value)}
                className={`px-4 py-2 rounded ${
                  theme.textColor === color.value ? "ring-2 ring-blue-500" : ""
                } ${color.value} border`}
                type="button"
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={`mb-2 ${theme.textColor}`}>Couleur du conteneur:</p>
          <div className="flex space-x-2">
            {containerColorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setContainerColor(color.value)}
                className={`px-4 py-2 rounded ${
                  theme.containerColor === color.value
                    ? "ring-2 ring-blue-500"
                    : ""
                } ${color.value} border`}
                type="button"
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={resetTheme}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          type="button"
        >
          Réinitialiser le thème
        </button>
      </div>
    </div>
  );
}
