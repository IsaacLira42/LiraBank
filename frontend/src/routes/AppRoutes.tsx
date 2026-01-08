import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth">
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="cadastro" element={<AuthPage mode="cadastro" />} />
        <Route index element={<Navigate to="/auth/login" replace />} />
      </Route>
      {/* Redireciona qualquer outra rota para a home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
