import { Button } from "../ui/button";
import { AuthDialog } from "./AuthDialog";

export const AuthButtons = () => {
  return (
    <div className="flex gap-3 items-center">
      <AuthDialog initialMode="login">
        <Button className="cursor-pointer" variant="outline">
          Login
        </Button>
      </AuthDialog>

      <AuthDialog initialMode="register">
        <Button
          className="cursor-pointer bg-limao hover:bg-lime-500 text-verde-floresta
          asChild"
        >
          Cadastrar-se
        </Button>
      </AuthDialog>
    </div>
  );
};
