"use client"
import Link from 'next/link';
import useThemeStore from '../(store)/UseThemeStore';

export function Navigation() {
  const { theme } = useThemeStore();

  return (
    <nav className={`p-4 ${theme.containerColor} mb-4 rounded-lg`}>
      <ul className="flex space-x-4">
        <li>
          <Link 
            href="/marqueblanche" 
            className={`${theme.textColor} hover:opacity-80`}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link 
            href="/about" 
            className={`${theme.textColor} hover:opacity-80`}
          >
            À propos
          </Link>
        </li>
      </ul>
    </nav>
  );
}