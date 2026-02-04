import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DropDownUser = ({
  nome,
  email,
  onOpenConta,
}: {
  nome: string;
  email: string;
  onOpenConta: () => void;
}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
