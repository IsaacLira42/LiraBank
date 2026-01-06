import { CompaniasParceiras } from "@/components/home/sesoes/SessaoDasBandeiras";
import { Hero } from "../components/home/Hero";
import { ConhecendoOBanco } from "@/components/home/sesoes/ConhecendoOBanco";
import { SecaoGerencieSeuDinheiro } from "@/components/home/sesoes/SecaoGerencieSeuDinheiro";

const Home = () => {
  return (
    <>
      <Hero />
      <CompaniasParceiras />
      <ConhecendoOBanco />
      <SecaoGerencieSeuDinheiro />
    </>
  );
};

export default Home;
