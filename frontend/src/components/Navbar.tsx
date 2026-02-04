import { NavLink } from "react-router";
import { AuthButtons } from "./auth/AuthButtons";
import { useAuth } from "@/hooks/useAuth";
import { DropDownUser } from "./DropDownUser";
import { useState } from "react";
import { ContaModal } from "@/components/conta/ContaModal";

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [isContaOpen, setIsContaOpen] = useState(false);

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 my-4 flex flex-row items-center justify-between">
      <NavLink to="/" className="flex flex-row items-center gap-2">
        <img
          className="w-10 object-contain"
          src="/logo_verde_limao_lirabank.png"
          alt="logo do banco bamerindus"
        />
        <h1 className="text-2xl text-[var(--color-limao)] font-bold">LiraBank</h1>
      </NavLink>

      <nav className="flex gap-8 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-[var(--color-verde-floresta)]" : "text-[var(--color-verde-floresta)]"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/sobre"
          className={({ isActive }) =>
            isActive ? "font-bold text-[var(--color-verde-floresta)]" : "text-[var(--color-verde-floresta)]"
          }
        >
          Sobre nós
        </NavLink>

        <NavLink
          to="/contato"
          className={({ isActive }) =>
            isActive ? "font-bold text-[var(--color-verde-floresta)]" : "text-[var(--color-verde-floresta)]"
          }
        >
          Contato
        </NavLink>
      </nav>

      <div className="flex flex-row gap-3">
        {!isAuthenticated ? (
          <AuthButtons />
        ) : (
          user && (
            <>
              <DropDownUser
                nome={user.nome}
                email={user.email}
                onOpenConta={() => setIsContaOpen(true)}
              />
              <ContaModal open={isContaOpen} onOpenChange={setIsContaOpen} />
            </>
          )
        )}
      </div>
    </div>
  );
};
