import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";

export const DropDownUser = ({
  nome,
  email,
}: {
  nome: string;
  email: string;
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="text-limao text-lg cursor-pointer font-medium hover:text-verde-floresta">
          Olá, {nome.split(" ").slice(0, 2).join(" ")}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuItem disabled>{email}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
          Conta
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
