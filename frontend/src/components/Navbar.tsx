import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router";

export const Navbar = () => {
  return (
    <div className="mx-4 md:mx-8 lg:mx-16 my-4 flex flex-row items-center justify-between">
      <NavLink to="/" className="flex flex-row items-center gap-2">
        <img
          className="w-10 object-contain"
          src="/logo_verde_limao_lirabank 3.png"
          alt="logo do banco bamerindus"
        />
        <h1 className="text-2xl text-limao font-bold">LiraBank</h1>
      </NavLink>

      <nav className="flex gap-8 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-verde-floresta" : "text-verde-floresta"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/sobre"
          className={({ isActive }) =>
            isActive ? "font-bold text-verde-floresta" : "text-verde-floresta"
          }
        >
          Sobre nós
        </NavLink>

        <NavLink
          to="/contato"
          className={({ isActive }) =>
            isActive ? "font-bold text-verde-floresta" : "text-verde-floresta"
          }
        >
          Contato
        </NavLink>
      </nav>

      <div className="flex flex-row gap-3">
        <Button className="cursor-pointer" variant="outline" asChild>
          <Link to="/auth/login">Login</Link>
        </Button>

        <Button
          className="cursor-pointer bg-limao hover:bg-lime-500 text-verde-floresta"
          asChild
        >
          <Link to="/auth/cadastro">Cadastrar-se</Link>
        </Button>
      </div>
    </div>
  );
};
