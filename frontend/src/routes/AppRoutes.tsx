import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} /> */}

      {/* Redireciona qualquer outra rota para a home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
