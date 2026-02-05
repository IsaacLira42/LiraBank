import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export const DropDownUser = ({
  nome,
  email,
  onOpenConta,
}: {
  nome: string;
  email: string;
  onOpenConta: () => void;
}) => {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="text-[var(--color-limao)] text-lg cursor-pointer font-medium hover:text-[var(--color-verde-floresta)]">
          Olá, {nome.split(" ").slice(0, 2).join(" ")}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuItem disabled>{email}</DropdownMenuItem>
        <DropdownMenuItem
          className="text-[var(--color-verde-floresta)]"
          onClick={onOpenConta}
        >
          Conta
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-[var(--color-verde-floresta)]"
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
