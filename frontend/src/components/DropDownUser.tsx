import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DropDownUser = ({ nome }: { nome: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="text-limao text-lg cursor-pointer font-medium hover:text-verde-floresta">
          Olá, {nome.split(" ").slice(0, 2).join(" ")}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
