import { ChartPie, DoorOpen, LogOut, Menu, Settings, Star, Table2, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MenuDeroulant() {
  return (
    <DropdownMenu  >
      <DropdownMenuTrigger asChild>
        <Menu className="cursor-pointer text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Star />
            <span>Favoris</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <ChartPie />
            <span>Data</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Table2 />
            <span>Classement</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Paramètres</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup></DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <DoorOpen />
          <span>Connexion</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut />
          <span>Déconnexion</span>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
